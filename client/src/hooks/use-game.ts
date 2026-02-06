import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { storage as localStorageUtil } from "@/lib/storage";

// --- Types ---
export interface RoomState {
  player1: string;
  player2: string | null;
  status: 'waiting' | 'ready';
}

// --- Hooks ---

export function useCreateRoom() {
  return useMutation({
    mutationFn: async ({ playerName, day, language }: { playerName: string, day: string, language: string }) => {
      const data = await api.createRoom(playerName, day, language);
      return data.roomCode;
    },
    onSuccess: (code) => {
      // Opt: Save to sessionStorage if needed, but per requirements we rely on URL
      sessionStorage.setItem('roomCode', code);
    }
  });
}

export function useJoinRoom() {
  return useMutation({
    mutationFn: async ({ code, name, day }: { code: string; name: string, day: string }) => {
      await api.joinRoom(code, name, day);
      return code;
    },
    onSuccess: (code) => {
      sessionStorage.setItem('roomCode', code);
    }
  });
}

export function useRoomState(roomCode: string | null) {
  return useQuery({
    queryKey: ['room', roomCode],
    queryFn: async () => {
      if (!roomCode) return null;
      return await api.getRoomState(roomCode);
    },
    enabled: !!roomCode && roomCode.length === 6,
    refetchInterval: 1000, // Poll every 1 second as requested
  });
}

export function useSubmitAnswer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ roomCode, playerName, day, response }: { roomCode: string, playerName: string, day: number, response: any }) => {
      await api.submitAnswer(roomCode, playerName, day, response);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['room', variables.roomCode] });
    }
  });
}

export function useSubmitReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ roomCode, playerName, reviews }: { roomCode: string, playerName: string, reviews: any }) => {
      await api.submitReview(roomCode, playerName, reviews);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['room', variables.roomCode] });
    }
  });
}

export function useCancelRoom() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ roomCode, playerName }: { roomCode: string, playerName: string }) => {
      await api.cancelRoom(roomCode, playerName);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['room', variables.roomCode] });
    }
  });
}

export function useSaveHistory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      // 1. Save to Local Storage (Primary for persistence across deploys)
      // data typically has: roomCode, dayId, player1Name, player2Name, finalPercentage
      // We need to map it to our GameHistoryItem structure
      const historyItem = {
        roomCode: data.roomCode,
        dayId: data.dayId,
        player1Name: data.player1Name,
        player2Name: data.player2Name,
        lovePercentage: data.finalPercentage || 0,
        playedAt: new Date().toISOString()
      };

      localStorageUtil.addHistory(data.player1Name, historyItem);

      // Also sync for partner if different (assuming they might be using same browser/device in this local-first context?? 
      // Actually strictly, we only save for the current user usually, but here we have names. 
      // The prompt says "Use a single storage key per user".
      // We will only strictly add for player1Name as that's likely the "user" context invoking this,
      // but if the hook is called, it might be safer to just ensure we save for the "user in session".
      // ... Looking at usage in DayResult -> it passes player1Name and player2Name.
      // We safely add for both just in case they switch profiles on same device.
      if (data.player2Name && data.player2Name !== data.player1Name) {
        localStorageUtil.addHistory(data.player2Name, historyItem);
      }

      // 2. Try API (Best effort, ignore failure)
      try {
        await api.saveHistory(data);
      } catch (e) {
        console.warn("API save failed, relying on local storage", e);
      }

      return historyItem;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['history', variables.player1Name] });
      if (variables.player2Name) {
        queryClient.invalidateQueries({ queryKey: ['history', variables.player2Name] });
      }
    }
  });
}

export function useUserHistory(username: string) {
  return useQuery({
    queryKey: ['history', username],
    queryFn: async () => {
      if (!username) return [];
      // Read from Local Storage
      const data = localStorageUtil.getUserData(username);
      return data.history.sort((a, b) => new Date(b.playedAt).getTime() - new Date(a.playedAt).getTime());
    },
    enabled: !!username
  });
}

export function useCheckHistory(username: string, dayId: string) {
  return useQuery({
    queryKey: ['checkHistory', username, dayId],
    queryFn: async () => {
      if (!username || !dayId) return { played: false };
      const data = localStorageUtil.getUserData(username);
      const played = data.completedDays.includes(dayId);
      return { played };
    },
    enabled: !!username && !!dayId
  });
}

export function useDeleteHistory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (username: string) => {
      localStorageUtil.clearUserData(username);
    },
    onSuccess: (_, username) => {
      queryClient.invalidateQueries({ queryKey: ['history', username] });
      queryClient.invalidateQueries({ queryKey: ['checkHistory'] });
    }
  });
}

export function useSession() {
  const userName = localStorage.getItem('userName');
  const roomCode = sessionStorage.getItem('roomCode');
  const selectedDay = localStorage.getItem('selectedDay');

  // Helper to ensure name exists
  const ensureSession = () => {
    if (!userName) window.location.href = '/';
  }

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  };

  return { userName, name: userName, selectedDay, roomCode, code: roomCode, ensureSession, logout };
}

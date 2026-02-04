import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

// --- Types ---
export interface RoomState {
  player1: string;
  player2: string | null;
  status: 'waiting' | 'ready';
}

// --- Hooks ---

export function useCreateRoom() {
  return useMutation({
    mutationFn: async ({ playerName, day }: { playerName: string, day: string }) => {
      const data = await api.createRoom(playerName, day);
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

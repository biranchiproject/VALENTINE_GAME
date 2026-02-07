import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export type LeaderboardEntry = {
    id: number;
    dayId: string;
    player1Name: string;
    player2Name: string;
    lovePercentage: number;
    completionTime: number;
    createdAt: string;
};

export function useLeaderboard(dayId: string) {
    const isOverall = dayId === "overall";
    // Fallback to the known Render backend if env var is missing
    const apiBase = import.meta.env.VITE_API_URL || "https://valentine-game-aydr.onrender.com";

    return useQuery<LeaderboardEntry[]>({
        queryKey: isOverall ? ["/api/leaderboard/overall"] : [`/api/leaderboard/${dayId}`],
        queryFn: async () => {
            const url = `${apiBase}/api/leaderboard/${isOverall ? "overall" : dayId}`;
            console.log("[Leaderboard] API Base:", apiBase);
            console.log("[Leaderboard] Fetching from:", url);

            try {
                const res = await fetch(url);
                console.log("[Leaderboard] Response status:", res.status);

                if (!res.ok) {
                    const text = await res.text();
                    console.error("[Leaderboard] Fetch failed:", text);
                    throw new Error(`Failed to fetch leaderboard: ${res.status}`);
                }

                const data = await res.json();
                console.log("[Leaderboard] Data received:", data?.length || 0, "entries");
                return data;
            } catch (error) {
                console.error("[Leaderboard] Network or Parse Error:", error);
                throw error;
            }
        },
        enabled: !!dayId,
        refetchInterval: 15000,
    });
}

export function useSubmitScore() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: {
            dayId: string;
            player1Name: string;
            player2Name: string;
            lovePercentage: number;
            completionTime: number;
        }) => {
            const res = await apiRequest("POST", "/api/leaderboard", data);
            return res.json();
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [`/api/leaderboard/${variables.dayId}`] });
        },
    });
}

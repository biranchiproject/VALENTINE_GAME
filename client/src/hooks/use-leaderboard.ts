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
    return useQuery<LeaderboardEntry[]>({
        queryKey: isOverall ? ["/api/leaderboard/overall"] : [`/api/leaderboard/${dayId}`],
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

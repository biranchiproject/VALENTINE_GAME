import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Clock, Heart, Crown } from "lucide-react";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { NeonCard } from "@/components/NeonCard";
import { VALENTINE_DAYS } from "@shared/valentineConfig";

interface LeaderboardProps {
    initialDay?: string;
    displayMode?: "overall" | "specific";
}

export const Leaderboard = ({ initialDay = "rose_day", displayMode = "specific" }: LeaderboardProps) => {
    // Determine query key: if overall mode, fetch overall. If specific, fetch that day.
    const queryKey = displayMode === "overall" ? "overall" : initialDay;
    const { data: leaderboard = [], isLoading } = useLeaderboard(queryKey);

    const title = displayMode === "overall" ? "OVERALL CHAMPIONS" : `${VALENTINE_DAYS.find(d => d.id === initialDay)?.title} LEADERS`;

    return (
        <NeonCard className="w-full max-w-4xl p-6 relative overflow-hidden flex flex-col gap-6 mb-8">
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50" />

            <div className="text-center space-y-2">
                <h2 className="text-2xl md:text-3xl font-cyber neon-text flex items-center justify-center gap-3 uppercase">
                    <Trophy className="text-yellow-400 w-6 h-6 md:w-8 md:h-8" />
                    {title}
                    <Trophy className="text-yellow-400 w-6 h-6 md:w-8 md:h-8" />
                </h2>
                {displayMode === "overall" && (
                    <p className="text-muted-foreground text-xs md:text-sm font-mono tracking-widest uppercase">
                        Combined scores across all days
                    </p>
                )}
            </div>

            {/* List */}
            <div className="min-h-[300px] flex flex-col gap-3">
                {isLoading ? (
                    <div className="flex-grow flex items-center justify-center text-primary animate-pulse">
                        Loading rankings...
                    </div>
                ) : leaderboard.length === 0 ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-muted-foreground opacity-50 gap-2">
                        <Trophy className="w-12 h-12 mb-2" />
                        <p>No champions yet!</p>
                        <p className="text-xs">Be the first to claim the throne!</p>
                    </div>
                ) : (
                    leaderboard.slice(0, 100).map((entry, idx) => (
                        <motion.div
                            key={entry.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`relative flex items-center justify-between p-4 rounded-xl border backdrop-blur-sm transition-all group hover:scale-[1.01]
                                ${idx === 0
                                    ? "bg-gradient-to-r from-yellow-500/20 to-transparent border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                                    : idx === 1
                                        ? "bg-white/5 border-slate-300/30"
                                        : idx === 2
                                            ? "bg-orange-700/10 border-orange-700/30"
                                            : "bg-black/20 border-white/5 hover:bg-white/5"
                                }`}
                        >
                            {/* Rank Badge */}
                            <div className="flex items-center gap-4">
                                <div className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full font-black font-cyber text-lg md:text-xl
                                    ${idx === 0 ? "text-yellow-400 drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]" :
                                        idx === 1 ? "text-slate-300" :
                                            idx === 2 ? "text-orange-400" : "text-muted-foreground"
                                    }`}>
                                    {idx === 0 ? <Crown className="w-6 h-6 md:w-8 md:h-8" /> : `#${idx + 1}`}
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 font-bold text-white text-sm md:text-base">
                                        <span className={idx === 0 ? "text-yellow-200" : ""}>{entry.player1Name}</span>
                                        <Heart className={`w-3 h-3 ${idx === 0 ? "text-yellow-500 animate-pulse" : "text-primary"}`} fill="currentColor" />
                                        <span className={idx === 0 ? "text-yellow-200" : ""}>{entry.player2Name}</span>
                                    </div>
                                    <div className="text-[10px] md:text-xs text-muted-foreground flex items-center gap-2">
                                        <Clock className="w-3 h-3" />
                                        {displayMode === "overall" ? (
                                            <span>
                                                {Math.round(entry.completionTime / 60)}m {(entry.completionTime % 60)}s (Total)
                                            </span>
                                        ) : (
                                            <span>{entry.completionTime}s</span>
                                        )}
                                        <span className="opacity-30">|</span>
                                        {new Date(entry.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            {/* Score */}
                            <div className="text-right">
                                <div className={`font-cyber text-xl md:text-2xl font-bold ${idx === 0 ? "text-yellow-400 neon-text-yellow" : "text-primary neon-text"}`}>
                                    {entry.lovePercentage}%
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </NeonCard>
    );
};

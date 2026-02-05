import { Link, useLocation } from "wouter";
import { useSession, useUserHistory, useDeleteHistory } from "@/hooks/use-game";
import { NeonCard } from "@/components/NeonCard";
import { CyberButton } from "@/components/CyberButton";
import { ArrowLeft, Calendar, Heart, Award, Trash2 } from "lucide-react";
import { VALENTINE_DAYS } from "@shared/valentineConfig";
import { motion } from "framer-motion";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function History() {
    const [, setLocation] = useLocation();
    const { userName, ensureSession } = useSession();
    const { data: history = [], isLoading } = useUserHistory(userName || "");
    const deleteHistoryMutation = useDeleteHistory();

    const handleDeleteHistory = async () => {
        if (!userName) return;
        await deleteHistoryMutation.mutateAsync(userName);
        setLocation("/catalog");
    };

    if (!userName) {
        setLocation("/");
        return null;
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center pt-8 pb-12 px-4 relative">

            {/* Header */}
            <div className="w-full max-w-4xl flex items-center justify-between mb-8">
                <CyberButton variant="outline" onClick={() => setLocation("/catalog")} className="flex items-center gap-2">
                    <ArrowLeft size={20} /> Back
                </CyberButton>
                <h1 className="text-3xl font-cyber neon-text text-primary">Your Love Journey 💖</h1>
                <div className="w-24" /> {/* Spacer */}
            </div>

            {/* History List */}
            <div className="w-full max-w-2xl space-y-4 flex-grow mb-16">
                {isLoading ? (
                    <div className="text-center text-white/50 animate-pulse">Loading history...</div>
                ) : history.length === 0 ? (
                    <NeonCard className="p-8 text-center opacity-80">
                        <Heart className="w-16 h-16 text-pink-500/50 mx-auto mb-4" />
                        <h3 className="text-xl text-white mb-2">No Games Yet</h3>
                        <p className="text-pink-200/70 mb-6">Start your love journey by playing today's game!</p>
                        <CyberButton onClick={() => setLocation("/catalog")}>Go to Catalog</CyberButton>
                    </NeonCard>
                ) : (
                    <>
                        {history.map((game: any, idx: number) => {
                            const dayConfig = VALENTINE_DAYS.find(d => d.id === game.dayId);
                            const isPlayer1 = game.player1Name === userName;
                            const partnerName = isPlayer1 ? game.player2Name : game.player1Name;

                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <NeonCard className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-2xl border border-pink-500/50">
                                                {dayConfig?.icon || "📅"}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white text-lg">{dayConfig?.title || "Unknown Day"}</h3>
                                                <div className="text-xs text-pink-300 flex items-center gap-2">
                                                    <Calendar size={12} />
                                                    {new Date(game.playedAt).toLocaleDateString()}
                                                    <span className="text-white/30">|</span>
                                                    <span>with {partnerName}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className="text-2xl font-cyber neon-text text-primary">
                                                {game.lovePercentage}%
                                            </div>
                                            <div className="text-xs text-white/50 uppercase tracking-wider">
                                                Love Score
                                            </div>
                                        </div>
                                    </NeonCard>
                                </motion.div>
                            );
                        })}

                        {/* Delete History Button */}
                        <div className="flex justify-center mt-12 pt-8 border-t border-white/10">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button className="flex items-center gap-2 text-red-500/80 hover:text-red-500 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-all text-sm uppercase tracking-widest font-bold">
                                        <Trash2 size={16} /> Delete History
                                    </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-black/90 border border-pink-500/50 neon-border rounded-xl">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-pink-500 font-cyber text-2xl">Delete All History?</AlertDialogTitle>
                                        <AlertDialogDescription className="text-white/80">
                                            This will permanently delete your game history and reset all completed days. This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="bg-transparent text-white border-white/20 hover:bg-white/10">Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDeleteHistory} className="bg-red-600 text-white hover:bg-red-700 border-none">
                                            Yes, Delete Everything
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

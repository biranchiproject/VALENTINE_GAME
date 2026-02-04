import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useRoomState, useSession, useSubmitReview } from "@/hooks/use-game";
import { QUESTIONS } from "@/data/questions";
import { NeonCard } from "@/components/NeonCard";
import { CyberButton } from "@/components/CyberButton";
import { Loader2, Check, X, Heart, Trophy, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function ReviewPartner() {
    const [match, params] = useRoute("/review-partner/:code");
    const roomCode = params?.code;
    const { userName, ensureSession } = useSession();
    const [, setLocation] = useLocation();

    // Data
    const { data: room, isLoading } = useRoomState(roomCode as string);
    const submitReview = useSubmitReview();

    // State
    const [qIndex, setQIndex] = useState(0);
    const [reviews, setReviews] = useState<Record<number, boolean>>({}); // true = correct, false = incorrect
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        ensureSession();
        if (!roomCode) setLocation("/");
    }, [ensureSession, roomCode, setLocation]);

    // Check for next phase
    useEffect(() => {
        if (room?.gameData?.bothReviewed) {
            setLocation(`/day-result/${roomCode}`);
        }
    }, [room?.gameData?.bothReviewed, setLocation, roomCode]);

    if (isLoading || !room) return <div className="h-screen bg-black flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

    // Identify Partner
    const partnerName = room.player1 === userName ? room.player2 : room.player1;
    const allAnswers = room.gameData?.answers || {};
    const partnerAnswers = allAnswers[partnerName || ""];

    if (!partnerAnswers) return <div className="text-white text-center p-10">Waiting for partner's answers...</div>;

    const currentDay = room.day || "rose_day";
    const questions = QUESTIONS[currentDay] || QUESTIONS["rose_day"];
    const currentQ = questions[qIndex];

    console.log("[DEBUG_REVIEW] room.day:", room.day);
    console.log("[DEBUG_REVIEW] currentDay:", currentDay);
    console.log("[DEBUG_REVIEW] questions found:", !!questions);
    console.log("[DEBUG_REVIEW] questions length:", questions?.length);
    console.log("[DEBUG_REVIEW] qIndex:", qIndex);
    console.log("[DEBUG_REVIEW] currentQ:", currentQ);

    if (!currentQ && !isSubmitted) {
        // Fallback or loading state if question is missing but not submitted
        return <div className="text-white text-center p-10">Loading questions...</div>;
    }

    const handleReview = (isCorrect: boolean) => {
        setReviews(prev => ({ ...prev, [currentQ.id]: isCorrect }));
        if (qIndex < questions.length - 1) {
            setTimeout(() => setQIndex(prev => prev + 1), 300); // Small delay for effect
        } else {
            // Show submit button or auto submit? Let's show a "Review Complete" state
        }
    };

    const handleBack = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitted(true);
        try {
            if (roomCode && userName) {
                await submitReview.mutateAsync({
                    roomCode,
                    playerName: userName,
                    reviews
                });
            }
        } catch (error) {
            console.error("Failed to submit review:", error);
            setIsSubmitted(false); // Go back so user can retry
            // Ideally show a toast here, but we'll stick to basic error handling for now
        }
    };

    if (isSubmitted) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center p-4">
                <NeonCard glowColor="pink" className="p-8 text-center max-w-lg w-full">
                    <Heart className="w-20 h-20 text-pink-500 mx-auto mb-4 animate-pulse" fill="currentColor" />
                    <h1 className="text-3xl font-cyber text-white mb-2">Review Submitted!</h1>
                    <p className="text-white/60">Waiting for {partnerName} to finish reviewing...</p>
                </NeonCard>
            </div>
        );
    }

    const progress = ((qIndex + 1) / questions.length) * 100;
    const isFinished = Object.keys(reviews).length === questions.length;

    return (
        <div className="w-full min-h-screen flex flex-col items-center p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-cyber text-primary mb-6 text-center">Review {partnerName}'s Answers</h1>

            {/* Progress Bar */}
            <div className="w-full flex items-center gap-4 mb-8">
                <button
                    onClick={handleBack}
                    disabled={qIndex === 0}
                    className={`p-2 rounded-full border transition-all ${qIndex === 0 ? "opacity-30 cursor-not-allowed border-white/10 text-white/30" : "border-primary text-primary hover:bg-primary/10"}`}
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="flex-grow h-2 bg-white/10 rounded-full">
                    <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
            </div>

            <div className="w-full relative min-h-[400px]">
                {/* Finished State before Submit */}
                {isFinished && qIndex === questions.length - 1 && reviews[currentQ.id] !== undefined ? (
                    <NeonCard className="flex flex-col items-center justify-center p-8">
                        {isSubmitted ? (
                            <>
                                <Loader2 className="w-16 h-16 text-pink-500 mb-4 animate-spin" />
                                <h2 className="text-2xl text-white font-bold mb-4">Waiting for Partner...</h2>
                                <p className="text-gray-400 mb-8 text-center">Results will appear automatically!</p>
                            </>
                        ) : (
                            <>
                                <Trophy className="w-16 h-16 text-yellow-500 mb-4" />
                                <h2 className="text-2xl text-white font-bold mb-4">All Reviewed!</h2>
                                <p className="text-gray-400 mb-8 text-center">Ready to see your compatibility score?</p>
                                <CyberButton onClick={handleSubmit} className="w-full">
                                    Reveal Results
                                </CyberButton>
                            </>
                        )}
                    </NeonCard>
                ) : (
                    /* Question Card */
                    <motion.div
                        key={qIndex}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -50, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <NeonCard className="p-6 md:p-10">
                            <h2 className="text-xl md:text-2xl font-hand text-white text-center mb-8">
                                {currentQ.q}
                            </h2>

                            <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8 text-center">
                                <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                                    {partnerName} answered:
                                </div>
                                <div className="text-2xl font-cyber text-secondary mb-6">
                                    {partnerAnswers[currentQ.id]}
                                </div>

                                {/* Show all options */}
                                <div className="grid grid-cols-1 gap-2 text-left">
                                    {currentQ.options.map((opt) => {
                                        const isSelected = partnerAnswers[currentQ.id] === opt;
                                        return (
                                            <div
                                                key={opt}
                                                className={cn(
                                                    "p-3 rounded-lg border text-sm transition-all",
                                                    isSelected
                                                        ? "bg-primary/20 border-primary text-white"
                                                        : "bg-black/20 border-white/5 text-white/40"
                                                )}
                                            >
                                                {opt} {isSelected && "👈"}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleReview(false)}
                                    className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500 flex flex-col items-center gap-2 transition-all"
                                >
                                    <X className="w-8 h-8" />
                                    <span className="font-bold">WRONG</span>
                                </button>
                                <button
                                    onClick={() => handleReview(true)}
                                    className="p-4 rounded-xl border border-green-500/30 bg-green-500/10 hover:bg-green-500/20 text-green-500 flex flex-col items-center gap-2 transition-all"
                                >
                                    <Check className="w-8 h-8" />
                                    <span className="font-bold">CORRECT</span>
                                </button>
                            </div>
                        </NeonCard>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

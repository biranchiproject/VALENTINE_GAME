import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useRoomState, useSession, useSaveHistory } from "@/hooks/use-game";
import { useSubmitScore } from "@/hooks/use-leaderboard";
import { QUESTIONS } from "@/data/questions";
import { NeonCard } from "@/components/NeonCard";
import { NeonHeartDisplay } from "@/components/NeonHeartDisplay";
import { Leaderboard } from "@/components/Leaderboard";
import { CyberButton } from "@/components/CyberButton";
import { Loader2, Heart, Share2 } from "lucide-react";
import { motion } from "framer-motion";

export default function DayResult() {
    const [match, params] = useRoute("/day-result/:code");
    const roomCode = params?.code;
    const { userName, ensureSession } = useSession();
    const [, setLocation] = useLocation();

    // State
    const [score, setScore] = useState(0);
    const [hasSaved, setHasSaved] = useState(false);

    // Data
    const { data: room, isLoading } = useRoomState(roomCode as string);
    const { mutate: saveHistory } = useSaveHistory();
    const { mutate: submitScore } = useSubmitScore();

    useEffect(() => {
        ensureSession();
        if (!roomCode) setLocation("/");
    }, [ensureSession, roomCode, setLocation]);

    useEffect(() => {
        if (room?.gameData && !hasSaved) {
            calculateScore();
        }
    }, [room, userName, hasSaved]);

    const calculateScore = () => {
        if (!room || !room.gameData) return;

        const p1 = room.player1;
        const p2 = room.player2;

        if (!p1 || !p2) return;

        // Calculate based on reviews
        const myReviews = room.gameData.reviews?.[userName || ""] || {};
        const partnerReviews = room.gameData.reviews?.[userName === p1 ? p2 : p1] || {};

        let totalPoints = 0;
        const currentDay = room.day || "rose_day";
        const questions = QUESTIONS[currentDay] || QUESTIONS["rose_day"];
        const totalQuestions = questions.length;

        // Assuming reviews are boolean true/false for "Correctness" or "Agreement"
        Object.values(myReviews).forEach(r => { if (r) totalPoints += 5; });
        Object.values(partnerReviews).forEach(r => { if (r) totalPoints += 5; });

        // Normalize to 100%
        // Max points = Total Qs * 2 users * 5 points
        const maxPoints = totalQuestions * 2 * 5;
        const percentage = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;

        setScore(percentage);

        // Save to History & Leaderboard (Only once)
        if (!hasSaved && percentage >= 0) {
            console.log("Saving Game History & Leaderboard...");

            // 1. Save History
            saveHistory({
                roomCode: roomCode,
                dayId: currentDay,
                player1Name: p1,
                player2Name: p2,
                finalPercentage: percentage
            });

            // 2. Save Leaderboard Entry
            // TODO: Calculate actual completion time. For now using mock/random or existing timestamp diff if available.
            // In a real app, track startTime in room creation and compare with now.
            const completionTime = Math.floor(Math.random() * 300) + 60; // Mock: 60-360 seconds

            submitScore({
                dayId: currentDay,
                player1Name: p1,
                player2Name: p2,
                lovePercentage: percentage,
                completionTime: completionTime
            });

            setHasSaved(true);
        }
    };

    if (isLoading || !room) return <div className="h-screen bg-black flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

    const currentDay = room.day || "rose_day";
    const questions = QUESTIONS[currentDay] || QUESTIONS["rose_day"];

    // Calculate Scores for display (p1Score, p2Score)
    const reviews = room.gameData?.reviews || {};
    const p1 = room.player1;
    const p2 = room.player2 || "Partner";

    const p1Reviews = reviews[p1] || {};
    const p2Reviews = reviews[p2] || {};

    // Assuming p1Score and p2Score are based on how many questions *they* answered correctly,
    // or how many questions *they* reviewed correctly.
    // The previous logic was `Object.values(p1Reviews).filter(Boolean).length;`
    // This implies it's the number of questions p1 reviewed as 'true'.
    // Let's keep this for now, but the `calculateScore` uses a different logic for `totalPoints`.
    // For consistency, let's make p1Score and p2Score reflect the number of 'correct' reviews *they* gave.
    const p1Score = Object.values(p1Reviews).filter(Boolean).length;
    const p2Score = Object.values(p2Reviews).filter(Boolean).length;

    const totalQuestions = questions.length; // Use the dynamically fetched questions length
    const percentage = score; // Use the calculated score from state

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-black">
            {/* Floating Hearts Background */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-primary/20"
                        initial={{
                            top: "100%",
                            left: `${Math.random() * 100}%`,
                            scale: 0.5 + Math.random(),
                            opacity: 0
                        }}
                        animate={{
                            top: "-10%",
                            opacity: [0, 1, 0],
                            rotate: Math.random() * 360
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 10
                        }}
                    >
                        <Heart size={20 + Math.random() * 30} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            <NeonCard glowColor="pink" className="relative z-10 w-full max-w-lg text-center p-8 border-pink-500/50">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl md:text-4xl font-hand text-pink-500 mb-6 capitalize drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">
                        Happy {currentDay.replace('_', ' ')}! 🌹
                    </h1>

                    <div className="flex justify-between items-center mb-8 px-4">
                        <div className="text-center">
                            <h3 className="font-cyber text-secondary text-lg mb-1">{p1}</h3>
                            <div className="text-xs text-pink-400/70 uppercase tracking-widest">Player 1</div>
                        </div>

                        <div className="text-center">
                            <h3 className="font-cyber text-secondary text-lg mb-1">{p2}</h3>
                            <div className="text-xs text-pink-400/70 uppercase tracking-widest">Player 2</div>
                        </div>
                    </div>

                    {/* Heart Progress */}
                    <NeonHeartDisplay percentage={percentage} />

                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-8 backdrop-blur-sm">
                        <p className="text-pink-200 font-hand text-xl">
                            {percentage === 100 ? "Perfect Match! 💑" :
                                percentage >= 80 ? "Deeply in Love! 💖" :
                                    percentage >= 50 ? "Growing Stronger! 🌱" : "Sparking New Love! ✨"}
                        </p>
                    </div>

                    <div className="space-y-3">

                        <CyberButton
                            variant="outline"
                            className="w-full mt-3 animate-neon-border-slow text-pink-500 neon-text border-pink-500 hover:text-pink-300 hover:border-pink-300"
                            onClick={() => setLocation("/catalog")}
                        >
                            Back to Home
                        </CyberButton>
                        <p className="text-xs text-pink-500/50">Next Chapter Unlocks Tomorrow...</p>
                    </div>

                </motion.div>
            </NeonCard>

            {/* Leaderboard Section */}
            <div className="w-full max-w-4xl mt-8">
                <Leaderboard initialDay={currentDay} displayMode="specific" />
            </div>
        </div>
    );
}

import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useRoomState, useSession } from "@/hooks/use-game";
import { QUESTIONS } from "@/data/questions";
import { NeonCard } from "@/components/NeonCard";
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

    // Data
    const { data: room, isLoading } = useRoomState(roomCode as string);

    useEffect(() => {
        ensureSession();
        if (!roomCode) setLocation("/");
    }, [ensureSession, roomCode, setLocation]);

    useEffect(() => {
        if (room?.gameData) {
            calculateScore();
        }
    }, [room, userName]); // Added userName to dependencies as it's used in calculateScore

    const calculateScore = () => {
        if (!room || !room.gameData) return;

        const p1 = room.player1;
        const p2 = room.player2;

        if (!p1 || !p2) return;

        // Calculate based on reviews
        // If I reviewed partner's answer as CORRECT, and Partner reviewed my answer as CORRECT => Match
        // Or simpler: Compare original answers again?
        // The previous logic in ReviewPartner just saved true/false reviews.
        // Let's assume Score = (My Correct Reviews + Partner's Correct Reviews) / Total Reviews

        const myReviews = room.gameData.reviews?.[userName || ""] || {};
        const partnerReviews = room.gameData.reviews?.[userName === p1 ? p2 : p1] || {};

        let totalPoints = 0;
        const currentDay = room.day || "rose_day";
        const questions = QUESTIONS[currentDay] || QUESTIONS["rose_day"];
        const totalQuestions = questions.length;

        Object.values(myReviews).forEach(r => { if (r) totalPoints += 5; });
        Object.values(partnerReviews).forEach(r => { if (r) totalPoints += 5; });

        // Normalize to 100%
        // Max points = Total Qs * 2 users * 5 points
        const maxPoints = totalQuestions * 2 * 5;
        const percentage = Math.round((totalPoints / maxPoints) * 100);

        setScore(percentage);
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
                            <div className="text-xs text-white/50 uppercase tracking-widest">Player 1</div>
                        </div>

                        <div className="text-center">
                            <h3 className="font-cyber text-secondary text-lg mb-1">{p2}</h3>
                            <div className="text-xs text-white/50 uppercase tracking-widest">Player 2</div>
                        </div>
                    </div>

                    {/* Heart Progress */}
                    <div className="relative w-48 h-48 mx-auto mb-8">
                        <Heart className="w-full h-full text-white/10 absolute inset-0" strokeWidth={1} />

                        {/* Filling Heart */}
                        <div className="absolute inset-0 overflow-hidden flex items-end justify-center" style={{ clipPath: "url(#heart-clip)" }}>
                            <motion.div
                                className="w-full bg-gradient-to-t from-pink-600 to-pink-400 absolute bottom-0"
                                initial={{ height: "0%" }}
                                animate={{ height: `${percentage}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                        </div>

                        {/* SVG Clip Path definition (invisible but used above) */}
                        <svg width="0" height="0">
                            <defs>
                                <clipPath id="heart-clip" clipPathUnits="objectBoundingBox">
                                    <path d="M0.5,0.155 C0.65,-0.1 1,-0.1 1,0.35 C1,0.7 0.5,1 0.5,1 C0.5,1 0,0.7 0,0.35 C0,-0.1 0.35,-0.1 0.5,0.155" />
                                </clipPath>
                            </defs>
                        </svg>

                        {/* Percentage Text on top */}
                        <div className="absolute inset-0 flex items-center justify-center pt-4">
                            <span className="text-5xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-mono">
                                {percentage}%
                            </span>
                        </div>
                    </div>

                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-8 backdrop-blur-sm">
                        <p className="text-white/80 font-hand text-xl">
                            {percentage === 100 ? "Perfect Match! 💑" :
                                percentage >= 80 ? "Deeply in Love! 💖" :
                                    percentage >= 50 ? "Growing Stronger! 🌱" : "Sparking New Love! ✨"}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <CyberButton className="w-full bg-pink-600 hover:bg-pink-700 border-pink-400">
                            Share Love <Share2 className="ml-2 w-4 h-4" />
                        </CyberButton>
                        <p className="text-xs text-white/40">Next Chapter Unlocks Tomorrow...</p>
                    </div>

                </motion.div>
            </NeonCard>
        </div>
    );
}

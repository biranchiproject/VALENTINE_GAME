import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useRoomState, useSession, useSubmitAnswer } from "@/hooks/use-game"; // Added useSubmitAnswer
import { QUESTIONS } from "@/data/questions";
import { NeonCard } from "@/components/NeonCard";
import { CyberButton } from "@/components/CyberButton";
import { Loader2, ArrowLeft, Check, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { useLanguage } from "@/hooks/use-language";

export default function GameScreen() {
    const [match, params] = useRoute("/game/:code");
    const roomCode = params?.code;
    const { userName, ensureSession } = useSession();
    const [, setLocation] = useLocation();

    // Language
    const { language } = useLanguage();

    // Game State
    const [qIndex, setQIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Sync State
    const { data: room } = useRoomState(roomCode as string);
    const submitMutation = useSubmitAnswer();

    // Load Questions
    const currentDay = room?.day || "rose_day";
    const questions = QUESTIONS[currentDay] || QUESTIONS["rose_day"]; // Fallback to Rose Day if invalid

    const currentQ = questions[qIndex];

    useEffect(() => {
        ensureSession();
        if (!roomCode) setLocation("/");
    }, [ensureSession, roomCode, setLocation]);

    // Check for both submitted to navigate
    useEffect(() => {
        console.log("Room State Update:", room);
        if (room?.gameData?.bothSubmitted) {
            console.log("Both submitted! Navigating...");
            setLocation(`/review-partner/${roomCode}`);
        }
    }, [room?.gameData?.bothSubmitted, setLocation, roomCode, room]);

    const handleOptionSelect = (opt: string) => {
        setAnswers(prev => ({ ...prev, [currentQ.id]: opt }));
    };

    const handleNext = () => {
        if (qIndex < questions.length - 1) {
            setQIndex(prev => prev + 1);
        } else {
            // Finish & Submit
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        setIsSubmitted(true);
        if (roomCode && userName) {
            await submitMutation.mutateAsync({
                roomCode,
                playerName: userName,
                day: room?.day || "rose_day",
                response: answers
            });
        }
    };

    const score = Object.keys(answers).length * 10;

    if (!roomCode || !userName) return null;

    if (isSubmitted) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center p-4">
                <NeonCard glowColor="purple" className="p-8 text-center max-w-lg w-full">
                    <Heart className="w-20 h-20 text-primary mx-auto mb-4 animate-bounce" fill="currentColor" />
                    <h1 className="text-3xl font-cyber text-white mb-2">Answers Submitted!</h1>
                    <p className="text-white/60 mb-8">Waiting for your partner to finish...</p>

                    <div className="p-4 bg-white/5 rounded-lg border border-white/10 mb-6">
                        <div className="text-sm text-muted-foreground uppercase tracking-widest">Your Contribution</div>
                        <div className="text-4xl font-bold text-secondary font-mono">{score}%</div>
                        <div className="text-xs text-white/40">Love Calculation Pending</div>
                    </div>
                </NeonCard>
            </div>
        );
    }

    if (!currentQ) return <div className="p-10 text-white">Loading Questions...</div>;

    // Get localized text
    const questionText = currentQ.q[language];
    const optionsList = currentQ.options[language];

    return (
        <div className="w-full flex-grow flex flex-col items-center justify-center relative p-4 max-w-2xl mx-auto">

            {/* Progress */}
            <div className="w-full flex justify-between items-center mb-6 text-white/50 px-2">
                <button onClick={() => setLocation('/catalog')}><ArrowLeft className="w-6 h-6 hover:text-white" /></button>
                <span className="font-mono tracking-widest">QUESTION {qIndex + 1} / {questions.length}</span>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={qIndex}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    className="w-full"
                >
                    <NeonCard className="min-h-[400px] flex flex-col justify-center p-6 md:p-10">
                        <h2 className="text-2xl md:text-3xl font-hand text-white text-center mb-10 leading-relaxed">
                            {questionText}
                        </h2>

                        <div className="grid grid-cols-1 gap-4">
                            {optionsList.map((opt) => {
                                const isSelected = answers[currentQ.id] === opt;
                                return (
                                    <button
                                        key={opt}
                                        onClick={() => handleOptionSelect(opt)}
                                        className={cn(
                                            "p-4 rounded-lg border text-left transition-all duration-200 font-cyber tracking-wide text-sm relative overflow-hidden",
                                            isSelected
                                                ? "bg-primary text-white border-primary shadow-[0_0_15px_rgba(255,0,127,0.4)]"
                                                : "bg-black/30 text-white/70 border-white/10 hover:border-primary/50 hover:bg-white/5"
                                        )}
                                    >
                                        <div className="relative z-10 flex justify-between items-center">
                                            {opt}
                                            {isSelected && <Check className="w-4 h-4" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </NeonCard>
                </motion.div>
            </AnimatePresence>

            <div className="w-full flex justify-end mt-8">
                <CyberButton
                    onClick={handleNext}
                    disabled={!answers[currentQ.id]}
                    className="w-1/3"
                >
                    {qIndex === questions.length - 1 ? "Finish" : "Next"}
                </CyberButton>
            </div>
        </div>
    );
}

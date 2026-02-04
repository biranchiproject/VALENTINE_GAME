import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useRoomState, useSession, useSubmitAnswer } from "@/hooks/use-game";
import { NeonCard } from "@/components/NeonCard";
import { CyberButton } from "@/components/CyberButton";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Heart, ArrowLeft, Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// --- GAME LOGIC FOR DAY 1: Rose Day (Choice Match) ---
const QUESTIONS_DAY_1 = [
  { id: 1, q: "What is your idea of a perfect date?", options: ["Candlelight Dinner", "Movie Night", "Long Walk", "Adventure Trip"] },
  { id: 2, q: "Which color rose describes your love?", options: ["Red (Passionate)", "Pink (Sweet)", "White (Pure)", "Yellow (Friendship)"] },
  { id: 3, q: "First thing you noticed about me?", options: ["Eyes", "Smile", "Voice", "Style"] },
];

export default function GameEngine() {
  const [match, params] = useRoute("/game/:day");
  const day = parseInt(params?.day || "1");
  const { code, name } = useSession();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: room, isLoading } = useRoomState(code);
  const submitAnswer = useSubmitAnswer();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if invalid
  useEffect(() => {
    if (!code || !name) setLocation("/");
  }, [code, name, setLocation]);

  const existingAnswer = room?.answers.find(a => a.day === day && a.playerName === name);
  const partnerAnswer = room?.answers.find(a => a.day === day && a.playerName !== name);

  // Celebration Effect
  useEffect(() => {
    if (existingAnswer && partnerAnswer && !sessionStorage.getItem(`celebrated_day_${day}`)) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff007f', '#ff0000', '#ffffff']
      });
      sessionStorage.setItem(`celebrated_day_${day}`, "true");
    }
  }, [existingAnswer, partnerAnswer, day]);

  const handleOptionSelect = (qId: number, option: string) => {
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleNext = () => {
    if (step < QUESTIONS_DAY_1.length - 1) {
      setStep(s => s + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Calculate optimistic score (0 for now, backend or results page calculates real match)
      await submitAnswer.mutateAsync({
        roomCode: code!,
        playerName: name!,
        day,
        response: answers,
      });
      toast({ title: "Answers Sent!", description: "Waiting for partner..." });
    } catch (e) {
      toast({ title: "Error", description: "Failed to submit", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- RENDER STATES ---

  if (isLoading || !room) return <div className="h-screen bg-black flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  // 1. Waiting for Partner (If I submitted but partner hasn't)
  if (existingAnswer && !partnerAnswer) {
    return (
      <div className="w-full flex-grow flex flex-col items-center justify-center p-6 text-center space-y-8">
        <Heart className="w-20 h-20 text-primary animate-pulse" />
        <h2 className="text-3xl font-cyber text-white">Answers Submitted!</h2>
        <p className="text-muted-foreground font-hand text-xl">
          Waiting for {room.players.find(p => p.name !== name)?.name} to complete the game...
        </p>
        <CyberButton variant="outline" onClick={() => setLocation("/game")}>
          Back to Hub
        </CyberButton>
      </div>
    );
  }

  // 2. Results Screen (Both submitted)
  if (existingAnswer && partnerAnswer) {
    // Calculate Score for Day 1
    const p1Resp = existingAnswer.response as Record<string, string>;
    const p2Resp = partnerAnswer.response as Record<string, string>;
    let matches = 0;
    QUESTIONS_DAY_1.forEach(q => {
      if (p1Resp[q.id] === p2Resp[q.id]) matches++;
    });
    const percentage = Math.round((matches / QUESTIONS_DAY_1.length) * 100);

    return (
      <div className="w-full flex-grow flex flex-col items-center p-4">
        <header className="w-full max-w-2xl py-6 flex items-center">
          <button onClick={() => setLocation("/game")} className="text-white hover:text-primary"><ArrowLeft /></button>
          <h1 className="flex-1 text-center font-cyber text-xl text-primary">Results: Day {day}</h1>
        </header>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="text-6xl font-black text-white mb-2">{percentage}%</div>
          <div className="text-primary font-hand text-2xl tracking-widest uppercase">Match Score</div>
        </motion.div>

        <div className="w-full max-w-2xl space-y-4">
          {QUESTIONS_DAY_1.map((q) => {
            const myAns = p1Resp[q.id];
            const theirAns = p2Resp[q.id];
            const isMatch = myAns === theirAns;

            return (
              <NeonCard key={q.id} className={cn("border-l-4", isMatch ? "border-l-green-500" : "border-l-red-500")}>
                <h4 className="text-white mb-4 font-bold">{q.q}</h4>
                <div className="flex justify-between items-center text-sm">
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground uppercase">You</div>
                    <div className="text-primary">{myAns}</div>
                  </div>
                  {isMatch ? <Heart className="text-green-500 fill-green-500 w-6 h-6" /> : <div className="text-red-500 text-xs uppercase">Mismatch</div>}
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground uppercase">Partner</div>
                    <div className="text-secondary">{theirAns}</div>
                  </div>
                </div>
              </NeonCard>
            );
          })}
        </div>

        <CyberButton className="mt-8" onClick={() => setLocation("/game")}>
          Continue Journey
        </CyberButton>
      </div>
    );
  }

  // 3. Gameplay Screen (Day 1 logic - hardcoded for demo, normally dynamic based on 'day')
  const currentQ = QUESTIONS_DAY_1[step];

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center relative overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 h-1 bg-primary transition-all duration-300" style={{ width: `${((step + 1) / QUESTIONS_DAY_1.length) * 100}%` }} />

      <div className="w-full max-w-xl z-10">
        <div className="flex items-center justify-between mb-8 text-white/50">
          <button onClick={() => setLocation("/game")}><ArrowLeft /></button>
          <span className="font-mono">Question {step + 1} / {QUESTIONS_DAY_1.length}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <NeonCard className="min-h-[400px] flex flex-col justify-center">
              <h2 className="text-3xl font-hand text-white text-center mb-12 leading-relaxed">
                {currentQ.q}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {currentQ.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleOptionSelect(currentQ.id, opt)}
                    className={cn(
                      "p-4 rounded-lg border text-left transition-all duration-200 font-cyber tracking-wide text-sm",
                      answers[currentQ.id] === opt
                        ? "bg-primary text-white border-primary shadow-[0_0_15px_rgba(255,0,127,0.4)]"
                        : "bg-black/30 text-white/70 border-white/10 hover:border-primary/50 hover:bg-white/5"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </NeonCard>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-end">
          <CyberButton
            onClick={handleNext}
            disabled={!answers[currentQ.id] || isSubmitting}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : step === QUESTIONS_DAY_1.length - 1 ? "Finish" : "Next"}
          </CyberButton>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useRoomState, useSession, useCancelRoom } from "@/hooks/use-game";
import { useLanguage } from "@/hooks/use-language";
import { NeonCard } from "@/components/NeonCard";
import { CyberButton } from "@/components/CyberButton";
import { Loader2, Heart, Copy, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function Lobby() {
  // Extract roomCode from URL: /lobby/:code
  const [match, params] = useRoute("/lobby/:code");
  const roomCode = params?.code || null;

  const { userName, ensureSession } = useSession();
  const { setLanguage } = useLanguage();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [countdown, setCountdown] = useState<number | null>(null);

  // Poll room state
  const { data: room, isLoading, error } = useRoomState(roomCode);
  const cancelRoom = useCancelRoom();

  useEffect(() => {
    ensureSession();
    if (!roomCode) setLocation("/");
  }, [ensureSession, roomCode, setLocation]);

  // Handle Room Ready & Countdown
  useEffect(() => {
    if (room && room.status === 'ready' && room.player1 && room.player2) {
      if (countdown === null) {
        setCountdown(3);
      }
    }

    // Force sync language
    if (room && room.language) {
      const roomLang = room.language as 'en' | 'hi';
      // We check against localStorage to avoid infinite loops, but setLanguage handles state
      setLanguage(roomLang);
    }
  }, [room, countdown, setLanguage]);

  // Handle Room Cancellation / Auto-Exit
  useEffect(() => {
    if (room && room.status === 'cancelled') {
      const cancelledBy = (room as any).cancelledBy;
      if (cancelledBy && cancelledBy !== userName) {
        toast({
          title: "Room Cancelled 💔",
          description: "Your partner left the room.",
          variant: "destructive"
        });
      }
      // Whether I cancelled it or partner did, redirect to catalog
      setLocation('/catalog');
    }
  }, [room, userName, setLocation, toast]);

  // Countdown Timer
  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Countdown finished -> Go to game
      setLocation(`/game/${roomCode}`);
    }
  }, [countdown, setLocation, roomCode]);

  const copyCode = () => {
    navigator.clipboard.writeText(roomCode || "");
    toast({ title: "Copied!", description: "Share this code with your partner." });
  };

  const handleCancel = async () => {
    if (!roomCode || !userName) return;
    try {
      await cancelRoom.mutateAsync({ roomCode, playerName: userName });
      // The useEffect will handle the redirection
    } catch (e) {
      console.error("Failed to cancel room", e);
      // Force redirect just in case
      setLocation('/catalog');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-primary">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-4 text-white">
        <h2 className="text-2xl">Room Not Found</h2>
        <CyberButton onClick={() => setLocation('/')}>Go Home</CyberButton>
      </div>
    );
  }

  const partnerName = room.player1 === userName ? room.player2 : room.player1;

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center relative p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,0,127,0.1)_0%,_transparent_70%)]" />

      <div className="z-10 w-full max-w-lg text-center space-y-12">

        {/* Header / Countdown Overlay */}
        <div className="space-y-4 min-h-[100px] flex flex-col justify-center items-center">
          <AnimatePresence mode="wait">
            {countdown !== null && countdown > 0 ? (
              <motion.div
                key={countdown}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 1 }}
                exit={{ scale: 2, opacity: 0 }}
                className="text-6xl font-cyber text-primary neon-text"
              >
                {countdown}
              </motion.div>
            ) : (
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="space-y-4"
              >
                <h2 className="text-4xl font-cyber text-white">Waiting for Love...</h2>
                <p className="text-secondary font-hand text-xl tracking-widest">Share the code</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <NeonCard className="flex flex-col items-center gap-6 py-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />

          {/* Room Code */}
          <div
            onClick={copyCode}
            className="text-6xl md:text-7xl font-mono tracking-[0.2em] text-primary font-bold cursor-pointer hover:scale-105 transition-transform flex items-center gap-4 group justify-center"
          >
            {roomCode}
            <Copy className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-white" />
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Room Code</p>

          {/* Players */}
          <div className="flex items-center gap-8 mt-8 w-full justify-center">
            {/* You */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center shadow-[0_0_20px_rgba(255,0,127,0.4)]">
                <span className="text-2xl">😎</span>
              </div>
              <span className="font-cyber text-sm tracking-wider">{userName} (You)</span>
            </div>

            {/* Status Icon */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-[2px] bg-white/10 relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-white to-primary"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <Heart className="w-6 h-6 text-primary animate-pulse" fill="currentColor" />
            </div>

            {/* Partner */}
            <div className="flex flex-col items-center gap-3">
              {partnerName ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 rounded-full border-2 border-secondary bg-secondary/20 flex items-center justify-center shadow-[0_0_20px_rgba(255,0,0,0.4)]"
                >
                  <span className="text-2xl">😍</span>
                </motion.div>
              ) : (
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center animate-pulse">
                  <span className="text-2xl opacity-50">?</span>
                </div>
              )}
              <span className="font-cyber text-sm tracking-wider text-muted-foreground">
                {partnerName || "Waiting..."}
              </span>
            </div>
          </div>

          {/* Connected Message */}
          {room.status === 'ready' && countdown === null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 text-2xl font-cyber text-white bg-primary/20 px-6 py-2 rounded-full animate-bounce"
            >
              Love Connected 💖
            </motion.div>
          )}

          {/* Starting Message */}
          {countdown !== null && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="mt-6 text-xl font-cyber text-primary"
            >
              Game Starting...
            </motion.div>
          )}

        </NeonCard>

        <CyberButton variant="outline" onClick={handleCancel} className="text-xs py-2 px-4 opacity-50 hover:opacity-100">
          <LogOut className="w-4 h-4 mr-2" /> Cancel
        </CyberButton>
      </div>
    </div>
  );
}

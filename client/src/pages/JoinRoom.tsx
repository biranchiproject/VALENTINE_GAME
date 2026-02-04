import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useJoinRoom, useSession } from "@/hooks/use-game";
import { NeonCard } from "@/components/NeonCard";
import { CyberButton } from "@/components/CyberButton";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function JoinRoom() {
    const [roomCode, setRoomCode] = useState("");
    const [, setLocation] = useLocation();
    const { toast } = useToast();
    const { userName, selectedDay, ensureSession } = useSession();

    const { mutate: joinRoom, isPending } = useJoinRoom();

    useEffect(() => {
        ensureSession();
    }, [ensureSession]);

    const handleJoin = () => {
        if (roomCode.length !== 6) {
            return toast({ title: "Invalid Code", description: "Enter 6-digit code", variant: "destructive" });
        }

        if (!userName) return;

        joinRoom({ code: roomCode, name: userName, day: selectedDay || "rose_day" }, {
            onSuccess: () => {
                setLocation(`/lobby/${roomCode}`);
            },
            onError: (error) => {
                toast({
                    title: "Failed to Join",
                    description: error.message,
                    variant: "destructive",
                    duration: 5000
                });
            }
        });
    };

    return (
        <div className="w-full flex-grow flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md"
            >
                <NeonCard glowColor="red" className="p-8">
                    <h3 className="text-2xl text-white mb-8 font-cyber text-center">Join Your Love</h3>

                    <div className="space-y-6">
                        <div>
                            <label className="text-xs uppercase tracking-widest text-secondary/70 mb-2 block">Room Code</label>
                            <Input
                                value={roomCode}
                                onChange={e => setRoomCode(e.target.value.toUpperCase())}
                                maxLength={6}
                                className="bg-black/50 border-secondary/30 text-white text-lg h-14 tracking-[0.5em] text-center uppercase font-mono focus:border-secondary focus:ring-secondary/20"
                                placeholder="000000"
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <CyberButton variant="outline" onClick={() => setLocation('/room-option')} className="flex-1">
                                Back
                            </CyberButton>
                            <CyberButton
                                onClick={handleJoin}
                                variant="secondary"
                                disabled={isPending}
                                className="flex-1"
                            >
                                {isPending ? "Joining..." : "Join Room"}
                            </CyberButton>
                        </div>
                    </div>
                </NeonCard>
            </motion.div>
        </div>
    );
}

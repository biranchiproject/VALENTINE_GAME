import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useCreateRoom, useSession } from "@/hooks/use-game";
import { useLanguage } from "@/hooks/use-language";
import { NeonCard } from "@/components/NeonCard";
import { Loader2, AlertCircle, RefreshCcw } from "lucide-react";
import { CyberButton } from "@/components/CyberButton";
import { motion } from "framer-motion";

export default function CreateRoom() {
    const [, setLocation] = useLocation();
    const { userName, ensureSession } = useSession();

    // Get selected day from storage or default
    const selectedDay = localStorage.getItem('selectedDay') || "rose_day";

    // New React Query mutation hook
    const { mutate: createRoom, isPending, isError, error } = useCreateRoom();

    useEffect(() => {
        ensureSession();
    }, [ensureSession]);

    const { language } = useLanguage();

    // Trigger creation immediately once we have the username
    useEffect(() => {
        if (userName && !isPending && !isError) {
            createRoom({ playerName: userName, day: selectedDay, language }, {
                onSuccess: (code) => {
                    setLocation(`/lobby/${code}`);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userName]);

    if (isError) {
        return (
            <div className="w-full flex-grow flex items-center justify-center p-4">
                <NeonCard glowColor="red" className="p-8 flex flex-col items-center gap-6 text-center">
                    <AlertCircle className="w-16 h-16 text-red-500" />
                    <h2 className="text-2xl text-white font-cyber">Creation Failed</h2>
                    <p className="text-red-200">{error?.message || "Server Error"}</p>
                    <CyberButton onClick={() => window.location.reload()}>
                        <RefreshCcw className="mr-2" /> Retry
                    </CyberButton>
                </NeonCard>
            </div>
        );
    }

    return (
        <div className="w-full flex-grow flex items-center justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <NeonCard glowColor="pink" className="p-12 flex flex-col items-center gap-6">
                    <Loader2 className="w-16 h-16 text-primary animate-spin" />
                    <h2 className="text-2xl font-cyber text-white">Creating Your Love Nest...</h2>
                    <p className="text-muted-foreground">Please wait a moment</p>
                </NeonCard>
            </motion.div>
        </div>
    );
}

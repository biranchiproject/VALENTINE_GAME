import { useLocation } from "wouter";
import { CyberButton } from "@/components/CyberButton";
import { NeonCard } from "@/components/NeonCard";
import { motion } from "framer-motion";
import { Sparkles, Lock } from "lucide-react";

export default function RoomOption() {
    const [, setLocation] = useLocation();

    return (
        <div className="w-full flex-grow flex flex-col items-center justify-center px-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-md"
            >
                <NeonCard glowColor="purple" className="p-8 text-center">
                    <h2 className="text-lg md:text-xl font-cyber mb-6 leading-relaxed text-shimmer tracking-wide">
                        Enjoy the Valentine day with your partner
                    </h2>

                    <div className="flex flex-col gap-6">
                        <CyberButton onClick={() => setLocation('/create')} className="w-full h-16 text-lg md:text-xl whitespace-nowrap">
                            <Sparkles className="mr-3 w-5 h-5 md:w-6 md:h-6" /> CREATE LOVER ROOM
                        </CyberButton>

                        <CyberButton onClick={() => setLocation('/join')} variant="secondary" className="w-full h-16 text-lg md:text-xl whitespace-nowrap">
                            <Lock className="mr-3 w-5 h-5 md:w-6 md:h-6" /> JOIN LOVER ROOM
                        </CyberButton>
                    </div>

                    <div className="mt-8">
                        <button
                            onClick={() => setLocation('/catalog')}
                            className="text-sm text-primary/70 hover:text-primary underline underline-offset-4"
                        >
                            Back to Catalog
                        </button>
                    </div>
                </NeonCard>
            </motion.div>
        </div>
    );
}

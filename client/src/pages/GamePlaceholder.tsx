import { NeonCard } from "@/components/NeonCard";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

export default function GamePlaceholder() {
    const [dayTitle, setDayTitle] = useState("Valentine Game");

    useEffect(() => {
        const storedDay = localStorage.getItem('selectedDay');
        if (storedDay) setDayTitle(storedDay);
    }, []);

    return (
        <div className="w-full flex-grow flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-xl text-center"
            >
                <NeonCard glowColor="purple" className="p-16 flex flex-col items-center gap-8">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <Heart size={100} className="text-primary" fill="currentColor" />
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-cyber neon-text leading-tight">
                        {dayTitle}<br />Coming Soon ❤️
                    </h1>

                    <p className="text-xl text-white/50 font-hand tracking-widest">
                        Prepare your heart for the magic...
                    </p>
                </NeonCard>
            </motion.div>
        </div>
    );
}

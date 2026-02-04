import { useLocation } from "wouter";
import { NeonCard } from "@/components/NeonCard";
import { CyberButton } from "@/components/CyberButton";
import { motion } from "framer-motion";
import { Heart, LogOut } from "lucide-react";
import { useSession } from "@/hooks/use-game";

// Valentine Week Data
const DAYS = [
    { id: 1, date: "Feb 7", title: "Rose Day", icon: "🌹" },
    { id: 2, date: "Feb 8", title: "Propose Day", icon: "💍" },
    { id: 3, date: "Feb 9", title: "Chocolate Day", icon: "🍫" },
    { id: 4, date: "Feb 10", title: "Teddy Day", icon: "🧸" },
    { id: 5, date: "Feb 11", title: "Promise Day", icon: "🤝" },
    { id: 6, date: "Feb 12", title: "Hug Day", icon: "🤗" },
    { id: 7, date: "Feb 13", title: "Kiss Day", icon: "😘" },
    { id: 8, date: "Feb 14", title: "Valentine's Day", icon: "❤️" },
];

export default function Catalog() {
    const [, setLocation] = useLocation();
    const { userName, logout } = useSession();

    const handleSelectDay = (dayId: number) => {
        const dayMap: Record<number, string> = {
            1: "rose_day",
            2: "propose_day",
            3: "chocolate_day",
            4: "teddy_day",
            5: "promise_day",
            6: "hug_day",
            7: "kiss_day",
            8: "valentines_day"
        };
        const selectedDay = dayMap[dayId] || "rose_day";
        localStorage.setItem('selectedDay', selectedDay);
        setLocation("/room-option");
    };

    return (
        <div className="w-full flex-grow flex flex-col items-center pt-8 pb-12 px-4 relative">

            {/* Top Bar with Logout */}
            <div className="w-full max-w-6xl flex justify-between items-center mb-8 px-2">
                <div className="font-cyber text-2xl text-primary animate-pulse">
                    Welcome, <span className="text-white text-3xl">{userName || "Lover"}</span>
                </div>
                <CyberButton
                    onClick={logout}
                    variant="outline"
                    className="px-3 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
                >
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                </CyberButton>
            </div>

            {/* Header */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-10 max-w-2xl"
            >
                <h2 className="text-xl sm:text-2xl md:text-4xl font-cyber neon-text mb-4 text-white p-2 text-center leading-tight">
                    Play Valentine Games and Make Your Valentine Perfect ❤️
                </h2>
            </motion.div>

            {/* Days Grid */}
            <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {DAYS.map((day, idx) => (
                    <motion.div
                        key={day.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => handleSelectDay(day.id)}
                        className="cursor-pointer group"
                    >
                        <NeonCard
                            glowColor={idx === 7 ? "red" : "pink"}
                            className="h-full flex flex-col items-center justify-center p-6 hover:scale-105 transition-transform duration-300 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-0" />

                            <div className="relative z-10 text-center space-y-2">
                                <span className="text-xs font-mono text-primary/70 tracking-widest uppercase block mb-1">
                                    {day.date}
                                </span>
                                <div className="text-4xl md:text-5xl mb-3 transform group-hover:scale-110 transition-transform">
                                    {day.icon}
                                </div>
                                <h3 className="text-xl md:text-2xl font-hand font-bold text-white group-hover:text-primary transition-colors">
                                    {day.title}
                                </h3>

                                <div className="mt-4 pt-4 border-t border-white/10 w-full flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs uppercase tracking-widest text-primary flex items-center gap-2">
                                        Play Now <Heart size={12} fill="currentColor" />
                                    </span>
                                </div>
                            </div>
                        </NeonCard>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

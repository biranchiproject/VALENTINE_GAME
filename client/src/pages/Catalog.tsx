import { useLocation } from "wouter";
import { NeonCard } from "@/components/NeonCard";
import { motion } from "framer-motion";
import { Heart, Lock, CheckCircle, Globe } from "lucide-react";
import { useSession, useUserHistory } from "@/hooks/use-game";
import { ProfileMenu } from "@/components/ProfileMenu";
import { VALENTINE_DAYS, isDayUnlocked } from "@shared/valentineConfig";
import { useToast } from "@/hooks/use-toast";
import { useLanguage, LANGUAGES } from "@/hooks/use-language";
import { Leaderboard } from "@/components/Leaderboard";

export default function Catalog() {
    const [, setLocation] = useLocation();
    const { userName, logout } = useSession();
    const { toast } = useToast();
    const { data: history = [] } = useUserHistory(userName || "");
    const { language, setLanguage } = useLanguage();

    const handleSelectDay = (dayId: string) => {
        if (!isDayUnlocked(dayId)) {
            toast({
                title: "Locked! 🔒",
                description: "This day will unlock on its special date! 💖",
                variant: "destructive"
            });
            return;
        }

        // Check if already played
        const isPlayed = history.some(h => h.dayId === dayId);
        if (isPlayed) {
            toast({
                title: "Already Played! ✅",
                description: "You have already celebrated this day! Check history for details.",
            });
            // Optional: Prevent replay?
            // return; 
            // User requested "Prevent replaying the same day again once completed"
            return;
        }

        localStorage.setItem('selectedDay', dayId);
        setLocation("/room-option");
    };

    return (
        <div className="w-full flex-grow flex flex-col items-center pt-8 pb-12 px-4 relative">

            {/* Top Bar with Profile Menu */}
            <div className="w-full max-w-6xl flex flex-row justify-between items-center mb-8 px-4 relative z-50">
                {/* Profile Menu - Left Side */}
                <ProfileMenu userName={userName || ""} onLogout={logout} />

                {/* Title - Center */}
                <div className="font-cyber text-lg sm:text-2xl md:text-3xl text-primary neon-text tracking-widest text-center flex-grow mx-4">
                    LOVE BOND <span className="text-white">💘</span>
                </div>

                {/* Language Selector - Right Side */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="flex items-center bg-black/40 rounded-full border border-white/10 p-1">
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang.id}
                                onClick={() => setLanguage(lang.id)}
                                className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold transition-all ${language === lang.id
                                    ? "bg-primary text-white shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                                    : "text-white/50 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {lang.label}
                            </button>
                        ))}
                    </div>
                </div>
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
                {VALENTINE_DAYS.map((day, idx) => {
                    const unlocked = isDayUnlocked(day.id);
                    const played = history.some(h => h.dayId === day.id);

                    return (
                        <motion.div
                            key={day.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => handleSelectDay(day.id)}
                            className={`cursor-pointer group relative ${!unlocked ? 'opacity-90' : ''}`}
                        >
                            <NeonCard
                                glowColor={played ? "green" : (idx === 7 ? "red" : "pink")}
                                className="h-full flex flex-col items-center justify-center p-6 hover:scale-105 transition-transform duration-300 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-0" />

                                {played && (
                                    <div className="absolute top-2 right-2 z-20 bg-green-500/20 p-1 rounded-full border border-green-500">
                                        <CheckCircle className="text-green-500 w-5 h-5" />
                                    </div>
                                )}

                                {!unlocked && (
                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center border-2 border-white/10 rounded-xl m-1">
                                        <div className="bg-black/50 p-3 rounded-full border border-white/20 mb-2 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                                            <Lock className="text-white/80 w-8 h-8" />
                                        </div>
                                        <span className="text-xs text-white font-mono text-center px-2 py-1 bg-black/60 rounded">
                                            Unlocks {day.date}
                                        </span>
                                    </div>
                                )}

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

                                    <div className={`mt-4 pt-4 border-t border-white/10 w-full flex justify-center transition-opacity ${played ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                        <span className="text-xs uppercase tracking-widest text-primary flex items-center gap-2">
                                            {played ? (
                                                <span className="text-green-500 font-bold flex items-center gap-2">
                                                    COMPLETED <CheckCircle size={14} />
                                                </span>
                                            ) : unlocked ? (
                                                <>Play Now <Heart size={12} fill="currentColor" /></>
                                            ) : (
                                                <>Locked <Heart size={12} fill="currentColor" /></>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </NeonCard>
                        </motion.div>
                    );
                })}
            </div>

            {/* Leaderboard Section */}
            <Leaderboard displayMode="overall" />
        </div>
    );
}

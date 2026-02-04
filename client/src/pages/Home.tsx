import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { CyberButton } from "@/components/CyberButton";
import { NeonCard } from "@/components/NeonCard";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Home() {
  const [name, setName] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const existingUser = localStorage.getItem('userName');
    if (existingUser) {
      setLocation('/catalog');
    }
  }, [setLocation]);

  const handleStart = () => {
    if (!name.trim()) return toast({ title: "Name required", description: "Please enter your name", variant: "destructive" });

    // Save name to localStorage (new key: userName)
    localStorage.setItem('userName', name.trim());
    setLocation("/catalog");
  };

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background/50 to-transparent z-0 pointer-events-none" />

      {/* Floating Hearts */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/20 pointer-events-none z-0"
          initial={{ y: "100vh", x: Math.random() * 100 + "vw", scale: Math.random() * 0.5 + 0.5 }}
          animate={{ y: "-20vh", rotate: 360 }}
          transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
        >
          <Heart size={Math.random() * 100 + 50} fill="currentColor" />
        </motion.div>
      ))}

      <div className="z-10 w-full max-w-md px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary via-white to-secondary neon-text font-cyber mb-4">
            Make your<br />Valentine ❤️
          </h1>
          <p className="text-xl text-primary/80 font-hand tracking-widest">Enjoy the game with your soul ❤️</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <NeonCard glowColor="pink" className="p-6 md:p-8">
            <h3 className="text-2xl text-white mb-6 font-cyber text-center">Enter your Name</h3>
            <div className="space-y-6">
              <div>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="bg-black/50 border-primary/30 text-white text-lg h-14 focus:border-primary focus:ring-primary/20 text-center"
                  placeholder="Your Name..."
                />
              </div>
              <CyberButton onClick={handleStart} className="w-full text-lg h-14">
                ENJOY VALENTINE ❤️
              </CyberButton>
            </div>
          </NeonCard>
        </motion.div>
      </div>
    </div>
  );
}

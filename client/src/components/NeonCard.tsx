import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function NeonCard({ 
  children, 
  className, 
  glowColor = "pink",
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  glowColor?: "pink" | "red" | "purple";
  delay?: number;
}) {
  const glows = {
    pink: "border-primary/50 shadow-[0_0_15px_-3px_rgba(255,0,127,0.2)] hover:shadow-[0_0_25px_-5px_rgba(255,0,127,0.4)]",
    red: "border-secondary/50 shadow-[0_0_15px_-3px_rgba(255,0,0,0.2)] hover:shadow-[0_0_25px_-5px_rgba(255,0,0,0.4)]",
    purple: "border-accent/50 shadow-[0_0_15px_-3px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_-5px_rgba(168,85,247,0.4)]"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      className={cn(
        "bg-black/40 backdrop-blur-md rounded-xl border p-6 transition-all duration-300",
        glows[glowColor],
        className
      )}
    >
      {children}
    </motion.div>
  );
}

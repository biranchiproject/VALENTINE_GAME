import React from 'react';
import { cn } from "@/lib/utils";

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function CyberButton({ children, className, variant = 'primary', ...props }: CyberButtonProps) {
  const baseClasses = "relative px-8 py-4 font-cyber font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-transparent border-2 border-primary text-primary hover:text-white hover:shadow-[0_0_20px_rgba(255,0,127,0.6)]",
    secondary: "bg-transparent border-2 border-secondary text-secondary hover:text-white hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]",
    outline: "bg-transparent border border-white/20 text-white/70 hover:text-white hover:border-white/50"
  };

  return (
    <button 
      className={cn(baseClasses, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      {variant !== 'outline' && (
        <span className="absolute top-0 left-0 w-0 h-full -z-0 transition-all duration-300 skew-x-[-15deg] group-hover:w-[150%] origin-left bg-current opacity-100" />
      )}
    </button>
  );
}

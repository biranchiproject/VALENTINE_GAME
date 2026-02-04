import { Link } from "wouter";
import { NeonCard } from "@/components/NeonCard";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black p-4">
      <NeonCard className="max-w-md w-full text-center border-red-500/50" glowColor="red">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-4xl font-cyber text-white mb-2">404</h1>
        <p className="text-xl text-white/70 font-hand mb-6">Lost in the void...</p>
        <Link href="/" className="text-primary hover:underline font-cyber tracking-widest">
          Return Home
        </Link>
      </NeonCard>
    </div>
  );
}

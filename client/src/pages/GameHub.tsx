import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { useRoomState, useSession } from "@/hooks/use-game";
import { NeonCard } from "@/components/NeonCard";
import { CyberButton } from "@/components/CyberButton";
import { Heart, Lock, CheckCircle, Calendar, Star } from "lucide-react";
import { format, isBefore, isSameDay, setYear, parse } from "date-fns";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Game Definitions
const GAMES = [
  { day: 1, date: "2024-02-07", title: "Rose Day", type: "Choice Match", color: "text-red-500" },
  { day: 2, date: "2024-02-08", title: "Propose Day", type: "Know Me", color: "text-pink-400" },
  { day: 3, date: "2024-02-09", title: "Chocolate Day", type: "Mood Sync", color: "text-yellow-600" },
  { day: 4, date: "2024-02-10", title: "Teddy Day", type: "Memory", color: "text-amber-300" },
  { day: 5, date: "2024-02-11", title: "Promise Day", type: "Promises", color: "text-blue-400" },
  { day: 6, date: "2024-02-12", title: "Hug Day", type: "Reactions", color: "text-orange-400" },
  { day: 7, date: "2024-02-13", title: "Kiss Day", type: "Priority", color: "text-purple-400" },
  { day: 8, date: "2024-02-14", title: "Valentine's Day", type: "Soul Test", color: "text-primary" },
];

export default function GameHub() {
  const { code, name } = useSession();
  const [, setLocation] = useLocation();
  const { data: room, isLoading } = useRoomState(code);
  const [currentDate] = useState(new Date());

  // Redirect if no session
  useEffect(() => {
    if (!code || !name) setLocation("/");
  }, [code, name, setLocation]);

  const partner = room?.players.find(p => p.name !== name);
  const myAnswers = useMemo(() => room?.answers.filter(a => a.playerName === name) || [], [room, name]);
  const partnerAnswers = useMemo(() => room?.answers.filter(a => a.playerName !== name) || [], [room, name]);

  const getDayStatus = (gameDateStr: string, dayNum: number) => {
    // For demo purposes, we ignore the year and just check month/day vs current date
    // In a real app, use the actual year
    const targetDate = new Date(gameDateStr);
    targetDate.setFullYear(currentDate.getFullYear());

    // Check if locked (in future)
    // NOTE: For testing, uncomment this to unlock all days
    // return "open";

    // Real logic:
    if (isBefore(currentDate, targetDate) && !isSameDay(currentDate, targetDate)) {
      return "locked";
    }

    // Check if played
    const played = myAnswers.some(a => a.day === dayNum);
    if (played) return "completed";

    return "open";
  };

  const calculateTotalScore = () => {
    // Simple score logic: each completed day by BOTH players is worth points?
    // Or just sum the stored scores
    if (!room?.answers) return 0;

    // Sum scores of days where both answered
    let total = 0;
    for (let day = 1; day <= 8; day++) {
      const p1Ans = room.answers.find(a => a.day === day && a.playerName === name);
      const p2Ans = partner ? room.answers.find(a => a.day === day && a.playerName === partner.name) : null;

      if (p1Ans && p2Ans) {
        // Assume score is stored on one of them or calculated
        total += (p1Ans.score || 0);
      }
    }
    return total;
  };

  const score = calculateTotalScore();

  if (isLoading || !room) return null;

  return (
    <div className="w-full flex-grow text-white pb-10">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 p-4 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-muted-foreground uppercase tracking-widest">You</div>
              <div className="font-cyber text-primary font-bold">{name}</div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative">
              <Heart className="w-12 h-12 text-primary animate-pulse" fill={score > 0 ? "currentColor" : "none"} />
              <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-white">
                {score}%
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-left">
              <div className="text-xs text-muted-foreground uppercase tracking-widest">Partner</div>
              <div className="font-cyber text-secondary font-bold">{partner?.name || "..."}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Days Grid */}
      <main className="max-w-4xl mx-auto p-6 space-y-8 mt-8">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-3xl font-cyber neon-text">Valentine's Week</h2>
          <p className="text-muted-foreground font-hand">Unlock your bond one day at a time</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GAMES.map((game, idx) => {
            const status = getDayStatus(game.date, game.day);
            const isCompleted = status === "completed";
            const isLocked = status === "locked";

            // Check if partner completed this day
            const partnerCompleted = partnerAnswers.some(a => a.day === game.day);

            return (
              <motion.div
                key={game.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <NeonCard
                  className={cn(
                    "relative overflow-hidden group transition-all duration-300",
                    isLocked ? "opacity-50 grayscale border-white/5" : "hover:-translate-y-1 cursor-pointer",
                    isCompleted ? "border-green-500/50" : ""
                  )}
                  glowColor={isCompleted ? "purple" : "pink"}
                >
                  {/* Background Date */}
                  <div className="absolute -right-4 -bottom-4 text-8xl font-black text-white/5 font-cyber z-0 group-hover:text-white/10 transition-colors">
                    {game.day}
                  </div>

                  <div className="relative z-10 flex justify-between items-start">
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1 flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(game.date), "MMM d")}
                      </div>
                      <h3 className={cn("text-2xl font-bold font-hand mb-2", game.color)}>{game.title}</h3>
                      <p className="text-sm text-gray-400 font-body">{game.type}</p>
                    </div>

                    <div className="flex flex-col gap-2 items-end">
                      {isLocked ? (
                        <Lock className="w-6 h-6 text-muted-foreground" />
                      ) : isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <Star className="w-6 h-6 text-primary animate-pulse" />
                      )}

                      {/* Partner Status Badge */}
                      {!isLocked && partner && (
                        <div className={cn(
                          "text-[10px] px-2 py-1 rounded-full border",
                          partnerCompleted
                            ? "bg-green-500/10 border-green-500/30 text-green-400"
                            : "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                        )}>
                          {partnerCompleted ? `${partner.name} done` : "Waiting..."}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Overlay */}
                  {!isLocked && (
                    <div
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm z-20"
                      onClick={() => setLocation(`/game/${game.day}`)}
                    >
                      <CyberButton variant="outline" className="scale-90 group-hover:scale-100 transition-transform">
                        {isCompleted ? "View Results" : "Play Now"}
                      </CyberButton>
                    </div>
                  )}
                </NeonCard>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export interface ValentineDay {
    id: string;
    date: string; // MM-DD format
    title: string;
    icon: string;
    description: string;
}

export const VALENTINE_DAYS: ValentineDay[] = [
    { id: "rose_day", date: "FEB-07", title: "Rose Day", icon: "🌹", description: "Express your love with a rose!" },
    { id: "propose_day", date: "FEB-08", title: "Propose Day", icon: "💍", description: "Pop the big question!" },
    { id: "chocolate_day", date: "FEB-09", title: "Chocolate Day", icon: "🍫", description: "Sweeten your bond!" },
    { id: "teddy_day", date: "FEB-10", title: "Teddy Day", icon: "🧸", description: "Cuddles and comfort!" },
    { id: "promise_day", date: "FEB-11", title: "Promise Day", icon: "🤝", description: "Make a promise forever!" },
    { id: "hug_day", date: "FEB-12", title: "Hug Day", icon: "🤗", description: "Warm embrace of love!" },
    { id: "kiss_day", date: "FEB-13", title: "Kiss Day", icon: "😘", description: "Seal it with a kiss!" },
    { id: "valentines_day", date: "FEB-14", title: "Valentine's Day", icon: "💖", description: "The day of love!" }
];

export function isDayUnlocked(dayId: string): boolean {
    const day = VALENTINE_DAYS.find(d => d.id === dayId);
    if (!day) return false;

    // TEMPORARY: Unlocked for testing as per user request
    return true;

    /*
    const current = new Date();
    // Month is 0-indexed in JS (0 = Jan, 1 = Feb)
    const currentMonth = current.getMonth() + 1; // 1-12
    const currentDate = current.getDate();

    const [targetMonthStr, targetDateStr] = day.date.split("-");
    const monthMap: { [key: string]: number } = { "JAN": 1, "FEB": 2, "MAR": 3 };
    const targetMonth = monthMap[targetMonthStr] || parseInt(targetMonthStr);
    const targetDate = parseInt(targetDateStr);

    if (currentMonth > targetMonth) return true;
    if (currentMonth < targetMonth) return false;
    return currentDate >= targetDate;
    */
}

export function getDayConfig(dayId: string) {
    return VALENTINE_DAYS.find(d => d.id === dayId);
}


export interface Question {
    id: number;
    q: string;
    options: string[];
}

export const QUESTIONS: Record<string, Question[]> = {
    "rose_day": [
        { id: 1, q: "🌹 What does your partner love most about you?", options: ["Your smile 😊", "Your care ❤️", "Your honesty 💎", "Your humour 😄"] },
        { id: 2, q: "🌹 If your partner gives you a rose, what does it mean?", options: ["Pure love 💕", "Deep care 🤍", "Friendship 🌼", "Romantic promise 💍"] },
        { id: 3, q: "🌹 Which rose color suits your partner the most?", options: ["Red ❤️", "Pink 💖", "White 🤍", "Yellow 💛"] },
        { id: 4, q: "🌹 What moment made your partner fall for you?", options: ["First chat 💬", "First meet 👀", "Your support 🤝", "Your honesty 💎"] },
        { id: 5, q: "🌹 Your partner thinks your love is like?", options: ["A rose 🌹", "A song 🎶", "A hug 🤗", "A promise 💍"] },
        { id: 6, q: "🌹 How does your partner show love?", options: ["Words 💬", "Actions 🤝", "Time ⏰", "Care ❤️"] },
        { id: 7, q: "🌹 What makes your partner feel special with you?", options: ["Attention 👀", "Trust 🤍", "Support 💪", "Loyalty 🔒"] },
        { id: 8, q: "🌹 Your partner feels safest when?", options: ["Talking to you 💬", "Being with you 🤗", "Trusting you 🤍", "Laughing with you 😄"] },
        { id: 9, q: "🌹 Your partner’s love language is?", options: ["Care ❤️", "Time ⏰", "Touch 🤗", "Words 💬"] },
        { id: 10, q: "🌹 Your partner sees your love as?", options: ["Forever ♾️", "Strong 💪", "Sweet 🍬", "Pure 🤍"] }
    ],
    "propose_day": [
        { id: 1, q: "💍 How would your partner like to be proposed?", options: ["Simple 💖", "Romantic 🌹", "Surprise 🎉", "Private 🤍"] },
        { id: 2, q: "💍 What matters most to your partner in a proposal?", options: ["Honesty 💎", "Love ❤️", "Effort 💪", "Promise 🤞"] },
        { id: 3, q: "💍 Your partner believes love should be?", options: ["Forever ♾️", "Honest 💎", "Supportive 🤝", "Strong 💪"] },
        { id: 4, q: "💍 What makes your partner say YES?", options: ["Trust 🤍", "Care ❤️", "Respect 🙌", "Loyalty 🔒"] },
        { id: 5, q: "💍 Your partner feels loved when you?", options: ["Listen 👂", "Support 🤝", "Protect 🛡️", "Understand 🤍"] },
        { id: 6, q: "💍 What scares your partner in love?", options: ["Lies ❌", "Distance 🌍", "Silence 🤐", "Loss 💔"] },
        { id: 7, q: "💍 What does commitment mean to your partner?", options: ["Trust 🔒", "Time ⏰", "Loyalty 🤍", "Care ❤️"] },
        { id: 8, q: "💍 Your partner wants a relationship that is?", options: ["Peaceful ☁️", "Romantic 🌹", "Strong 💪", "Honest 💎"] },
        { id: 9, q: "💍 What proves love to your partner?", options: ["Actions 🤝", "Words 💬", "Time ⏰", "Support ❤️"] },
        { id: 10, q: "💍 Your partner believes love grows with?", options: ["Trust 🤍", "Time ⏰", "Effort 💪", "Care ❤️"] }
    ],
    "chocolate_day": [
        { id: 1, q: "🍫 What kind of sweetness does your partner love?", options: ["Chocolate 🍫", "Care ❤️", "Words 💬", "Moments 📸"] },
        { id: 2, q: "🍫 Your partner feels happiest when?", options: ["Surprised 🎁", "Understood 🤍", "Loved ❤️", "Listened 👂"] },
        { id: 3, q: "🍫 What sweet habit of yours does your partner like?", options: ["Smiling 😊", "Caring ❤️", "Helping 🤝", "Laughing 😄"] },
        { id: 4, q: "🍫 Your partner sees love as?", options: ["Sweet 🍬", "Warm 🔥", "Comforting 🤗", "Safe 🤍"] },
        { id: 5, q: "🍫 What melts your partner’s heart?", options: ["Care ❤️", "Time ⏰", "Support 💪", "Honesty 💎"] },
        { id: 6, q: "🍫 Your partner loves sharing?", options: ["Feelings 💬", "Food 🍕", "Time ⏰", "Memories 📸"] },
        { id: 7, q: "🍫 What cheers your partner instantly?", options: ["Your message 💌", "Your smile 😊", "Your call 📞", "Your support 🤝"] },
        { id: 8, q: "🍫 Love feels sweeter to your partner when?", options: ["You care ❤️", "You listen 👂", "You stay 🤍", "You support 💪"] },
        { id: 9, q: "🍫 Your partner values sweetness in?", options: ["Behavior 😊", "Words 💬", "Actions 🤝", "Intentions 🤍"] },
        { id: 10, q: "🍫 What keeps love fresh for your partner?", options: ["Effort 💪", "Care ❤️", "Trust 🤍", "Fun 😄"] }
    ],
    "teddy_day": [
        { id: 1, q: "🧸 What makes your partner feel comforted?", options: ["Your hug 🤗", "Your words 💬", "Your presence 🤍", "Your care ❤️"] },
        { id: 2, q: "🧸 Your partner feels safe when you?", options: ["Stay close 🤍", "Listen 👂", "Support 🤝", "Protect 🛡️"] },
        { id: 3, q: "🧸 What does your partner need most from you?", options: ["Care ❤️", "Time ⏰", "Trust 🤍", "Understanding 🫶"] },
        { id: 4, q: "🧸 Your partner sees you as?", options: ["Support 🤝", "Comfort 🤗", "Strength 💪", "Home 🏠"] },
        { id: 5, q: "🧸 What calms your partner?", options: ["Your voice 🎧", "Your words 💬", "Your presence 🤍", "Your care ❤️"] },
        { id: 6, q: "🧸 Your partner loves when you?", options: ["Understand 🤍", "Support 🤝", "Care ❤️", "Stay 💕"] },
        { id: 7, q: "🧸 What does your partner trust you for?", options: ["Honesty 💎", "Support 🤝", "Care ❤️", "Loyalty 🔒"] },
        { id: 8, q: "🧸 Your partner feels relaxed when?", options: ["Talking 💬", "Laughing 😄", "Sitting together 🤍", "Sharing feelings 🫶"] },
        { id: 9, q: "🧸 What comfort means to your partner?", options: ["Peace ☁️", "Care ❤️", "Trust 🤍", "Love 💕"] },
        { id: 10, q: "🧸 Your partner feels warmth from?", options: ["Your love ❤️", "Your support 🤝", "Your care 🤍", "Your presence 🫶"] }
    ],
    "promise_day": [
        { id: 1, q: "🤝 What promise matters most to your partner?", options: ["Honesty 💎", "Loyalty 🔒", "Support 🤝", "Forever ♾️"] },
        { id: 2, q: "🤝 Your partner trusts you to always?", options: ["Be honest 💬", "Stay loyal 🔒", "Care ❤️", "Support 🤍"] },
        { id: 3, q: "🤝 What promise makes your partner feel safe?", options: ["Never lie ❌", "Never leave 🤍", "Always listen 👂", "Always care ❤️"] },
        { id: 4, q: "🤝 Your partner believes promises should be?", options: ["Kept 🤞", "Proved 💪", "Respected 🙌", "Felt ❤️"] },
        { id: 5, q: "🤝 What breaks trust for your partner?", options: ["Lies ❌", "Ignoring 🚫", "Broken promises 💔", "Silence 🤐"] },
        { id: 6, q: "🤝 Your partner values commitment as?", options: ["Actions 🤝", "Time ⏰", "Care ❤️", "Loyalty 🔒"] },
        { id: 7, q: "🤝 What promise shows true love to your partner?", options: ["Standing together 🤍", "Never giving up 💪", "Being honest 💎", "Always caring ❤️"] },
        { id: 8, q: "🤝 Your partner feels secure when you?", options: ["Keep promises 🤞", "Support 🤝", "Understand 🤍", "Respect 🙌"] },
        { id: 9, q: "🤝 What promise strengthens love?", options: ["Trust 🔒", "Care ❤️", "Time ⏰", "Effort 💪"] },
        { id: 10, q: "🤝 Your partner believes love lasts with?", options: ["Promises 🤞", "Trust 🤍", "Effort 💪", "Care ❤️"] }
    ],
    "hug_day": [
        { id: 1, q: "🧸 What makes your partner feel comforted?", options: ["Your hug 🤗", "Your words 💬", "Your presence 🤍", "Your care ❤️"] },
        { id: 2, q: "🧸 Your partner feels safe when you?", options: ["Stay close 🤍", "Listen 👂", "Support 🤝", "Protect 🛡️"] },
        { id: 3, q: "🧸 What does your partner need most from you?", options: ["Care ❤️", "Time ⏰", "Trust 🤍", "Understanding 🫶"] },
        { id: 4, q: "🧸 Your partner sees you as?", options: ["Support 🤝", "Comfort 🤗", "Strength 💪", "Home 🏠"] },
        { id: 5, q: "🧸 What calms your partner?", options: ["Your voice 🎧", "Your words 💬", "Your presence 🤍", "Your care ❤️"] },
        { id: 6, q: "🧸 Your partner loves when you?", options: ["Understand 🤍", "Support 🤝", "Care ❤️", "Stay 💕"] },
        { id: 7, q: "🧸 What does your partner trust you for?", options: ["Honesty 💎", "Support 🤝", "Care ❤️", "Loyalty 🔒"] },
        { id: 8, q: "🧸 Your partner feels relaxed when?", options: ["Talking 💬", "Laughing 😄", "Sitting together 🤍", "Sharing feelings 🫶"] },
        { id: 9, q: "🧸 What comfort means to your partner?", options: ["Peace ☁️", "Care ❤️", "Trust 🤍", "Love 💕"] },
        { id: 10, q: "🧸 Your partner feels warmth from?", options: ["Your love ❤️", "Your support 🤝", "Your care 🤍", "Your presence 🫶"] }
    ],
    "kiss_day": [
        { id: 1, q: "😘 What does a kiss mean to your partner?", options: ["Love ❤️", "Trust 🤍", "Connection 🔗", "Care 🫶"] },
        { id: 2, q: "😘 Your partner feels closest when you?", options: ["Kiss 😘", "Hug 🤗", "Talk 💬", "Stay 🤍"] },
        { id: 3, q: "😘 What makes a kiss special for your partner?", options: ["Emotion ❤️", "Trust 🤍", "Moment ⏰", "Love 💕"] },
        { id: 4, q: "😘 Your partner believes kisses should be?", options: ["Meaningful 💖", "Honest 💎", "Warm 🤍", "Respectful 🙌"] },
        { id: 5, q: "😘 What emotion your partner feels after a kiss?", options: ["Loved ❤️", "Safe 🤍", "Happy 😊", "Connected 🔗"] },
        { id: 6, q: "😘 A kiss from you makes your partner feel?", options: ["Special ✨", "Loved ❤️", "Secure 🔒", "Happy 😊"] },
        { id: 7, q: "😘 Your partner thinks kisses express?", options: ["Care ❤️", "Trust 🤍", "Love 💕", "Bond 🔗"] },
        { id: 8, q: "😘 What makes a kiss perfect?", options: ["Feeling ❤️", "Timing ⏰", "Trust 🤍", "Love 💕"] },
        { id: 9, q: "😘 Your partner values a kiss that is?", options: ["Genuine 💎", "Warm 🤍", "Romantic 🌹", "Meaningful 💖"] },
        { id: 10, q: "😘 A kiss reminds your partner of?", options: ["Love ❤️", "Bond 🔗", "Trust 🤍", "Togetherness 🫶"] }
    ],
    "valentines_day": [
        { id: 1, q: "💖 What does Valentine’s Day mean to your partner?", options: ["Love ❤️", "Togetherness 🫶", "Care 🤍", "Bond 🔗"] },
        { id: 2, q: "💖 Your partner feels most loved when you?", options: ["Care ❤️", "Listen 👂", "Support 🤝", "Stay 🤍"] },
        { id: 3, q: "💖 What makes this day special for your partner?", options: ["Time together ⏰", "Honesty 💎", "Love ❤️", "Effort 💪"] },
        { id: 4, q: "💖 Your partner believes true love is?", options: ["Honest 💎", "Loyal 🔒", "Caring ❤️", "Forever ♾️"] },
        { id: 5, q: "💖 What strengthens your bond the most?", options: ["Trust 🤍", "Care ❤️", "Time ⏰", "Support 🤝"] },
        { id: 6, q: "💖 Your partner feels happiest when you?", options: ["Understand 🤍", "Care ❤️", "Stay 🫶", "Support 🤝"] },
        { id: 7, q: "💖 Love to your partner means?", options: ["Respect 🙌", "Trust 🤍", "Care ❤️", "Togetherness 🫶"] },
        { id: 8, q: "💖 Your partner feels secure when you?", options: ["Stay 🤍", "Listen 👂", "Care ❤️", "Protect 🛡️"] },
        { id: 9, q: "💖 What makes your partner proud of you?", options: ["Honesty 💎", "Support 🤝", "Care ❤️", "Loyalty 🔒"] },
        { id: 10, q: "💖 Your partner believes love grows with?", options: ["Time ⏰", "Trust 🤍", "Care ❤️", "Effort 💪"] }
    ]
};

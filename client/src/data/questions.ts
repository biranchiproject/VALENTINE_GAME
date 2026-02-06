export interface Question {
    id: number;
    q: {
        en: string;
        hi: string;
    };
    options: {
        en: string[];
        hi: string[];
    };
}

export const QUESTIONS: Record<string, Question[]> = {
    rose_day: [
        {
            id: 1,
            q: { en: "🌹 What does your partner love most about you?", hi: "🌹 Aapke partner ko aapmein sabse zyada kya pasand hai?" },
            options: {
                en: ["Your smile 😊", "Your care ❤️", "Your honesty 💎", "Your humour 😄"],
                hi: ["Aapki smile 😊", "Aapka care ❤️", "Aapki honesty 💎", "Aapka humour 😄"]
            }
        },
        {
            id: 2,
            q: { en: "🌹 Which colored rose matches your partner's vibe?", hi: "🌹 Aapke partner ka vibe kis rang ke rose se match karta hai?" },
            options: {
                en: ["Red (Passionate) 🔥", "Pink (Sweet) 🌸", "White (Peaceful) 🕊️", "Yellow (Friendly) 💛"],
                hi: ["Red (Passionate) 🔥", "Pink (Sweet) 🌸", "White (Peaceful) 🕊️", "Yellow (Friendly) 💛"]
            }
        },
        {
            id: 3,
            q: { en: "🌹 If you could give them a bouquet, what happens next?", hi: "🌹 Agar aap unhein bouquet de, toh next kya hoga?" },
            options: {
                en: ["A tight hug 🫂", "A sweet kiss 💋", "They shy away 🙈", "They dance 💃"],
                hi: ["Ek tight hug 🫂", "Ek sweet kiss 💋", "Woh sharma jayenge 🙈", "Woh dance karenge 💃"]
            }
        },
        {
            id: 4,
            q: { en: "🌹 What’s your partner’s reaction to a surprise rose?", hi: "🌹 Surprise rose milne par partner ka reaction kya hoga?" },
            options: {
                en: ["Blushing 😊", "Shocked 😲", "Emotional 🥹", "Laughing 😆"],
                hi: ["Sharma jayenge 😊", "Shock ho jayenge 😲", "Emotional 🥹", "Hasne lagenge 😆"]
            }
        },
        {
            id: 5,
            q: { en: "🌹 Where would you leave a rose for them?", hi: "🌹 Aap unke liye rose kahan rakhenge?" },
            options: {
                en: ["On their pillow 🛏️", "In their bag 🎒", "Hand deliver it 🤲", "At their workplace 🏢"],
                hi: ["Unke pillow par 🛏️", "Unke bag mein 🎒", "Khud denge 🤲", "Workplace par 🏢"]
            }
        },
        {
            id: 6,
            q: { en: "🌹 How matches their personality?", hi: "🌹 Unki personality kaisi hai?" },
            options: {
                en: ["Wild Rose 🥀", "Classic Red 🌹", "Cute Pink 🌷", "Rare Blue 💙"],
                hi: ["Wild Rose 🥀", "Classic Red 🌹", "Cute Pink 🌷", "Rare Blue 💙"]
            }
        },
        {
            id: 7,
            q: { en: "🌹 What song fits your love story?", hi: "🌹 Aapki love story par kaunsa gaana fit hota hai?" },
            options: {
                en: ["Romantic Slow Jam 🎵", "Upbeat Pop 🕺", "Classic Oldie 📻", "Indie Acoustic 🎸"],
                hi: ["Romantic Slow Jam 🎵", "Upbeat Pop 🕺", "Classic Oldie 📻", "Indie Acoustic 🎸"]
            }
        },
        {
            id: 8,
            q: { en: "🌹 If they were a flower, they would be...", hi: "🌹 Agar woh phool hote toh kya hote..." },
            options: {
                en: ["Rose (Love) 🌹", "Sunflower (Joy) 🌻", "Lily (Pure) 💮", "Tulip (Sweet) 🌷"],
                hi: ["Rose (Love) 🌹", "Sunflower (Joy) 🌻", "Lily (Pure) 💮", "Tulip (Sweet) 🌷"]
            }
        },
        {
            id: 9,
            q: { en: "🌹 Best time to give them a rose?", hi: "🌹 Unhein rose dene ka best time?" },
            options: {
                en: ["Morning Surprise ☀️", "Date Night 🌙", "Random Moment 🎁", "After Fight 🥺"],
                hi: ["Subah Surprise ☀️", "Date Night 🌙", "Random Moment 🎁", "Jhagde ke baad 🥺"]
            }
        },
        {
            id: 10,
            q: { en: "🌹 How many roses imply 'Forever'?", hi: "🌹 Kitne roses ka matlab 'Hamesha' hai?" },
            options: {
                en: ["Just One 🌹", "A Dozen 💐", "100 Roses! 🤩", "A Garden 🏡"],
                hi: ["Sirf Ek 🌹", "Ek Dozen 💐", "100 Roses! 🤩", "Pura Garden 🏡"]
            }
        }
    ],
    propose_day: [
        {
            id: 11,
            q: { en: "💍 How would your partner want to be proposed to?", hi: "💍 Aapke partner kaise propose hona chahenge?" },
            options: {
                en: ["Grand Public Gesture 🎆", "Private & Cozy 🕯️", "On an Adventure 🏔️", "Simple & Sweet 💌"],
                hi: ["Sabke saamne 🎆", "Private mein 🕯️", "Adventure par 🏔️", "Simple & Sweet 💌"]
            }
        },
        {
            id: 12,
            q: { en: "💍 What's their dream ring style?", hi: "💍 Unka dream ring style kya hai?" },
            options: {
                en: ["Classic Diamond 💎", "Vintage Gold ✨", "Modern Silver 💍", "Something Unique 🦄"],
                hi: ["Classic Diamond 💎", "Vintage Gold ✨", "Modern Silver 💍", "Kuch Unique 🦄"]
            }
        },
        {
            id: 13,
            q: { en: "💍 If you proposed tomorrow, they would...", hi: "💍 Agar kal propose kiya toh woh..." },
            options: {
                en: ["Say YES instantly! 😍", "Cry happy tears 😭", "Faint! 😵", "Ask 'Are you sure?' 🤔"],
                hi: ["Turant HAAN bolenge! 😍", "Khushi se royenge 😭", "Behosh ho jayenge! 😵", "Puchenge 'Pakka?' 🤔"]
            }
        },
        {
            id: 14,
            q: { en: "💍 Best place for a proposal?", hi: "💍 Propose karne ki best jagah?" },
            options: {
                en: ["Beach at Sunset 🌅", "Mountain Top 🏔️", "Fancy Restaurant 🍷", "Where we first met 📍"],
                hi: ["Sunset pe Beach 🌅", "Pahad ke upar 🏔️", "Fancy Restaurant 🍷", "Jahan pehli baar mile 📍"]
            }
        },
        {
            id: 15,
            q: { en: "💍 Who is more likely to propose?", hi: "💍 Propose karne ke chances kiske zyada hain?" },
            options: {
                en: ["Me! 🙋", "Them! 👉", "We'd confirm together 🤝", "Accidental! 😂"],
                hi: ["Main! 🙋", "Woh! 👉", "Saath mein decide karenge 🤝", "Galti se! 😂"]
            }
        },
        {
            id: 16,
            q: { en: "💍 Their reaction to a public proposal?", hi: "💍 Public proposal par unka reaction?" },
            options: {
                en: ["Love it! ❤️", "Hate it! 😠", "Embarrassed but happy 😳", "Run away! 🏃"],
                hi: ["Love it! ❤️", "Bilkul nahi! 😠", "Sharam ayegi par khushi hogi 😳", "Bhaag jayenge! 🏃"]
            }
        },
        {
            id: 17,
            q: { en: "💍 Proposing with food instead of a ring?", hi: "💍 Ring ke badle khane ke saath propose karein?" },
            options: {
                en: ["Pizza! 🍕", "Burger! 🍔", "Chocolate! 🍫", "No, only Ring! 💍"],
                hi: ["Pizza! 🍕", "Burger! 🍔", "Chocolate! 🍫", "Nahi, sirf Ring! 💍"]
            }
        },
        {
            id: 18,
            q: { en: "💍 Phrase they want to hear most?", hi: "💍 Woh kya sunna chahte hain?" },
            options: {
                en: ["I Love You ❤️", "Be Mine Forever ♾️", "You complete me 🧩", "Marry Me? 💍"],
                hi: ["I Love You ❤️", "Hamesha mere raho ♾️", "Tum mujhe pura karte ho 🧩", "Marry Me? 💍"]
            }
        },
        {
            id: 19,
            q: { en: "💍 Knee or no knee?", hi: "💍 Ghutne par baithna hai ya nahi?" },
            options: {
                en: ["Down on one knee! 🧎", "Standing is fine 🧍", "Sitting together 🛋️", "Dancing! 💃"],
                hi: ["Ghutne par! 🧎", "Khade hoke chalega 🧍", "Saath baithke 🛋️", "Dance karte huye! 💃"]
            }
        },
        {
            id: 20,
            q: { en: "💍 Celebrate after yes with...", hi: "💍 Haan ke baad celebration kaise?" },
            options: {
                en: ["Champagne 🥂", "Calling parents 📱", "Quiet cuddle 🫂", "Party! 🎉"],
                hi: ["Champagne 🥂", "Parents ko call 📱", "Shanti se cuddle 🫂", "Party! 🎉"]
            }
        }
    ],
    chocolate_day: [
        {
            id: 21,
            q: { en: "🍫 What is their favorite chocolate?", hi: "🍫 Unki favorite chocolate kaunsi hai?" },
            options: {
                en: ["Dark Chocolate 🌑", "Milk Chocolate 🥛", "White Chocolate 🥥", "Fruit & Nut 🥜"],
                hi: ["Dark Chocolate 🌑", "Milk Chocolate 🥛", "White Chocolate 🥥", "Fruit & Nut 🥜"]
            }
        },
        {
            id: 22,
            q: { en: "🍫 Sharing food: Yes or No?", hi: "🍫 Khana share karna: Yes ya No?" },
            options: {
                en: ["Always share! 🍰", "Only if asked 😒", "NEVER! Joey doesn't share! 🦁", "Last bite is mine 😋"],
                hi: ["Hamesha! 🍰", "Pucha toh denge 😒", "KABHI NAHI! 🦁", "Last bite mera hai 😋"]
            }
        },
        {
            id: 23,
            q: { en: "🍫 If they were a dessert, they'd be...", hi: "🍫 Agar woh dessert hote, toh kya hote?" },
            options: {
                en: ["Spicy Lava Cake 🌋", "Sweet Cupcake 🧁", "Cool Ice Cream 🍦", "Fancy Macaron 🍪"],
                hi: ["Spicy Lava Cake 🌋", "Sweet Cupcake 🧁", "Cool Ice Cream 🍦", "Fancy Macaron 🍪"]
            }
        },
        {
            id: 24,
            q: { en: "🍫 Hot Chocolate or Coffee?", hi: "🍫 Hot Chocolate ya Coffee?" },
            options: {
                en: ["Hot Chocolate ☕", "Coffee 🧉", "Tea please 🍵", "Milkshakes 🥤"],
                hi: ["Hot Chocolate ☕", "Coffee 🧉", "Chai please 🍵", "Milkshakes 🥤"]
            }
        },
        {
            id: 25,
            q: { en: "🍫 Best way to eat chocolate?", hi: "🍫 Chocolate khane ka best tareeka?" },
            options: {
                en: ["Melt in mouth 🤤", "Crunch it fast 🦷", "With ice cream 🍨", "Dip in tea ☕"],
                hi: ["Mooh mein ghulne do 🤤", "Jaldi chaba ke 🦷", "Ice cream ke saath 🍨", "Chai mein dip karke ☕"]
            }
        },
        {
            id: 26,
            q: { en: "🍫 Buying chocolates: Brand matters?", hi: "🍫 Chocolate khareedte waqt brand matter karta hai?" },
            options: {
                en: ["Yes, expensive only 🤑", "No, taste matters 😋", "Whatever is available 🤷", "Homemade is best 👩‍🍳"],
                hi: ["Haan, mehngi wali 🤑", "Nahi, taste matter karta hai 😋", "Jo mile chalega 🤷", "Ghar ki bani best 👩‍🍳"]
            }
        },
        {
            id: 27,
            q: { en: "🍫 Sweet or Savory?", hi: "🍫 Meetha ya Namkeen?" },
            options: {
                en: ["Sweet Tooth 🍭", "Savory Snacks 🍟", "Bit of both ⚖️", "Spicy! 🌶️"],
                hi: ["Meetha 🍭", "Namkeen 🍟", "Dono thoda thoda ⚖️", "Spicy! 🌶️"]
            }
        },
        {
            id: 28,
            q: { en: "🍫 Late night snack craving?", hi: "🍫 Late night kya khana pasand hai?" },
            options: {
                en: ["Chocolate 🍫", "Chips 🥔", "Pizza 🍕", "Ice Cream 🍦"],
                hi: ["Chocolate 🍫", "Chips 🥔", "Pizza 🍕", "Ice Cream 🍦"]
            }
        },
        {
            id: 29,
            q: { en: "🍫 Cooking together?", hi: "🍫 Saath mein cooking?" },
            options: {
                en: ["Fun & Messy! 😂", "Serious Chef Mode 👨‍🍳", "Disaster! 🔥", "Ordering helps 📱"],
                hi: ["Masti aur Gandagi! 😂", "Serious Chef Mode 👨‍🍳", "Tabahi! 🔥", "Order karna behtar 📱"]
            }
        },
        {
            id: 30,
            q: { en: "🍫 Most romantic dessert?", hi: "🍫 Sabse romantic dessert?" },
            options: {
                en: ["Strawberries & Cream 🍓", "Chocolate Fondue 🫕", "Tiramisu 🇮🇹", "Cheesecake 🧀"],
                hi: ["Strawberries & Cream 🍓", "Chocolate Fondue 🫕", "Tiramisu 🇮🇹", "Cheesecake 🧀"]
            }
        }
    ],
    teddy_day: [
        {
            id: 31,
            q: { en: "🧸 Do they still like soft toys?", hi: "🧸 Kya unhein abhi bhi soft toys pasand hain?" },
            options: {
                en: ["Yes, room full of them! 🧸", "Only cute ones 🐻", "Not really 🤷", "Secretly yes 🤫"],
                hi: ["Haan, kamra bhara hai! 🧸", "Sirf cute wale 🐻", "Zyada nahi 🤷", "Chupke se haan 🤫"]
            }
        },
        {
            id: 32,
            q: { en: "🧸 If you were a teddy, you'd be...", hi: "🧸 Agar aap teddy hote, toh kaise hote?" },
            options: {
                en: ["Giant & Fluffy 🐼", "Small & Portable 🐭", "Classic Brown Bear 🐻", "Weird & Funny 🤪"],
                hi: ["Bada aur Fluffy 🐼", "Chota sa 🐭", "Classic Brown Bear 🐻", "Ajeeb aur Funny 🤪"]
            }
        },
        {
            id: 33,
            q: { en: "🧸 Cuddling style?", hi: "🧸 Cuddling style?" },
            options: {
                en: ["Big Spoon 🥄", "Little Spoon 🥄", "Tangled Mess 🥨", "No touching while sleeping 🚫"],
                hi: ["Big Spoon 🥄", "Little Spoon 🥄", "Ulajh ke 🥨", "Sote waqt touch nahi 🚫"]
            }
        },
        {
            id: 34,
            q: { en: "🧸 Comfort item?", hi: "🧸 Comfort item?" },
            options: {
                en: ["Their blanket 🛌", "Old Hoodie 👕", "Stuffed Animal 🧸", "My Hugs 🤗"],
                hi: ["Unka kambal 🛌", "Purani Hoodie 👕", "Teddy 🧸", "Meri Jaffi 🤗"]
            }
        },
        {
            id: 35,
            q: { en: "🧸 Best nickname?", hi: "🧸 Best nickname?" },
            options: {
                en: ["Teddy Bear 🐻", "Baby/Babu 👶", "Love/Jaan ❤️", "Weird embarrassing name 🤡"],
                hi: ["Teddy Bear 🐻", "Baby/Babu 👶", "Jaan ❤️", "Koi ajeeb naam 🤡"]
            }
        },
        {
            id: 36,
            q: { en: "🧸 When they are sad, they need...", hi: "🧸 Jab woh udaas hote hain, unhein chahiye..." },
            options: {
                en: ["A Hug 🫂", "Space 🌌", "Food 🍕", "To vent 🗣️"],
                hi: ["Ek Hug 🫂", "Akela-pan 🌌", "Khana 🍕", "Baat karna 🗣️"]
            }
        },
        {
            id: 37,
            q: { en: "🧸 Sleeping habit?", hi: "🧸 Sone ki aadat?" },
            options: {
                en: ["Hugs a pillow 🛌", "Sprawled out ⭐", "Curled up 🍤", "Steals blankets! 😤"],
                hi: ["Pillow pakad ke 🛌", "Phail ke ⭐", "Simat ke 🍤", "Kambal chura ke! 😤"]
            }
        },
        {
            id: 38,
            q: { en: "🧸 What kind of teddy to gift?", hi: "🧸 Kis type ka teddy gift karein?" },
            options: {
                en: ["Human sized! 🦒", "Holding a heart ❤️", "Singing one 🎶", "Keyring size 🔑"],
                hi: ["Insaan jitna bada! 🦒", "Dil pakda hua ❤️", "Gana gane wala 🎶", "Chota keyring 🔑"]
            }
        },
        {
            id: 39,
            q: { en: "🧸 Are they soft or tough?", hi: "🧸 Woh soft hain ya tough?" },
            options: {
                en: ["Softie inside & out 🍦", "Tough exterior, soft heart 🥥", "Tough cookie 🍪", "Depends on mood 🎭"],
                hi: ["Bilkul Soft 🍦", "Bahar se sakht, dil se soft 🥥", "Sakht launda/laundi 🍪", "Mood pe depend karta hai 🎭"]
            }
        },
        {
            id: 40,
            q: { en: "🧸 Favorite animal?", hi: "🧸 Favorite animal?" },
            options: {
                en: ["Dog 🐕", "Cat 🐈", "Panda 🐼", "Lion 🦁"],
                hi: ["Dog 🐕", "Cat 🐈", "Panda 🐼", "Lion 🦁"]
            }
        }
    ],
    promise_day: [
        {
            id: 41,
            q: { en: "🤞 Most important promise?", hi: "🤞 Sabse zaroori waada?" },
            options: {
                en: ["Always be honest 🤞", "Never go to bed angry 😠", "Share passwords 📱", "Travel together ✈️"],
                hi: ["Sach bolna 🤞", "Gusse mein nahi sona 😠", "Password share karna 📱", "Saath ghumna ✈️"]
            }
        },
        {
            id: 42,
            q: { en: "🤞 Are they good at keeping secrets?", hi: "🤞 Kya woh raaz rakh sakte hain?" },
            options: {
                en: ["Vault locked 🔒", "Tells best friend only 👯", "Spills everything 🌊", "Forgets them 😂"],
                hi: ["Bilkul locked 🔒", "Sirf best friend ko 👯", "Sab bata dete hain 🌊", "Bhool jate hain 😂"]
            }
        },
        {
            id: 43,
            q: { en: "🤞 One promise to make today?", hi: "🤞 Aaj ek waada jo karna chahiye?" },
            options: {
                en: ["Love forever ❤️", "More patience 🧘", "Less phone time 📵", "Cook more often 🍳"],
                hi: ["Hamesha pyar ❤️", "Zyada patience 🧘", "Kam phone use 📵", "Zyada cooking 🍳"]
            }
        },
        {
            id: 44,
            q: { en: "🤞 Deal breaker?", hi: "🤞 Rishta todne wali baat?" },
            options: {
                en: ["Lying 🤥", "Cheating 💔", "Disrespect 👎", "Bad hygiene 🤢"],
                hi: ["Jhooth 🤥", "Dhoka 💔", "Izzat na karna 👎", "Safai na rakhna 🤢"]
            }
        },
        {
            id: 45,
            q: { en: "🤞 Long distance? Can we do it?", hi: "🤞 Long distance? Kar payenge?" },
            options: {
                en: ["Easy peasy 🌍", "Only for a while ⏳", "Hard but worth it 💪", "No way! ❌"],
                hi: ["Aaram se 🌍", "Kuch time ke liye ⏳", "Mushkil par worth it 💪", "Bilkul nahi! ❌"]
            }
        },
        {
            id: 46,
            q: { en: "🤞 Future plans?", hi: "🤞 Future plans?" },
            options: {
                en: ["Go with flow 🌊", "Planned 5 years ahead 📅", "Taking it day by day 🌤️", "Total chaos 🌪️"],
                hi: ["Sab chalta hai 🌊", "5 saal ka plan hai 📅", "Aaj ka socho 🌤️", "Total chaos 🌪️"]
            }
        },
        {
            id: 47,
            q: { en: "🤞 Who apologizes first?", hi: "🤞 Pehle sorry kaun bolta hai?" },
            options: {
                en: ["Me 🙋", "Them 👉", "Whoever is wrong ⚖️", "We just move on 🤷"],
                hi: ["Main 🙋", "Woh 👉", "Jo galat ho ⚖️", "Bas aage badhte hain 🤷"]
            }
        },
        {
            id: 48,
            q: { en: "🤞 Trust level?", hi: "🤞 Bharosa level?" },
            options: {
                en: ["100% Blind Trust 🙈", "Mostly trust 👍", "Check phones sometimes 🕵️", "Jealous type 👀"],
                hi: ["100% Andha Bharosa 🙈", "Zyadatar 👍", "Kabhi phone check 🕵️", "Jalan hoti hai 👀"]
            }
        },
        {
            id: 49,
            q: { en: "🤞 Would they break a promise for pizza?", hi: "🤞 Kya woh pizza ke liye waada todenge?" },
            options: {
                en: ["Yes immediately 🍕", "Maybe... 🤔", "Never! 🛡️", "Depends on topping 🍍"],
                hi: ["Haan turant 🍕", "Shayad... 🤔", "Kabhi nahi! 🛡️", "Topping pe depend karta hai 🍍"]
            }
        },
        {
            id: 50,
            q: { en: "🤞 Pinky promise valid?", hi: "🤞 Pinky promise maante ho?" },
            options: {
                en: ["Legally binding! ⚖️", "Cute gesture 👌", "Childish 👶", "Only for serious things 💼"],
                hi: ["Kanooni taur par! ⚖️", "Cute hai 👌", "Bachpana hai 👶", "Sirf serious baaton ke liye 💼"]
            }
        }
    ],
    hug_day: [
        {
            id: 51,
            q: { en: "🫂 Best type of hug?", hi: "🫂 Best type ki hug?" },
            options: {
                en: ["Bear Hug 🐻", "Side Hug 🚶", "Back Hug 🎒", "Long Squeeze ⏳"],
                hi: ["Bear Hug 🐻", "Side Hug 🚶", "Piche se Hug 🎒", "Lambi waali ⏳"]
            }
        },
        {
            id: 52,
            q: { en: "🫂 How long should a hug last?", hi: "🫂 Hug kitni der honi chahiye?" },
            options: {
                en: ["Quick tap 👋", "Few seconds ⏱️", "Until awkward 🐢", "Forever ♾️"],
                hi: ["Thoda sa 👋", "Kuch seconds ⏱️", "Jab tak awkward na ho 🐢", "Hamesha ♾️"]
            }
        },
        {
            id: 53,
            q: { en: "🫂 Hugs per day required?", hi: "🫂 Din mein kitni hugs chahiye?" },
            options: {
                en: ["Minimum 1 ☝️", "At least 5 🖐️", "Unlimited! ♾️", "Only when sad 😢"],
                hi: ["Kam se kam 1 ☝️", "Kam se kam 5 🖐️", "Unlimited! ♾️", "Sirf jab udaas ho 😢"]
            }
        },
        {
            id: 54,
            q: { en: "🫂 Who is the better hugger?", hi: "🫂 Behtar hug kaun deta hai?" },
            options: {
                en: ["Me! 🤗", "Them! 🥰", "Equal match 🤝", "Neither, we high five 🙏"],
                hi: ["Main! 🤗", "Woh! 🥰", "Barabar 🤝", "Koi nahi, hum high five karte hain 🙏"]
            }
        },
        {
            id: 55,
            q: { en: "🫂 Hugs in public?", hi: "🫂 Public mein hugs?" },
            options: {
                en: ["Yes! PDA alert! 📢", "Small side hug ok 👌", "Maybe... 🤔", "No, keep it private 🏠"],
                hi: ["Haan! Dikha ke! 📢", "Halka sa thik hai 👌", "Shayad... 🤔", "Nahi, private rakho 🏠"]
            }
        },
        {
            id: 56,
            q: { en: "🫂 Smell while hugging?", hi: "🫂 Hug karte waqt khushboo?" },
            options: {
                en: ["Perfume/Cologne ✨", "Fresh Laundry 🧺", "Sweat (Eww) 💦", "Like Home 🏠"],
                hi: ["Scent/Perfume ✨", "Dhule kapde 🧺", "Paseena (Chee) 💦", "Ghar jaisi 🏠"]
            }
        },
        {
            id: 57,
            q: { en: "🫂 Hug when angry?", hi: "🫂 Gusse mein hug?" },
            options: {
                en: ["Fixes everything 🩹", "Don't touch me! ✋", "Reluctant hug 😠", "Angry cuddle 😡"],
                hi: ["Sab thik kar deti hai 🩹", "Chuna mat! ✋", "Zabardasti wali 😠", "Gusse mein cuddle 😡"]
            }
        },
        {
            id: 58,
            q: { en: "🫂 Group hugs?", hi: "🫂 Group hugs?" },
            options: {
                en: ["Love them! 👨‍👩‍👧‍👦", "Only with close friends 👫", "Awkward... 😬", "No thanks 🙅"],
                hi: ["Pasand hai! 👨‍👩‍👧‍👦", "Sirf dosto ke saath 👫", "Ajeeb lagta hai... 😬", "Rehne do 🙅"]
            }
        },
        {
            id: 59,
            q: { en: "🫂 Surprise back hug reaction?", hi: "🫂 Piche se surprise hug reaction?" },
            options: {
                en: ["Melt immediately 🫠", "Scream! 😱", "Elbow reflex 💪", "Lean back 😎"],
                hi: ["Pighal jana 🫠", "Chillana! 😱", "Kohni marna 💪", "Piche jhukna 😎"]
            }
        },
        {
            id: 60,
            q: { en: "🫂 Sleeping hug style?", hi: "🫂 Sote waqt hug style?" },
            options: {
                en: ["Spooning 🥄", "Leg over leg 🦵", "Back to back 🔙", "Separate continents 🗺️"],
                hi: ["Spooning 🥄", "Pair pe pair 🦵", "Piche se piche 🔙", "Alag alag duniya 🗺️"]
            }
        }
    ],
    kiss_day: [
        {
            id: 61,
            q: { en: "💋 Wait for first kiss?", hi: "💋 First kiss ka wait?" },
            options: {
                en: ["First Date ⚡", "Few dates later 🗓️", "Months later 🐢", "Marriage 💍"],
                hi: ["Pehli Date ⚡", "Kuch dates baad 🗓️", "Mahino baad 🐢", "Shaadi 💍"]
            }
        },
        {
            id: 62,
            q: { en: "💋 Best place to be kissed?", hi: "💋 Kiss karne ki best jagah?" },
            options: {
                en: ["Forehead (Sweet) 🥺", "Lips (Classic) 💋", "Cheek (Friendly) 😊", "Hand (Royal) 👑"],
                hi: ["Maatha (Sweet) 🥺", "Honth (Classic) 💋", "Gaal (Friendly) 😊", "Haath (Royal) 👑"]
            }
        },
        {
            id: 63,
            q: { en: "💋 PDA (Public Display of Affection)?", hi: "💋 Sabke saamne pyar dikhana?" },
            options: {
                en: ["Kiss anytime! 😘", "Hand holding only 🤝", "Quick peck ok 😗", "Get a room! 🚫"],
                hi: ["Kabhi bhi kiss! 😘", "Sirf haath pakadna 🤝", "Choti kiss thik hai 😗", "Kamra lelo! 🚫"]
            }
        },
        {
            id: 64,
            q: { en: "💋 Morning breath kiss?", hi: "💋 Subah subah kiss?" },
            options: {
                en: ["Don't care! ❤️", "Brush first! 🪥", "Cheek only 😒", "Eww no! 🤢"],
                hi: ["Farq nahi padta! ❤️", "Pehle brush karo! 🪥", "Sirf gaal pe 😒", "Chee nahi! 🤢"]
            }
        },
        {
            id: 65,
            q: { en: "💋 Eyes open or closed?", hi: "💋 Aankhein khuli ya band?" },
            options: {
                en: ["Closed 😌", "Open 👀", "One eye peeking 🧐", "Glaring 👁️"],
                hi: ["Band 😌", "Khuli 👀", "Ek aankh se dekhna 🧐", "Ghoorna 👁️"]
            }
        },
        {
            id: 66,
            q: { en: "💋 Who initiates more?", hi: "💋 Shuruwat kaun karta hai?" },
            options: {
                en: ["Me mostly 🙋", "Them mostly 👉", "50/50 ⚖️", "Rarely happens 🕸️"],
                hi: ["Main zyadatar 🙋", "Woh zyadatar 👉", "50/50 ⚖️", "Kam hota hai 🕸️"]
            }
        },
        {
            id: 67,
            q: { en: "💋 Makeup/Lipstick on?", hi: "💋 Makeup/Lipstick laga ke?" },
            options: {
                en: ["Love the flavor 💄", "Messy but okay 🖍️", "Prefer natural 🌿", "No sticky gloss! 🍯"],
                hi: ["Flavor pasand hai 💄", "Failta hai par thik hai 🖍️", "Natural pasand hai 🌿", "Chipchipa nahi! 🍯"]
            }
        },
        {
            id: 68,
            q: { en: "💋 Kiss in the rain?", hi: "💋 Baarish mein kiss?" },
            options: {
                en: ["Movie Scene Goal! 🌧️", "Wet & Cold 🥶", "Romantic ❤️", "Messy hair 👎"],
                hi: ["Filmy Scene! 🌧️", "Geela aur Thanda 🥶", "Romantic ❤️", "Baal kharab 👎"]
            }
        },
        {
            id: 69,
            q: { en: "💋 Blowing kisses?", hi: "💋 Hawa mein kiss bhejna?" },
            options: {
                en: ["Cute! 😘", "Cheesy 🧀", "Only when leaving 👋", "Never 😐"],
                hi: ["Cute! 😘", "Cheesy 🧀", "Jaate waqt 👋", "Kabhi nahi 😐"]
            }
        },
        {
            id: 70,
            q: { en: "💋 Forehead kiss meaning?", hi: "💋 Maathe pe kiss ka matlab?" },
            options: {
                en: ["Respect & Care 🛡️", "Friendzone? 👯", "Goodbye 👋", "Blessing 🙏"],
                hi: ["Izzat aur Parwah 🛡️", "Friendzone? 👯", "Bye 👋", "Aashirwad 🙏"]
            }
        }
    ],
    valentines_day: [
        {
            id: 71,
            q: { en: "💘 Ideal Valentine's date?", hi: "💘 Ideal Valentine's date?" },
            options: {
                en: ["Fancy Dinner 🍽️", "Movie & Chill 🍿", "Adventure Trip 🏕️", "Cooking at Home 🍝"],
                hi: ["Fancy Dinner 🍽️", "Movie aur Masti 🍿", "Ghumna firna 🏕️", "Ghar pe khana 🍝"]
            }
        },
        {
            id: 72,
            q: { en: "💘 Dress code?", hi: "💘 Kapde kaise?" },
            options: {
                en: ["Formal & Classy 👔", "Smart Casual 👕", "Matching Outfits! 👯", "Pajamas 🛌"],
                hi: ["Formal & Classy 👔", "Smart Casual 👕", "Matching Kapde! 👯", "Pajama 🛌"]
            }
        },
        {
            id: 73,
            q: { en: "💘 Gifts expectation?", hi: "💘 Gift ki umeed?" },
            options: {
                en: ["Expensive Jewelry 💍", "Handmade Card 💌", "Chocolates/Flowers 🍫", "Presence is enough 🎁"],
                hi: ["Mehngi Jewelry 💍", "Haath se bana Card 💌", "Chocolates/Flowers 🍫", "Bas saath raho 🎁"]
            }
        },
        {
            id: 74,
            q: { en: "💘 Who pays the bill?", hi: "💘 Bill kaun bharega?" },
            options: {
                en: ["Me! 💳", "Them! 💸", "Split it 50/50 ⚖️", "Run away! 🏃"],
                hi: ["Main! 💳", "Woh! 💸", "Adha Adha ⚖️", "Bhaag jayenge! 🏃"]
            }
        },
        {
            id: 75,
            q: { en: "💘 Valentine's Hype?", hi: "💘 Valentine's ka shauk?" },
            options: {
                en: ["Love it! ❤️", "It's commercial 💰", "Just another day 📅", "Pressure! 😰"],
                hi: ["Bahut pasand hai! ❤️", "Bas paise ka khel 💰", "Aam din hai 📅", "Pressure! 😰"]
            }
        },
        {
            id: 76,
            q: { en: "💘 Relationship Status?", hi: "💘 Relationship Status?" },
            options: {
                en: ["Taken 🔒", "It's Complicated 🌀", "Single & Ready 🚀", "Hungry 🍔"],
                hi: ["Taken 🔒", "Ulajha hua 🌀", "Single & Ready 🚀", "Bhukkad 🍔"]
            }
        },
        {
            id: 77,
            q: { en: "💘 Social Media Post?", hi: "💘 Social Media Post?" },
            options: {
                en: ["Long caption + Pics 📸", "Story only 📱", "Private relationship 🤫", "Spam feed! 📢"],
                hi: ["Lamba caption + Pics 📸", "Sirf Story 📱", "Private rakho 🤫", "Pura feed bhar do! 📢"]
            }
        },
        {
            id: 78,
            q: { en: "💘 Love Language?", hi: "💘 Pyar jatane ka tareeka?" },
            options: {
                en: ["Words 📝", "Gifts 🎁", "Touch 🫂", "Quality Time ⏳"],
                hi: ["Baatein 📝", "Tohfe 🎁", "Choona 🫂", "Waqt bitana ⏳"]
            }
        },
        {
            id: 79,
            q: { en: "💘 Perfect ending to the day?", hi: "💘 Din ka perfect end?" },
            options: {
                en: ["Deep talks 🌌", "Cuddling 🧸", "Music & Dance 💃", "Sleep 😴"],
                hi: ["Gehri baatein 🌌", "Cuddling 🧸", "Gana aur Dance 💃", "Sona 😴"]
            }
        },
        {
            id: 80,
            q: { en: "💘 Will you be my Valentine?", hi: "💘 Kya tum mere Valentine banoge?" },
            options: {
                en: ["YES! ❤️", "Maybe... 😉", "Ask nicely! 🌹", "Forever YES! 💍"],
                hi: ["HAAN! ❤️", "Shayad... 😉", "Pyar se pucho! 🌹", "Hamesha HAAN! 💍"]
            }
        }
    ]
};

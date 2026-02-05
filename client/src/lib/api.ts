export const api = {
    async createRoom(playerName: string, day: string) {
        const BASE_URL = import.meta.env.VITE_API_URL || "";
        const res = await fetch(`${BASE_URL}/api/room/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ playerName, day }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    async joinRoom(roomCode: string, playerName: string, day: string) {
        const BASE_URL = import.meta.env.VITE_API_URL || "";
        const res = await fetch(`${BASE_URL}/api/room/join`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roomCode, playerName, day }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    async getRoomState(roomCode: string) {
        const BASE_URL = import.meta.env.VITE_API_URL || "";
        const res = await fetch(`${BASE_URL}/api/room/${roomCode}`);
        if (!res.ok) throw new Error("Failed to fetch room");
        return res.json();
    },

    async submitAnswer(roomCode: string, playerName: string, day: number, response: any) {
        const BASE_URL = import.meta.env.VITE_API_URL || "";
        const res = await fetch(`${BASE_URL}/api/room/submit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roomCode, playerName, day, response }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    async submitReview(roomCode: string, playerName: string, reviews: any) {
        const BASE_URL = import.meta.env.VITE_API_URL || "";
        const res = await fetch(`${BASE_URL}/api/room/review`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roomCode, playerName, reviews }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    async saveHistory(data: any) {
        const BASE_URL = import.meta.env.VITE_API_URL || "";
        const res = await fetch(`${BASE_URL}/api/history`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    async getHistory(username: string) {
        const BASE_URL = import.meta.env.VITE_API_URL || "";
        const res = await fetch(`${BASE_URL}/api/history/${username}`);
        if (!res.ok) throw new Error("Failed to fetch history");
        return res.json();
    },

    async checkHistory(username: string, dayId: string) {
        const BASE_URL = import.meta.env.VITE_API_URL || "";
        const res = await fetch(`${BASE_URL}/api/history/check/${username}/${dayId}`);
        if (!res.ok) throw new Error("Failed to check history");
        return res.json();
    }
};

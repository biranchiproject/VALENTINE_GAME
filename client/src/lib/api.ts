export const api = {
    async createRoom(playerName: string, day: string) {
        const res = await fetch("/api/room/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ playerName, day }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    async joinRoom(roomCode: string, playerName: string, day: string) {
        const res = await fetch("/api/room/join", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roomCode, playerName, day }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    async getRoomState(roomCode: string) {
        const res = await fetch(`/api/room/${roomCode}`);
        if (!res.ok) throw new Error("Failed to fetch room");
        return res.json();
    },

    async submitAnswer(roomCode: string, playerName: string, day: number, response: any) {
        const res = await fetch("/api/room/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roomCode, playerName, day, response }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    async submitReview(roomCode: string, playerName: string, reviews: any) {
        const res = await fetch("/api/room/review", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roomCode, playerName, reviews }),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    }
};

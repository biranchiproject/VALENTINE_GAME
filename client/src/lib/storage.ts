export interface GameHistoryItem {
    roomCode: string;
    dayId: string;
    player1Name: string;
    player2Name: string;
    lovePercentage: number;
    playedAt: string;
}

export interface UserStorageData {
    completedDays: string[];
    history: GameHistoryItem[];
}

const getStorageKey = (username: string) => `lovebond_user_${username.toLowerCase()}`;

export const storage = {
    getUserData(username: string): UserStorageData {
        if (!username) return { completedDays: [], history: [] };

        try {
            const key = getStorageKey(username);
            const data = localStorage.getItem(key);
            if (data) {
                return JSON.parse(data);
            }
        } catch (e) {
            console.error("Failed to load user data", e);
        }

        // Default empty state
        return { completedDays: [], history: [] };
    },

    saveUserData(username: string, data: UserStorageData) {
        if (!username) return;
        try {
            const key = getStorageKey(username);
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error("Failed to save user data", e);
        }
    },

    addHistory(username: string, item: GameHistoryItem) {
        const data = this.getUserData(username);

        // Avoid changing if already exists (though duplicate play logic is handled in hooks/components usually)
        // We'll append.
        data.history.push(item);

        // Update completed days if not present
        if (!data.completedDays.includes(item.dayId)) {
            data.completedDays.push(item.dayId);
        }

        this.saveUserData(username, data);
        return data;
    },

    clearUserData(username: string) {
        if (!username) return;
        const key = getStorageKey(username);
        localStorage.removeItem(key);
    }
};

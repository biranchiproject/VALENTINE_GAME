import { useState, useEffect } from "react";

export type Language = 'en' | 'hi';

export const LANGUAGES: { id: Language; label: string }[] = [
    { id: 'en', label: 'ENG' },
    { id: 'hi', label: 'HINDI' }
];

export function useLanguage() {
    const [language, setLanguage] = useState<Language>(() => {
        const saved = localStorage.getItem("lovebond_language");
        // Validate if saved language is valid, else default to 'en'
        return (saved === "en" || saved === "hi") ? (saved as Language) : "en";
    });

    useEffect(() => {
        localStorage.setItem("lovebond_language", language);
    }, [language]);

    return { language, setLanguage };
}


import { useEffect, useRef } from "react";

export const HeartsBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const createHeart = () => {
            if (!containerRef.current) return;

            const heart = document.createElement("div");
            heart.classList.add("heart-bg");

            // Random properties
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = Math.random() * 5 + 5 + "s"; // 5-10s for slower, smooth float
            heart.style.opacity = (Math.random() * 0.04 + 0.08).toFixed(3); // 0.08 - 0.12
            heart.style.fontSize = Math.random() * 15 + 10 + "px"; // 10-25px (Small to medium)

            heart.innerHTML = "❤";

            containerRef.current.appendChild(heart);

            // Clean up
            setTimeout(() => {
                heart.remove();
            }, 5000);
        };

        const interval = setInterval(createHeart, 300);

        return () => clearInterval(interval);
    }, []);

    return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden" />;
};

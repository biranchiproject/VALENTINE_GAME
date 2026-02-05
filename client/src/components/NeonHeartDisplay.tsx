import React from "react";
import { motion } from "framer-motion";

interface NeonHeartDisplayProps {
    percentage: number;
}

export const NeonHeartDisplay = ({ percentage }: NeonHeartDisplayProps) => {
    // EKG Path Data - a repeating heartbeat pattern
    // M start (flat) -> small bump -> big spike -> dip -> small bump -> flat
    const ekgPath = "M0,50 L20,50 L25,45 L30,55 L35,50 L45,50 L50,20 L55,80 L60,50 L70,50 L75,45 L80,55 L85,50 L100,50";

    // We'll repeat this path multiple times to create a continuous line
    const repeatCount = 4;

    return (
        <div className="relative flex items-center justify-center w-full max-w-3xl mx-auto py-8 overflow-hidden h-64">

            {/* EKG Line Background - flowing right to left (standard monitor) */}
            <div className="absolute inset-0 flex items-center w-full overflow-hidden">
                {/* Gradient Mask for Fade In/Out */}
                <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-black via-transparent to-black" />

                <div className="absolute inset-0 flex items-center">
                    <motion.div
                        className="flex items-center w-[200%] h-full"
                        animate={{ x: ["-50%", "0%"] }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    >
                        {/* Repeat the SVG to fill the scrolling area */}
                        {[...Array(4)].map((_, i) => (
                            <svg key={i} viewBox="0 0 300 100" className="w-full h-40 flex-shrink-0" preserveAspectRatio="none">
                                <defs>
                                    <filter id="glow-filter">
                                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                {/* Realistic EKG Pattern: Flat -> P -> Flat -> QRS -> Flat -> T -> Flat */}
                                <path
                                    d="M0,50 L50,50 L60,45 L70,50 L80,50 L85,55 L90,10 L95,80 L100,50 L110,50 L120,40 L130,50 L200,50"
                                    fill="none"
                                    stroke="#ec4899"
                                    strokeWidth="2"
                                    filter="url(#glow-filter)"
                                    vectorEffect="non-scaling-stroke"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                {/* Extended pattern to fill 300 width better */}
                                <path
                                    d="M150,50 L200,50 L210,45 L220,50 L230,50 L235,55 L240,10 L245,80 L250,50 L260,50 L270,40 L280,50 L300,50"
                                    fill="none"
                                    stroke="#ec4899"
                                    strokeWidth="2"
                                    filter="url(#glow-filter)"
                                    vectorEffect="non-scaling-stroke"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Neon Heart (Centered) */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex-shrink-0 z-10 bg-black/30 backdrop-blur-[2px] rounded-full">
                {/* Glow Filter */}
                <svg className="absolute w-0 h-0">
                    <defs>
                        <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                </svg>

                {/* Heart SVG */}
                <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full drop-shadow-[0_0_15px_rgba(255,20,147,0.8)]"
                    style={{ overflow: "visible" }}
                >
                    {/* Background Heart Path */}
                    <path
                        d="M50 88.9L16.7 55.6C7.2 46.1 7.2 30.9 16.7 21.4s24.7-9.5 33.3 0L50 21.4l0 0 0 0L50 21.4l0 0 0 0L50 21.4l0 0 0 0C58.6 11.9 76.1 11.9 83.3 21.4s9.5 24.7 0 34.2L50 88.9z"
                        fill="#000"
                        stroke="#ff1493"
                        strokeWidth="2"
                        opacity="0.3"
                    />

                    {/* Filling Gradient */}
                    <defs>
                        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#ff0080" />
                            <stop offset="100%" stopColor="#ff1493" />
                        </linearGradient>
                        <clipPath id="fillClip">
                            <rect x="0" y={100 - percentage} width="100" height={percentage} />
                        </clipPath>
                    </defs>

                    {/* Filled Heart */}
                    <path
                        d="M50 88.9L16.7 55.6C7.2 46.1 7.2 30.9 16.7 21.4s24.7-9.5 33.3 0L50 21.4l0 0 0 0L50 21.4l0 0 0 0L50 21.4l0 0 0 0C58.6 11.9 76.1 11.9 83.3 21.4s9.5 24.7 0 34.2L50 88.9z"
                        fill="url(#heartGradient)"
                        stroke="none"
                        clipPath="url(#fillClip)"
                    />

                    {/* Neon Outline */}
                    <motion.path
                        d="M50 88.9L16.7 55.6C7.2 46.1 7.2 30.9 16.7 21.4s24.7-9.5 33.3 0L50 21.4l0 0 0 0L50 21.4l0 0 0 0L50 21.4l0 0 0 0C58.6 11.9 76.1 11.9 83.3 21.4s9.5 24.7 0 34.2L50 88.9z"
                        fill="none"
                        stroke="#ff69b4"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        filter="url(#neon-glow)"
                    />
                </svg>

                {/* Percentage Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                        className="text-4xl sm:text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(255,20,147,1)] font-mono z-10"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                    >
                        {percentage}%
                    </motion.span>
                </div>
            </div>
        </div>
    );
};

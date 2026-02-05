import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Home, LogOut, ChevronDown, Clock } from 'lucide-react';
import { useLocation } from 'wouter';

interface ProfileMenuProps {
    userName: string;
    onLogout: () => void;
}

export const ProfileMenu = ({ userName, onLogout }: ProfileMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [, setLocation] = useLocation();
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleHome = () => {
        setLocation('/catalog');
        setIsOpen(false);
    };

    const handleLogout = () => {
        onLogout();
        setIsOpen(false);
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            {/* Profile Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMenu}
                className="flex items-center gap-2 px-3 py-2 bg-black/40 border border-primary/50 rounded-full hover:bg-primary/20 hover:border-primary transition-colors group"
            >
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center shadow-[0_0_10px_rgba(255,0,127,0.3)] group-hover:shadow-[0_0_15px_rgba(255,0,127,0.5)] transition-shadow">
                    <User className="w-4 h-4 text-primary" />
                </div>
                <span className="hidden sm:block text-white font-cyber text-sm tracking-widest">{userName || "Lover"}</span>
                <ChevronDown className={`w-4 h-4 text-primary/70 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 bg-black/90 border border-primary/30 rounded-xl shadow-[0_0_30px_rgba(255,0,127,0.15)] overflow-hidden z-50 backdrop-blur-md"
                    >
                        <div className="p-4 border-b border-white/10 flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary flex items-center justify-center">
                                <span className="text-xl">😎</span>
                            </div>
                            <div className="text-center">
                                <p className="text-white font-cyber text-sm tracking-wider">{userName || "Lover"}</p>
                                <p className="text-xs text-primary/60 font-mono">Ready for Love</p>
                            </div>
                        </div>

                        <div className="p-2 space-y-1">
                            {/* Home Option */}
                            <button
                                onClick={handleHome}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors group"
                            >
                                <Home className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                                <span className="tracking-wide">Home</span>
                            </button>

                            {/* History Option */}
                            <button
                                onClick={() => { setLocation('/history'); setIsOpen(false); }}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors group"
                            >
                                <Clock className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                                <span className="tracking-wide">History</span>
                            </button>

                            {/* Logout Option */}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-lg transition-colors group"
                            >
                                <LogOut className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                                <span className="tracking-wide">Logout</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

import React, { ReactNode } from "react";
import { HeartsBackground } from "./HeartsBackground";

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col w-full overflow-x-hidden text-foreground relative">
            <HeartsBackground />
            <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col justify-center">
                {children}
            </main>

            {/* Footer removed as per request */}
        </div>
    );
};

'use client';
import { Navbar } from '@/components/Navbar';
import { BackgroundBeams } from '@/components/ui/BackgroundBeams';
import React from 'react';

export default function LandingPage() {
    const content = () => {
        return (
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
                    Share your crypto with just a link
                </h1>
                <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                    Welcome to Plinks, Share your crypto using links
                </p>
            </div>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <Navbar />
            <div className="h-[100vh] w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
                <BackgroundBeams />
                {content()}
            </div>
        </main>
    );
}

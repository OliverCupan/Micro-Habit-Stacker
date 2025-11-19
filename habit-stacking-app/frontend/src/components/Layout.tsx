import React from 'react';
import Link from 'next/link';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/">
                                <h1 className="text-3xl font-bold cursor-pointer hover:text-blue-100 transition-colors">
                                    Micro-Habit Stacker
                                </h1>
                            </Link>
                            <p className="text-blue-100 text-sm mt-1">Build better habits, one stack at a time</p>
                        </div>
                        <nav className="flex gap-6">
                            <Link href="/">
                                <span className="hover:text-blue-100 cursor-pointer transition-colors">Home</span>
                            </Link>
                            <Link href="/habits">
                                <span className="hover:text-blue-100 cursor-pointer transition-colors">My Habits</span>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>
            <main className="flex-grow p-6">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
            <footer className="bg-gray-800 text-white p-6 text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Micro-Habit Stacker - Based on Atomic Habits methodology
                </p>
            </footer>
        </div>
    );
};

export default Layout;
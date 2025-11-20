import React from 'react';
import Link from 'next/link';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <header className="border-b border-gray-200 bg-white">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/">
                                <h1 className="text-xl font-semibold cursor-pointer text-gray-900 hover:text-gray-700 transition-colors">
                                    Habit Stacker
                                </h1>
                            </Link>
                        </div>
                        <nav className="flex gap-1">
                            <Link href="/">
                                <span className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer transition-all duration-200">
                                    Home
                                </span>
                            </Link>
                            <Link href="/habits">
                                <span className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer transition-all duration-200">
                                    My Habits
                                </span>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {children}
                </div>
            </main>
            <footer className="border-t border-gray-200 bg-white py-8">
                <p className="text-sm text-center text-gray-500">
                    &copy; {new Date().getFullYear()} Micro-Habit Stacker · Based on Atomic Habits methodology
                </p>
            </footer>
        </div>
    );
};

export default Layout;
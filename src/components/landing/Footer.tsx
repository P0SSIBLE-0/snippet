"use client";

import Link from "next/link";
import { Code2, Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="dark:bg-zinc-950 bg-white border-t dark:border-zinc-800 border-gray-200">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                            <Code2 className="text-white" size={18} />
                        </div>
                        <span className="font-semibold dark:text-white text-gray-900">
                            Snippets
                        </span>
                    </Link>

                    {/* Copyright */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        © {new Date().getFullYear()} Snippets. Made with
                        <Heart size={14} className="text-red-500 fill-red-500 mx-0.5" />
                        for developers.
                    </p>
                </div>
            </div>
        </footer>
    );
}

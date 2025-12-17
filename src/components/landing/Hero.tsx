"use client";

import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";
import { motion } from "motion/react";
import CodeDemo from "./CodeDemo";

export default function Hero() {
    return (
        <section className="relative pt-20 pb-32 lg:px-40 md:px-2 overflow-hidden dark:bg-zinc-950 bg-white">
            {/* Background gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center gap-2 px-1.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
                                <Code2 size={16} />
                                <span>Developer-First Snippet Manager</span>
                            </div>

                            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.1]">
                                Save, Organize, and Share Code Snippets. <br className="hidden lg:block" />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                                    Instantly.
                                </span>
                            </h1>

                            <p className="text-sm lg:text-xl md:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                Snippets is a fast, secure code snippet manager for developers.
                                Create private or public snippets, search them instantly, and access them anywhere.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <Link href="/signup" className="w-full sm:w-auto">
                                    <button className="w-full sm:w-auto px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-gray-900/20 dark:shadow-white/10">
                                        Get Started Free
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </Link>

                                <Link href="/snippets/public" className="w-full sm:w-auto">
                                    <button className="w-full sm:w-auto px-8 py-4 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-white/10 transition-all border border-transparent dark:border-white/10">
                                        View Demo
                                    </button>
                                </Link>
                            </div>

                            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span>Free Forever for devs</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span>No credit card required</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Visual Content (Code Demo) */}
                    <div className="flex-1 w-full max-w-xl lg:max-w-none flex justify-center lg:justify-end">
                        <div className="relative">
                            {/* Glow behind the editor */}
                            <div className="absolute -inset-4 bg-linear-to-r from-blue-500 to-purple-500 opacity-20 blur-2xl rounded-[30px]" />
                            <CodeDemo />

                            {/* Floating Tags */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-6 -right-6 px-4 py-2 bg-white dark:bg-zinc-800 rounded-lg shadow-xl shadow-black/10 text-sm font-mono text-blue-500 rotate-6 border border-gray-100 dark:border-zinc-700 hidden sm:block"
                            >
                                #react
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-8 -left-8 px-4 py-2 bg-white dark:bg-zinc-800 rounded-lg shadow-xl shadow-black/10 text-sm font-mono text-purple-500 -rotate-3 border border-gray-100 dark:border-zinc-700 hidden sm:block"
                            >
                                #typescript
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

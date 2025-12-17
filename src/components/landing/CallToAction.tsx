"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function CallToAction() {
    return (
        <section className="py-24 relative overflow-hidden dark:bg-zinc-950 bg-white border-t dark:border-zinc-800 border-gray-100">

            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-6 tracking-tight">
                        Start Organizing Your Code Today.
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
                        Create your first snippet in under a minute. No credit card required.
                    </p>

                    <Link href="/signup">
                        <button className="px-10 py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                            Get Started Free
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

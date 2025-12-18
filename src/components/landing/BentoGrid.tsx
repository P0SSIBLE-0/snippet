"use client";
import { motion } from "motion/react";

import { Folder, Globe, Search, Code, Shield, Smartphone, ArrowUpRight } from "lucide-react";

const features = [
    {
        title: "Organize Snippets",
        description: "Save snippets with titles, tags, and languages. Keep your codebase structured.",
        icon: <Folder className="w-6 h-6" />,
        bg: "from-blue-500/10 to-transparent",
    },
    {
        title: "Public & Private",
        description: "Keep snippets private for personal use or share them with the world via a public link.",
        icon: <Globe className="w-6 h-6" />,
        bg: "from-purple-500/10 to-transparent",
    },
    {
        title: "Search Instantly",
        description: "Find any snippet in milliseconds with our powerful fuzzy search engine.",
        icon: <Search className="w-6 h-6" />,
        bg: "from-green-500/10 to-transparent",
    },
    {
        title: "Multi-language Support",
        description: "JavaScript, TypeScript, Python, Go, Rust, and many more supported out of the box.",
        icon: <Code className="w-6 h-6" />,
        bg: "from-yellow-500/10 to-transparent",
    },
    {
        title: "Secure Authentication",
        description: "Authentication handled by Clerk. Enterprise-grade security for your data.",
        icon: <Shield className="w-6 h-6" />,
        bg: "from-red-500/10 to-transparent",
    },
    {
        title: "Responsive by Default",
        description: "Access your snippets from any device. Desktop, tablet, or mobile.",
        icon: <Smartphone className="w-6 h-6" />,
        bg: "from-cyan-500/10 to-transparent",
    },
];

export default function FeatureGrid() {
    return (
        <section className="py-20 dark:bg-zinc-950 bg-gray-50">
            <div className="container mx-auto px-4 xl:px-14 max-w-7xl">

                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold dark:text-white text-gray-900 mb-4">
                        Everything you need to manage code.
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Built for developers who care about productivity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <FeatureCard key={i} feature={feature} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeatureCard({ feature, index }: { feature: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.75 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, staggerChildren: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative group overflow-hidden dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-gray-200 p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 min-h-[250px]"
        >
            {/* Subtle background gradient on hover */}
            <div className={`absolute inset-0 bg-linear-to-br ${feature.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Skeleton animation effect (simplified as a moving sheen) */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

            <div className="relative z-10">
                <div className={`w-12 h-12 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center mb-6 text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                </div>

                <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3 group-hover:bg-linear-to-r from-blue-400 to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                    {feature.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                    {feature.description}
                </p>
            </div>

            {/* Hover Arrow */}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                <ArrowUpRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </div>
        </motion.div>
    );
}

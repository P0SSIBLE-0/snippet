"use client";

import Link from "next/link";
import { Snippet } from "@/types/snippet";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Lock, Globe, MoreHorizontal, Clock, Trash, Edit, Copy, Share } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import toast from "react-hot-toast";

interface SnippetCardProps {
    snippet: Snippet;
    isListView?: boolean;
}

function getRelativeTime(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
}

export default function SnippetCard({ snippet, isListView = false }: SnippetCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(snippet.content);
        toast.success("Copied to clipboard!");
    };

    const languageColor = (lang: string) => {
        switch (lang.toLowerCase()) {
            case 'javascript': return 'text-yellow-400 bg-yellow-400/10';
            case 'typescript': return 'text-blue-400 bg-blue-400/10';
            case 'python': return 'text-green-400 bg-green-400/10';
            case 'css': return 'text-cyan-400 bg-cyan-400/10';
            case 'html': return 'text-orange-400 bg-orange-400/10';
            default: return 'text-gray-400 bg-gray-400/10';
        }
    };

    if (isListView) {
        return (
            <Link href={`/snippets/${snippet._id}`} className="group block bg-white dark:bg-zinc-900/50">
                <div className="flex items-center gap-4 p-4 rounded-lg border border-white/5 bg-white/5 hover:border-indigo-500/30 transition-all">
                    <div className={`px-2 py-1 rounded text-xs font-mono font-medium ${languageColor(snippet.language)}`}>
                        {snippet.language}
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold truncate dark:text-white text-gray-900 group-hover:text-blue-500 transition-colors">
                            {snippet.title}
                        </h3>
                    </div>

                    <div className="hidden md:flex items-center gap-2">
                        {snippet.tags?.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-full">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <button
                        onClick={handleCopy}
                        className="hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors lg:md:opacity-0 lg:md:group-hover:opacity-100 opacity-100"
                    >
                        <Copy size={16} />
                    </button>
                </div>
            </Link>
        );
    }

    return (
        <motion.div
            whileHover={{ y: -2 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative flex flex-col h-full bg-white dark:bg-neutral-950 border border-gray-200 dark:border-white/10 rounded overflow-hidden hover:border-indigo-500/30 dark:hover:border-indigo-500/50 transition-colors"
        >
            <Link href={`/snippets/${snippet._id}`} className="flex flex-col h-full">
                {/* Header / Meta Bar */}
                <div className="flex items-center justify-between p-4 pb-2">
                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-sm ${languageColor(snippet.language)}`}>
                            {snippet.language}
                        </span>
                        <div className="text-gray-400">
                            {snippet.isPublic ? <Globe size={12} /> : <Lock size={12} />}
                        </div>
                    </div>

                    {/* Quick Actions (Hover) & Menu */}
                    <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={handleCopy}
                            className="p-1.5 text-gray-500 hover:text-indigo-500 hover:bg-indigo-500/10 rounded transition-colors"
                            title="Copy code"
                        >
                            <Copy size={14} />
                        </button>
                        <button className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded transition-colors" title="More options">
                            <MoreHorizontal size={14} />
                        </button>
                    </div>
                </div>

                {/* Title */}
                <div className="px-4 pb-3">
                    <h3 className="font-semibold text-base truncate dark:text-white text-gray-900 group-hover:text-indigo-500 transition-colors">
                        {snippet.title}
                    </h3>
                </div>

                {/* Code Preview */}
                <div className="px-4 pb-4 flex-1">
                    <div className="relative rounded-md bg-gray-50 dark:bg-black/30 border border-gray-100 dark:border-white/5 overflow-hidden group/code">
                        <div className="p-3 font-mono text-xs opacity-80 group-hover/code:opacity-100 transition-opacity">
                            <SyntaxHighlighter
                                language={snippet.language}
                                style={oneDark} // We might want a custom theme or transparent bg to match style
                                customStyle={{
                                    background: 'transparent',
                                    padding: 0,
                                    margin: 0,
                                    fontSize: 'inherit',
                                    lineHeight: '1.5',
                                    overflow: 'hidden', // Prevent scrollbars
                                }}
                                codeTagProps={{ style: { fontFamily: 'inherit' } }}
                                wrapLongLines={false} // Don't wrap lines, let them truncate with overflow hidden
                            >
                                {snippet.content.split('\n').slice(0, 6).join('\n')}
                            </SyntaxHighlighter>
                        </div>

                        {/* Gradient Fade */}
                        {/* <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-gray-50 dark:from-zinc-900/90 to-transparent pointer-events-none" /> */}
                    </div>
                </div>

                {/* Footer: Tags & Time */}
                <div className="px-4 pb-4 mt-auto">
                    {snippet.tags && snippet.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {snippet.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400">
                                    #{tag}
                                </span>
                            ))}
                            {snippet.tags.length > 3 && (
                                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400">
                                    +{snippet.tags.length - 3}
                                </span>
                            )}
                        </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
                        <span className="flex items-center gap-1">
                            Updated {getRelativeTime(snippet.updatedAt)}
                        </span>
                        <span className="group-hover:translate-x-1 transition-transform text-indigo-500 font-medium opacity-0 group-hover:opacity-100">
                            View →
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

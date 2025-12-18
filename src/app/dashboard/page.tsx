"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSnippets } from "@/store/snippetSlice";
import { AppDispatch, RootState } from "@/store/store";
import SnippetCard from "@/components/SnippetCard";
import Loader from "@/components/Loader";
import Link from "next/link";
import { Plus, Search, LayoutGrid, List as ListIcon, X, FileCode2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const { snippets, status } = useSelector((state: RootState) => state.snippets);

    const [view, setView] = useState<"grid" | "list">("grid");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        dispatch(fetchSnippets());
    }, [dispatch]);

    // Filter snippets based on search (naive implementation for client-side)
    const filteredSnippets = snippets.filter(snippet =>
        snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (status === "loading") {
        return (
            <div className="container max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
                    {[...Array(6)].map((_, i) => (
                        <Loader key={i} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">

            {/* Top Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search snippets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-neutral-600 dark:placeholder:text-neutral-400 dark:text-white"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    {/* View Toggle */}
                    <div className="flex items-center bg-gray-100 dark:bg-zinc-900 rounded-lg p-1 border border-gray-200 dark:border-zinc-800">
                        <button
                            onClick={() => setView("grid")}
                            className={`p-2 rounded-md transition-all ${view === "grid" ? "bg-white dark:bg-zinc-800 shadow-xs text-indigo-500" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"}`}
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button
                            onClick={() => setView("list")}
                            className={`p-2 rounded-md transition-all ${view === "list" ? "bg-white dark:bg-zinc-800 shadow-xs text-blue-500" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"}`}
                        >
                            <ListIcon size={18} />
                        </button>
                    </div>

                    <Link
                        href="/snippets/create"
                        className="ml-auto md:ml-0 inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02]"
                    >
                        <Plus size={18} />
                        <span className="hidden sm:inline">New Snippet</span>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <AnimatePresence mode="wait">
                {snippets.length === 0 ? (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/50"
                    >
                        <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
                            <FileCode2 className="text-gray-400" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            No snippets yet
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-8">
                            Save your first snippet and never lose code again.
                        </p>
                        <Link
                            href="/snippets/create"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/20 transition-all"
                        >
                            <Plus size={20} />
                            Create Snippet
                        </Link>
                    </motion.div>
                ) : filteredSnippets.length === 0 ? (
                    /* No Search Results */
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">
                            No snippets found matching "{searchQuery}"
                        </p>
                        <button
                            onClick={() => setSearchQuery("")}
                            className="mt-2 text-indigo-500 hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                ) : (
                    /* Grid / List View */
                    <motion.div
                        layout
                        className={
                            view === "grid"
                                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                : "flex flex-col gap-4"
                        }
                    >
                        {filteredSnippets.map((snippet) => (
                            <SnippetCard key={snippet._id} snippet={snippet} isListView={view === "list"} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

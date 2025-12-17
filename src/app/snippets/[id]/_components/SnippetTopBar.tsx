import { motion } from "motion/react";
import Link from "next/link";
import {
    ArrowLeft,
    Copy,
    Edit2,
    Save,
    Star,
    Check,
    Loader2,
} from "lucide-react";
import { Snippet } from "@/types/snippet";

interface EditFormState {
    title: string;
    content: string;
    language: string;
    isPublic: boolean;
}

interface SnippetTopBarProps {
    snippet: Snippet;
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
    editForm: EditFormState;
    setEditForm: (value: EditFormState) => void;
    isOwner: boolean;
    isSaving: boolean;
    handleSave: () => void;
    handleCopy: () => void;
    hasCopied: boolean;
}

export default function SnippetTopBar({
    snippet,
    isEditing,
    setIsEditing,
    editForm,
    setEditForm,
    isOwner,
    isSaving,
    handleSave,
    handleCopy,
    hasCopied,
}: SnippetTopBarProps) {
    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-50 border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md"
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
                <div className="flex items-center gap-2 sm:gap-3">
                    <Link
                        href="/"
                        className="p-2 -ml-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="flex flex-col">
                        {isEditing ? (
                            <input
                                type="text"
                                value={editForm.title}
                                onChange={(e) =>
                                    setEditForm({ ...editForm, title: e.target.value })
                                }
                                className="bg-transparent text-lg font-semibold text-gray-900 dark:text-white focus:outline-none border-b border-indigo-500 max-w-[120px] sm:max-w-md"
                                placeholder="Snippet Title"
                            />
                        ) : (
                            <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate max-w-[200px] sm:max-w-md">
                                {snippet.title}
                            </h1>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {!isEditing && (
                        <>
                            <button
                                onClick={handleCopy}
                                className="p-2 text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-md transition-all"
                                title="Copy"
                            >
                                {hasCopied ? <Check size={20} /> : <Copy size={20} />}
                            </button>
                            <button
                                className="p-2 text-gray-500 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-md transition-all"
                                title="Favorite"
                            >
                                <Star size={20} />
                            </button>
                        </>
                    )}

                    {isOwner && (
                        <>
                            {isEditing ? (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 rounded-md transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors disabled:opacity-50"
                                    >
                                        {isSaving ? (
                                            <Loader2 size={16} className="animate-spin" />
                                        ) : (
                                            <Save size={16} />
                                        )}
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors shadow-lg shadow-indigo-500/20"
                                >
                                    <Edit2 size={16} />
                                    <span className="hidden sm:inline">Edit</span>
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

import {
    Copy,
    Download,
    Share2,
    Code,
    Globe,
    Calendar,
    Clock,
    User,
    Trash2,
} from "lucide-react";
import { Snippet } from "@/types/snippet";

interface EditFormState {
    title: string;
    content: string;
    language: string;
    isPublic: boolean;
}

interface SnippetSidebarProps {
    snippet: Snippet;
    isEditing: boolean;
    editForm: EditFormState;
    setEditForm: (value: EditFormState) => void;
    isOwner: boolean;
    handleCopy: () => void;
    handleDownload: () => void;
    handleDelete: () => void;
    handleShare: () => void;
}

export default function SnippetSidebar({
    snippet,
    isEditing,
    editForm,
    setEditForm,
    isOwner,
    handleCopy,
    handleDownload,
    handleDelete,
    handleShare,
}: SnippetSidebarProps) {
    return (
        <div className="space-y-8">
            {/* 6.1 Actions Section */}
            <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Actions
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 *:cursor-pointer">
                    <button
                        onClick={handleCopy}
                        className="flex items-center justify-center lg:justify-start gap-2.5 p-2.5 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 text-sm font-medium transition-colors dark:text-neutral-300"
                    >
                        <Copy size={16} className="text-gray-500 " />
                        Copy Code
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex items-center justify-center lg:justify-start gap-2.5 p-2.5 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 text-sm font-medium transition-colors dark:text-neutral-300"
                    >
                        <Download size={16} className="text-gray-500 " />
                        Download .txt
                    </button>
                    <button
                        onClick={handleShare}
                        className="flex items-center justify-center lg:justify-start gap-2.5 p-2.5 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 text-sm font-medium transition-colors dark:text-neutral-300"
                    >
                        <Share2 size={16} className="text-gray-500 " />
                        Share Snippet
                    </button>
                </div>
            </div>

            {/* 6.2 Metadata */}
            <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Metadata
                </h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm py-2 border-b border-gray-100 dark:border-white/5">
                        <span className="text-gray-500 flex items-center gap-2">
                            <Code size={14} /> Language
                        </span>
                        <span className="font-medium text-gray-900 dark:text-gray-200">
                            {isEditing ? (
                                <select
                                    value={editForm.language}
                                    onChange={(e) =>
                                        setEditForm({ ...editForm, language: e.target.value })
                                    }
                                    className="bg-transparent text-right outline-none focus:text-indigo-500"
                                >
                                    <option value="javascript">JavaScript</option>
                                    <option value="typescript">TypeScript</option>
                                    <option value="python">Python</option>
                                    <option value="html">HTML</option>
                                    <option value="css">CSS</option>
                                </select>
                            ) : (
                                snippet.language
                            )}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-2 border-b border-gray-100 dark:border-white/5">
                        <span className="text-gray-500 flex items-center gap-2">
                            <Globe size={14} /> Visibility
                        </span>
                        <span className="font-medium text-gray-900 dark:text-gray-200">
                            {isEditing ? (
                                <button
                                    onClick={() =>
                                        setEditForm({ ...editForm, isPublic: !editForm.isPublic })
                                    }
                                    className={`${editForm.isPublic ? "text-green-500" : "text-gray-500"
                                        }`}
                                >
                                    {editForm.isPublic ? "Public" : "Private"}
                                </button>
                            ) : snippet.isPublic ? (
                                "Public"
                            ) : (
                                "Private"
                            )}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-2 border-b border-gray-100 dark:border-white/5">
                        <span className="text-gray-500 flex items-center gap-2">
                            <Calendar size={14} /> Created
                        </span>
                        <span className="font-medium text-gray-900 dark:text-gray-200">
                            {new Date(snippet.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-2 border-b border-gray-100 dark:border-white/5">
                        <span className="text-gray-500 flex items-center gap-2">
                            <Clock size={14} /> Updated
                        </span>
                        <span className="font-medium text-gray-900 dark:text-gray-200">
                            {new Date(snippet.updatedAt).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-2">
                        <span className="text-gray-500 flex items-center gap-2">
                            <User size={14} /> Owner
                        </span>
                        <span className="font-medium text-gray-900 dark:text-gray-200 truncate max-w-[120px]">
                            {isOwner ? "You" : "Unknown"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            {isOwner && (
                <div className="pt-6 mt-6 border-t border-gray-200 dark:border-white/10">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-4">
                        Danger Zone
                    </h3>
                    <button
                        onClick={handleDelete}
                        className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 text-sm font-medium transition-colors"
                    >
                        <Trash2 size={16} />
                        Delete Snippet
                    </button>
                </div>
            )}
        </div>
    );
}

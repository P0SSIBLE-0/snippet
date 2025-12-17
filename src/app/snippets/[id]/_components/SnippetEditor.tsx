import {
    Clock,
    Globe,
    Lock,
    Copy,
    Check,
    Edit2,
} from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { Snippet } from "@/types/snippet";

interface EditFormState {
    title: string;
    content: string;
    language: string;
    isPublic: boolean;
}

interface SnippetEditorProps {
    snippet: Snippet;
    isEditing: boolean;
    editForm: EditFormState;
    setEditForm: (value: EditFormState) => void;
    handleCopy: () => void;
    hasCopied: boolean;
}

export default function SnippetEditor({
    snippet,
    isEditing,
    editForm,
    setEditForm,
    handleCopy,
    hasCopied,
}: SnippetEditorProps) {
    return (
        <div className="space-y-6">
            {/* 4. Snippet Header */}
            <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border ${snippet.language === "javascript" ||
                            snippet.language === "typescript"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700/50"
                            : "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50"
                            }`}
                    >
                        {snippet.language}
                    </span>
                    <span
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${snippet.isPublic
                            ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50"
                            : "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                            }`}
                    >
                        {snippet.isPublic ? <Globe size={12} /> : <Lock size={12} />}
                        {snippet.isPublic ? "Public" : "Private"}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Clock size={14} />
                        Updated {new Date(snippet.updatedAt).toLocaleDateString()}
                    </span>
                </div>

                {/* Tags (if any - using dummy tags if none) */}
                <div className="flex gap-2">
                    {snippet.tags && snippet.tags.length > 0 ? (
                        snippet.tags.map((tag, i) => (
                            <span
                                key={i}
                                className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline cursor-pointer"
                            >
                                #{tag}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-400 dark:text-gray-600 text-sm italic">
                            #code #{snippet.language}
                        </span>
                    )}
                </div>
            </div>

            {/* 5. Code Block */}
            <div className="relative group rounded overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1e1e1e] shadow-lg">
                {!isEditing && (
                    <button
                        onClick={handleCopy}
                        className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-md text-gray-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                        title="Copy Code"
                    >
                        {hasCopied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                    </button>
                )}

                <div className="h-[500px] w-full">
                    <Editor
                        height="100%"
                        defaultLanguage={snippet.language}
                        language={isEditing ? editForm.language : snippet.language}
                        value={isEditing ? editForm.content : snippet.content}
                        theme="vs-dark"
                        onChange={(value) => {
                            if (isEditing && value) {
                                setEditForm({ ...editForm, content: value });
                            }
                        }}
                        options={{
                            readOnly: !isEditing,
                            minimap: { enabled: false },
                            fontSize: 14,
                            lineHeight: 24,
                            fontFamily: "JetBrains Mono, monospace",
                            renderValidationDecorations: "off",
                            scrollBeyondLastLine: false,
                            padding: { top: 20, bottom: 20 },
                            smoothScrolling: true,
                            cursorBlinking: "smooth",
                            lineNumbers: "on",
                            wordWrap: "on",
                        }}
                    />
                </div>
            </div>

            {isEditing && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-lg flex items-start gap-3">
                    <div className="mt-0.5 p-1 bg-yellow-100 dark:bg-yellow-900/40 rounded-full text-yellow-700 dark:text-yellow-400">
                        <Edit2 size={14} />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                            Editing Mode Active
                        </h3>
                        <p className="text-xs text-yellow-700 dark:text-yellow-400/80 mt-1">
                            You are currently editing this snippet. Changes are local until you click "Save".
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

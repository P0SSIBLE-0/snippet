"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { createSnippet } from "@/store/snippetSlice";
import { AppDispatch } from "@/store/store";
import { Editor } from "@monaco-editor/react";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import {
  Globe,
  Lock,
  Save,
  Type,
  ChevronDown,
  X,
  Cpu
} from "lucide-react";

export default function CreateSnippet() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isPublic, setIsPublic] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const languages = [
    'javascript', 'html', 'python', 'java', 'cpp', 'ruby',
    'go', 'rust', 'typescript', 'php', 'csharp'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    setIsSubmitting(true);
    const newSnippet = { title, content, language, isPublic };
    try {
      await dispatch(createSnippet(newSnippet));
      toast.success("Snippet created successfully");
      router.push("/");
    } catch {
      toast.error("Failed to create snippet, try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center p-4 md:p-8 bg-gray-50 dark:bg-zinc-950/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-6xl flex flex-col gap-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500">
              Create Snippet
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">
              Share your code with the world or keep it private.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/')}
            className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-500"
          >
            <X size={24} />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">

            {/* Left Column: Metadata Controls */}
            <div className="lg:col-span-1 space-y-6">

              {/* Title Input Card */}
              <div className="p-5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
                <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                  <Type size={16} />
                  Snippet Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Auth Middleware"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-transparent text-xl font-bold border-b-2 border-zinc-100 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-zinc-100 outline-none py-2 transition-all dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                  required
                />
              </div>

              {/* Language Selector Card */}
              <div className="p-5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
                <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                  <Cpu size={16} />
                  Language
                </label>
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full appearance-none bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-zinc-100 font-medium focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all cursor-pointer"
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400" size={18} />
                </div>
              </div>

              {/* Privacy Toggle Card */}
              <div className="p-5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
                <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                  {isPublic ? <Globe size={16} /> : <Lock size={16} />}
                  Visibility
                </label>
                <div className="flex bg-zinc-100 dark:bg-zinc-800/50 p-1 rounded-xl relative">
                  <motion.div
                    className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-zinc-700 rounded-lg shadow-sm"
                    animate={{ x: isPublic ? "100%" : "0%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  <button
                    type="button"
                    onClick={() => setIsPublic(false)}
                    className={`flex-1 relative z-10 py-2 text-sm font-medium text-center transition-colors ${!isPublic ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400'}`}
                  >
                    Private
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPublic(true)}
                    className={`flex-1 relative z-10 py-2 text-sm font-medium text-center transition-colors ${isPublic ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400'}`}
                  >
                    Public
                  </button>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {isPublic
                    ? "Anyone with the link can view this snippet."
                    : "Only you can view and edit this snippet."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 cursor-pointer bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <><Save size={20} /> Create Snippet</>
                  )}
                </motion.button>
              </div>

            </div>

            {/* Right Column: Code Editor */}
            <div className="lg:col-span-2 flex flex-col h-[600px] lg:h-auto rounded overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg bg-zinc-900">
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-950/50 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-zinc-500">Editor</span>
              </div>
              <div className="flex-1 relative">
                <Editor
                  key={language}
                  height="100%"
                  defaultLanguage={language}
                  defaultValue={`// Write your ${language} code here`}
                  theme="vs-dark"
                  onChange={(value) => setContent(value || "")}
                  options={{
                    readOnly: false,
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineHeight: 22,
                    padding: { top: 16 },
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                  }}
                  className="bg-transparent"
                />
              </div>
            </div>

          </div>
        </form>
      </motion.div>
    </div>
  );
}

"use client";

import { motion, AnimatePresence } from "motion/react";
import { Copy, Terminal, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { HighlightCode } from "@/lib/utils";

export default function CodeDemo() {
    const [activeTab, setActiveTab] = useState("typescript");
    const [copied, setCopied] = useState(false);
    const [displayedCode, setDisplayedCode] = useState("");

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const codeSnippets = {
        typescript: `async function saveSnippet(data: Snippet) {
  try {
    const response = await fetch('/api/snippets', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return response.json();
  } catch (error) {
    console.error("Failed to save:", error);
  }
}`,
        python: `def save_snippet(data: Dict):
    try:
        response = requests.post(
            '/api/snippets',
            json=data
        )
        return response.json()
    except Exception as e:
        print(f"Failed to save: {e}")`,
        javascript: `async function saveSnippet(data) {
  try {
    const response = await fetch('/api/snippets', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return response.json();
  } catch (error) {
    console.error("Failed to save:", error);
  }
}`
    };

    useEffect(() => {
        // Reset displayed code when tab changes
        setDisplayedCode("");

        const targetCode = codeSnippets[activeTab as keyof typeof codeSnippets];
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex < targetCode.length) {
                setDisplayedCode(prev => prev + targetCode[currentIndex]);
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 15); // Typing speed

        return () => clearInterval(interval);
    }, [activeTab]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative bg-zinc-900 border border-gray-800 shadow-lg overflow-hidden font-geist-mono text-sm w-[360px] md:lg:w-[500px] mx-auto "
        >
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-gray-800">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex text-xs text-gray-400 font-medium relative">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={activeTab}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'python' ? 'snippets.py' : activeTab === 'typescript' ? 'snippets.ts' : 'snippets.js'}
                        </motion.span>
                    </AnimatePresence>
                </div>
                <div className="w-14"></div>
            </div>

            {/* Editor Area */}
            <div className="p-4 overflow-x-auto h-[360px] no-scrollbar">
                {/* Tabs mock */}
                <div className="flex gap-4 mb-4 text-xs">
                    {['typescript', 'javascript', 'python'].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setActiveTab(lang)}
                            className={`pb-1 relative transition-colors duration-200 uppercase ${activeTab === lang
                                ? 'text-gray-200'
                                : 'text-gray-500 hover:text-gray-300'
                                }`}
                        >
                            {lang}
                            {activeTab === lang && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Code Content */}
                <div className="relative group">
                    {/* Syntax Highlighter Component */}
                    <HighlightCode
                        code={displayedCode}
                        language={activeTab}
                        showLineNumbers={true}
                        className="bg-transparent p-0"

                    />

                    <button
                        onClick={handleCopy}
                        className="absolute top-0 right-0 p-2 rounded-md bg-gray-800/50 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white"
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                </div>
            </div>

            {/* Status Bar */}
            <div className="px-4 py-2 bg-[#007acc] text-white/90 text-[10px] flex items-center justify-between absolute bottom-0 w-full left-0">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        <Terminal size={10} />
                        <span>READY</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span>Ln {displayedCode.split('\n').length}, Col 1</span>
                    <span>UTF-8</span>
                    <span className="uppercase">{activeTab === 'typescript' ? 'TS' : activeTab === 'javascript' ? 'JS' : 'PY'}</span>
                </div>
            </div>
        </motion.div>
    );
}

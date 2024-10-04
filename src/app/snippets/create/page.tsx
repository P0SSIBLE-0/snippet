"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { createSnippet } from "@/store/snippetSlice";
import LanguageSelector from "@/components/LanguageSelector";
import PrivacyToggle from "@/components/PrivacyToggle";
import { AppDispatch } from "@/store/store";
import { Editor } from "@monaco-editor/react";
import toast from "react-hot-toast";

export default function CreateSnippet() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSnippet = { title, content, language, isPublic };
    try {
      await dispatch(createSnippet(newSnippet));
      toast.success("Snippet created successfully");
      router.push("/");
    } catch (err) {
      toast.error("Failed to create snippet, try again!");
    }
  };


  return (
    <div className="max-w-7xl w-full lg:w-4/5 md:4/5 mx-auto bg-gray-100 dark:bg-zinc-900 dark:text-gray-100 px-4 py-8 flex-1">
      <h1 className="text-3xl font-bold mb-4">Create New Snippet</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 flex-col md:flex-row lg:flex-row">
          <input
            type="text"
            placeholder="Snippet Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full flex-1 mb-4 p-2 border rounded dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-500"
            required
          />
          <LanguageSelector value={language} setLanguage={setLanguage} />
        </div>
        <div className="border rounded-md overflow-hidden my-4">
          <Editor
            key={language}
            className="min-h-80"
            height="100%"
            defaultLanguage={language}
            defaultValue={`// Write your ${language} code here`}
            theme="vs-dark" // You can use 'vs-light' for light theme
            onChange={(value: string | undefined) => setContent(value || "")} // Ensure value is a string
            options={{
              readOnly: false,
              minimap: { enabled: false },
              wordWrap: "on",
              automaticLayout: true,
              fontSize: 15,
            }}
          />
        </div>
        <PrivacyToggle value={isPublic} onChange={setIsPublic} />
        <button
          type="submit"
          className="py-2 px-4 hover:opacity-90 bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 font-semibold text-neutral-200 rounded mr-4"
        >
          Create Snippet
        </button>
      </form>
    </div>
  );
}

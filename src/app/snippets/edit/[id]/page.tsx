"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchSnippetById, updateSnippet } from "@/store/snippetSlice";
import LanguageSelector from "@/components/LanguageSelector";
import PrivacyToggle from "@/components/PrivacyToggle";
import { AppDispatch, RootState } from "@/store/store";
import { Editor } from "@monaco-editor/react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function EditSnippet() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const snippet = useSelector(
    (state: RootState) => state.snippets.currentSnippet
  );
  const currentUserId = useSelector(
    (state: RootState) => state.snippets.userId
  );

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchSnippetById(id)).then(() => setLoading(false));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (snippet) {
      // Check if currentUserId is defined before comparison
      if (currentUserId && snippet.userId.toString() !== currentUserId.toString()) {
        toast.error("You do not have permission to edit this snippet");
        router.push(`/snippets/${id}`);
      } else {
        setTitle(snippet.title);
        setContent(snippet.content);
        setLanguage(snippet.language);
        setIsPublic(snippet.isPublic);
      }
    }
  }, [snippet]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!snippet) return;
    e.preventDefault();
    try {
      await dispatch(
        updateSnippet({ ...snippet, title, content, language, isPublic })
      );
      toast.success("Snippet updated successfully");
      router.push(`/snippets/${id}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An error occurred.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!snippet) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Snippet not found</h1>
        <button
          className="py-2 px-4 bg-zinc-900 hover:opacity-90 text-neutral-200 rounded mr-4"
          onClick={() => router.push("/")}
        >
          Go back to home
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 my-6">
      <h1 className="text-2xl font-bold mb-4">Edit Snippet</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row lg:flex-row gap-2">
          <input
            type="text"
            placeholder={content}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 p-2 border rounded flex-1 dark:bg-zinc-800 dark:text-gray-100 outline-none"
            required
          />
          <LanguageSelector value={language} setLanguage={setLanguage} />
        </div>
        <div className="border rounded-md overflow-hidden">
          <Editor
            className="min-h-80"
            key={language}
            height="100%"
            defaultLanguage={language} // Dynamic language support
            defaultValue={content}
            theme="vs-dark" // You can use 'vs-light' for light theme
            onChange={(value: string | undefined) => setContent(value || "")} // Ensure value is a string
            options={{
              readOnly: false,
              minimap: { enabled: false },
              wordWrap: "on",
            }}
          />
        </div>
        <PrivacyToggle value={isPublic} onChange={setIsPublic} />
        <button
          type="submit"
          className="py-2 px-4 bg-zinc-900 text-neutral-200 rounded mr-4 dark:bg-gray-100 dark:text-gray-900 font-semibold hover:opacity-85"
        >
          Update Snippet
        </button>
      </form>
    </div>
  );
}

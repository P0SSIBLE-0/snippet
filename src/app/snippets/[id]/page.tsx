"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchSnippetById, deleteSnippet, updateSnippet } from "@/store/snippetSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

import SnippetTopBar from "./_components/SnippetTopBar";
import SnippetSidebar from "./_components/SnippetSidebar";
import SnippetEditor from "./_components/SnippetEditor";
import ConfirmationModal from "@/components/ConfirmationModal";

export default function ViewSnippet() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const snippet = useSelector(
    (state: RootState) => state.snippets.currentSnippet
  );
  const { userId, isLoaded } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    language: "",
    isPublic: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch Logic
  useEffect(() => {
    if (!id) return;
    dispatch(fetchSnippetById(id))
      .unwrap()
      .then((data) => {
        setLoading(false);
        // Initialize edit form
        setEditForm({
          title: data.title,
          content: data.content,
          language: data.language,
          isPublic: data.isPublic,
        });
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [dispatch, id]);

  // Authorization Check
  useEffect(() => {
    if (!loading && snippet && isLoaded) {
      const isOwner = snippet.userId === userId;
      if (!snippet.isPublic && !isOwner) {
        toast.error("You are not authorized to view this snippet");
        router.push("/");
      } else {
        setIsAuthorized(true);
      }
    }
  }, [loading, snippet, isLoaded, userId, router]);

  // Update edit form when snippet changes (e.g. after save)
  useEffect(() => {
    if (snippet) {
      setEditForm({
        title: snippet.title,
        content: snippet.content,
        language: snippet.language,
        isPublic: snippet.isPublic,
      });
    }
  }, [snippet]);

  // Handlers
  const handleCopy = () => {
    if (snippet?.content) {
      navigator.clipboard.writeText(snippet.content);
      setHasCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    try {
      await dispatch(deleteSnippet(id)).unwrap();
      toast.success("Snippet deleted successfully");
      router.push("/");
    } catch {
      toast.error("Failed to delete snippet");
      setIsDeleting(false);
    }
  };

  const handleSave = async () => {
    if (!snippet) return;
    setIsSaving(true);
    try {
      await dispatch(
        updateSnippet({
          ...snippet,
          title: editForm.title,
          content: editForm.content,
          language: editForm.language,
          isPublic: editForm.isPublic,
        })
      ).unwrap();
      setIsEditing(false);
      toast.success("Snippet updated successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to update snippet");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = () => {
    if (!snippet) return;
    const element = document.createElement("a");
    const file = new Blob([snippet.content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${snippet.title.replace(/\s+/g, "_")}.${getLanguageExtension(snippet.language)}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: snippet?.title || "Check out this snippet",
          text: `Check out this code snippet: ${snippet?.title}`,
          url: url,
        });
      } catch (err) {
        // User cancelled or share failed, fallback to copy
        console.log("Share failed or cancelled:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Snippet link copied to clipboard");
      } catch {
        toast.error("Failed to copy link");
      }
    }
  };

  const getLanguageExtension = (lang: string) => {
    const map: Record<string, string> = {
      javascript: "js",
      typescript: "ts",
      python: "py",
      html: "html",
      css: "css",
      json: "json",
      // add more as needed
    };
    return map[lang.toLowerCase()] || "txt";
  };

  // Loading State
  if (loading || !isLoaded || isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  // Error State
  if (error || !snippet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Snippet not found</h1>
          <Link href="/" className="text-indigo-500 hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = snippet.userId === userId;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] font-sans">
      <SnippetTopBar
        snippet={snippet}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editForm={editForm}
        setEditForm={setEditForm}
        isOwner={isOwner}
        isSaving={isSaving}
        handleSave={handleSave}
        handleCopy={handleCopy}
        hasCopied={hasCopied}
      />

      {/* Main Content Layout */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          <SnippetEditor
            snippet={snippet}
            isEditing={isEditing}
            editForm={editForm}
            setEditForm={setEditForm}
            handleCopy={handleCopy}
            hasCopied={hasCopied}
          />

          <SnippetSidebar
            snippet={snippet}
            isEditing={isEditing}
            editForm={editForm}
            setEditForm={setEditForm}
            isOwner={isOwner}
            handleCopy={handleCopy}
            handleDownload={handleDownload}
            handleDelete={handleDeleteClick}
            handleShare={handleShare}
          />
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Snippet"
        message="Are you sure you want to delete this snippet? This action cannot be undone."
        confirmText="Delete Snippet"
        isLoading={isDeleting}
      />
    </div>
  );
}

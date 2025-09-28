"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchSnippetById, deleteSnippet } from "@/store/snippetSlice";
import { Edit, Trash2 } from "lucide-react";
import CodeEditor from "@/components/CodeEditor";
import ShareButton from "@/components/ShareButton";
import Link from "next/link";
import { AppDispatch, RootState } from "@/store/store";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

export default function ViewSnippet() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const snippet = useSelector(
    (state: RootState) => state.snippets.currentSnippet
  );
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchSnippetById(id.toString()))
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this snippet?")) {
      try {
        await dispatch(deleteSnippet(id.toString())).unwrap();
        toast.success("Snippet deleted successfully");
        router.push("/");
      } catch {
        toast.error("Failed to delete snippet");
        setError("Failed to delete snippet");
      }
    }
  };

  if (loading) {
    return (
      <div className="w-[90%] lg:max-w-lg md:max-w-lg h-full flex justify-center items-center mx-auto font-bold mt-10">
        <div className="container dark:bg-zinc-800 mx-auto px-4 py-8 rounded-md">
          <div className="w-full mx-auto border border-gray-300 dark:border-zinc-600 rounded-md px-5 py-6">
            {/* Skeleton for header */}
            <div className="h-20 w-full bg-gray-300 dark:bg-neutral-700 animate-pulse-fast rounded-md my-4">
            </div>
            {/* Skeleton for additional content */}
            <div className="h-5 w-full bg-neutral-300 dark:bg-neutral-600 animate-pulse-fast rounded-md"></div>
            <div className="mt-4 animate-pulse bg-neutral-400 dark:bg-neutral-600 h-5 space-x-2 flex text-sm font-semibold rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!snippet) {
    return (
      <div className="m-4 text-center font-bold text-3xl">
        Snippet not found!
      </div>
    );
  }
  const isOwner = snippet.userId === userId;

  if (!snippet.isPublic && !isOwner) {
    toast.error("You are not authorized to view this snippet");
    router.push("/");
  }

  return (
    <div className="container mx-auto px-2 lg:px-4 md:px-4 py-8">
      <div className="lg:max-w-5xl w-full mx-auto border border-gray-300 dark:border-zinc-600 rounded-md px-3 lg:px-5 md:px-5 py-6">
        <div className="my-2 mb-4">
          <h1 className="text-3xl font-bold">{snippet.title}</h1>
          <p className="mb-2 text-neutral-500 text-sm">
            Language: {snippet.language}
          </p>
        </div>
        <span className="mb-4 my-2 bg-zinc-900 text-gray-100 dark:text-gray-900 dark:bg-gray-100 py-1 text-xs font-semibold px-2 rounded-full">
          {snippet.isPublic ? "Public" : "Private"}
        </span>
        <CodeEditor value={snippet.content} language={snippet.language} />
        <div className="mt-4 space-x-2 flex text-sm font-semibold">
          {snippet.isPublic && <ShareButton snippetId={snippet._id} />}
          {isOwner && (
            <Link
              href={`/snippets/edit/${snippet._id}`}
              className="border border-gray-300 dark:border-zinc-700 p-2 text-gray-900 dark:text-gray-100 hover:opacity-85 rounded-md inline-flex items-center"
            >
              <Edit className="size-4 mr-2" />
              Edit
            </Link>
          )}
          {isOwner && (
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:opacity-90 py-2 px-4 text-white rounded-md inline-flex items-center"
            >
              <Trash2 className="size-4 mr-2" />
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

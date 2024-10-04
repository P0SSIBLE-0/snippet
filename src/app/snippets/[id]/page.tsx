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

export default function ViewSnippet() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const snippet = useSelector(
    (state: RootState) => state.snippets.currentSnippet
  );
  const userId = useSelector((state: RootState) => state.snippets.userId);
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
      } catch (err) {
        toast.error("Failed to delete snippet");
        setError("Failed to delete snippet");
      }
    }
  };

  if (loading) {
    return (
      <div className="w-[90%] lg:max-w-lg md:max-w-lg h-full flex justify-center items-center mx-auto font-bold mt-10">
        <div className="container bg-gray-200 dark:bg-zinc-800  mx-auto px-4 py-8 rounded-md ">
        <div className="w-full mx-auto border border-gray-300 rounded-md px-5 py-6 ">
          <div className="h-20 w-full dark:bg-gray-500 bg-gray-300 animate-pulse">
            <h1 className="w-3/4"></h1>
            <p className="mb-2 bg-neutral-500 animate-pulse"></p>
          </div>
          <p className="mb-4 w-full h-5 animate-pulse"></p>
          <div className='h-5 w-full bg-neutral-500 animate-pulse'></div>
          <div className="mt-4 animate-pulse bg-neutral-400 h-3 space-x-2 flex text-sm font-semibold">
          </div>
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
      <div className="m-4 text-center font-bold text-3xl">Snippet not found!</div>
    );
  }
  const isOwner = snippet.userId === userId;

  if (!snippet.isPublic && !isOwner) {
    toast.error("You are not authorized to view this snippet");
    router.push("/");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="lg:max-w-3xl w-full mx-auto border border-gray-300 dark:border-zinc-600 rounded-md px-4 lg:px-5 md:px-5 py-6">
        <div className="my-3">
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
          <Link
            href={`/snippets/edit/${snippet._id}`}
            className="border border-gray-300 p-2 text-gray-900 dark:text-gray-100 hover:opacity-85 rounded-md inline-flex items-center"
          >
            <Edit className="size-4 mr-2" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:opacity-90 py-2 px-4 text-white rounded-md inline-flex items-center"
          >
            <Trash2 className="size-4 mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

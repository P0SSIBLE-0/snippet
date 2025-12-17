import React from "react";

export default function Loader() {
  return (
    <div className="flex flex-col h-[320px] w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded overflow-hidden">
      {" "}
      {/* Container matching SnippetCard structure */}

      {/* Header Skeleton */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-2">
          <div className="h-5 w-16 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" /> {/* Language badge */}
          <div className="h-3 w-3 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse" /> {/* Privacy icon */}
        </div>

      </div>

      {/* Title Skeleton */}
      <div className="px-4 pb-3">
        <div className="h-6 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
      </div>

      {/* Code Block Skeleton */}
      <div className="px-4 pb-4 flex-1">
        <div className="h-full w-full bg-gray-100 dark:bg-zinc-900/50 rounded-lg animate-pulse border border-gray-200 dark:border-white/5 p-3 space-y-2">
          <div className="h-3 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse opacity-60" />
          <div className="h-3 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse opacity-60" />
          <div className="h-3 w-4/5 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse opacity-60" />
          <div className="h-3 w-1/2 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse opacity-60" />
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="px-4 pb-4 mt-auto">
        {/* Tags */}
        <div className="flex gap-2 mb-3">
          <div className="h-5 w-12 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse" />
          <div className="h-5 w-16 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse" />
        </div>

        {/* Date/Meta */}
        <div className="flex items-center justify-between">
          <div className="h-3 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-3 w-12 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

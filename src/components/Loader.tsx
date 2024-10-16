import React from "react";

export default function Loader() {
  return (
    <div className="max-w-md md:max-w-96 lg:max-w-96 mx-2">
      <div className="container  dark:bg-zinc-900 mx-auto p-4 ">
        <div className="max-w-3xl mx-auto border border-gray-300 dark:border-zinc-700 rounded-md px-5 py-6 bg-gray-200 dark:bg-zinc-800">
          <div className="my-3">
            <h1 className="w-2/4 h-4 bg-gray-400 dark:bg-neutral-600 animate-pulse"></h1>
          </div>
          <div className="h-5 w-full bg-neutral-400 dark:bg-neutral-700 animate-pulse"></div>
          <div className="mt-4 animate-pulse bg-neutral-400 dark:bg-neutral-600 h-3 space-x-2 flex text-sm font-semibold"></div>
        </div>
      </div>
    </div>
  );
}

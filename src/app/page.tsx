"use client";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import SnippetList from "@/components/SnippetList";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { setUserId } from "@/store/snippetSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");
  const { userId } = useAuth();
  const { user } = useUser();
  useEffect(() => {
    if (userId) {
      dispatch(setUserId(userId));
    }
  }, [userId]);
  return (
    <main className="flex-grow container mx-auto  md:px-4 py-8">
      {/* when user is not login */}

      <SignedOut>
        <div className="dark:bg-zinc-900 text-gray-100 min-h-[90%] flex items-center justify-center p-4 ">
          <div className="max-w-4xl w-full mx-auto text-center relative mt-12">
            <div className="absolute top-[9rem] md:top-10 lg:top-10 left-1/4 z-0  opacity-50">
              <div className="blobs">
                <div className="blob a">a</div>
                <div className="blob b">b</div>
                <div className="blob c">c</div>
              </div>
            </div>

            {/* Header Section */}
            <div className="mb-12 lg:w-4/5 mx-auto space-y-4">
              <h1 className="lg:text-6xl text-[2.7rem] font-extrabold mb-4 text-black dark:text-gray-100">
                Code{" "}
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Snippets
                </span>
              </h1>

              <p className="lg:text-lg md:text-lg text-neutral-600 dark:text-gray-100 mb-4">
                Unlock the power of code sharing with Snippets—the ultimate
                platform designed for developers to create, manage, and share
                code snippets.
              </p>
              <p className="lg:text-lg md:text-lg text-neutral-600 dark:text-gray-100">
                Ideal for tutorials, documentation, and more.
              </p>
              <div className="flex justify-center items-center mt-5">
                <Link
                  href={"/auth/signup"}
                  className="text-white text-center rounded-full h-12 hover:shadow-lg hover:scale-105 transition duration-200 bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 px-6 pt-3 font-semibold"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Code Snippet Section */}
            <div className="bg-zinc-900 text-white rounded-md shadow-lg p-6 relative max-w-2xl mx-auto">
              <div className="absolute top-4 left-4 flex gap-2 items-center mb-4">
                <span className="size-3 rounded-full bg-red-500"></span>
                <span className="size-3 rounded-full bg-yellow-500"></span>
                <span className="size-3 rounded-full bg-green-500"></span>
              </div>

              <button className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-700 text-gray-300 py-1 px-2 rounded text-xs">
                Copy code
              </button>
              <pre className="text-left  text-sm overflow-x-auto mt-8">
                <code className="language-python text-green-400">
                  {`import requests

# The URL for the API endpoint you want to fetch data from
url = 'https://api.example.com/data'

# Perform a GET request
response = requests.get(url)`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </SignedOut>

      {/* user is login */}
      <SignedIn>
        <div className="flex flex-col lg:flex-row md:flex-row mb-8 justify-between items-start p-4">
          <div>
            <h1 className="text-3xl font-bold my-2 ">
              Welcome, <span className="bg-gradient-to-r from-purple-500 to-pink-400 text-transparent bg-clip-text">{user?.username}</span>
            </h1>
            <p className="mb-4 text-neutral-500">
              Create and manage your code snippets.
            </p>
          </div>
          <div className="w-full lg:max-w-80 md:max-w-80">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="py-2 px-4 mt-4 bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 outline-none border border-gray-300 dark:border-zinc-500 rounded-full min-w-80 focus:bg-gray-200 dark:focus:bg-zinc-700 w-full"
              type="text"
              name="search"
              placeholder="Search..."
              autoComplete="off"
            />
          </div>
        </div>
        <SnippetList search={search} />
      </SignedIn>
    </main>
  );
}

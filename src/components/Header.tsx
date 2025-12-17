"use client";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Moon, Plus, Sun } from "lucide-react";

export default function Header() {
  const [theme, setTheme] = useState<string>("light");
  const [mounted, setMounted] = useState(false);

  function toggleDarkMode() {
    const currentTheme = localStorage.getItem("theme");
    // Determine if dark mode should be enabled
    const isDarkMode =
      currentTheme === "dark" ||
      (!currentTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light"); // Save the new theme
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark"); // Save the new theme
      setTheme("dark");
    }
  }

  useEffect(() => {
    setMounted(true);
    toggleDarkMode();
  }, []);

  if (!mounted) return null; // Prevents hydration error

  return (
    <header className="bg-white dark:bg-zinc-950/35 sticky top-0 z-50  dark:border-zinc-700 backdrop-blur dark:border-none">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl lg:md:text-3xl font-extrabold bg-linear-to-r dark:from-zinc-100 dark:to-zinc-500 from-zinc-900 to-zinc-500 bg-clip-text text-transparent duration-200"
        >
          Snippets
        </Link>
        <nav>
          <ul className="flex gap-4 items-center">
            <li>
              <button
                onClick={toggleDarkMode}
                className="lg:p-2 md:p-2 p-2 rounded-full bg-gray-200 dark:bg-zinc-700 dark:text-white text-zinc-900 transition-all duration-200"
              >
                {theme === "dark" ? <Sun className="dark:scale-100 scale-0 duration-200 rotate-180 dark:rotate-0 " size={20} /> : <Moon className="dark:scale-0 scale-100 duration-200 rotate-30 dark:rotate-0" size={20} />}
              </button>
            </li>
            <SignedIn>
              {/* <Link
                href={"/snippets/create"}
                className="inline-flex items-center gap-1 text-sm py-2 px-2 lg:px-3 font-semibold bg-zinc-900 rounded-full lg:rounded-md dark:bg-zinc-200 text-neutral-100 dark:text-zinc-950 duration-200 hover:opacity-85">
                <Plus size={20} />
                <span
                  className="hidden lg:block md:block"
                >
                  {" "}
                  Create Snippet
                </span>
              </Link> */}
              <li className="pt-1">
                <UserButton appearance={{
                  elements: {
                    userButtonAvatarBox: 'size-12'
                  },
                }} />
              </li>
            </SignedIn>
            <SignedOut>
              <li className="space-x-4">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 text-sm font-semibold "
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-full text-sm font-semibold dark:bg-gray-200 border text-zinc-900"
                >
                  Signup
                </Link>
              </li>
            </SignedOut>
          </ul>
        </nav>
      </div>
    </header>
  );
}

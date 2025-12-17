'use client';
import { SignedOut, SignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      router.push('/');
    }
  }, [userId, router]);

  return (
    <div className="flex flex-col items-center text-center w-full">
      <h1 className="text-3xl font-bold dark:text-white text-zinc-900 mb-2">Welcome Back</h1>
      <p className="mb-8 text-neutral-500 dark:text-neutral-400">Sign in to your account to continue</p>
      <SignedOut>
        <SignIn
          routing="hash"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none p-0 w-full bg-transparent",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
            }
          }}
        />
      </SignedOut>
    </div>
  );
}

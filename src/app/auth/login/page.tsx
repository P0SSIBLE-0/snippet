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
    <div className="flex min-h-screen flex-col md:flex-row p-3">
      {/* Left side - Image */}
      <div className="relative w-full md:w-1/2">
        <img
          src={'https://images.unsplash.com/photo-1722279958384-2d999b1e42f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFja2dyb3VuZCUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D'}
          alt="Login background"
          className="hidden md:block lg:block w-full h-full object-cover opacity-75"
        />
        
      </div>

      {/* Right side - Login form */}
      <div className="flex w-full items-center justify-center bg-gray-100 dark:bg-zinc-900 lg:p-5 md:p-5 md:w-1/2">
        <div className="w-full max-w-md flex justify-center items-center flex-col"> 
      <h1 className="text-3xl font-bold dark:text-gray-100 text-zinc-900 my-4">Welcome Back</h1>
          <h2 className="mb-6 text-center text-lg dark:text-gray-100 text-zinc-900">Sign in to your account</h2>
          <SignedOut>

          <SignIn 
           routing="hash" 
           appearance={{
             
          }}
          />
          </SignedOut>
        </div>
      </div>
    </div>
  );
}

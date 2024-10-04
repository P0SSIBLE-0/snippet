import { SignUp } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen justify-center items-center w-full p-3">
      <div className="flex w-full items-center justify-center dark:bg-zinc-900 lg:p-5 md:p-5 md:w-1/2">
        <div className="w-full max-w-md flex justify-center items-center flex-col"> 
          <h2 className="mb-6 text-center text-3xl font-bold dark:text-gray-100 text-zinc-900">Sign up for a new account</h2>
          <SignUp 
            routing="hash" 
          />
        </div>
      </div>
    </div>
  );
}
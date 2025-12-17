import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center text-center w-full">
      <h1 className="text-3xl font-bold dark:text-white text-zinc-900 mb-2">Create Account</h1>
      <p className="mb-8 text-neutral-500 dark:text-neutral-400">Join us and start managing snippets</p>
      <SignUp
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
    </div>
  );
}
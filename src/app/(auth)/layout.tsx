import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen w-full">
            {/* Left side - Image */}
            <div className="relative hidden w-0 flex-1 lg:block">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1722279958384-2d999b1e42f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFja2dyb3VuZCUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D"
                    alt="Authentication background"
                />
                <div className="absolute inset-0 bg-zinc-900/20 backdrop-blur-[1px]" />
            </div>

            {/* Right side - Form */}
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white dark:bg-zinc-950 w-full lg:w-1/2">
                <div className="mx-auto w-full max-w-sm lg:w-96 flex flex-col justify-center min-h-[calc(100vh-6rem)]">
                    {children}
                </div>
            </div>
        </div>
    );
}

"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
const montserrat = Montserrat({ subsets: ["latin"] });

// export const metadata = {
//   title: "Snippets",
//   description: "Snippets for developers",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} w-full min-h-screen bg-gray-100 dark:bg-zinc-900`}>
        <ClerkProvider>
          <Provider store={store}>
            <div className="flex dark:bg-zinc-900 dark:text-gray-200 max-w-6xl mx-auto flex-col">
              <Toaster />
              <Header />
              {children}
            </div>
          </Provider>
        </ClerkProvider>
      </body>
    </html>
  );
}

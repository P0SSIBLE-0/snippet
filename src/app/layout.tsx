"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "400", "600", "800", "900"]
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["200", "400", "600", "800", "900"]
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${inter.variable} ${geistMono.variable} ${jetbrainsMono.variable} w-full min-h-screen bg-gray-100 dark:bg-zinc-900`}>
        <ClerkProvider>
          <Provider store={store}>
            <div className="flex flex-col">
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

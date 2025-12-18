import { Inter, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { AppProviders } from "@/providers/AppProviders";
import { Metadata } from "next";

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
  weight: ["200", "400", "600", "800"],
});

export const metadata: Metadata = {
  title: "Snippets - Save your code snippets",
  description: "The best platform for developers to save, organize, and share code snippets efficiently.",
  openGraph: {
    title: "Snippets - Save your code snippets",
    description: "The best platform for developers to save, organize, and share code snippets efficiently.",
    url: "https://snippets-0.vercel.app",
    siteName: "Snippets",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Snippets - Save your code snippets",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Snippets - Save your code snippets",
    description: "The best platform for developers to save, organize, and share code snippets efficiently.",
    images: ["/opengraph-image.png"],
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${inter.variable} ${geistMono.variable} ${jetbrainsMono.variable} w-full min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300`}>
        <AppProviders>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}

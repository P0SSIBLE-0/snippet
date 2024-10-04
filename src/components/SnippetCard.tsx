import Link from "next/link";
import { Snippet } from "@/types/snippet";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface SnippetCardProps {
  snippet: Snippet;
}
export const metadata = {
    title: "Snippets",
    description: "Snippets for developers",
  };


export default function SnippetCard({ snippet }: SnippetCardProps) {
  return (

    <Link
    href={`/snippets/${snippet._id}`}
     className="bg-gray-50 dark:bg-zinc-900/90 cursor-pointer border dark:border-zinc-700 hover:shadow-md duration-200 rounded-lg py-5 px-4  h-60 flex flex-col justify-between dark:hover:bg-[#111] mx-4 lg:m-0 md:m-0">
      <div>
        <div>
          <h3 className="text-2xl font-semibold">{snippet.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Language: {snippet.language}
          </p>
        </div>
        <div className="text-xs text-wrap ">
          <SyntaxHighlighter
            language={snippet.language}
            style={oneDark}
            showLineNumbers
            wrapLines={true}
            customStyle={{ maxHeight: '200px', overflowX: 'hidden' }} 
          >
            {snippet.content.slice(0, 75) + "..."}
          </SyntaxHighlighter>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-gray-100 bg-zinc-900 w-20 p-1 rounded-full text-center dark:text-gray-900 dark:bg-zinc-300">
          {snippet.isPublic ? "Public" : "Private"}
        </span>
        <Link
          href={`/snippets/${snippet._id}`}
          className="text-blue-500 font-semibold text-sm hover:underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
          View Snippet
        </Link>
      </div>
    </Link>
  );
}

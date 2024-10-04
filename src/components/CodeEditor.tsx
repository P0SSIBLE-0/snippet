'use client'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // You can change to other themes/styles.
import { useRef } from 'react'; 
import { Clipboard } from "lucide-react"; 

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void; // Make onChange optional
  language: string;
  isEditable?: boolean; // New prop to determine if the snippet is editable
}

export default function CodeEditor({ value, language }: CodeEditorProps) {
  const refCopy = useRef<HTMLButtonElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);

    if (refCopy.current) {
      refCopy.current.textContent = "Copied!";
      setTimeout(() => {
        if (refCopy.current) {
          refCopy.current.textContent = "Copy";
        }
      }, 1000);
    }
  }


  return (
    <div className="relative text-sm">
      <div className="flex  absolute top-1 right-1   items-center p-1 px-2 bg-zinc-900 text-white rounded hover:bg-zinc-600 text-xs">

        <Clipboard size={15} className="mr-1" /> 
      <button 
        ref={refCopy}
        onClick={handleCopy} 
        className=""
        >
        Copy
      </button>
        </div>
      <SyntaxHighlighter language={language} style={oneDark} showLineNumbers>
        {value}
      </SyntaxHighlighter>
    </div>
  );
}

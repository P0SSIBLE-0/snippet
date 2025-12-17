import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

/**
 * Utility to merge tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Syntax highlighting function/component
 * Usage: <HighlightCode code="const x = 1;" language="typescript" />
 */
export function HighlightCode({
    code,
    language = "typescript",
    className,
    showLineNumbers = false,
}: {
    code: string;
    language?: string;
    className?: string;
    showLineNumbers?: boolean;
}) {
    return (
        <div className={cn("rounded-md overflow-hidden", className)}>
            <SyntaxHighlighter
                language={language}
                style={atomDark}
                showLineNumbers={showLineNumbers}
                customStyle={{
                    margin: 0,
                    background: "transparent",
                    padding: "1rem",
                }}
                wrapLines={true}
                wrapLongLines={true}
                codeTagProps={{
                    style: {
                        fontSize: "0.875rem",
                        fontFamily: "var(--font-geist-mono, monospace)",
                    }
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}

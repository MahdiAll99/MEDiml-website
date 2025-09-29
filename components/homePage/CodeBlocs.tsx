"use client";

import React from "react";
import { Copy } from "lucide-react";
// Lightweight renderer + explicit languages to keep bundle small
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/esm/languages/hljs/bash";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

// register languages once
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("python", python);

export default function CodeBlock({
  code,
  lang = "bash",
  className = "",
}: {
  code: string;
  lang?: "bash" | "python";
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  return (
    <div
      className={`relative rounded-xl border border-white/10 bg-[#0d1117] ${className}`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wide text-white/60 border-b border-white/10">
        <span>{lang}</span>
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 hover:bg-white/10 transition"
        >
          <Copy className="h-4 w-4" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Highlighted code */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={lang}
          style={dark}
          wrapLongLines
          PreTag="div"
          customStyle={{
            margin: 0,
            background: "transparent", // use container bg (#0d1117)
            padding: "1rem",
            fontSize: "0.9rem",
            lineHeight: "1.6",
          }}
          codeTagProps={{
            style: {
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

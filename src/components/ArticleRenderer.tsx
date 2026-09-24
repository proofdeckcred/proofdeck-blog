"use client";

import React, { useState } from "react";
import { QuoteIcon } from "./BlogIcons";

interface ArticleRendererProps {
  content?: string;
}

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : null;
}

export function ArticleRenderer({ content = "" }: ArticleRendererProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!content) return null;

  // Split content by double linebreaks into blocks
  const rawBlocks = content.split(/\n\n+/);

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="article-body space-y-7 text-[16px] sm:text-[17px] leading-[1.8] text-slate-800 font-sans">
      {rawBlocks.map((rawBlock, idx) => {
        const block = rawBlock.trim();
        if (!block) return null;

        // 1. YouTube video URL on its own line or in markdown link format
        const ytId = extractYouTubeId(block);
        const isOnlyYouTube = ytId && (
          block.startsWith("http") ||
          block.startsWith("[youtube]") ||
          block.startsWith("@[youtube]") ||
          block.startsWith("<iframe")
        );

        if (isOnlyYouTube && ytId) {
          return (
            <div key={idx} className="my-8">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-950">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
              <p className="text-center text-xs text-slate-400 mt-2 font-medium">
                Video guide: Click play to watch directly in article
              </p>
            </div>
          );
        }

        // 2. Images: ![Alt text](url)
        const imageMatch = block.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (imageMatch) {
          const altText = imageMatch[1];
          const imgUrl = imageMatch[2];
          return (
            <figure key={idx} className="my-8">
              <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-md bg-slate-50">
                <img
                  src={imgUrl}
                  alt={altText || "ProofDeck Guide Illustration"}
                  className="w-full h-auto max-h-[550px] object-cover object-center"
                  loading="lazy"
                />
              </div>
              {altText && (
                <figcaption className="text-center text-xs text-slate-500 mt-2.5 font-medium italic">
                  {altText}
                </figcaption>
              )}
            </figure>
          );
        }

        // 3. Blockquotes: > Quote text
        if (block.startsWith(">")) {
          const quoteLines = block
            .split("\n")
            .map((line) => line.replace(/^>\s?/, ""))
            .join("\n")
            .trim();

          const hasAuthor = quoteLines.includes("—") || quoteLines.includes("--");
          let quoteText = quoteLines;
          let authorText = "";

          if (hasAuthor) {
            const parts = quoteLines.split(/(?:—|--)/);
            quoteText = parts[0].trim();
            authorText = parts.slice(1).join("—").trim();
          }

          return (
            <blockquote
              key={idx}
              className="relative my-8 p-6 sm:p-7 rounded-2xl border-l-[5px] border-[#4A3AA8] bg-slate-50/80 shadow-xs"
            >
              <div className="flex items-start gap-4">
                <QuoteIcon className="w-8 h-8 text-[#4A3AA8] shrink-0 opacity-80 mt-1" />
                <div className="space-y-2 flex-1">
                  <p className="text-base sm:text-lg font-serif italic text-slate-800 leading-relaxed">
                    "{quoteText.replace(/^["']|["']$/g, "")}"
                  </p>
                  {authorText && (
                    <footer className="text-xs font-bold text-[#4A3AA8] tracking-wide uppercase">
                      — {authorText}
                    </footer>
                  )}
                </div>
              </div>
            </blockquote>
          );
        }

        // 4. Code Blocks: ```lang ... ```
        if (block.startsWith("```")) {
          const firstLineEnd = block.indexOf("\n");
          const language = block.substring(3, firstLineEnd).trim() || "text";
          const code = block.substring(firstLineEnd + 1).replace(/```$/, "").trim();

          return (
            <div key={idx} className="my-7 rounded-2xl overflow-hidden border border-slate-800 bg-[#0F172A] shadow-xl">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                  <span className="ml-2 font-mono uppercase text-[11px] font-semibold text-slate-300">{language}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyCode(code, idx)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors"
                >
                  {copiedIndex === idx ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed">
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        // 5. Headings
        if (block.startsWith("## ")) {
          return (
            <h2
              key={idx}
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug pt-6 pb-2 scroll-mt-24 border-b border-slate-100"
            >
              {block.replace(/^##\s+/, "")}
            </h2>
          );
        }

        if (block.startsWith("### ")) {
          return (
            <h3
              key={idx}
              className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug pt-4 pb-1 scroll-mt-24"
            >
              {block.replace(/^###\s+/, "")}
            </h3>
          );
        }

        // 6. Horizontal Rules
        if (block === "---" || block === "***") {
          return <hr key={idx} className="my-10 border-slate-200" />;
        }

        // 7. Bullet or numbered list
        if (block.split("\n").every((line) => /^\s*([*-]|\d+\.)\s+/.test(line))) {
          const lines = block.split("\n");
          const isOrdered = /^\s*\d+\.\s+/.test(lines[0]);

          if (isOrdered) {
            return (
              <ol key={idx} className="my-5 space-y-2.5 pl-6 list-decimal marker:font-bold marker:text-[#4A3AA8]">
                {lines.map((item, lIdx) => (
                  <li key={lIdx} className="leading-relaxed pl-1 text-slate-800 font-normal">
                    <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item.replace(/^\s*\d+\.\s+/, "")) }} />
                  </li>
                ))}
              </ol>
            );
          }

          return (
            <ul key={idx} className="my-5 space-y-2.5 pl-6 list-disc marker:text-[#4A3AA8]">
              {lines.map((item, lIdx) => (
                <li key={lIdx} className="leading-relaxed pl-1 text-slate-800 font-normal">
                  <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item.replace(/^\s*[*-]\s+/, "")) }} />
                </li>
              ))}
            </ul>
          );
        }

        // 8. Regular paragraph with inline formatting
        return (
          <p
            key={idx}
            className="leading-relaxed text-slate-800"
            dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(block) }}
          />
        );
      })}
    </div>
  );
}

// Helper to format inline bold, italics, code, links
function formatInlineMarkdown(text: string): string {
  if (!text) return "";

  let formatted = text
    // Escape standard html brackets to prevent xss
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Bold: **text**
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');

  // Italic: *text*
  formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

  // Inline Code: `code`
  formatted = formatted.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 text-indigo-700 font-mono text-[13px] border border-slate-200/70">$1</code>');

  // Links: [text](url)
  formatted = formatted.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#4A3AA8] font-semibold underline underline-offset-4 decoration-indigo-300 hover:decoration-[#4A3AA8] transition-colors">$1</a>'
  );

  return formatted;
}

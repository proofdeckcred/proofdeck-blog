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

type ParsedBlock =
  | { type: "youtube"; id: string }
  | { type: "image"; alt: string; url: string }
  | { type: "code"; lang: string; code: string }
  | { type: "blockquote"; text: string; author?: string }
  | { type: "heading"; level: number; text: string }
  | { type: "hr" }
  | { type: "list"; listType: "ul" | "ol"; items: string[] }
  | { type: "paragraph"; text: string };

function parseMarkdownBlocks(content: string): ParsedBlock[] {
  if (!content) return [];
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ParsedBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // 1. Empty lines
    if (!line) {
      i++;
      continue;
    }

    // 2. Code Block: ```[lang] ... ```
    if (line.startsWith("```")) {
      const lang = line.replace(/^```/, "").trim() || "text";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length && lines[i].trim().startsWith("```")) {
        i++;
      }
      blocks.push({ type: "code", lang, code: codeLines.join("\n") });
      continue;
    }

    // 3. Blockquote: lines starting with >
    if (line.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      const fullQuote = quoteLines.join("\n");
      const hasAuthor = fullQuote.includes("—") || fullQuote.includes("--");
      let text = fullQuote;
      let author = "";
      if (hasAuthor) {
        const parts = fullQuote.split(/(?:—|--)/);
        text = parts[0].trim();
        author = parts.slice(1).join("—").trim();
      }
      blocks.push({ type: "blockquote", text: text.replace(/^["']|["']$/g, ""), author });
      continue;
    }

    // 4. Horizontal Rule: --- or ***
    if (/^(\s*[-*_]\s*){3,}$/.test(line)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    // 5. Headings: #, ##, ###, ####
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2],
      });
      i++;
      continue;
    }

    // 6. Standalone Image: ![alt](url)
    const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      blocks.push({ type: "image", alt: imgMatch[1], url: imgMatch[2] });
      i++;
      continue;
    }

    // 7. Standalone YouTube Link
    const ytId = extractYouTubeId(line);
    if (ytId && (line.startsWith("http") || line.startsWith("<iframe") || line.startsWith("[youtube]"))) {
      blocks.push({ type: "youtube", id: ytId });
      i++;
      continue;
    }

    // 8. Bullet or Numbered Lists
    const isBullet = /^\s*[-*+]\s+/.test(rawLine);
    const isNum = /^\s*\d+\.\s+/.test(rawLine);
    if (isBullet || isNum) {
      const listType: "ul" | "ol" = isNum ? "ol" : "ul";
      const items: string[] = [];
      while (i < lines.length) {
        const curRaw = lines[i];
        const matchBullet = isNum ? /^\s*\d+\.\s+(.*)$/ : /^\s*[-*+]\s+(.*)$/;
        const m = curRaw.match(matchBullet);
        if (m) {
          items.push(m[1]);
          i++;
        } else if (
          curRaw.trim() &&
          !curRaw.trim().startsWith("#") &&
          !curRaw.trim().startsWith("```") &&
          !curRaw.trim().startsWith(">") &&
          !/^(\s*[-*_]\s*){3,}$/.test(curRaw.trim())
        ) {
          // Multiline continuation of previous list item
          if (items.length > 0) items[items.length - 1] += " " + curRaw.trim();
          i++;
        } else {
          break;
        }
      }
      blocks.push({ type: "list", listType, items });
      continue;
    }

    // 9. Regular Paragraph (accumulate until blank line or special syntax)
    const paraLines: string[] = [rawLine];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("```") &&
      !lines[i].trim().startsWith(">") &&
      !lines[i].trim().startsWith("#") &&
      !/^(\s*[-*_]\s*){3,}$/.test(lines[i].trim()) &&
      !/^\s*[-*+]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !lines[i].trim().match(/^!\[(.*?)\]\((.*?)\)$/) &&
      !extractYouTubeId(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push({ type: "paragraph", text: paraLines.join(" ") });
  }

  return blocks;
}

export function ArticleRenderer({ content = "" }: ArticleRendererProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!content) return null;

  const blocks = parseMarkdownBlocks(content);

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="article-body space-y-7 text-[16px] sm:text-[17px] leading-[1.8] text-slate-800 font-sans">
      {blocks.map((block, idx) => {
        // 1. YouTube video
        if (block.type === "youtube") {
          return (
            <div key={idx} className="my-8">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-950">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${block.id}?rel=0`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
              <p className="text-center text-xs text-slate-400 mt-2 font-medium">
                Watch video directly in article
              </p>
            </div>
          );
        }

        // 2. Image
        if (block.type === "image") {
          return (
            <figure key={idx} className="my-8">
              <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-md bg-slate-50">
                <img
                  src={block.url}
                  alt={block.alt || "ProofDeck Article Illustration"}
                  className="w-full h-auto max-h-[550px] object-cover object-center"
                  loading="lazy"
                />
              </div>
              {block.alt && (
                <figcaption className="text-center text-xs text-slate-500 mt-2.5 font-medium italic">
                  {block.alt}
                </figcaption>
              )}
            </figure>
          );
        }

        // 3. Blockquote
        if (block.type === "blockquote") {
          return (
            <blockquote
              key={idx}
              className="relative my-8 p-6 sm:p-7 rounded-2xl border-l-[5px] border-[#5B4CF5] bg-[#F7F7FA] border-t border-r border-b border-slate-200/60 shadow-xs"
            >
              <div className="flex items-start gap-4">
                <QuoteIcon className="w-8 h-8 text-[#5B4CF5] shrink-0 opacity-90 mt-1" />
                <div className="space-y-2 flex-1">
                  <p className="text-base sm:text-lg font-serif italic text-slate-800 leading-relaxed">
                    "{block.text}"
                  </p>
                  {block.author && (
                    <footer className="text-xs font-bold text-[#5B4CF5] tracking-wide uppercase">
                      — {block.author}
                    </footer>
                  )}
                </div>
              </div>
            </blockquote>
          );
        }

        // 4. Code Block
        if (block.type === "code") {
          return (
            <div key={idx} className="my-7 rounded-2xl overflow-hidden border border-slate-800 bg-[#0B0B12] shadow-xl">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                  <span className="ml-2 font-mono uppercase text-[11px] font-semibold text-slate-300">
                    {block.lang}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyCode(block.code, idx)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors"
                >
                  {copiedIndex === idx ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed">
                <code>{block.code}</code>
              </pre>
            </div>
          );
        }

        // 5. Headings
        if (block.type === "heading") {
          if (block.level === 1) {
            return (
              <h1 key={idx} className="text-3xl sm:text-4xl font-extrabold text-[#0B0B12] tracking-tight leading-tight pt-6 pb-2">
                {block.text}
              </h1>
            );
          }
          if (block.level === 2) {
            return (
              <h2
                key={idx}
                className="text-2xl sm:text-3xl font-extrabold text-[#0B0B12] tracking-tight leading-snug pt-6 pb-2 scroll-mt-24 border-b border-slate-100"
              >
                {block.text}
              </h2>
            );
          }
          if (block.level === 3) {
            return (
              <h3
                key={idx}
                className="text-xl sm:text-2xl font-bold text-[#0B0B12] tracking-tight leading-snug pt-4 pb-1 scroll-mt-24"
              >
                {block.text}
              </h3>
            );
          }
          return (
            <h4 key={idx} className="text-lg font-bold text-[#0B0B12] pt-3">
              {block.text}
            </h4>
          );
        }

        // 6. Horizontal Rule
        if (block.type === "hr") {
          return <hr key={idx} className="my-10 border-slate-200" />;
        }

        // 7. Lists
        if (block.type === "list") {
          if (block.listType === "ol") {
            return (
              <ol key={idx} className="my-5 space-y-2.5 pl-6 list-decimal marker:font-bold marker:text-[#5B4CF5]">
                {block.items.map((item, lIdx) => (
                  <li key={lIdx} className="leading-relaxed pl-1 text-slate-800 font-normal">
                    <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} />
                  </li>
                ))}
              </ol>
            );
          }
          return (
            <ul key={idx} className="my-5 space-y-2.5 pl-6 list-disc marker:text-[#5B4CF5]">
              {block.items.map((item, lIdx) => (
                <li key={lIdx} className="leading-relaxed pl-1 text-slate-800 font-normal">
                  <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} />
                </li>
              ))}
            </ul>
          );
        }

        // 8. Regular paragraph
        return (
          <p
            key={idx}
            className="leading-relaxed text-slate-800 font-normal"
            dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(block.text) }}
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
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Bold: **text**
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#0B0B12]">$1</strong>');

  // Italic: *text*
  formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

  // Inline Code: `code`
  formatted = formatted.replace(
    /`([^`]+)`/g,
    '<code class="px-1.5 py-0.5 rounded bg-slate-100 text-[#5B4CF5] font-mono text-[13px] border border-slate-200/70">$1</code>'
  );

  // Links: [text](url)
  formatted = formatted.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#5B4CF5] hover:text-[#4433E0] font-semibold underline underline-offset-4 decoration-indigo-300 hover:decoration-[#5B4CF5] transition-colors">$1</a>'
  );

  return formatted;
}

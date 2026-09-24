import React from "react";

interface CategoryBadgeProps {
  category: string;
  className?: string;
  size?: "sm" | "md";
}

export function CategoryBadge({ category, className = "", size = "md" }: CategoryBadgeProps) {
  const catLower = (category || "").toLowerCase().trim();

  let colorClasses = "bg-slate-100 text-slate-700 border-slate-200/80";

  if (catLower.includes("how to") || catLower === "how to") {
    colorClasses = "bg-indigo-50 text-[#5B4CF5] border-indigo-200/60";
  } else if (catLower.includes("dev") || catLower === "for devs") {
    colorClasses = "bg-emerald-50 text-emerald-700 border-emerald-200/60";
  } else if (catLower.includes("general") || catLower === "general") {
    colorClasses = "bg-sky-50 text-sky-700 border-sky-200/60";
  } else if (catLower.includes("security") || catLower.includes("verification")) {
    colorClasses = "bg-purple-50 text-purple-700 border-purple-200/60";
  }

  const sizeClasses = size === "sm" 
    ? "text-[10px] px-2 py-0.5" 
    : "text-[11px] px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center font-bold tracking-wider uppercase rounded-md border ${colorClasses} ${sizeClasses} ${className}`}
    >
      {category}
    </span>
  );
}

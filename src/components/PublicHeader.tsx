"use client";

import React, { useState } from "react";
import Link from "next/link";

interface HeaderProps {
  currentCategory?: string;
}

export function PublicHeader({ currentCategory }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { label: "General", href: "/?category=General", slug: "general" },
    { label: "How to", href: "/?category=How+to", slug: "how to" },
    { label: "For devs", href: "/?category=For+devs", slug: "for devs" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo - Just ProofDeck, No pills, No 'ProofDeck Blog' */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 no-underline group">
            <img
              src="/logo.png"
              alt="ProofDeck"
              className="w-8 h-8 rounded-lg shadow-2xs group-hover:scale-105 transition-transform"
            />
            <span className="font-bold text-lg text-slate-900 tracking-tight group-hover:text-[#4A3AA8] transition-colors">
              ProofDeck
            </span>
          </Link>

          {/* Desktop Nav Items: The Categories */}
          <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-slate-600">
            {categories.map((cat) => {
              const isActive = currentCategory?.toLowerCase() === cat.slug;
              return (
                <Link
                  key={cat.slug}
                  href={cat.href}
                  className={`no-underline transition-colors pb-0.5 ${
                    isActive
                      ? "text-[#4A3AA8] font-bold border-b-2 border-[#4A3AA8]"
                      : "text-slate-600 hover:text-slate-950 font-medium"
                  }`}
                >
                  {cat.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* CTA Button to main site to signup / continue to proofdeck */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="https://www.proofdeck.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium text-slate-500 hover:text-slate-900 transition-colors no-underline"
          >
            Visit ProofDeck &rarr;
          </a>
          <a
            href="https://www.proofdeck.app/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 rounded-full text-[13px] font-medium text-white bg-[#4A3AA8] hover:bg-[#3b2e88] transition-all shadow-xs no-underline cursor-pointer"
          >
            Sign Up
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-lg">
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pb-1">
              Categories
            </p>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg no-underline"
              >
                {cat.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="https://www.proofdeck.app"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-center text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl no-underline"
            >
              Main Website
            </a>
            <a
              href="https://www.proofdeck.app/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-center text-xs font-bold text-white bg-[#4A3AA8] rounded-xl no-underline shadow-xs"
            >
              Sign Up on ProofDeck
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

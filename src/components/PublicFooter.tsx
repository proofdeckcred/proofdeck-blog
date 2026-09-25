import React from "react";

export function PublicFooter() {
  return (
    <footer className="pd-dot-grid border-t border-slate-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-8 lg:gap-x-12 mb-16">
          {/* Brand Column */}
          <div>
            <a href="https://www.proofdeck.app" className="flex items-center gap-2.5 h-9 mb-5 no-underline">
              <img
                src="/logo.png"
                alt="ProofDeck"
                className="w-9 h-9 rounded-lg shadow-2xs"
              />
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                ProofDeck
              </span>
            </a>
            <p className="text-sm text-slate-500 mb-6 max-w-sm leading-relaxed">
              The modern standard for issuing verifiable digital credentials.
              Built for speed, security, and scale.
            </p>
            <div className="flex items-center space-x-3">
              {/* X / Twitter */}
              <a
                href="https://x.com/proofdeck"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-indigo-50 hover:text-[#5B4CF5] transition-all no-underline"
                aria-label="X / Twitter"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/proofdeckhq/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-indigo-50 hover:text-[#5B4CF5] transition-all no-underline"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@proofdeck"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-indigo-50 hover:text-[#5B4CF5] transition-all no-underline"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.proofdeck.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-indigo-50 hover:text-[#5B4CF5] transition-all no-underline"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <div className="h-9 flex items-center mb-5">
              <h4 className="font-bold text-slate-900 text-sm m-0">
                Product
              </h4>
            </div>
            <ul className="space-y-3.5 list-none p-0 m-0 pl-0 text-sm font-medium">
              <li>
                <a href="https://www.proofdeck.app/dashboard" className="text-slate-500 hover:text-slate-900 transition-colors no-underline">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="https://www.proofdeck.app/features" className="text-slate-500 hover:text-slate-900 transition-colors no-underline">
                  Features
                </a>
              </li>
              <li>
                <a href="https://www.proofdeck.app/pricing" className="text-slate-500 hover:text-slate-900 transition-colors no-underline">
                  Pricing
                </a>
              </li>
              <li>
                <a href="https://www.proofdeck.app/contact" className="text-slate-500 hover:text-slate-900 transition-colors no-underline">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <div className="h-9 flex items-center mb-5">
              <h4 className="font-bold text-slate-900 text-sm m-0">
                Resources
              </h4>
            </div>
            <ul className="space-y-3.5 list-none p-0 m-0 pl-0 text-sm font-medium">
              <li>
                <a href="https://www.proofdeck.app/docs" className="text-slate-500 hover:text-slate-900 transition-colors no-underline">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://www.proofdeck.app/search" className="text-slate-500 hover:text-slate-900 transition-colors no-underline">
                  Public Ledger
                </a>
              </li>
              <li>
                <a href="https://www.proofdeck.app/verify" className="text-slate-500 hover:text-slate-900 transition-colors no-underline">
                  Verification Portal
                </a>
              </li>
              <li>
                <a href="/" className="text-slate-500 hover:text-slate-900 transition-colors no-underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="h-9 flex items-center mb-5">
              <h4 className="font-bold text-slate-900 text-sm m-0">
                Company
              </h4>
            </div>
            <ul className="space-y-3.5 list-none p-0 m-0 pl-0 text-sm font-medium">
              <li>
                <a href="https://www.bolaji.tech/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 transition-colors no-underline">
                  About / Founder
                </a>
              </li>
              <li>
                <a href="https://www.proofdeck.app/contact" className="text-slate-500 hover:text-slate-900 transition-colors no-underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="https://www.proofdeck.app/legal?tab=privacy" className="text-slate-500 hover:text-slate-900 transition-colors no-underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://www.proofdeck.app/legal?tab=terms" className="text-slate-500 hover:text-slate-900 transition-colors no-underline">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center my-14">
          <p className="text-xl font-bold text-slate-900 mb-1.5">Stay credible.</p>
          <p className="text-sm text-slate-500 mb-6">Issue your first certificate today.</p>
          <a
            href="https://www.proofdeck.app/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-7 py-2.5 rounded-full text-sm font-semibold text-white bg-[#5B4CF5] hover:bg-[#4433E0] transition-all shadow-xs no-underline cursor-pointer"
          >
            Get started
          </a>
        </div>

        {/* Bottom Bar - Exactly matching Image 1 */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs text-slate-400 font-medium m-0">
            &copy; 2026 ProofDeck &middot; A BMDL Technologies Ltd. product &middot; RC 9840518
          </p>
          <div className="flex items-center gap-8 text-xs font-medium text-slate-400">
            <a href="https://www.proofdeck.app/legal?tab=privacy" className="text-slate-400 hover:text-slate-600 transition-colors no-underline">
              Privacy
            </a>
            <a href="https://www.proofdeck.app/legal?tab=terms" className="text-slate-400 hover:text-slate-600 transition-colors no-underline">
              Terms
            </a>
            <a href="https://www.proofdeck.app/legal?tab=security" className="text-slate-400 hover:text-slate-600 transition-colors no-underline">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from "react";

export function CredentialSealIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="22" fill="#5B4CF5" fillOpacity="0.08" stroke="#5B4CF5" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="24" cy="24" r="17" fill="#5B4CF5" />
      <path d="M19 24.5L22.5 28L29 20" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 38L15 45L24 41L33 45L31 38" fill="#5B4CF5" />
    </svg>
  );
}

export function DevTerminalIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="40" height="32" rx="8" fill="#0B0B12" stroke="#27272A" strokeWidth="2" />
      <circle cx="11" cy="14" r="2" fill="#EF4444" />
      <circle cx="17" cy="14" r="2" fill="#F59E0B" />
      <circle cx="23" cy="14" r="2" fill="#10B981" />
      <path d="M13 25L19 29L13 33" stroke="#5B4CF5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="23" y1="33" x2="31" y2="33" stroke="#A1A1AA" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function HowToGuideIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="6" width="32" height="36" rx="6" fill="#F7F7FA" stroke="#E7E5F0" strokeWidth="2" />
      <rect x="8" y="6" width="6" height="36" rx="2" fill="#5B4CF5" />
      <rect x="18" y="14" width="16" height="3" rx="1.5" fill="#A1A1AA" />
      <rect x="18" y="21" width="14" height="3" rx="1.5" fill="#D4D4D8" />
      <rect x="18" y="28" width="10" height="3" rx="1.5" fill="#E4E4E7" />
      <circle cx="34" cy="33" r="8" fill="#5B4CF5" />
      <path d="M31.5 33L33.5 35L36.5 31" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function QuoteIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.5 7C7.46 7 5 9.46 5 12.5C5 15.54 7.46 18 10.5 18C10.5 20.76 8.26 23 5.5 23C5.22 23 5 23.22 5 23.5V25.5C5 25.78 5.22 26 5.5 26C11.3 26 16 21.3 16 15.5V12.5C16 9.46 13.54 7 10.5 7ZM24.5 7C21.46 7 19 9.46 19 12.5C19 15.54 21.46 18 24.5 18C24.5 20.76 22.26 23 19.5 23C19.22 23 19 23.22 19 23.5V25.5C19 25.78 19.22 26 19.5 26C25.3 26 30 21.3 30 15.5V12.5C30 9.46 27.54 7 24.5 7Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function YouTubePlayIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 68 48" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
        fill="#FF0000"
      />
      <path d="M45 24L27 14v20z" fill="#FFFFFF" />
    </svg>
  );
}

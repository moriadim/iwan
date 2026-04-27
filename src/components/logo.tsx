import React from "react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-auto"
      >
        {/* Arch Lines - Gold */}
        <path d="M20 60 C 20 20, 80 20, 80 60" stroke="#D4AF37" strokeWidth="2" fill="none" />
        <path d="M25 60 C 25 25, 75 25, 75 60" stroke="#D4AF37" strokeWidth="2" fill="none" />
        <path d="M30 60 C 30 30, 70 30, 70 60" stroke="#D4AF37" strokeWidth="2" fill="none" />
        <path d="M35 60 C 35 35, 65 35, 65 60" stroke="#D4AF37" strokeWidth="2" fill="none" />
        <path d="M40 60 C 40 40, 60 40, 60 60" stroke="#D4AF37" strokeWidth="2" fill="none" />
        
        {/* Bottom Lines - Black/White depending on theme */}
        <g stroke="currentColor" strokeWidth="2">
          <path d="M20 60 L 20 100" />
          <path d="M25 60 L 25 100" />
          <path d="M30 60 L 30 100" />
          <path d="M35 60 L 35 100" />
          <path d="M40 60 L 40 100" />
          
          <path d="M80 60 L 80 100" />
          <path d="M75 60 L 75 100" />
          <path d="M70 60 L 70 100" />
          <path d="M65 60 L 65 100" />
          <path d="M60 60 L 60 100" />
          
          {/* Circuit-like zigzags at the bottom join */}
          <path d="M20 75 L 15 80 L 15 90" />
          <path d="M30 85 L 25 90 L 25 100" />
          <path d="M70 85 L 75 90 L 75 100" />
          <path d="M80 75 L 85 80 L 85 90" />
        </g>
      </svg>
      <span className="text-2xl font-bold tracking-tighter uppercase font-sans">Iwan</span>
    </div>
  );
}

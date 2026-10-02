"use client";

import { useEffect, useRef, useState } from "react";

export function OsWindow({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`os-window ${className}`}>
      <div className="os-titlebar">
        <span className="os-titlebar-text">{title}</span>
        <div className="os-dots" aria-hidden>
          <span className="os-dot min">_</span>
          <span className="os-dot close">×</span>
        </div>
      </div>
      <div className="os-body">{children}</div>
    </div>
  );
}

/** Fades children in when they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function SectionHead({ path, title, sub }: { path: string; title: string; sub?: string }) {
  return (
    <Reveal className="section-head">
      <div className="path">C:\{path}</div>
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </Reveal>
  );
}

export function FolderSvg({ color = "var(--olive)" }: { color?: string }) {
  return (
    <svg width="54" height="44" viewBox="0 0 44 38" aria-hidden>
      <path
        d="M2 10C2 8.34 3.34 7 5 7H18L22 3H39C40.66 3 42 4.34 42 6V32C42 33.66 40.66 35 39 35H5C3.34 35 2 33.66 2 32V10Z"
        fill={color}
        stroke="var(--ink)"
        strokeWidth="2"
        opacity="0.75"
      />
      <path
        d="M2 13H42V32C42 33.66 40.66 35 39 35H5C3.34 35 2 33.66 2 32V13Z"
        fill={color}
        stroke="var(--ink)"
        strokeWidth="2"
      />
    </svg>
  );
}

export function SocialIcon({ name }: { name: "github" | "linkedin" | "x" }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "github")
    return (
      <svg {...common}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    );
  if (name === "linkedin")
    return (
      <svg {...common}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}

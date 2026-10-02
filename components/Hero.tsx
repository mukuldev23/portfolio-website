"use client";

import { useEffect, useState } from "react";
import { profile, sections } from "@/data/site";
import { FolderSvg } from "./ui";
import { useShell } from "./Shell";
import { useDrag } from "./useDrag";

function useTypewriter(words: readonly string[]) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    let delay = deleting ? 45 : 90;
    if (!deleting && text === word) delay = 1600;
    if (deleting && text === "") delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setI((n) => n + 1);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);

  return text;
}

const FOLDER_COLORS = ["var(--olive)", "var(--sun)", "var(--sky)", "var(--rose)"];

export default function Hero() {
  const role = useTypewriter(profile.roles);
  const { openTerminal } = useShell();
  const note = useDrag({ x: 0, y: 0 });

  const icons = sections.filter((s) =>
    ["about", "work", "projects", "experience", "contact"].includes(s.id),
  );

  return (
    <header className="hero graph-bg" id="top">
      <div
        className="sticky-note"
        style={{ right: 48, top: 48, transform: `translate(${note.pos.x}px, ${note.pos.y}px) rotate(-3deg)` }}
        {...note.handleProps}
        aria-hidden
      >
        <strong>todo.txt</strong>
        <br />
        <s>ship portfolio</s> ✓
        <br />
        <s>add night mode</s> ✓
        <br />
        say hi to you 👋
      </div>

      <div className="container hero-grid">
        <div>
          <span className="badge">
            <span className="pulse-dot" /> {profile.status}
          </span>
          <h1>{profile.name}</h1>
          <div className="role cursor-blink" aria-label={profile.roles.join(", ")}>
            &gt; {role}
          </div>
          <p className="tagline">{profile.tagline}</p>
          <div className="hero-actions">
            <a className="retro-btn filled" href="#projects">
              View Projects →
            </a>
            <a className="retro-btn" href="#contact">
              Let&apos;s Talk
            </a>
            <button className="retro-btn" onClick={openTerminal}>
              &gt;_ Open Terminal
            </button>
          </div>
        </div>

        <div className="os-window">
          <div className="os-titlebar">
            <span className="os-titlebar-text">C:\{profile.handle}\desktop</span>
            <div className="os-dots" aria-hidden>
              <span className="os-dot min">_</span>
              <span className="os-dot close">×</span>
            </div>
          </div>
          <div className="os-body">
            <div className="desktop-icons">
              {icons.map((s, i) => (
                <a key={s.id} href={`#${s.id}`} className="folder-icon">
                  <FolderSvg color={FOLDER_COLORS[i % FOLDER_COLORS.length]} />
                  <span>{s.file}</span>
                </a>
              ))}
              <button className="folder-icon" onClick={openTerminal}>
                <svg width="54" height="44" viewBox="0 0 44 38" aria-hidden>
                  <rect x="2" y="3" width="40" height="32" rx="3" fill="#12140d" stroke="var(--ink)" strokeWidth="2" />
                  <path d="M9 13l6 5-6 5M18 24h10" stroke="#b8e07a" strokeWidth="2.5" fill="none" />
                </svg>
                <span>terminal.exe</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { profile, sections } from "@/data/site";
import { useShell } from "./Shell";

function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(id);
  }, []);
  if (!now) return <div className="clock">--:--</div>;
  return (
    <div className="clock" aria-label="Current time">
      <span className="date">
        {now.toLocaleDateString(undefined, { day: "2-digit", month: "short" })}{" "}
      </span>
      {now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
    </div>
  );
}

export default function Taskbar() {
  const { theme, toggleTheme, terminalOpen, openTerminal, closeTerminal, reboot } = useShell();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !btnRef.current?.contains(t)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView();
  };

  return (
    <>
      {menuOpen && (
        <div className="start-menu os-window" ref={menuRef} role="menu">
          <div className="side">{profile.handle}-OS</div>
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <button role="menuitem" onClick={() => go(s.id)}>
                  📁 {s.label}
                </button>
              </li>
            ))}
            <hr />
            <li>
              <button
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  openTerminal();
                }}
              >
                ⌨️ Terminal
              </button>
            </li>
            <li>
              <button role="menuitem" onClick={toggleTheme}>
                {theme === "night" ? "☀️ Day mode" : "🌙 Night mode"}
              </button>
            </li>
            <li>
              <button
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  window.scrollTo({ top: 0 });
                  reboot();
                }}
              >
                🔄 Reboot
              </button>
            </li>
          </ul>
        </div>
      )}

      <nav className="taskbar" aria-label="Taskbar">
        <button
          ref={btnRef}
          className="retro-btn filled"
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          ▣ Start
        </button>
        <div className="task-tabs">
          <button
            className="task-tab"
            aria-pressed={terminalOpen}
            onClick={() => (terminalOpen ? closeTerminal() : openTerminal())}
          >
            &gt;_ terminal
          </button>
        </div>
        <button
          className="icon-btn"
          onClick={toggleTheme}
          aria-label={theme === "night" ? "Switch to day mode" : "Switch to night mode"}
          title="Toggle night mode"
        >
          {theme === "night" ? "☀️" : "🌙"}
        </button>
        <Clock />
      </nav>
    </>
  );
}

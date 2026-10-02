"use client";

import { useEffect, useRef, useState } from "react";
import { about, experience, profile, projects, sections, skills } from "@/data/site";
import { useShell } from "./Shell";
import { useDrag } from "./useDrag";

type Line = { text: string; kind?: "cmd" | "dim" | "err" | "accent" };

const PROMPT = `${profile.handle}@portfolio:~$`;

const HELP: Line[] = [
  { text: "Available commands:", kind: "accent" },
  { text: "  whoami        who is this person?" },
  { text: "  ls            list folders on this desktop" },
  { text: "  cd <folder>   jump to a section (e.g. cd projects)" },
  { text: "  skills        print the toolbox" },
  { text: "  projects      list projects" },
  { text: "  experience    work history" },
  { text: "  contact       how to reach me" },
  { text: "  theme <day|night>" },
  { text: "  date · echo · clear · exit" },
  { text: "  …and maybe a hidden one. try sudo.", kind: "dim" },
];

export default function Terminal() {
  const { closeTerminal, setTheme } = useShell();
  const [lines, setLines] = useState<Line[]>([
    { text: `${profile.handle}-OS terminal — type 'help' to get started.`, kind: "dim" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const { pos, setPos, handleProps } = useDrag();

  // Start near the bottom-right corner, above the taskbar.
  useEffect(() => {
    const w = Math.min(560, window.innerWidth - 32);
    setPos({
      x: Math.max(16, window.innerWidth - w - 24),
      y: Math.max(16, window.innerHeight - 480),
    });
    inputRef.current?.focus({ preventScroll: true });
  }, [setPos]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  function run(raw: string) {
    const cmdLine = raw.trim();
    const out: Line[] = [{ text: `${PROMPT} ${cmdLine}`, kind: "cmd" }];
    const [cmd = "", ...args] = cmdLine.split(/\s+/);
    const arg = args.join(" ");

    switch (cmd.toLowerCase()) {
      case "":
        break;
      case "help":
        out.push(...HELP);
        break;
      case "whoami":
      case "about":
        out.push({ text: `${profile.name} — ${profile.roles[0]}`, kind: "accent" });
        out.push({ text: about.paragraphs[0] });
        break;
      case "ls":
        out.push({ text: sections.map((s) => s.id + "/").join("  ") });
        break;
      case "cd":
      case "open":
      case "goto": {
        const target = arg.replace(/[/~.]/g, "").toLowerCase();
        const s = sections.find((x) => x.id === target || x.label.toLowerCase() === target);
        if (!target || target === "home") {
          window.scrollTo({ top: 0 });
          out.push({ text: "→ home", kind: "dim" });
        } else if (s) {
          document.getElementById(s.id)?.scrollIntoView();
          out.push({ text: `→ opened ${s.file}`, kind: "dim" });
        } else {
          out.push({ text: `cd: no such folder: ${arg}`, kind: "err" });
        }
        break;
      }
      case "skills":
        out.push({ text: skills.map((s) => `[${s}]`).join(" ") });
        break;
      case "projects":
        projects.forEach((p, i) =>
          out.push({ text: `${String(i + 1).padStart(2, "0")}. ${p.title}  — ${p.tech.join(", ")}` }),
        );
        break;
      case "experience":
      case "resume":
        experience.forEach((e) => out.push({ text: `${e.period.padEnd(16)} ${e.role} @ ${e.company}` }));
        break;
      case "contact":
        out.push({ text: `email: ${profile.email}`, kind: "accent" });
        profile.socials.forEach((s) => out.push({ text: `${s.label.toLowerCase()}: ${s.href}` }));
        break;
      case "theme":
        if (arg === "day" || arg === "night") {
          setTheme(arg);
          out.push({ text: `theme set to ${arg}`, kind: "dim" });
        } else {
          out.push({ text: "usage: theme <day|night>", kind: "err" });
        }
        break;
      case "date":
        out.push({ text: new Date().toString() });
        break;
      case "echo":
        out.push({ text: arg });
        break;
      case "sudo":
        if (arg.replace(/\s/g, "") === "hire-me" || arg === "hire me" || arg === "hire") {
          out.push({ text: "[sudo] password for recruiter: ********", kind: "dim" });
          out.push({ text: "✔ Access granted. Opening mail.app …", kind: "accent" });
          setTimeout(() => document.getElementById("contact")?.scrollIntoView(), 400);
        } else {
          out.push({ text: "Nice try. Hint: sudo hire-me", kind: "err" });
        }
        break;
      case "rm":
        out.push({ text: "rm: permission denied — this portfolio is load-bearing.", kind: "err" });
        break;
      case "clear":
        setLines([]);
        return;
      case "exit":
        closeTerminal();
        return;
      default:
        out.push({ text: `command not found: ${cmd}. Type 'help'.`, kind: "err" });
    }
    setLines((l) => [...l, ...out]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(input);
      if (input.trim()) setHistory((h) => [input, ...h]);
      setHIndex(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(hIndex + 1, history.length - 1);
      if (i >= 0) {
        setHIndex(i);
        setInput(history[i]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = hIndex - 1;
      setHIndex(Math.max(i, -1));
      setInput(i >= 0 ? history[i] : "");
    } else if (e.key === "Escape") {
      closeTerminal();
    }
  }

  return (
    <div
      className="float-win os-window"
      style={{ left: 0, top: 0, transform: `translate(${pos.x}px, ${pos.y}px)` }}
      role="dialog"
      aria-label="Terminal"
    >
      <div className="os-titlebar" {...handleProps}>
        <span className="os-titlebar-text">⌨ terminal.exe — drag me</span>
        <div className="os-dots">
          <button className="os-dot min" aria-label="Minimize terminal" onClick={closeTerminal}>
            _
          </button>
          <button className="os-dot close" aria-label="Close terminal" onClick={closeTerminal}>
            ×
          </button>
        </div>
      </div>
      <div className="terminal" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
        {lines.map((l, i) => (
          <div key={i} className={`line ${l.kind ?? ""}`}>
            {l.text}
          </div>
        ))}
        <div className="term-input">
          <span className="dim">{PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Terminal input"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}

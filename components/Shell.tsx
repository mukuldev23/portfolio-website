"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import BootScreen from "./BootScreen";
import Taskbar from "./Taskbar";
import Terminal from "./Terminal";

export type Theme = "day" | "night";

type ShellState = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  terminalOpen: boolean;
  openTerminal: () => void;
  closeTerminal: () => void;
  reboot: () => void;
};

const ShellContext = createContext<ShellState | null>(null);

export function useShell() {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error("useShell must be used inside <Shell>");
  return ctx;
}

function readTheme(): Theme {
  if (typeof document === "undefined") return "day";
  return document.documentElement.dataset.theme === "night" ? "night" : "day";
}

export default function Shell({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("day");
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [bootKey, setBootKey] = useState(0);

  // The inline script in layout.tsx applies the saved theme before paint;
  // sync React state with it after hydration.
  useEffect(() => setThemeState(readTheme()), []);

  const setTheme = useCallback((t: Theme) => {
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem("theme", t);
    } catch {}
    setThemeState(t);
  }, []);

  const value: ShellState = {
    theme,
    setTheme,
    toggleTheme: () => setTheme(theme === "night" ? "day" : "night"),
    terminalOpen,
    openTerminal: () => setTerminalOpen(true),
    closeTerminal: () => setTerminalOpen(false),
    reboot: () => {
      try {
        sessionStorage.removeItem("booted");
      } catch {}
      setBootKey((k) => k + 1);
    },
  };

  return (
    <ShellContext.Provider value={value}>
      <BootScreen key={bootKey} force={bootKey > 0} />
      {children}
      {terminalOpen && <Terminal />}
      <Taskbar />
    </ShellContext.Provider>
  );
}

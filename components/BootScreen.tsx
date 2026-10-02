"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/site";

const LINES = [
  `${profile.handle.toUpperCase()}-OS BIOS v2.0`,
  "Memory test ........ 640K OK",
  "Detecting creativity ........ found",
  "Loading coffee.sys ........ done",
  "Mounting /projects ........ done",
  `Starting desktop for ${profile.name}...`,
];

/** Plays once per browser session; `force` replays it (Start → Reboot). */
export default function BootScreen({ force = false }: { force?: boolean }) {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("booted") === "1";
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if ((seen && !force) || (reduced && !force)) return;
    setShow(true);
  }, [force]);

  useEffect(() => {
    if (!show || leaving) return;
    if (count >= LINES.length) {
      const t = setTimeout(finish, 450);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCount((c) => c + 1), 260);
    return () => clearTimeout(t);
  });

  useEffect(() => {
    if (!show) return;
    const skip = () => finish();
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  });

  function finish() {
    if (leaving) return;
    try {
      sessionStorage.setItem("booted", "1");
    } catch {}
    setLeaving(true);
    setTimeout(() => setShow(false), 450);
  }

  if (!show) return null;

  return (
    <div className={`boot${leaving ? " out" : ""}`} onClick={finish} role="presentation">
      {LINES.slice(0, count).map((l, i) => (
        <div key={i}>{l}</div>
      ))}
      <div className="boot-bar" aria-hidden>
        <div style={{ width: `${(count / LINES.length) * 100}%` }} />
      </div>
      <div className="skip">Press any key or click to skip_</div>
    </div>
  );
}

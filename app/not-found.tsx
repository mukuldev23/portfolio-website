import Link from "next/link";
import { OsWindow } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="graph-bg" style={{ minHeight: "calc(100svh - var(--taskbar-h))", display: "grid", placeItems: "center", padding: 20 }}>
      <OsWindow title="error.exe" className="" >
        <div style={{ maxWidth: 380, textAlign: "center" }}>
          <div className="type" style={{ fontSize: "3rem", color: "var(--olive)" }}>404</div>
          <p className="mono" style={{ margin: "8px 0 4px" }}>
            The system cannot find the path specified.
          </p>
          <p style={{ color: "var(--muted)", marginBottom: 20 }}>
            Looks like this page doesn&apos;t exist. Let&apos;s get you back on track.
          </p>
          <Link className="retro-btn filled" href="/">
            ← Back to Desktop
          </Link>
        </div>
      </OsWindow>
    </main>
  );
}

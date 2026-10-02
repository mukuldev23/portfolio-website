"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/site";
import { OsWindow, Reveal, SectionHead } from "./ui";

const FILTERS = ["All", ...Array.from(new Set(projects.map((p) => p.category)))] as const;

function slug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "_") + ".app";
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const shown = projects.filter((p: Project) => filter === "All" || p.category === filter);

  return (
    <section id="projects" className="section graph-bg">
      <div className="container">
        <SectionHead
          path="projects"
          title="Things I've Built"
          sub="Client work, side projects and experiments. Filter by folder."
        />
        <div className="filters" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f}
              className="retro-btn"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid-3">
          {shown.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <OsWindow title={slug(p.title)} className="card lift">
                {p.status && <span className="status-pill">{p.status} 🚧</span>}
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="tags">
                  {p.tech.map((t) => (
                    <span key={t} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
                {(p.live || p.code) && (
                  <div className="project-links">
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer">
                        Live ↗
                      </a>
                    )}
                    {p.code && (
                      <a href={p.code} target="_blank" rel="noreferrer">
                        Code ↗
                      </a>
                    )}
                  </div>
                )}
              </OsWindow>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

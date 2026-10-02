import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import { OsWindow, Reveal, SectionHead } from "@/components/ui";
import {
  about,
  certifications,
  education,
  experience,
  profile,
  skillGroups,
  skills,
  testimonials,
  workDone,
} from "@/data/site";

export default function Home() {
  return (
    <main>
      <Hero />

      <div className="olive-bar" aria-hidden>
        <div className="marquee">
          {[0, 1].map((k) => (
            <span key={k} style={{ display: "inline-flex", gap: 40 }}>
              {skills.map((s) => (
                <span key={s}>✦ {s}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* About */}
      <section id="about" className="section">
        <div className="container">
          <SectionHead path="about_me.txt" title="Hello, World!" />
          <Reveal>
            <OsWindow title="about_me.txt — Notepad">
              <div className="about-body">
                {about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="grid-3" style={{ marginTop: 24 }}>
                {about.stats.map((s) => (
                  <div key={s.label} className="stat">
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </OsWindow>
          </Reveal>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section graph-bg">
        <div className="container">
          <SectionHead path="toolbox" title="My Toolbox" sub="The stack I reach for every day." />
          {skillGroups.map((g) => (
            <div key={g.title} className="skill-group">
              <h3 className="mono">{`// ${g.title}`}</h3>
              <div className="grid-4">
                {g.items.map((s, i) => (
                  <Reveal key={s} delay={i * 40}>
                    <div className="skill">
                      <i>{s.slice(0, 2)}</i>
                      {s}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What I've Done */}
      <section id="work" className="section">
        <div className="container">
          <SectionHead
            path="what_i_did.log"
            title="What I've Done"
            sub="Across frameworks and backends — the kinds of applications I've built and shipped."
          />
          <div className="grid-3">
            {workDone.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <OsWindow title={`work_0${i + 1}.log`} className="card lift">
                  <h3>{s.title}</h3>
                  <div className="price">{s.context}</div>
                  <p>{s.desc}</p>
                  <div className="tags">
                    {s.tags.map((t) => (
                      <span key={t} className="tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </OsWindow>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Projects />

      {/* Experience */}
      <section id="experience" className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <SectionHead path="resume.pdf" title="Experience" />
          <Reveal>
            <OsWindow title="resume.pdf — Viewer">
              <div className="timeline">
                {experience.map((e) => (
                  <div key={e.role + e.company} className="tl-item">
                    <div className="tl-head">
                      <h3>{e.role}</h3>
                      <span className="tl-meta">{e.period}</span>
                    </div>
                    <div className="tl-meta" style={{ color: "var(--muted)" }}>
                      @ {e.company}
                    </div>
                    <ul>
                      {e.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="grid-2 resume-extra">
                <div>
                  <h4 className="mono">{"// Education"}</h4>
                  <p>
                    <strong>{education.degree}</strong>
                    <br />
                    {education.school}
                    <br />
                    <span className="tl-meta">{education.period}</span>
                  </p>
                </div>
                <div>
                  <h4 className="mono">{"// Certifications"}</h4>
                  <ul className="checklist">
                    {certifications.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div style={{ marginTop: 28 }}>
                <a className="retro-btn filled" href={profile.resumeUrl} target="_blank" rel="noreferrer">
                  ⬇ Download Resume
                </a>
              </div>
            </OsWindow>
          </Reveal>
        </div>
      </section>

      {/* Testimonials — hidden until data/site.ts has real quotes */}
      {testimonials.length > 0 && (
      <section id="testimonials" className="section">
        <div className="container">
          <SectionHead path="reviews.log" title="What Clients Say" sub="Real feedback from people I've worked with." />
          <div className="grid-2">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <OsWindow title={`review_0${i + 1}.log`} className="card">
                  <p className="quote">{t.quote}</p>
                  <div className="quote-by">
                    — {t.name}
                    <small>{t.role}</small>
                  </div>
                </OsWindow>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      <Contact />

      <footer className="footer">
        © {new Date().getFullYear()} {profile.name} · built with Next.js · psst — open the terminal and try{" "}
        <code>sudo hire-me</code>
      </footer>
    </main>
  );
}

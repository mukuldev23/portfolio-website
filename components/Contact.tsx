import { profile } from "@/data/site";
import { OsWindow, Reveal, SectionHead, SocialIcon } from "./ui";

export default function Contact() {
  return (
    <section id="contact" className="section graph-bg">
      <div className="container" style={{ maxWidth: 560 }}>
        <SectionHead
          path="mail.app"
          title="Let's Connect"
          sub="Open to full-stack and GenAI roles. Drop me an email and I'll get back to you."
        />
        <Reveal>
          <OsWindow title="contact.cfg">
            <p className="mono" style={{ fontSize: 14 }}>
              email: <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <br />
              location: {profile.location}
            </p>
            <div className="socials" style={{ marginTop: 20 }}>
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  className="social-btn"
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                >
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>
          </OsWindow>
        </Reveal>
      </div>
    </section>
  );
}

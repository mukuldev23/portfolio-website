# portfolio-website

Personal portfolio of **Mukul Chavan**, Sr Software Engineer (Full Stack JavaScript and GenAI).

The site looks like a retro desktop: cream graph paper, olive window chrome and typewriter fonts. Every section sits inside its own OS-style window.

Built with **Next.js 16 (App Router)**, **React 19** and **TypeScript**. It uses no UI or CSS framework, just one hand-written stylesheet.

## Features

- **Boot screen**: a BIOS-style start-up sequence plays once per browser session. Press any key or click to skip it.
- **Working terminal**: a draggable `terminal.exe` window with commands such as `help`, `whoami`, `ls`, `cd <section>`, `skills`, `projects`, `experience`, `contact`, `theme day|night` and `clear`, plus a hidden easter egg (`sudo hire-me`). Up and down arrows recall earlier commands.
- **Taskbar and Start menu**: a fixed bottom bar with section shortcuts, a terminal toggle, night mode, a reboot option and a live clock.
- **Night mode**: a phosphor-green CRT theme with scanlines. The choice is remembered in `localStorage` and applied before first paint, so the page doesn't flash the light theme.
- **Desktop icons**: folder icons in the hero jump to sections, and a draggable sticky note sits beside them.
- **Project filter**: tabs for All, GenAI, Work and Personal.
- **Scroll reveal and typewriter roles**: sections fade in as you scroll, and the job titles in the hero type themselves out.
- **Accessibility**: keyboard focus styles and ARIA labels. Animations are reduced when the visitor's system asks for reduced motion.
- A retro 404 page.

## Sections

Hero → About → Toolbox (skills) → What I've Done → Projects → Experience (with education and certifications) → Contact

A Testimonials section is also built in. It stays hidden until you add entries to `testimonials`.

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Editing content

All text lives in **[`data/site.ts`](data/site.ts)**. The page sections and the terminal both read from this file, so you rarely need to touch a component.

| Export | Controls |
|---|---|
| `profile` | Name, rotating roles, tagline, status badge, email, location, socials, resume link |
| `about` | About paragraphs and stat boxes |
| `skillGroups` | Toolbox groups. They also feed the scrolling skills bar and the `skills` terminal command |
| `workDone` | "What I've Done" cards (Angular, Nuxt, React, Node, LLM) |
| `projects` | Project cards. Optional fields: `live`, `code` and `status` (e.g. `"In Progress"`) |
| `experience` | Work history timeline |
| `education`, `certifications` | Shown under the timeline |
| `testimonials` | Quotes. The section stays hidden while this list is empty |
| `sections` | Start menu entries, desktop icons and terminal `ls` / `cd` targets |

**Resume download:** the **Download Resume** button serves `public/Mukul_Chavan_Resume.pdf`. Replace that file to update the resume.

## Project structure

```
app/
  layout.tsx        # fonts, metadata, theme pre-paint script, <Shell>
  page.tsx          # all page sections
  not-found.tsx     # retro 404
  globals.css       # design tokens, components, night theme, responsive rules
components/
  Shell.tsx         # shared state: theme, terminal, reboot
  BootScreen.tsx    # start-up sequence
  Taskbar.tsx       # Start menu, clock, theme toggle
  Terminal.tsx      # interactive terminal
  Hero.tsx          # hero, typewriter, desktop icons, sticky note
  Projects.tsx      # filterable project grid
  Contact.tsx       # contact details and socials
  ui.tsx            # OsWindow, Reveal, SectionHead, icons
  useDrag.ts        # pointer-based dragging
data/
  site.ts           # all site content
public/
  favicon.svg
```

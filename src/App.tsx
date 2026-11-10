import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FiBriefcase,
  FiCode,
  FiCopy,
  FiDownload,
  FiFolder,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMoon,
  FiSun,
  FiUser,
} from 'react-icons/fi';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Experience } from './components/Experience/Experience';
import { Skills } from './components/Skills/Skills';
import { Projects } from './components/Projects/Projects';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { CommandPalette, type Command } from './components/CommandPalette/CommandPalette';
import { profile, sections } from './data/profile';
import { asset } from './lib/asset';
import { useTheme } from './hooks/useTheme';
import { useReveal } from './hooks/useReveal';

const SECTION_ICONS = {
  about: <FiUser />,
  experience: <FiBriefcase />,
  skills: <FiCode />,
  projects: <FiFolder />,
  contact: <FiMail />,
} as const;

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  useReveal();

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  // ⌘K / Ctrl+K toggles the command menu from anywhere.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const commands = useMemo<Command[]>(() => {
    const goTo = (id: string) => () => {
      document.getElementById(id)?.scrollIntoView();
      history.replaceState(null, '', `#${id}`);
    };
    return [
      ...sections.map(({ id, label }) => ({
        id: `go-${id}`,
        label,
        group: 'Navigate',
        icon: SECTION_ICONS[id],
        run: goTo(id),
      })),
      {
        id: 'copy-email',
        label: 'Copy email address',
        group: 'Actions',
        icon: <FiCopy />,
        keywords: 'contact mail clipboard',
        run: () => void navigator.clipboard?.writeText(profile.email),
      },
      {
        id: 'download-cv',
        label: 'Download CV (PDF)',
        group: 'Actions',
        icon: <FiDownload />,
        keywords: 'resume curriculum',
        run: () => {
          const link = document.createElement('a');
          link.href = asset(profile.resumeFile);
          link.download = profile.resumeFile;
          link.click();
        },
      },
      {
        id: 'toggle-theme',
        label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
        group: 'Actions',
        icon: theme === 'dark' ? <FiSun /> : <FiMoon />,
        keywords: 'theme dark light mode appearance',
        run: toggleTheme,
      },
      {
        id: 'github',
        label: 'GitHub',
        group: 'Links',
        icon: <FiGithub />,
        run: () => window.open(profile.links.github, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        group: 'Links',
        icon: <FiLinkedin />,
        run: () => window.open(profile.links.linkedin, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'source',
        label: 'View source code',
        group: 'Links',
        icon: <FiCode />,
        keywords: 'repository repo github',
        run: () => window.open(profile.sourceCode, '_blank', 'noopener,noreferrer'),
      },
    ];
  }, [theme, toggleTheme]);

  const shortcutLabel = isMac ? '⌘K' : 'Ctrl K';

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenPalette={openPalette}
        shortcutLabel={shortcutLabel}
      />
      <main id="main" tabIndex={-1}>
        <span id="top" />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer shortcutLabel={shortcutLabel} />
      <CommandPalette open={paletteOpen} onClose={closePalette} commands={commands} />
    </>
  );
}

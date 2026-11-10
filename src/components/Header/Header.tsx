import { useEffect, useState } from 'react';
import { FiCommand, FiMenu } from 'react-icons/fi';
import { sections } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import type { Theme } from '../../hooks/useTheme';
import styles from './Header.module.css';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  onOpenPalette: () => void;
  shortcutLabel: string;
}

const sectionIds = sections.map((s) => s.id);

export function Header({ theme, onToggleTheme, onOpenPalette, shortcutLabel }: HeaderProps) {
  const active = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.logo} aria-label="Alejandro Gutierrez Novo, back to top">
          <span aria-hidden="true">
            &lt;<span className={styles.logoName}>AG</span> /&gt;
          </span>
        </a>

        <nav aria-label="Primary" className={styles.nav}>
          <ul role="list" className={styles.links}>
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={styles.link}
                  aria-current={active === id ? 'location' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.paletteBtn}
            onClick={onOpenPalette}
            aria-label="Open command menu"
            aria-keyshortcuts="Control+K Meta+K"
          >
            <FiCommand aria-hidden="true" />
            <span className={styles.paletteLabel}>Quick nav</span>
            <kbd className={styles.kbd}>{shortcutLabel}</kbd>
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            className={`icon-btn ${styles.menuBtn}`}
            onClick={onOpenPalette}
            aria-label="Open menu"
          >
            <FiMenu aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}

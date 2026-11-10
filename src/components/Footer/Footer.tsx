import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { profile } from '../../data/profile';
import styles from './Footer.module.css';

interface FooterProps {
  shortcutLabel: string;
}

export function Footer({ shortcutLabel }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React, TypeScript & Vite —{' '}
          <a href={profile.sourceCode} target="_blank" rel="noreferrer" className={styles.link}>
            view source
          </a>
          .
        </p>
        <p className={styles.hint}>
          Press <kbd>{shortcutLabel}</kbd> to navigate
        </p>
        <ul role="list" className={styles.socials}>
          <li>
            <a
              className="icon-btn"
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub (opens in a new tab)"
            >
              <FiGithub aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              className="icon-btn"
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn (opens in a new tab)"
            >
              <FiLinkedin aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

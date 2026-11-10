import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi';
import { profile } from '../../data/profile';
import { asset } from '../../lib/asset';
import { useLocalTime } from '../../hooks/useLocalTime';
import styles from './Hero.module.css';

export function Hero() {
  const localTime = useLocalTime(profile.timeZone);

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.status}>
            <span className={styles.pulse} aria-hidden="true" />
            {profile.availability}
          </p>

          <h1 id="hero-title" className={styles.title}>
            {profile.name}
          </h1>
          <p className={styles.role}>
            {profile.role}
            <span className={styles.stack}>React · TypeScript · Redux · Jest</span>
          </p>
          <p className={styles.summary}>{profile.summary}</p>

          <div className={styles.ctas}>
            <a className="btn btn-primary" href={asset(profile.resumeFile)} download>
              <FiDownload aria-hidden="true" /> Download CV
            </a>
            <a className="btn" href="#contact">
              Get in touch <FiArrowRight aria-hidden="true" />
            </a>
          </div>

          <div className={styles.meta}>
            <p className={styles.location}>
              <FiMapPin aria-hidden="true" />
              {profile.location} ·{' '}
              <time aria-label={`Local time in ${profile.location}`}>{localTime}</time>
              <span className={styles.offset}>({profile.utcOffsetLabel})</span>
            </p>
            <ul role="list" className={styles.socials}>
              <li>
                <a
                  className="icon-btn"
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile (opens in a new tab)"
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
                  aria-label="LinkedIn profile (opens in a new tab)"
                >
                  <FiLinkedin aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  className="icon-btn"
                  href={`mailto:${profile.email}`}
                  aria-label={`Email ${profile.email}`}
                >
                  <FiMail aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.portrait}>
          <img
            src={asset('images/avatar.webp')}
            alt={`Portrait of ${profile.name}`}
            width={480}
            height={480}
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}

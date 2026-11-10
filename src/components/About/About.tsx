import { about, stats } from '../../data/profile';
import { Section } from '../Section/Section';
import styles from './About.module.css';

export function About() {
  return (
    <Section id="about" index={1} title="About">
      <div className={styles.grid}>
        <div className={styles.text}>
          {about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <dl className={styles.stats}>
          {stats.map(({ value, label }) => (
            <div key={label} className={`card ${styles.stat}`}>
              <dt className={styles.label}>{label}</dt>
              <dd className={styles.value}>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

import { earlierExperience, experience } from '../../data/profile';
import { Section } from '../Section/Section';
import styles from './Experience.module.css';

export function Experience() {
  return (
    <Section id="experience" index={2} title="Experience">
      <ol className={styles.timeline}>
        {experience.map((job) => (
          <li key={`${job.company}-${job.start}`} className={styles.item}>
            <p className={styles.period}>
              <time>{job.start}</time> — <time>{job.end}</time>
            </p>
            <div className={styles.body}>
              <h3 className={styles.role}>
                {job.role} <span className={styles.at}>@</span>{' '}
                <span className={styles.company}>{job.company}</span>
              </h3>
              <p className={styles.where}>
                {job.companyNote ? `${job.companyNote} · ` : ''}
                {job.location}
              </p>
              <ul className={styles.highlights}>
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <ul role="list" className="tags" aria-label={`Technologies used at ${job.company}`}>
                {job.stack.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <p className={styles.earlier}>
        <span className={styles.earlierLabel}>Earlier</span> {earlierExperience}
      </p>
    </Section>
  );
}

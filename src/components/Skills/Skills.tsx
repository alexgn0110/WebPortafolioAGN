import { skills } from '../../data/profile';
import { Section } from '../Section/Section';
import styles from './Skills.module.css';

export function Skills() {
  return (
    <Section id="skills" index={3} title="Skills">
      <div className={styles.grid}>
        {skills.map((group) => (
          <section key={group.title} className={`card ${styles.group}`} aria-label={group.title}>
            <h3 className={styles.title}>{group.title}</h3>
            <ul role="list" className={styles.list}>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  );
}

import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { projects } from '../../data/profile';
import { asset } from '../../lib/asset';
import { Section } from '../Section/Section';
import styles from './Projects.module.css';

export function Projects() {
  return (
    <Section id="projects" index={4} title="Projects">
      <ul role="list" className={styles.grid}>
        {projects.map((project) => (
          <li key={project.title} className={project.featured ? styles.featured : undefined}>
            <article className={`card ${styles.card}`}>
              <div className={styles.media}>
                <img
                  src={asset(project.image)}
                  alt={project.imageAlt}
                  width={960}
                  height={project.featured ? 504 : 600}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className={styles.body}>
                <p className={styles.year}>{project.year}</p>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <ul role="list" className="tags" aria-label={`Built with`}>
                  {project.tags.map((tag) => (
                    <li key={tag} className="tag">
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className={styles.links}>
                  <a href={project.code} target="_blank" rel="noreferrer" className={styles.link}>
                    <FiGithub aria-hidden="true" /> Code
                    <span className="visually-hidden">
                      {' '}
                      for {project.title} (opens in a new tab)
                    </span>
                  </a>
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer" className={styles.link}>
                      <FiExternalLink aria-hidden="true" /> Live demo
                      <span className="visually-hidden">
                        {' '}
                        of {project.title} (opens in a new tab)
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}

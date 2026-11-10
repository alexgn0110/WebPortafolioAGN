import { useRef, useState, type FormEvent } from 'react';
import { FiCheck, FiCopy, FiLinkedin, FiMessageCircle, FiSend } from 'react-icons/fi';
import { profile } from '../../data/profile';
import { EMAILJS } from '../../lib/emailjs';
import { Section } from '../Section/Section';
import styles from './Contact.module.css';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const STATUS_MESSAGE: Record<Exclude<Status, 'idle'>, string> = {
  sending: 'Sending your message…',
  sent: 'Thanks! Your message was sent. I’ll get back to you soon.',
  error: `Something went wrong. Please email me directly at ${profile.email}.`,
};

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = formRef.current;
    if (!form) return;

    // Honeypot: real users never fill the hidden "company" field.
    if (new FormData(form).get('company')) return;

    setStatus('sending');
    try {
      // Loaded on demand so the email SDK never weighs on the initial page load.
      const { sendForm } = await import('@emailjs/browser');
      await sendForm(EMAILJS.serviceId, EMAILJS.templateId, form, { publicKey: EMAILJS.publicKey });
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <Section id="contact" index={5} title="Contact">
      <div className={styles.grid}>
        <div className={styles.intro}>
          <p className={styles.lead}>Let’s build something together.</p>
          <p className={styles.text}>
            I’m open to remote and hybrid frontend roles and contract work. The fastest way to reach
            me is email, or send a message right here.
          </p>

          <div className={`card ${styles.email}`}>
            <a href={`mailto:${profile.email}`} className={styles.emailLink}>
              {profile.email}
            </a>
            <button
              type="button"
              className="icon-btn"
              onClick={copyEmail}
              aria-label={copied ? 'Email copied' : 'Copy email address'}
            >
              {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
            </button>
          </div>
          <p className="visually-hidden" role="status">
            {copied ? 'Email address copied to clipboard' : ''}
          </p>

          <ul role="list" className={styles.alt}>
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                <FiLinkedin aria-hidden="true" /> LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.links.whatsapp} target="_blank" rel="noreferrer">
                <FiMessageCircle aria-hidden="true" /> WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <form ref={formRef} className={`card ${styles.form}`} onSubmit={onSubmit}>
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" autoComplete="name" required maxLength={80} />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={120}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} required maxLength={2000} />
          </div>
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
            <FiSend aria-hidden="true" /> {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          <p
            role="status"
            aria-live="polite"
            className={`${styles.status} ${status === 'error' ? styles.error : ''}`}
          >
            {status === 'idle' ? '' : STATUS_MESSAGE[status]}
          </p>
        </form>
      </div>
    </Section>
  );
}

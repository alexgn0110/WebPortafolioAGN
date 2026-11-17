import { useRef, useState, type FocusEvent, type FormEvent } from 'react';
import { FiCheck, FiCopy, FiLinkedin, FiMessageCircle, FiSend } from 'react-icons/fi';
import { profile } from '../../data/profile';
import { EMAILJS } from '../../lib/emailjs';
import { cleanField } from '../../lib/clean';
import { Section } from '../Section/Section';
import styles from './Contact.module.css';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const STATUS_MESSAGE: Record<Exclude<Status, 'idle'>, string> = {
  sending: 'Sending your message…',
  sent: 'Thanks! Your message was sent. I’ll get back to you soon.',
  error: `Something went wrong. Please email me directly at ${profile.email}.`,
};

const tidyField = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const field = event.currentTarget;
  field.value = cleanField(field.name, field.value);
};

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);
  const [shake, setShake] = useState(false);

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

    for (const field of form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      'input[name], textarea[name]',
    )) {
      field.value = cleanField(field.name, field.value);
    }

    // Doherty threshold: the button reacts on the same frame; the network can take its time.
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
          <p className={styles.lead}>Available for remote and hybrid frontend roles.</p>
          <p className={styles.text}>
            For job opportunities or contract work, email me directly or use the form. I’m based in
            Monterrey, Mexico (UTC-6), with full overlap with US business hours.
          </p>

          <div className={`card ${styles.email}`}>
            <a href={`mailto:${profile.email}`} className={styles.emailLink}>
              {profile.email}
            </a>
            <button
              type="button"
              className={`icon-btn ${styles.copyBtn}`}
              onClick={copyEmail}
              aria-label={copied ? 'Email copied' : 'Copy email address'}
            >
              {/* Exaggerated feedback: the check pops past full size, then settles */}
              <span key={String(copied)} className={copied ? 'pop-in' : undefined}>
                {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
              </span>
              {/* Secondary action: a small bubble backs up the main confirmation */}
              {copied && (
                <span className={styles.copiedBubble} aria-hidden="true">
                  Copied
                </span>
              )}
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

        <form
          ref={formRef}
          className={`card ${styles.form} ${shake ? styles.shake : ''}`}
          onSubmit={onSubmit}
          // Exaggerated feedback: a short shake makes a blocked submit impossible to miss.
          onInvalidCapture={() => setShake(true)}
          onAnimationEnd={() => setShake(false)}
        >
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={80}
              onBlur={tidyField}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              maxLength={120}
              onBlur={tidyField}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              maxLength={2000}
              onBlur={tidyField}
            />
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

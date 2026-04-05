import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SITE_LINKS } from '../data/siteLinks';
import { EMAILJS_CONFIG } from '../data/emailjsConfig';
import FormSuccessMessage from './FormSuccessMessage';

const socialLinks = [
  {
    href: SITE_LINKS.github,
    label: 'GitHub',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48603 2 2 6.48604 2 12C2 17.514 6.48603 22 12 22C17.514 22 22 17.514 22 12C22 6.48604 17.514 2 12 2ZM12 3.5C16.7033 3.5 20.5 7.2967 20.5 12C20.5 15.8327 17.9785 19.0613 14.5 20.126V17.5684C14.5 16.6133 13.9497 15.7943 13.1543 15.3867C13.9276 15.2388 14.6457 14.9454 15.249 14.5309C15.8522 14.1165 16.3232 13.5929 16.6228 13.0037C16.9224 12.4145 17.0421 11.7765 16.9718 11.1429C16.9015 10.5093 16.6434 9.89818 16.2188 9.36035C16.4405 8.67771 16.6883 7.48034 16.0996 6.53809C14.9647 6.53809 14.2323 7.31604 13.8828 7.7998C13.2853 7.60352 12.6459 7.5017 12 7.5C11.3537 7.50057 10.7136 7.60139 10.1152 7.79688C9.76487 7.31289 9.03311 6.53809 7.90039 6.53809C7.22486 7.61941 7.64246 8.78228 7.86621 9.25684C7.41288 9.79235 7.12862 10.4078 7.03781 11.0505C6.94699 11.6931 7.05233 12.3438 7.34478 12.9468C7.63723 13.5498 8.10809 14.087 8.71698 14.5124C9.32587 14.9379 10.0546 15.2389 10.8408 15.3896C10.1877 15.7262 9.69864 16.337 9.54883 17.0781H8.8916C8.2431 17.0781 7.99112 16.8146 7.64062 16.3701C7.29463 15.9256 6.92259 15.6269 6.47559 15.5029C6.23459 15.4774 6.07223 15.6607 6.28223 15.8232C6.99173 16.3062 7.0407 17.0968 7.3252 17.6143C7.5842 18.0803 8.11484 18.5 8.71484 18.5H9.5V20.126C6.02153 19.0613 3.5 15.8327 3.5 12C3.5 7.2967 7.29669 3.5 12 3.5Z"/>
      </svg>
    ),
  },
  {
    href: SITE_LINKS.linkedin,
    label: 'LinkedIn',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.75 3C4.24011 3 3 4.24011 3 5.75V18.25C3 19.7599 4.24011 21 5.75 21H18.25C19.7599 21 21 19.7599 21 18.25V5.75C21 4.24011 19.7599 3 18.25 3H5.75ZM5.75 4.5H18.25C18.9491 4.5 19.5 5.05089 19.5 5.75V18.25C19.5 18.9491 18.9491 19.5 18.25 19.5H5.75C5.05089 19.5 4.5 18.9491 4.5 18.25V5.75C4.5 5.05089 5.05089 4.5 5.75 4.5ZM7.75 6.5C7.41848 6.5 7.10054 6.6317 6.86612 6.86612C6.6317 7.10054 6.5 7.41848 6.5 7.75C6.5 8.08152 6.6317 8.39946 6.86612 8.63388C7.10054 8.8683 7.41848 9 7.75 9C8.08152 9 8.39946 8.8683 8.63388 8.63388C8.8683 8.39946 9 8.08152 9 7.75C9 7.41848 8.8683 7.10054 8.63388 6.86612C8.39946 6.6317 8.08152 6.5 7.75 6.5ZM7 10C6.7235 10 6.5 10.2235 6.5 10.5V17C6.5 17.2765 6.7235 17.5 7 17.5H8.5C8.7765 17.5 9 17.2765 9 17V10.5C9 10.2235 8.7765 10 8.5 10H7ZM10.5 10C10.2235 10 10 10.2235 10 10.5V17C10 17.2765 10.2235 17.5 10.5 17.5H12C12.2765 17.5 12.5 17.2765 12.5 17V13.25C12.5 12.5605 13.0605 12 13.75 12C14.4395 12 15 12.5605 15 13.25V17C15 17.2765 15.2235 17.5 15.5 17.5H17C17.2765 17.5 17.5 17.2765 17.5 17V13C17.5 11.3455 16.1545 10 14.5 10C13.731 10 13.0315 10.293 12.5 10.7705V10.5C12.5 10.2235 12.2765 10 12 10H10.5Z"/>
      </svg>
    ),
  },
  {
    href: 'mailto:aziznacibben@gmail.com',
    label: 'Email',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
];

const Contact = () => {
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [hasReset, setHasReset] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, form.current, EMAILJS_CONFIG.publicKey)
      .then(() => {
        setSubmitted(true);
        form.current.reset();
      })
      .catch((error) => {
        console.error('Email failed to send:', error.text);
        toast.error('Failed to send message. Try again.', { position: 'top-right', autoClose: 3000 });
      });
  };

  const resetForm = () => {
    setSubmitted(false);
    setHasReset(true);
  };

  return (
    <section id="contact" className="section">
      <div className="container">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '40px' }}
        >
          <span className="section-label">Contact</span>
          <h2 className="headline-2" style={{ marginTop: '8px' }}>
            Let&apos;s build something
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gap: '40px',
          }}
          className="lg:!grid-cols-[0.85fr_1.15fr] lg:!gap-16 lg:!items-start"
        >
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                lineHeight: 1.8,
                marginBottom: '36px',
                maxWidth: '38ch',
              }}
            >
              Open to engineering roles, freelance projects, and collaborations.
              Reach out — I reply fast.
            </p>

            {/* Direct email */}
            <a
              href="mailto:aziznacibben@gmail.com"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                color: 'var(--accent-cyan)',
                letterSpacing: '0.04em',
                display: 'block',
                marginBottom: '32px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-teal)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
            >
              aziznacibben@gmail.com
            </a>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {socialLinks.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? '_self' : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="social-link"
                  aria-label={label}
                  title={label}
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Location stamp */}
            <div
              style={{
                marginTop: '40px',
                paddingTop: '24px',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(136,136,136,0.4)', marginBottom: '4px' }}>
                Current location
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Tunisia — UTC +1
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background: 'var(--bg-surface-1)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '14px',
              padding: '28px',
            }}
          >
            {submitted ? (
              <FormSuccessMessage
                message="Message sent!"
                subtext="I'll get back to you soon."
                onSendAnother={resetForm}
                accentColor="sky"
              />
            ) : (
              <form ref={form} onSubmit={sendEmail} className={hasReset ? 'reveal-up-skip' : ''}>
                <div style={{ display: 'grid', gap: '16px' }} className="md:!grid-cols-2 md:!gap-3">
                  <div>
                    <label htmlFor="name" className="label">Name</label>
                    <input type="text" name="name" id="name" autoComplete="name" required placeholder="Your name" className="text-field" />
                  </div>
                  <div>
                    <label htmlFor="email" className="label">Email</label>
                    <input type="email" name="email" id="email" autoComplete="email" required placeholder="your@email.com" className="text-field" />
                  </div>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <label htmlFor="message" className="label">Message</label>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="What are you building?"
                    required
                    className="text-field"
                    style={{ resize: 'vertical', minHeight: '120px', maxHeight: '280px', marginTop: '0' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', maxWidth: '100%', justifyContent: 'center', marginTop: '20px', height: '44px' }}
                >
                  Send message
                  <span className="material-symbols-rounded" aria-hidden>send</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>

      </div>
      <ToastContainer />
    </section>
  );
};

export default Contact;

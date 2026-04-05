import { motion } from 'framer-motion';
import { SITE_LINKS } from '../data/siteLinks';

const sitemap = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { label: 'GitHub', href: SITE_LINKS.github },
  { label: 'LinkedIn', href: SITE_LINKS.linkedin },
  { label: 'Email', href: 'mailto:aziznacibben@gmail.com' },
];

const Footer = () => {
  return (
    <footer
      style={{
        paddingTop: 'var(--section-gap)',
        paddingBottom: '40px',
        borderTop: '1px solid var(--border-subtle)',
        marginTop: 'var(--section-gap)',
      }}
    >
      <div className="container">

        {/* Top CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'grid',
            gap: '40px',
            marginBottom: '60px',
          }}
          className="lg:!grid-cols-2 lg:!items-center"
        >
          <div>
            <h2
              className="headline-1"
              style={{
                marginBottom: '24px',
                background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--accent-cyan) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Let&apos;s work<br />together.
            </h2>
            <a
              href="mailto:aziznacibben@gmail.com"
              className="btn btn-primary"
              style={{ height: '48px', fontSize: '0.875rem', padding: '0 24px' }}
            >
              Start a conversation
              <span className="material-symbols-rounded" aria-hidden>chevron_right</span>
            </a>
          </div>

          {/* Decoration */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface-1)',
              fontFamily: 'var(--font-mono)',
            }}
            className="hidden lg:flex"
          >
            {[
              { key: 'name', val: '"Mohamed Aziz Nacib"' },
              { key: 'role', val: '"Software Engineer"' },
              { key: 'location', val: '"Tunisia"' },
              { key: 'status', val: '"Available"' },
              { key: 'email', val: '"aziznacibben@gmail.com"' },
            ].map(({ key, val }) => (
              <div key={key} style={{ display: 'flex', gap: '8px', fontSize: '0.8125rem' }}>
                <span style={{ color: 'rgba(136,136,136,0.4)', width: '80px', flexShrink: 0 }}>{key}:</span>
                <span style={{ color: 'var(--accent-cyan)' }}>{val}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="section-divider" style={{ marginBottom: '40px' }} />

        {/* Links grid */}
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '40px' }}
          className="sm:!grid-cols-[1fr_1fr_1fr] sm:!gap-8"
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                opacity: 0.5,
                marginBottom: '14px',
              }}
            >
              Navigation
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {sitemap.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="footer-link">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                opacity: 0.5,
                marginBottom: '14px',
              }}
            >
              Connect
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {socials.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('mailto') ? '_self' : '_blank'}
                    rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="footer-link"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            AZIZ<span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 400, fontSize: '0.75rem', letterSpacing: '0.1em' }}>.dev</span>
          </span>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              color: 'rgba(136,136,136,0.35)',
              letterSpacing: '0.06em',
            }}
          >
            &copy; 2026 Mohamed Aziz Nacib
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

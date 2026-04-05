import { useEffect, useRef, useState } from 'react';
import './hero.css';
import { motion } from 'framer-motion';
import { SITE_LINKS } from '../data/siteLinks';

const TITLES = [
  'Full-Stack Engineer',
  'Systems Builder',
  'Web Application Dev',
  'CS Engineering Grad',
];

const useTypewriter = (texts, speed = 60, pause = 2000) => {
  const [display, setDisplay] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx((i) => (i + 1) % texts.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return display;
};

const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  },
  item: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  },
};

const Hero = () => {
  const title = useTypewriter(TITLES, 55, 2200);
  const heroRef = useRef(null);

  return (
    <section
      id="home"
      ref={heroRef}
      style={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '64px',
      }}
    >
      {/* Layered background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* Grid overlay */}
        <div className="grid-overlay" />
        {/* Radial glow */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            right: '10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '5%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(0,255,213,0.04) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />
        {/* Scanline */}
        <div className="scanline-overlay" />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div className="lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:items-center">

          {/* Left: Text Content */}
          <motion.div
            variants={stagger.container}
            initial="hidden"
            animate="show"
          >
            {/* Availability pill */}
            <motion.div variants={stagger.item} style={{ marginBottom: '28px' }}>
              <div className="availability-badge">
                <span className="availability-dot" />
                <span>Available for opportunities</span>
              </div>
            </motion.div>

            {/* Mono label */}
            <motion.div variants={stagger.item}>
              <span className="section-label" style={{ marginBottom: '12px' }}>
                Mohamed Aziz Nacib
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h2
              variants={stagger.item}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                color: 'var(--text-primary)',
                marginBottom: '8px',
              }}
            >
              <span className="glitch-text">Software</span>
              <br />
              <span style={{ color: 'var(--accent-cyan)' }}>Engineer</span>
              <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}> &amp;</span>
            </motion.h2>

            {/* Typewriter subtitle */}
            <motion.div
              variants={stagger.item}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
                fontWeight: 400,
                color: 'var(--text-muted)',
                marginBottom: '28px',
                minHeight: '2em',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span style={{ color: 'var(--accent-teal)', marginRight: '8px' }}>{'>'}</span>
              <span>{title}</span>
              <span className="typewriter-cursor" />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={stagger.item}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                lineHeight: 1.8,
                color: 'var(--text-muted)',
                maxWidth: '44ch',
                marginBottom: '36px',
              }}
            >
              CS Engineering graduate — ESPRIT, Tunisia. International experience across Tunisia
              &amp; the Netherlands. Building scalable web systems with precision.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={stagger.item}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}
            >
              <a
                href={SITE_LINKS.resume}
                download="Mohamed-Aziz-Nacib-CV.pdf"
                className="btn btn-primary"
              >
                Resume
                <span className="material-symbols-rounded" aria-hidden>description</span>
              </a>
              <a
                href={SITE_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                GitHub
                <span className="material-symbols-rounded" aria-hidden>code</span>
              </a>
              <a href="#contact" className="btn btn-outline">
                Contact
                <span className="material-symbols-rounded" aria-hidden>mail</span>
              </a>
            </motion.div>

            {/* Coordinates decoration */}
            <motion.div
              variants={stagger.item}
              style={{
                marginTop: '48px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                color: 'rgba(136,136,136,0.4)',
                letterSpacing: '0.12em',
                display: 'flex',
                gap: '20px',
              }}
            >
              <span>LAT 36.81°N</span>
              <span>LNG 10.18°E</span>
              <span>UTC+1</span>
            </motion.div>
          </motion.div>

          {/* Right: Portrait + accent */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-center items-center"
            style={{ position: 'relative' }}
          >
            {/* Decorative ring */}
            <div
              style={{
                position: 'absolute',
                width: '420px',
                height: '420px',
                borderRadius: '50%',
                border: '1px solid rgba(0,212,255,0.1)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                animation: 'float 8s ease-in-out infinite',
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: '360px',
                height: '360px',
                borderRadius: '50%',
                border: '1px solid rgba(0,255,213,0.06)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                animation: 'float 8s ease-in-out infinite reverse',
              }}
            />

            {/* Portrait container */}
            <div
              style={{
                position: 'relative',
                width: '320px',
                height: '380px',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid rgba(0,212,255,0.15)',
                boxShadow: '0 0 60px rgba(0,212,255,0.08), 0 0 120px rgba(0,0,0,0.8)',
              }}
            >
              <img
                src="/images/mepng.png"
                alt="Mohamed Aziz — software engineer"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  filter: 'contrast(1.05)',
                }}
              />
              {/* Gradient overlay at bottom */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(10,10,10,0.7), transparent)',
                }}
              />
              {/* Cyan accent line */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, var(--accent-cyan), transparent)',
                }}
              />
            </div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.4 }}
              style={{
                position: 'absolute',
                top: '24px',
                right: '-16px',
                background: 'var(--bg-surface-2)',
                border: '1px solid var(--border-accent)',
                borderRadius: '10px',
                padding: '10px 14px',
                boxShadow: '0 0 24px rgba(0,212,255,0.12)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--accent-cyan)', letterSpacing: '0.1em' }}>15+ PROJECTS</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>shipped</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              style={{
                position: 'absolute',
                bottom: '32px',
                left: '-24px',
                background: 'var(--bg-surface-2)',
                border: '1px solid rgba(0,255,213,0.15)',
                borderRadius: '10px',
                padding: '10px 14px',
                boxShadow: '0 0 24px rgba(0,255,213,0.08)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--accent-teal)', letterSpacing: '0.1em' }}>INTERNSHIP</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>Netherlands</div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(to top, var(--bg-base), transparent)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </section>
  );
};

export default Hero;

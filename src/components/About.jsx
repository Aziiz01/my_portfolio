import { motion } from 'framer-motion';
import SkillToolsCloud from './skill-cloud/SkillToolsCloud';
import { skillCloudItems } from '../data/skillCloudItems';

const stats = [
  { value: '15+', label: 'Projects shipped' },
  { value: '3+', label: 'Years building' },
  { value: '2', label: 'Countries worked in' },
  { value: '5yr', label: 'Engineering program' },
];

const facts = [
  { prefix: '01', text: 'National Engineering Degree in Computer Science — graduated with honors.' },
  { prefix: '02', text: 'International experience: Tunisia & Netherlands. Production systems, real users.' },
  { prefix: '03', text: 'Full-stack by default. Obsessive about clean APIs and composable frontends.' },
  { prefix: '04', text: 'Based in Tunisia. Builder mindset. Moves fast, ships deliberately.' },
];

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">About</span>
        </motion.div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">

          {/* Left: Facts */}
          <div>
            <motion.h2
              className="headline-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.05 }}
              style={{ marginBottom: '32px', maxWidth: '100%' }}
            >
              Engineer by training.
              <br />
              <span style={{ color: 'var(--accent-cyan)' }}>Builder</span> by nature.
            </motion.h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {facts.map(({ prefix, text }, i) => (
                <motion.div
                  key={prefix}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '18px 0',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.625rem',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      color: 'var(--accent-cyan)',
                      opacity: 0.6,
                      paddingTop: '3px',
                      flexShrink: 0,
                      width: '24px',
                    }}
                  >
                    {prefix}
                  </span>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.875rem',
                      lineHeight: 1.75,
                      color: 'var(--text-muted)',
                    }}
                  >
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1px',
                marginTop: '32px',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                overflow: 'hidden',
                background: 'var(--border-subtle)',
              }}
            >
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  style={{
                    background: 'var(--bg-surface-1)',
                    padding: '20px 16px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: 'var(--accent-cyan)',
                      lineHeight: 1,
                      marginBottom: '6px',
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.625rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Skill cloud */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ marginTop: '48px' }}
            className="lg:mt-0"
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '16px',
                opacity: 0.6,
              }}
            >
              // drag to explore tools
            </div>
            <SkillToolsCloud items={skillCloudItems} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;

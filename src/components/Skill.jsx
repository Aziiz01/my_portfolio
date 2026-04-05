import { motion } from 'framer-motion';

const skillGroups = [
  {
    category: 'Frontend',
    color: 'var(--accent-cyan)',
    skills: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Framer Motion', 'HTML5 / CSS3'],
  },
  {
    category: 'Backend',
    color: '#00ffd5',
    skills: ['Node.js', 'Express', 'Spring Boot', 'Symfony / PHP', 'REST APIs', 'WebSockets'],
  },
  {
    category: 'AI / ML',
    color: '#7c6fff',
    skills: ['Python', 'Hugging Face', 'OpenAI API', 'LLM Integration', 'Embeddings'],
  },
  {
    category: 'Databases',
    color: '#ff9f43',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase'],
  },
  {
    category: 'DevOps & Cloud',
    color: '#54a0ff',
    skills: ['Docker', 'AWS', 'Vercel', 'Cloudflare', 'Linux', 'CI/CD'],
  },
  {
    category: 'Tooling',
    color: '#c8d6e5',
    skills: ['Git / GitHub', 'Jira', 'Figma', 'VS Code', 'Jenkins', 'npm / Vite'],
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const Skill = () => {
  return (
    <section id="skills" className="section">
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '48px' }}
        >
          <span className="section-label">Stack</span>
          <h2
            className="headline-2"
            style={{ marginTop: '8px', marginBottom: '12px' }}
          >
            Technology stack
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              maxWidth: '50ch',
              lineHeight: 1.7,
            }}
          >
            Tools and frameworks I use to build production systems — from data layer to UI.
          </p>
        </motion.div>

        {/* Terminal window chrome */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            border: '1px solid var(--border-subtle)',
            borderRadius: '14px',
            overflow: 'hidden',
            background: 'var(--bg-surface-1)',
          }}
        >
          {/* Terminal header bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 18px',
              borderBottom: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface-2)',
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                color: 'var(--text-muted)',
                marginLeft: '12px',
                letterSpacing: '0.08em',
              }}
            >
              ~/nacib — skills.sh
            </span>
          </div>

          {/* Skill groups grid */}
          <div style={{ padding: '24px' }}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px',
              }}
            >
              {skillGroups.map(({ category, color, skills }) => (
                <motion.div
                  key={category}
                  variants={itemVariants}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '18px',
                    transition: 'border-color 0.3s ease',
                  }}
                  whileHover={{
                    borderColor: `${color}40`,
                    boxShadow: `0 0 24px ${color}10`,
                  }}
                >
                  {/* Category label */}
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color,
                      marginBottom: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span style={{ opacity: 0.4, fontSize: '0.625rem' }}>$</span>
                    {category}
                  </div>

                  {/* Skills list */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          borderRadius: '4px',
                          padding: '3px 8px',
                          transition: 'color 0.2s ease, border-color 0.2s ease, background 0.2s ease',
                          cursor: 'default',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = color;
                          e.currentTarget.style.borderColor = `${color}40`;
                          e.currentTarget.style.background = `${color}08`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--text-muted)';
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Terminal prompt line */}
            <div
              style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'rgba(136,136,136,0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ color: 'var(--accent-teal)' }}>nacib@dev</span>
              <span style={{ color: 'var(--text-muted)', opacity: 0.4 }}>:~$</span>
              <span style={{ opacity: 0.4 }}>always_learning --flag more</span>
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '14px',
                  background: 'var(--accent-cyan)',
                  opacity: 0.6,
                  animation: 'blink 1s step-end infinite',
                  borderRadius: '1px',
                }}
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Skill;

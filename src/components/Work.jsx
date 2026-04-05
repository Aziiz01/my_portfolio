import { motion } from 'framer-motion';
import { workProjects } from '../data/workProjects';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const Work = () => {
  return (
    <section id="work" className="section">
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '48px' }}
        >
          <span className="section-label">Projects</span>
          <h2 className="headline-2" style={{ marginTop: '8px', marginBottom: '12px' }}>
            Selected work
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '52ch', lineHeight: 1.7 }}>
            End-to-end builds — backends, full-stack apps, deployable frontends. Each is a
            snapshot of the problem, stack, and outcome.
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {workProjects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={cardVariants}
              className="project-card"
              style={{ cursor: 'default' }}
            >
              {/* Project number */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  color: 'var(--accent-cyan)',
                  opacity: 0.5,
                  zIndex: 1,
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Image */}
              <div className="project-card__img-wrap">
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} — open project`}
                  tabIndex={-1}
                >
                  <img
                    src={project.imgSrc}
                    alt=""
                    loading="lazy"
                  />
                </a>
              </div>

              {/* Content */}
              <div style={{ padding: '20px 22px 22px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.0625rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.7,
                    marginBottom: '16px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-tag">{tag}</span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ height: '36px', fontSize: '0.75rem', padding: '0 14px' }}
                >
                  {project.linkLabel}
                  <span className="material-symbols-rounded" style={{ fontSize: '14px' }} aria-hidden>
                    arrow_outward
                  </span>
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Work;

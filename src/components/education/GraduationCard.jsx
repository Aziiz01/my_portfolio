import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Honors3D from './Honors3D';

const GraduationCard = ({ education }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '14px',
        border: '1px solid rgba(0,212,255,0.15)',
        background: 'linear-gradient(135deg, rgba(0,212,255,0.04) 0%, var(--bg-surface-1) 50%, rgba(0,255,213,0.02) 100%)',
        padding: '28px',
        boxShadow: '0 0 40px rgba(0,212,255,0.05)',
      }}
    >
      {/* Glow blob */}
      <div
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
        aria-hidden
      />

      <div style={{ display: 'grid', gap: '20px' }} className="md:!grid-cols-[1fr_220px] md:!items-center">
        <div>
          {/* Honor badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 12px',
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: '6px',
              marginBottom: '16px',
            }}
          >
            <span style={{ color: 'var(--accent-cyan)', fontSize: '14px' }}>★</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent-cyan)',
              }}
            >
              {education.honors}
            </span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '8px',
              lineHeight: 1.3,
            }}
          >
            {education.degree}
          </h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            {education.institution}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'rgba(136,136,136,0.5)',
              letterSpacing: '0.08em',
            }}
          >
            {education.startYear} — {education.graduationYear}
          </p>
        </div>

        <Honors3D />
      </div>
    </motion.article>
  );
};

GraduationCard.propTypes = {
  education: PropTypes.shape({
    degree: PropTypes.string.isRequired,
    institution: PropTypes.string.isRequired,
    startYear: PropTypes.number.isRequired,
    graduationYear: PropTypes.number.isRequired,
    honors: PropTypes.string.isRequired,
  }).isRequired,
};

export default GraduationCard;

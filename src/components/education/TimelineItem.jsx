import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const TimelineItem = ({ item, index }) => {
  return (
    <motion.div
      style={{
        position: 'relative',
        display: 'grid',
        gap: '12px',
        paddingLeft: '44px',
        paddingTop: '12px',
        paddingBottom: '12px',
      }}
      className="md:!grid-cols-[160px_1fr] md:!gap-8 md:!pl-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Dot */}
      <div
        className={`timeline-dot${item.emphasized ? ' emphasized' : ''}`}
        aria-hidden
      />

      {/* Period label */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          color: item.emphasized ? 'var(--accent-cyan)' : 'var(--text-muted)',
          paddingTop: '4px',
        }}
        className="md:!text-right md:!pr-6 md:!pt-5"
      >
        {item.period}
      </div>

      {/* Content */}
      <div
        style={{
          borderRadius: '10px',
          border: `1px solid ${item.emphasized ? 'rgba(0,212,255,0.2)' : 'var(--border-subtle)'}`,
          background: item.emphasized
            ? 'rgba(0,212,255,0.04)'
            : 'rgba(255,255,255,0.02)',
          padding: '16px 18px',
          boxShadow: item.emphasized ? '0 0 24px rgba(0,212,255,0.06)' : 'none',
          transition: 'border-color 0.3s ease',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: item.institution || item.focus ? '6px' : 0,
          }}
        >
          {item.title}
        </p>

        {item.institution && (
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
            }}
          >
            {item.institution}
          </p>
        )}

        {item.focus?.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginTop: '10px',
            }}
          >
            {item.focus.map((f) => (
              <span
                key={f}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '4px',
                  padding: '3px 8px',
                }}
              >
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

TimelineItem.propTypes = {
  item: PropTypes.shape({
    period: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    institution: PropTypes.string,
    focus: PropTypes.arrayOf(PropTypes.string),
    emphasized: PropTypes.bool,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default TimelineItem;

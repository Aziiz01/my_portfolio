import { motion } from 'framer-motion';

const FormSuccessMessage = ({ message, subtext, onSendAnother, accentColor = 'emerald' }) => {
  const accent = accentColor === 'sky' ? 'var(--accent-cyan)' : '#00ff88';
  const glowColor = accentColor === 'sky' ? 'rgba(0,212,255,0.2)' : 'rgba(0,255,136,0.2)';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.1 }}
        style={{
          marginBottom: '20px',
          padding: '16px',
          borderRadius: '50%',
          color: accent,
          boxShadow: `0 0 32px ${glowColor}`,
          border: `1px solid ${glowColor}`,
          background: `${glowColor}`,
        }}
      >
        <span
          className="material-symbols-rounded"
          style={{ fontSize: '48px', fontVariationSettings: '"FILL" 1, "wght" 400', color: accent }}
          aria-hidden
        >
          check_circle
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.125rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '6px',
        }}
      >
        {message}
      </motion.p>

      {subtext && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
          }}
        >
          {subtext}
        </motion.p>
      )}

      {onSendAnother && (
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onSendAnother}
          style={{
            marginTop: '24px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          Send another
        </motion.button>
      )}
    </motion.div>
  );
};

export default FormSuccessMessage;

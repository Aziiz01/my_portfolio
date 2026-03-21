/**
 * @copyright 2024
 * @license Apache-2.0
 */

import { motion } from 'framer-motion';

const FormSuccessMessage = ({ message, subtext, onSendAnother, accentColor = 'emerald' }) => {
  const colorClasses = {
    emerald:
      'text-emerald-400 [--glow:rgba(52,211,153,0.25)]',
    sky: 'text-sky-400 [--glow:rgba(56,189,248,0.25)]',
  };
  const c = colorClasses[accentColor] || colorClasses.emerald;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className="flex flex-col items-center justify-center py-8 px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.1 }}
        className={`mb-4 rounded-full p-3 ${c}`}
        style={{
          boxShadow: '0 0 32px var(--glow)',
        }}
      >
        <span
          className="material-symbols-rounded text-6xl"
          style={{ fontVariationSettings: '"FILL" 1, "wght" 400' }}
          aria-hidden
        >
          check_circle
        </span>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        className="text-xl font-semibold text-zinc-100"
      >
        {message}
      </motion.p>
      {subtext && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="mt-1 text-sm text-zinc-400"
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
          className="mt-6 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors underline underline-offset-4"
        >
          Send another
        </motion.button>
      )}
    </motion.div>
  );
};

export default FormSuccessMessage;

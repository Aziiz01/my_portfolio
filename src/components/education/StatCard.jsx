import { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { motion, useInView } from 'framer-motion';

const parseScore = (value) => {
  const match = value.match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/);
  if (!match) return null;

  const target = Number(match[1]);
  const total = Number(match[2]);
  const decimals = (match[1].split('.')[1] || '').length;

  return { target, total, decimals };
};

const StatCard = ({ label, value }) => {
  const parsed = useMemo(() => parseScore(value), [value]);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.45 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!parsed || !isInView) return;

    const duration = 1200;
    let startTime;
    let frameId;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(parsed.target * eased);
      if (progress < 1) frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, [isInView, parsed]);

  const valueText = parsed
    ? `${display.toFixed(parsed.decimals)} / ${parsed.total}`
    : value;

  return (
    <motion.article
      ref={cardRef}
      className="rounded-xl border border-zinc-700/60 bg-zinc-800/40 p-5"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <p className="text-sm text-zinc-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-zinc-100">{valueText}</p>
    </motion.article>
  );
};

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default StatCard;

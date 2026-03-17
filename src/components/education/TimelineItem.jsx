import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const TimelineItem = ({ item, index }) => {
  return (
    <motion.div
      className="relative grid gap-3 pl-10 md:grid-cols-[150px_1fr] md:gap-7 md:pl-0"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: 'easeOut' }}
    >
      <div className="absolute left-[5px] top-3 h-4 w-4 rounded-full border border-sky-300/70 bg-sky-400/20 md:left-[150px] md:-translate-x-1/2">
        {item.emphasized && (
          <span className="absolute inset-0 rounded-full bg-sky-300/30 blur-[2px]" aria-hidden />
        )}
      </div>

      <div className="text-xs font-medium tracking-wide text-sky-300/90 sm:text-sm md:pr-6 md:pt-2 md:text-right">
        {item.period}
      </div>

      <div
        className={
          'rounded-2xl border p-5 backdrop-blur-sm transition-colors ' +
          (item.emphasized
            ? 'border-sky-300/35 bg-sky-500/10 shadow-[0_0_28px_rgba(56,189,248,0.2)]'
            : 'border-zinc-700/60 bg-zinc-800/45 hover:border-zinc-600')
        }
      >
        <p className="text-base font-semibold text-zinc-100">{item.title}</p>
        {item.institution && <p className="mt-1 text-sm text-zinc-300">{item.institution}</p>}
        {item.focus?.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {item.focus.map((focusItem) => (
              <li
                key={focusItem}
                className="rounded-full border border-sky-300/20 bg-sky-500/5 px-2.5 py-1 text-xs text-zinc-300"
              >
                {focusItem}
              </li>
            ))}
          </ul>
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
    emphasized: PropTypes.bool
  }).isRequired,
  index: PropTypes.number.isRequired
};

export default TimelineItem;

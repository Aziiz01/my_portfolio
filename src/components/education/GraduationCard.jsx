import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Honors3D from './Honors3D';

const GraduationCard = ({ education }) => {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border border-sky-300/25 bg-gradient-to-br from-sky-500/10 via-zinc-900 to-zinc-900 p-6 shadow-[0_0_30px_rgba(56,189,248,0.08)]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" aria-hidden />
      <div className="grid gap-5 md:grid-cols-[1fr_220px] md:items-center">
        <div>
          <span className="inline-flex items-center rounded-full border border-sky-300/40 bg-sky-500/15 px-3 py-1 text-xs font-medium text-sky-200">
            {education.honors}
          </span>

          <h3 className="mt-4 text-xl font-semibold text-zinc-100">{education.degree}</h3>
          <p className="mt-2 text-zinc-300">{education.institution}</p>
          <p className="mt-1 text-sm text-zinc-400">
            {education.startYear} - {education.graduationYear}
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
    honors: PropTypes.string.isRequired
  }).isRequired
};

export default GraduationCard;

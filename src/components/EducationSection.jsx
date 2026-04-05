import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TimelineItem from './education/TimelineItem';
import GraduationCard from './education/GraduationCard';
import { educationData } from '../data/educationData';

const EducationSection = () => {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 25%'],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="education" className="section">
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '40px' }}
        >
          <span className="section-label">Education</span>
          <h2
            className="headline-2"
            style={{ marginTop: '8px', marginBottom: '12px' }}
          >
            Academic journey
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              maxWidth: '60ch',
              lineHeight: 1.7,
            }}
          >
            5-year engineering program at ESPRIT — from CS foundations to systems design,
            internships, and graduation with honors.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} style={{ position: 'relative' }}>
          {/* Timeline base line */}
          <div className="timeline-line" aria-hidden />

          {/* Animated progress line */}
          <motion.div
            style={{
              position: 'absolute',
              left: '20px',
              top: 0,
              width: '1px',
              scaleY: lineScaleY,
              transformOrigin: 'top',
              background: 'linear-gradient(to bottom, var(--accent-cyan), var(--accent-teal))',
              boxShadow: '0 0 8px rgba(0,212,255,0.4)',
            }}
            className="md:!left-[160px]"
            aria-hidden
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {educationData.timeline.map((item, index) => (
              <TimelineItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Graduation card */}
        <div style={{ marginTop: '40px' }}>
          <GraduationCard education={educationData} />
        </div>

      </div>
    </section>
  );
};

export default EducationSection;

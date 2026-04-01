import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import TimelineItem from './education/TimelineItem';
import GraduationCard from './education/GraduationCard';
import { educationData } from '../data/educationData';

const EducationSection = () => {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 25%']
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="education" className="section">
      <div className="container">
        <div className="mb-10">
          <h2 className="headline-2 mb-3">Education & Academic Honors</h2>
          <p className="max-w-[70ch] text-zinc-400">
            A 5-year engineering journey at ESPRIT School of Engineering, from core computer science
            foundations to advanced system design, internships, and graduation with honors.
          </p>
        </div>

        <div ref={timelineRef} className="relative space-y-6">
          <div className="absolute bottom-0 left-3 top-0 w-px bg-zinc-700/70 md:left-[150px]" aria-hidden />
          <motion.div
            className="absolute left-3 top-0 w-px origin-top bg-gradient-to-b from-sky-300 via-sky-400 to-sky-500 md:left-[150px]"
            style={{ scaleY: lineScaleY }}
            aria-hidden
          />

          {educationData.timeline.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>

        <div className="mt-10">
          <GraduationCard education={educationData} />
        </div>
      </div>
    </section>
  );
};

export default EducationSection;

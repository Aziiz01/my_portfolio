import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import TimelineItem from './education/TimelineItem';
import GraduationCard from './education/GraduationCard';
import StatCard from './education/StatCard';
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

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <GraduationCard education={educationData} />

          <div className="rounded-2xl border border-zinc-700/60 bg-zinc-800/35 p-5">
            <p className="text-sm text-zinc-400">Academic Results</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-200">
              {educationData.stats.map((stat) => (
                <li key={stat.label} className="flex items-start justify-between gap-2">
                  <span>{stat.label}</span>
                  <span className="text-sky-300">{stat.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {educationData.stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;

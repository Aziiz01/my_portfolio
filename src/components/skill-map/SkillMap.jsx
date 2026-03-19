import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { workProjects } from '../../data/workProjects';

const CATEGORY_COLORS = {
  'Front-End': '#38bdf8',
  'Back-End': '#22c55e',
  Database: '#a78bfa',
  DevOps: '#f59e0b',
  Tools: '#f97316',
  AI: '#ec4899'
};

const explicitCategory = (label, desc) => {
  const text = `${label} ${desc}`.toLowerCase();
  if (['react', 'javascript', 'css', 'html', 'bootstrap', 'tailwind'].some((k) => text.includes(k))) return 'Front-End';
  if (['node', 'express', 'spring', 'flask', 'python'].some((k) => text.includes(k))) return 'Back-End';
  if (['mongo', 'postgres', 'database'].some((k) => text.includes(k))) return 'Database';
  if (['docker', 'jenkins', 'devops'].some((k) => text.includes(k))) return 'DevOps';
  if (['open ai', 'ai'].some((k) => text.includes(k))) return 'AI';
  return 'Tools';
};

const levelScore = (label) => {
  if (['React', 'JavaScript', 'NodeJS', 'Git', 'TailwindCSS', 'HTML', 'CSS'].includes(label)) return 90;
  if (['ExpressJS', 'MongoDB', 'PostgreSQL', 'Spring Boot', 'Python', 'Docker'].includes(label)) return 75;
  return 65;
};

const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

const getSkillAliases = (label) => {
  const aliases = {
    NodeJS: ['nodejs', 'node', 'node.js'],
    ExpressJS: ['expressjs', 'express'],
    TailwindCSS: ['tailwindcss', 'tailwind'],
    'Open AI': ['openai', 'ai'],
    'VS Code': ['vscode', 'codeeditor'],
    NPM: ['npm', 'packagemanager'],
    MongoDB: ['mongodb', 'database'],
    PostgreSQL: ['postgresql', 'postgres', 'database'],
    Jenkins: ['jenkins', 'devops'],
    Docker: ['docker', 'devops'],
    Flask: ['flask', 'python'],
    Git: ['git', 'sourcetree'],
    Jira: ['jira', 'projectmanagement']
  };
  return aliases[label] || [label];
};

const mapProjectsForSkill = (label) => {
  const aliases = getSkillAliases(label).map(normalize);
  return workProjects.filter((project) => {
    const text = `${project.title} ${project.tags.join(' ')}`.toLowerCase();
    const normalizedText = normalize(text);
    return aliases.some((alias) => normalizedText.includes(alias));
  });
};

const SkillMap = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const normalizedSkills = useMemo(
    () =>
      skills.map((skill) => ({
        id: skill.label,
        label: skill.label === 'PhpSorm' ? 'PhpStorm' : skill.label,
        imgSrc: skill.imgSrc,
        category: explicitCategory(skill.label, skill.desc),
        level: levelScore(skill.label),
        description: skill.desc,
        projects: mapProjectsForSkill(skill.label)
      })),
    [skills]
  );

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(normalizedSkills.map((node) => node.category)))],
    [normalizedSkills]
  );

  const groupedSkills = useMemo(
    () =>
      normalizedSkills
        .filter((skill) => selectedCategory === 'All' || skill.category === selectedCategory)
        .reduce((acc, skill) => {
          acc[skill.category] = acc[skill.category] || [];
          acc[skill.category].push(skill);
          return acc;
        }, {}),
    [normalizedSkills, selectedCategory]
  );

  const activeSkill = useMemo(() => {
    if (selectedSkill) return selectedSkill;
    return normalizedSkills[0] || null;
  }, [normalizedSkills, selectedSkill]);

  return (
    <div className="mt-10 rounded-2xl border border-zinc-700/60 bg-zinc-800/35 p-5 md:p-6 reveal-up">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-zinc-100">Skill Matrix</h3>
          <p className="mt-1 text-sm text-zinc-400">
            Filter by category and select any skill to inspect expertise and usage.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={
                'rounded-full border px-3 py-1 text-xs transition-colors ' +
                (selectedCategory === category
                  ? 'border-sky-300/40 bg-sky-500/15 text-zinc-100'
                  : 'border-zinc-700/60 bg-zinc-900/50 text-zinc-300 hover:border-zinc-500')
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-3 rounded-xl border border-zinc-700/60 bg-zinc-900/60 p-4">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => setSelectedSkill(skill)}
                    className={
                      'inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-sm transition-colors ' +
                      (activeSkill?.id === skill.id
                        ? 'border-sky-300/40 bg-sky-500/15 text-zinc-100'
                        : 'border-zinc-700/60 bg-zinc-800/60 text-zinc-300 hover:border-zinc-500')
                    }
                  >
                    <img src={skill.imgSrc} alt="" className="h-4 w-4 white-svg" />
                    {skill.label}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="rounded-xl border border-zinc-700/60 bg-zinc-900/55 p-4">
          <AnimatePresence mode="wait">
            {activeSkill ? (
              <motion.div
                key={activeSkill.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-xs uppercase tracking-wide text-sky-300/90">{activeSkill.category}</p>
                <div className="mt-2 flex items-center gap-2">
                  <img src={activeSkill.imgSrc} alt="" className="h-5 w-5 white-svg" />
                  <h4 className="text-xl font-semibold text-zinc-100">{activeSkill.label}</h4>
                </div>
                <p className="mt-2 text-sm text-zinc-300">{activeSkill.description}</p>
                <p className="mt-3 text-sm text-zinc-400">
                  <span className="text-zinc-200">Level:</span> {activeSkill.level >= 85 ? 'Advanced' : 'Intermediate'}
                </p>
                <div className="mt-2 h-2 w-full rounded-full bg-zinc-700/60">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${activeSkill.level}%` }}
                    transition={{ duration: 0.35 }}
                    className="h-full rounded-full bg-sky-400"
                  />
                </div>
                <div className="mt-3">
                  <p className="text-sm text-zinc-200">Projects using this skill</p>
                  {activeSkill.projects.length > 0 ? (
                    <ul className="mt-2 space-y-1 text-sm text-zinc-400">
                      {activeSkill.projects.map((project) => (
                        <li key={`${activeSkill.id}-${project.title}`}>
                          <a
                            href={project.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-sky-300 hover:underline"
                          >
                            - {project.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm text-zinc-500">No mapped project yet.</p>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="hint"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="text-lg font-semibold text-zinc-100">Explore skills</h4>
                <p className="mt-2 text-sm text-zinc-400">
                  Select a category and click any skill chip to inspect expertise and usage details.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

SkillMap.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired
    })
  ).isRequired
};

export default SkillMap;

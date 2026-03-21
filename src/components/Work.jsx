/**
 * @copyright 2024
 * @license Apache-2.0
 */

import ProjectShowcase from './ProjectShowcase';
import { workProjects } from '../data/workProjects';

const Work = () => {
  return (
    <section id="work" className="section">
      <div className="container max-w-6xl">
        <header className="mb-14 lg:mb-20 max-w-2xl">
          <h2 className="headline-2 mb-4 reveal-up">Selected projects</h2>
          <p className="text-zinc-400 text-lg leading-relaxed reveal-up">
            A few things I&apos;ve shipped end-to-end — backends, full-stack apps, and
            deployable frontends. Each row is a snapshot of the problem, stack, and outcome.
          </p>
        </header>

        <div className="flex flex-col gap-16 lg:gap-24">
          {workProjects.map((project, key) => (
            <ProjectShowcase
              key={project.title}
              index={key}
              imgSrc={project.imgSrc}
              title={project.title}
              description={project.description}
              tags={project.tags}
              projectLink={project.projectLink}
              linkLabel={project.linkLabel}
              reverse={key % 2 === 1}
              classes="reveal-up"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;

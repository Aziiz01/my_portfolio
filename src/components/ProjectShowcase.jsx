/**
 * @copyright 2024
 * @license Apache-2.0
 */

import PropTypes from 'prop-types';

const ProjectShowcase = ({
  index,
  imgSrc,
  title,
  description,
  tags,
  projectLink,
  linkLabel,
  reverse,
  classes,
}) => {
  const num = String(index + 1).padStart(2, '0');

  return (
    <article
      className={
        'group lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16 lg:items-center gap-8 ' + (classes || '')
      }
    >
      <a
        href={projectLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`block overflow-hidden rounded-2xl ring-1 ring-inset ring-zinc-50/10 bg-zinc-800/40 aspect-[16/10] lg:aspect-[4/3] ${
          reverse ? 'lg:order-2' : ''
        }`}
        aria-label={`${title} — open project`}
      >
        <img
          src={imgSrc}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </a>

      <div className={`flex flex-col justify-center ${reverse ? 'lg:order-1' : ''}`}>
        <span
          className="font-mono text-sm tabular-nums text-sky-400/90 mb-2 reveal-up"
          aria-hidden
        >
          {num}
        </span>
        <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-50 mb-3 reveal-up">
          {title}
        </h3>
        <p className="text-zinc-400 text-[15px] leading-relaxed max-w-xl mb-5 reveal-up">
          {description}
        </p>
        <ul className="flex flex-wrap gap-2 mb-6 reveal-up" aria-label="Technologies">
          {tags.map((label) => (
            <li
              key={label}
              className="text-xs font-medium uppercase tracking-wide text-zinc-300 bg-zinc-800/80 px-2.5 py-1 rounded-md ring-1 ring-zinc-50/10"
            >
              {label}
            </li>
          ))}
        </ul>
        <a
          href={projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary w-max items-center reveal-up"
        >
          {linkLabel}
          <span className="material-symbols-rounded" aria-hidden>
            arrow_outward
          </span>
        </a>
      </div>
    </article>
  );
};

ProjectShowcase.propTypes = {
  index: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  projectLink: PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired,
  reverse: PropTypes.bool,
  classes: PropTypes.string,
};

export default ProjectShowcase;

import PropTypes from 'prop-types';

const LinkedInIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 text-sky-400"
    aria-hidden
  >
    <path
      d="M5.75 3C4.24011 3 3 4.24011 3 5.75V18.25C3 19.7599 4.24011 21 5.75 21H18.25C19.7599 21 21 19.7599 21 18.25V5.75C21 4.24011 19.7599 3 18.25 3H5.75ZM5.75 4.5H18.25C18.9491 4.5 19.5 5.05089 19.5 5.75V18.25C19.5 18.9491 18.9491 19.5 18.25 19.5H5.75C5.05089 19.5 4.5 18.9491 4.5 18.25V5.75C4.5 5.05089 5.05089 4.5 5.75 4.5ZM7.75 6.5C7.41848 6.5 7.10054 6.6317 6.86612 6.86612C6.6317 7.10054 6.5 7.41848 6.5 7.75C6.5 8.08152 6.6317 8.39946 6.86612 8.63388C7.10054 8.8683 7.41848 9 7.75 9C8.08152 9 8.39946 8.8683 8.63388 8.63388C8.8683 8.39946 9 8.08152 9 7.75C9 7.41848 8.8683 7.10054 8.63388 6.86612C8.39946 6.6317 8.08152 6.5 7.75 6.5ZM7 10C6.7235 10 6.5 10.2235 6.5 10.5V17C6.5 17.2765 6.7235 17.5 7 17.5H8.5C8.7765 17.5 9 17.2765 9 17V10.5C9 10.2235 8.7765 10 8.5 10H7ZM10.5 10C10.2235 10 10 10.2235 10 10.5V17C10 17.2765 10.2235 17.5 10.5 17.5H12C12.2765 17.5 12.5 17.2765 12.5 17V13.25C12.5 12.5605 13.0605 12 13.75 12C14.4395 12 15 12.5605 15 13.25V17C15 17.2765 15.2235 17.5 15.5 17.5H17C17.2765 17.5 17.5 17.2765 17.5 17V13C17.5 11.3455 16.1545 10 14.5 10C13.731 10 13.0315 10.293 12.5 10.7705V10.5C12.5 10.2235 12.2765 10 12 10H10.5Z"
      fill="currentColor"
    />
  </svg>
);

const InternshipTooltip = ({ location, compact = false, showLink = true, className = '' }) => {
  if (!location) return null;

  const badges = location.badges || [];

  return (
    <div
      className={
        'min-w-[210px] max-w-[min(280px,80vw)] rounded-xl border border-sky-300/20 bg-zinc-900/92 p-2.5 text-[11px] leading-4 text-zinc-100 shadow-[0_0_30px_rgba(56,189,248,0.18)] backdrop-blur-sm ' +
        className
      }
    >
      <p className="flex items-center gap-2 text-xs font-semibold text-sky-300">
        {location.flag && (
          <img
            src={`https://flagcdn.com/w40/${location.flag}.png`}
            srcSet={`https://flagcdn.com/w80/${location.flag}.png 2x`}
            alt=""
            className="h-4 w-6 shrink-0 rounded-sm object-cover"
          />
        )}
        {location.country}{location.city ? ` - ${location.city}` : ''}
      </p>
      <p className="mt-1 text-zinc-200">{location.title}</p>
      <p className="mt-0.5 text-zinc-400">{location.company}</p>
      {!compact && <p className="mt-1 text-zinc-300">Year: {location.year}</p>}
      {badges.length > 0 && (
        <div className="mt-3 space-y-2 border-t border-zinc-700/60 pt-2.5">
          {badges.map((badge, i) => (
            <div
              key={i}
              className="flex items-start gap-2 rounded-lg bg-sky-500/5 px-2 py-1.5 text-[10px] leading-snug text-zinc-300"
            >
              {badge.icon === 'linkedin' && <LinkedInIcon />}
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      )}
      {location.link && showLink && (
        <a
          href={location.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-sky-400 hover:text-sky-300 hover:underline"
        >
          Visit link
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </a>
      )}
    </div>
  );
};

InternshipTooltip.propTypes = {
  location: PropTypes.shape({
    country: PropTypes.string.isRequired,
    city: PropTypes.string,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    badges: PropTypes.arrayOf(
      PropTypes.shape({ text: PropTypes.string.isRequired, icon: PropTypes.string })
    ),
    link: PropTypes.string,
    flag: PropTypes.string
  }),
  compact: PropTypes.bool,
  showLink: PropTypes.bool,
  className: PropTypes.string
};

export default InternshipTooltip;

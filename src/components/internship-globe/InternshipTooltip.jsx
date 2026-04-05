import PropTypes from 'prop-types';

const LinkedInIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M5.75 3C4.24 3 3 4.24 3 5.75v12.5C3 19.76 4.24 21 5.75 21h12.5C19.76 21 21 19.76 21 18.25V5.75C21 4.24 19.76 3 18.25 3H5.75ZM7.75 6.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM7 10h1.5v7H7v-7Zm3.5 0H12v.77A2.5 2.5 0 0 1 14 10c1.65 0 3 1.35 3 3v4h-1.5v-3.75a1.25 1.25 0 0 0-2.5 0V17H11.5v-6.5c0-.28-.22-.5-.5-.5H10.5Z" />
  </svg>
);

const InternshipTooltip = ({ location, compact = false, showLink = true }) => {
  if (!location) return null;
  const badges = location.badges || [];

  return (
    <div
      style={{
        minWidth: '220px',
        maxWidth: '280px',
        background: 'rgba(8, 10, 14, 0.92)',
        border: '1px solid rgba(0, 212, 255, 0.25)',
        borderRadius: '8px',
        padding: '14px 16px',
        boxShadow: '0 0 0 1px rgba(0,212,255,0.06), 0 8px 32px rgba(0,0,0,0.7), 0 0 24px rgba(0,212,255,0.06)',
        backdropFilter: 'blur(16px)',
        fontFamily: 'JetBrains Mono, monospace',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top cyan accent bar */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #00d4ff 0%, transparent 100%)',
      }} />

      {/* Location header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        {location.flag && (
          <img
            src={`https://flagcdn.com/w40/${location.flag}.png`}
            srcSet={`https://flagcdn.com/w80/${location.flag}.png 2x`}
            alt=""
            style={{ height: '13px', width: '19px', borderRadius: '2px', objectFit: 'cover', flexShrink: 0, opacity: 0.9 }}
          />
        )}
        <span style={{
          fontSize: '0.7rem',
          fontWeight: 600,
          color: '#00d4ff',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          {location.country}{location.city ? ` / ${location.city}` : ''}
        </span>
      </div>

      {/* Role */}
      <p style={{
        fontSize: '0.875rem',
        fontWeight: 700,
        color: '#e8e8e8',
        marginBottom: '3px',
        lineHeight: 1.3,
        fontFamily: 'Syne, sans-serif',
        letterSpacing: '-0.01em',
      }}>
        {location.title}
      </p>

      {/* Company + year row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        <p style={{ fontSize: '0.75rem', color: '#888', margin: 0 }}>
          {location.company}
        </p>
        {!compact && (
          <span style={{
            fontSize: '0.65rem',
            color: 'rgba(0,212,255,0.5)',
            letterSpacing: '0.1em',
            whiteSpace: 'nowrap',
          }}>
            {location.year}
          </span>
        )}
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {badges.map((badge, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '7px',
                background: 'rgba(0,212,255,0.05)',
                border: '1px solid rgba(0,212,255,0.12)',
                borderRadius: '5px',
                padding: '6px 9px',
                fontSize: '0.68rem',
                color: '#a0a0a0',
                lineHeight: 1.5,
              }}
            >
              {badge.icon === 'linkedin' && (
                <span style={{ color: '#00d4ff', marginTop: '1px', flexShrink: 0 }}>
                  <LinkedInIcon />
                </span>
              )}
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Link */}
      {location.link && showLink && (
        <a
          href={location.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.7rem',
            color: '#00d4ff',
            textDecoration: 'none',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#00ffd5'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#00d4ff'}
        >
          Visit link
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
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
    badges: PropTypes.arrayOf(PropTypes.shape({ text: PropTypes.string.isRequired, icon: PropTypes.string })),
    link: PropTypes.string,
    flag: PropTypes.string,
  }),
  compact: PropTypes.bool,
  showLink: PropTypes.bool,
};

export default InternshipTooltip;

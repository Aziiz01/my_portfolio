import { lazy, Suspense, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import InternshipTooltip from './internship-globe/InternshipTooltip';
import { internshipLocations } from '../data/internshipLocations';

const GlobeCanvas = lazy(() => import('./internship-globe/GlobeCanvas'));

const InternshipGlobe = () => {
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [activeLocation, setActiveLocation] = useState(internshipLocations[0]);

  const selectedLocation = useMemo(
    () => activeLocation || internshipLocations[0],
    [activeLocation]
  );

  return (
    <section id="internships" className="section">
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '36px' }}
        >
          <span className="section-label">Experience</span>
          <h2 className="headline-2" style={{ marginTop: '8px', marginBottom: '12px' }}>
            International internships
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '58ch', lineHeight: 1.7 }}>
            Rotate, zoom, and click each marker to explore where I gained professional experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          style={{ display: 'grid', gap: '16px' }}
          className="lg:!grid-cols-[1.2fr_0.8fr]"
        >
          {/* Globe */}
          <div className="globe-container">
            <Suspense
              fallback={
                <div
                  style={{
                    height: '420px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    LOADING GLOBE...
                  </div>
                </div>
              }
            >
              <GlobeCanvas
                locations={internshipLocations}
                activeLocation={activeLocation}
                setHoveredLocation={setHoveredLocation}
                setActiveLocation={setActiveLocation}
              />
            </Suspense>
          </div>

          {/* Info panels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {/* Selected internship */}
            <div
              style={{
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-surface-1)',
                padding: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.625rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                  }}
                >
                  Selected
                </span>
                {activeLocation && (
                  <button
                    type="button"
                    onClick={() => setActiveLocation(null)}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      color: 'var(--accent-cyan)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      letterSpacing: '0.06em',
                    }}
                  >
                    Deselect
                  </button>
                )}
              </div>
              <InternshipTooltip location={selectedLocation} />
            </div>

            {/* Location list */}
            <div
              style={{
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-surface-1)',
                padding: '16px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '10px',
                }}
              >
                Locations
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {internshipLocations.map((location) => {
                  const isActive = activeLocation?.id === location.id;
                  return (
                    <div
                      key={location.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        borderRadius: '8px',
                        border: `1px solid ${isActive ? 'rgba(0,212,255,0.25)' : 'var(--border-subtle)'}`,
                        background: isActive ? 'rgba(0,212,255,0.05)' : 'rgba(255,255,255,0.02)',
                        padding: '10px 12px',
                        transition: 'border-color 0.2s ease, background 0.2s ease',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveLocation(location)}
                        style={{
                          display: 'flex',
                          flex: 1,
                          alignItems: 'center',
                          gap: '10px',
                          textAlign: 'left',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        {location.flag && (
                          <img
                            src={`https://flagcdn.com/w40/${location.flag}.png`}
                            srcSet={`https://flagcdn.com/w80/${location.flag}.png 2x`}
                            alt=""
                            style={{ height: '14px', width: '20px', borderRadius: '2px', objectFit: 'cover', flexShrink: 0 }}
                          />
                        )}
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8125rem',
                            color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)',
                            transition: 'color 0.2s ease',
                          }}
                        >
                          {location.country}{location.city ? ` — ${location.city}` : ''}
                        </span>
                      </button>
                      {location.link && (
                        <a
                          href={location.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{ color: 'var(--text-muted)', flexShrink: 0 }}
                          aria-label={`Open link for ${location.company}`}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                          </svg>
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hover hint */}
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                color: 'rgba(136,136,136,0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                letterSpacing: '0.04em',
              }}
            >
              {hoveredLocation ? (
                <>
                  {hoveredLocation.flag && (
                    <img
                      src={`https://flagcdn.com/w40/${hoveredLocation.flag}.png`}
                      alt=""
                      style={{ height: '12px', width: '18px', borderRadius: '2px', objectFit: 'cover' }}
                    />
                  )}
                  Hovering: {hoveredLocation.country}{hoveredLocation.city ? ` — ${hoveredLocation.city}` : ''}
                </>
              ) : (
                '// Click a marker to focus. Click again to release.'
              )}
            </p>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default InternshipGlobe;

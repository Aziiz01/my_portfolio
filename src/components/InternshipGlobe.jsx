import { lazy, Suspense, useMemo, useState } from 'react';

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
        <div className="mb-8">
          <h2 className="headline-2 mb-3">International internship journey</h2>
          <p className="max-w-[65ch] text-zinc-400">
            Interactive globe highlighting where I gained professional experience across borders.
            Rotate, zoom, and click each marker to explore the internship details.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Suspense
              fallback={
                <div className="h-[420px] w-full animate-pulse rounded-2xl border border-zinc-700/50 bg-zinc-800/60" />
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

          <div className="space-y-4">
            <div className="rounded-2xl border border-zinc-700/50 bg-zinc-800/40 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-400">Focused internship</p>
                {activeLocation && (
                  <button
                    type="button"
                    onClick={() => setActiveLocation(null)}
                    className="text-xs text-sky-400 hover:text-sky-300 hover:underline"
                  >
                    Deselect
                  </button>
                )}
              </div>
              <InternshipTooltip location={selectedLocation} className="mt-3" />
            </div>

            <div className="rounded-2xl border border-zinc-700/50 bg-zinc-800/40 p-4">
              <p className="text-sm text-zinc-400">Locations</p>
              <div className="mt-3 space-y-2">
                {internshipLocations.map((location) => (
                  <div
                    key={location.id}
                    className={
                      'flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ' +
                      (activeLocation?.id === location.id
                        ? 'border-sky-300/40 bg-sky-500/10 text-zinc-100'
                        : 'border-zinc-700/50 bg-zinc-900/60 text-zinc-300 hover:border-zinc-500')
                    }
                  >
                    <button
                      type="button"
                      onClick={() => setActiveLocation(location)}
                      className="flex flex-1 items-center gap-2 text-left"
                    >
                      {location.flag && (
                        <img
                          src={`https://flagcdn.com/w40/${location.flag}.png`}
                          srcSet={`https://flagcdn.com/w80/${location.flag}.png 2x`}
                          alt=""
                          className="h-4 w-6 shrink-0 rounded-sm object-cover"
                        />
                      )}
                      {location.country}{location.city ? ` - ${location.city}` : ''}
                    </button>
                    {location.link && (
                      <a
                        href={location.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="shrink-0 text-sky-400 hover:text-sky-300"
                        title="Open link"
                        aria-label={`Open link for ${location.company}`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <p className="flex items-center gap-2 text-xs text-zinc-500">
              {hoveredLocation ? (
                <>
                  {hoveredLocation.flag && (
                    <img
                      src={`https://flagcdn.com/w40/${hoveredLocation.flag}.png`}
                      srcSet={`https://flagcdn.com/w80/${hoveredLocation.flag}.png 2x`}
                      alt=""
                      className="h-3.5 w-5 shrink-0 rounded-sm object-cover"
                    />
                  )}
                  Hovering: {hoveredLocation.country}{hoveredLocation.city ? ` - ${hoveredLocation.city}` : ''}
                </>
              ) : (
                'Tip: Click a marker to focus. Click it again or use Deselect to release the view and rotate freely.'
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternshipGlobe;

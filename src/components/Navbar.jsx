import { useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const NAV_ITEMS = [
  { label: 'Home',        link: '#home',        sectionId: 'home' },
  { label: 'About',       link: '#about',       sectionId: 'about' },
  { label: 'Skills',      link: '#skills',      sectionId: 'skills' },
  { label: 'Education',   link: '#education',   sectionId: 'education' },
  { label: 'Internships', link: '#internships', sectionId: 'internships' },
  { label: 'Work',        link: '#work',        sectionId: 'work' },
  { label: 'Contact',     link: '#contact',     sectionId: 'contact', extraClass: 'md:hidden' },
];

const Navbar = ({ navOpen }) => {
  const linkRefs    = useRef([]);
  const activeBoxRef = useRef(null);
  const activeIdxRef = useRef(0); // track current index to avoid redundant moves

  const moveBoxTo = useCallback((idx) => {
    const link = linkRefs.current[idx];
    const box  = activeBoxRef.current;
    if (!link || !box) return;

    linkRefs.current.forEach((el) => el?.classList.remove('active'));
    link.classList.add('active');
    activeIdxRef.current = idx;

    box.style.top    = link.offsetTop    + 'px';
    box.style.left   = link.offsetLeft   + 'px';
    box.style.width  = link.offsetWidth  + 'px';
    box.style.height = link.offsetHeight + 'px';
  }, []);

  // Init active box + keep it in sync on resize
  useLayoutEffect(() => {
    moveBoxTo(0);
    const onResize = () => moveBoxTo(activeIdxRef.current);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [moveBoxTo]);

  // Scroll-based section tracking
  useEffect(() => {
    const sections = NAV_ITEMS.map(({ sectionId }) =>
      document.getElementById(sectionId)
    ).filter(Boolean);

    if (!sections.length) return;

    const ratioMap = new Map(sections.map((s) => [s.id, 0]));

    const pick = () => {
      let bestId    = null;
      let bestRatio = 0.05; // minimum threshold to register
      ratioMap.forEach((ratio, id) => {
        if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
      });
      if (!bestId) return;
      const idx = NAV_ITEMS.findIndex((n) => n.sectionId === bestId);
      if (idx !== -1 && idx !== activeIdxRef.current) moveBoxTo(idx);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratioMap.set(e.target.id, e.intersectionRatio));
        pick();
      },
      {
        // Account for fixed 64px header; observe generous thresholds
        rootMargin: '-64px 0px 0px 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [moveBoxTo]);

  const handleClick = useCallback((e, idx) => {
    moveBoxTo(idx);
  }, [moveBoxTo]);

  return (
    <nav className={'navbar ' + (navOpen ? 'active' : '')}>
      {NAV_ITEMS.map(({ label, link, extraClass = '' }, idx) => (
        <a
          key={link}
          href={link}
          ref={(el) => { linkRefs.current[idx] = el; }}
          className={`nav-link${extraClass ? ' ' + extraClass : ''}`}
          onClick={(e) => handleClick(e, idx)}
        >
          {label}
        </a>
      ))}
      <div className="active-box" ref={activeBoxRef} />
    </nav>
  );
};

Navbar.propTypes = {
  navOpen: PropTypes.bool.isRequired,
};

export default Navbar;

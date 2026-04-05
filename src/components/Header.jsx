import { useState } from "react";
import Navbar from "./Navbar";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 w-full h-16 flex items-center z-40"
      style={{
        background: 'rgba(10,10,10,0.85)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="container flex justify-between items-center md:grid md:grid-cols-[1fr,3fr,1fr] w-full max-w-[1200px] mx-auto">

        {/* Logo wordmark */}
        <h1>
          <a href="/" className="flex items-center gap-2 group" aria-label="Home">
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.125rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              AZIZ
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--accent-cyan)',
                opacity: 0.8,
              }}
            >
              .dev
            </span>
          </a>
        </h1>

        {/* Nav */}
        <div className="relative md:justify-self-center">
          <button
            className="menu-btn md:hidden"
            onClick={() => setNavOpen((prev) => !prev)}
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="material-symbols-rounded" style={{ color: 'var(--text-primary)', fontSize: '20px' }}>
              {navOpen ? 'close' : 'menu'}
            </span>
          </button>
          <Navbar navOpen={navOpen} />
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2 md:justify-self-end">
          <a href="#contact" className="btn btn-primary">
            Contact
          </a>
        </div>

      </div>
    </header>
  );
};

export default Header;

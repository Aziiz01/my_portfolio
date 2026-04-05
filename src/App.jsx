/**
 * @copyright 2024
 * @license Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skill from './components/Skill';
import Work from './components/Work';
import Contact from './components/Contact';
import SiteFeedback from './components/SiteFeedback';
import Footer from './components/Footer';
import EducationSection from './components/EducationSection';

const InternshipGlobe = lazy(() => import('./components/InternshipGlobe'));

const App = () => {
  useGSAP(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const elements = gsap.utils.toArray('.reveal-up');
    const revealLeft = gsap.utils.toArray('.reveal-left');
    const revealRight = gsap.utils.toArray('.reveal-right');
    const parallaxItems = gsap.utils.toArray('.parallax-soft');

    elements.forEach((element) => {
      gsap.to(element, {
        scrollTrigger: { trigger: element, start: '-200 bottom', end: 'bottom 80%', scrub: true },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      });
    });

    revealLeft.forEach((element) => {
      gsap.fromTo(
        element,
        { x: -32, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 85%' } }
      );
    });

    revealRight.forEach((element) => {
      gsap.fromTo(
        element,
        { x: 32, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 85%' } }
      );
    });

    parallaxItems.forEach((element) => {
      gsap.fromTo(
        element,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    });
  });

  return (
    <ReactLenis root>
      <Header />
      <main>
        <Hero />
        <About />
        <Skill />
        <EducationSection />
        <Suspense fallback={null}>
          <InternshipGlobe />
        </Suspense>
        <Work />
        <Contact />
        <SiteFeedback />
      </main>
      <Footer />
    </ReactLenis>
  );
};

export default App;

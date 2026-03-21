/**
 * @copyright 2024 
 * @license Apache-2.0
 */


/**
 * Node modules
 */
import { lazy, Suspense } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';


/**
 * Register gsap plugins
 */
gsap.registerPlugin(useGSAP, ScrollTrigger);


/**
 * Components
 */
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skill from "./components/Skill";
import Work from "./components/Work";
import Review from "./components/Review";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import EducationSection from "./components/EducationSection";
import CustomCursor from "./components/CustomCursor";
// import AlgorithmVisualizer from "./components/AlgorithmVisualizer";

const InternshipGlobe = lazy(() => import('./components/InternshipGlobe'));

const App = () => {
/* <Review />*/
  useGSAP(() => {
    const elements = gsap.utils.toArray('.reveal-up');
    const revealLeft = gsap.utils.toArray('.reveal-left');
    const revealRight = gsap.utils.toArray('.reveal-right');
    const parallaxItems = gsap.utils.toArray('.parallax-soft');

    elements.forEach((element) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: '-200 bottom',
          end: 'bottom 80%',
          scrub: true
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
      })
    });

    revealLeft.forEach((element) => {
      gsap.fromTo(
        element,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 85%' }
        }
      );
    });

    revealRight.forEach((element) => {
      gsap.fromTo(
        element,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 85%' }
        }
      );
    });

    parallaxItems.forEach((element) => {
      gsap.fromTo(
        element,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    });
  });

  return (
    <ReactLenis root>
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <About />
        <Skill />
        {/* Algorithm visualizer section (disabled)
        <AlgorithmVisualizer />
        */}
        <EducationSection />
        <Suspense fallback={null}>
          <InternshipGlobe />
        </Suspense>
        <Work />
        <Contact />
      </main>
      <Footer />
    </ReactLenis>
  )

}


export default App;

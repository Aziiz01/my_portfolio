/**
 * Selected work for the portfolio.
 *
 * Note: There is no public GitHub repository named "Recruiter" on github.com/Aziiz01.
 * **ResuMatch** is the project that matches résumés to job postings (recruiting / hiring workflow).
 * Sources: README.md in Aziiz01/ResuMatch and Aziiz01/Flous.
 */

export const workProjects = [
  {
    imgSrc: '/images/0405.gif',
    title: 'Flous',
    description:
      'Playful 3D visualization of Tunisian dinar (TND): enter an amount and denomination (10 / 20 / 50 TND) and watch stacks of bills build in a full-screen Three.js scene with GSAP-driven motion. Includes scale comparisons to real-world references, rough purchasing-power estimates (educational only), optional EmailJS feedback, and shareable URL state via query parameters.',
    tags: ['React', 'Three.js', 'GSAP', 'Tailwind CSS'],
    projectLink: 'https://flous-six.vercel.app',
    linkLabel: 'Live demo',
  },
  {
    imgSrc: '/images/resumatch.gif',
    title: 'ResuMatch',
    description:
      'Web app that compares your résumé with a job description: surfaces skill overlap, suggests CV improvements using Hugging Face inference (embeddings and text generation when configured), and ships a LaTeX CV builder with live HTML preview (LaTeX.js) plus downloadable .tex for local compilation. Built with the Next.js App Router, React 19, and TypeScript.',
    tags: ['Next.js', 'TypeScript', 'Hugging Face', 'LaTeX'],
    projectLink: 'https://resu-match-eight.vercel.app/',
    linkLabel: 'Live demo',
  },
  {
    imgSrc: '/images/f2.png',
    title: "Elite — Women's Fashion & Makeup",
    description:
      'Production-oriented storefront: React and Node stack with MongoDB, emphasizing product discovery, checkout paths, and deployable full-stack structure.',
    tags: ['React', 'Node.js', 'MongoDB', 'Ecommerce'],
    projectLink: 'https://elite-ecru-alpha.vercel.app/',
    linkLabel: 'Live demo',
  },
  {
    imgSrc: '/images/freeAI.png',
    title: 'FreeAI — AI Tools Showcase',
    description:
      'Next.js 13 showcase app bundling 8 prompt-driven AI tools in one clean interface: image generation, YouTube script & title generators, Instagram caption generator, text humanizer, domain name generator, blog idea planner, and code generator. Built for local demos and fast experimentation.',
    tags: ['Next.js', 'TypeScript', 'OpenAI API', 'Tailwind CSS'],
    projectLink: 'https://ai-lemon-ten.vercel.app/',
    linkLabel: 'Live demo',
  },
  {
    imgSrc: '/images/pdf.png',
    title: 'AI PDF Reader',
    description:
      'Web app to upload PDFs and explore AI-assisted reading and extraction—focused on a simple UX around document workflows.',
    tags: ['AI', 'Vercel', 'Frontend'],
    projectLink: 'https://pdf-69zi.vercel.app/',
    linkLabel: 'Live demo',
  },
];

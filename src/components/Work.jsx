/**
 * @copyright 2024 
 * @license Apache-2.0
 */


/**
 * Components
 */
import ProjectCard from "./ProjectCard";


const works = [
  {
    imgSrc: '/images/micro.jpg',
    title: 'AI-Powered LMS Backend',
    tags: ['API', 'DevOps', 'Microservices'],
    projectLink: 'https://github.com/Aziiz01/Backend_web_MS/tree/aziz'
  },
  {
    imgSrc: '/images/coffe.jpg',
    title: 'Code-Cafe',
    tags: ['API', 'SPA'],
    projectLink: 'https://github.com/Aziiz01/code-cafe'
  },
  {
    imgSrc: '/images/pdf.png',
    title: 'Ai Pdf Reader',
    tags: ['Ai', 'Development'],
    projectLink: 'https://pdf-69zi.vercel.app/'
  },
  {
    imgSrc: '/images/project-5.jpg',
    title: 'eCommerce website',
    tags: ['eCommerce', 'Development'],
    projectLink: 'https://github.com/Aziiz01/Fashion_Lakrim'
  },
  {
    imgSrc: '/images/f2.png',
    title: 'Elite — Women\'s Fashion & Makeup',
    tags: ['Full-Stack', 'React', 'Node.js', 'MongoDB', 'eCommerce'],
    projectLink: 'https://elite-ecru-alpha.vercel.app/'
  }
];


const Work = () => {
  return (
    <section
      id="work"
      className="section"
    >
      <div className="container">

        <h2 className="headline-2 mb-8 reveal-up">
          My portfolio highlights
        </h2>

        <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
          {works.map(({ imgSrc, title, tags, projectLink }, key) => (
            <ProjectCard
              key={key}
              imgSrc={imgSrc}
              title={title}
              tags={tags}
              projectLink={projectLink}
              classes="reveal-up"
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Work
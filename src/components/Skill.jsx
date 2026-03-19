/**
 * @copyright 2024 
 * @license Apache-2.0
 */


/**
 * Components
 */
import SkillMap from "./skill-map/SkillMap";

const skillItem = [
  {
    imgSrc: '/images/openai.svg',
    label: 'Open AI',
    desc: 'AI Solutions'
  },
  {
    imgSrc: '/images/css3.svg',
    label: 'CSS',
    desc: 'User Interface'
  },
  {
    imgSrc: '/images/javascript.svg',
    label: 'JavaScript',
    desc: 'Interaction'
  },
  {
    imgSrc: '/images/nodejs.svg',
    label: 'NodeJS',
    desc: 'Web Server'
  },
  {
    imgSrc: '/images/expressjs.svg',
    label: 'ExpressJS',
    desc: 'Node Framework'
  },
  {
    imgSrc: '/images/mongodb.svg',
    label: 'MongoDB',
    desc: 'Database'
  },
  {
    imgSrc: '/images/react.svg',
    label: 'React',
    desc: 'Frontend Framework'
  },
  {
    imgSrc: '/images/tailwindcss.svg',
    label: 'TailwindCSS',
    desc: 'Styling Framework'
  },
  {
    imgSrc: '/images/springboot.svg',
    label: 'Spring Boot',
    desc: 'Backend Framework'
  },
  {
    imgSrc: '/images/sourcetree.svg',
    label: 'SourceTree',
    desc: 'Git GUI'
  },
  {
    imgSrc: '/images/jira.svg',
    label: 'Jira',
    desc: 'Project Management'
  },
  {
    imgSrc: '/images/python.svg',
    label: 'Python',
    desc: 'Scripting & AI'
  },
  {
    imgSrc: '/images/vercel.svg',
    label: 'Vercel',
    desc: 'Website hosting'
  },
  {
    imgSrc: '/images/git.svg',
    label: 'Git',
    desc: 'Version Control'
  },
  {
    imgSrc: '/images/html5.svg',
    label: 'HTML',
    desc: 'Web Structure'
  },
  {
    imgSrc: '/images/bootstrap.svg',
    label: 'Bootstrap',
    desc: 'UI Framework'
  },
  {
    imgSrc: '/images/postgresql.svg',
    label: 'PostgreSQL',
    desc: 'Database'
  },
  {
    imgSrc: '/images/docker.svg',
    label: 'Docker',
    desc: 'Containerization'
  },
  {
    imgSrc: '/images/vscode.svg',
    label: 'VS Code',
    desc: 'Code Editor'
  },
  {
    imgSrc: '/images/phpstorm.svg',
    label: 'PhpSorm',
    desc: 'Code Editor'
  },
  {
    imgSrc: '/images/npm.svg',
    label: 'NPM',
    desc: 'Package Manager'
  },
  {
    imgSrc: '/images/flask.svg',
    label: 'Flask',
    desc: 'Python Framework'
  },
  {
    imgSrc: '/images/jenkins.svg',
    label: 'Jenkins',
    desc: 'Devops & Testing'
  }
];


const Skill = () => {
  return (
    <section id="skills" className="section">
      <div className="container">

        <h2 className="headline-2 reveal-up">
          Essential Tools I use
        </h2>

        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] reveal-up">
          Discover the powerful tools and technologies I use to create exceptional, high-performing websites & applications.
        </p>

        <SkillMap skills={skillItem} />

      </div>
    </section>
  )
}

export default Skill
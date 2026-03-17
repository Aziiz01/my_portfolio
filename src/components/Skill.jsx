/**
 * @copyright 2024 
 * @license Apache-2.0
 */


/**
 * Components
 */
import SkillCard from "./SkillCard";

const skillItem = [
  {
    imgSrc: 'https://simpleicons.org/icons/openai.svg',
    label: 'Open AI',
    desc: 'AI Solutions'
  },
  {
    imgSrc: 'https://simpleicons.org/icons/css3.svg',
    label: 'CSS',
    desc: 'User Interface'
  },
  {
    imgSrc: 'https://simpleicons.org/icons/javascript.svg',
    label: 'JavaScript',
    desc: 'Interaction'
  },
  {
    imgSrc: 'https://simpleicons.org/icons/nodedotjs.svg',
    label: 'NodeJS',
    desc: 'Web Server'
  },
  {
    imgSrc: 'https://simpleicons.org/icons/express.svg',
    label: 'ExpressJS',
    desc: 'Node Framework'
  },
  {
    imgSrc: 'https://simpleicons.org/icons/mongodb.svg',
    label: 'MongoDB',
    desc: 'Database'
  },
  {
    imgSrc: 'https://simpleicons.org/icons/react.svg',
    label: 'React',
    desc: 'Frontend Framework'
  },
  {
    imgSrc: 'https://simpleicons.org/icons/tailwindcss.svg',
    label: 'TailwindCSS',
    desc: 'Styling Framework'
  },
  {
    imgSrc: 'https://simpleicons.org/icons/spring.svg',
    label: 'Spring Boot',
    desc: 'Backend Framework'
  },
  {
    imgSrc: 'https://simpleicons.org/icons/sourcetree.svg',
    label: 'SourceTree',
    desc: 'Git GUI'
  },
  {
    imgSrc: 'https://simpleicons.org/icons/jira.svg',
    label: 'Jira',
    desc: 'Project Management'
  },
  {
    imgSrc: 'https://simpleicons.org/icons/python.svg',
    label: 'Python',
    desc: 'Scripting & AI'
  },
  {
    imgSrc: 'https://simpleicons.org/icons/vercel.svg',
    label: 'Vercel',
    desc: 'Website hosting'
  },
  {
    imgSrc: 'https://simpleicons.org/icons/git.svg',
    label: 'Git',
    desc: 'Version Control'
  },
  {
    imgSrc: 'https://simpleicons.org/icons/html5.svg',
    label: 'HTML',
    desc: 'Web Structure'
  },
  {
    imgSrc: 'https://simpleicons.org/icons/bootstrap.svg',
    label: 'Bootstrap',
    desc: 'UI Framework'
  },
  {
    imgSrc: 'https://simpleicons.org/icons/postgresql.svg',
    label: 'PostgreSQL',
    desc: 'Database'
  },
  {
    imgSrc: 'https://simpleicons.org/icons/docker.svg',
    label: 'Docker',
    desc: 'Containerization'
  },
  {
    imgSrc: 'https://simpleicons.org/icons/tsnode.svg',
    label: 'VS Code',
    desc: 'Code Editor'
  },
  {
    imgSrc: 'https://simpleicons.org/icons/phpstorm.svg',
    label: 'PhpSorm',
    desc: 'Code Editor'
  },
  {
    imgSrc: 'https://simpleicons.org/icons/npm.svg',
    label: 'NPM',
    desc: 'Package Manager'
  },
  {
    imgSrc: 'https://simpleicons.org/icons/flask.svg',
    label: 'Flask',
    desc: 'Python Framework'
  },
  {
    imgSrc: 'https://simpleicons.org/icons/jenkins.svg',
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

        <div className="grid gap-3 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]">
          {
            skillItem.map(({ imgSrc, label, desc }, key) => (
              <SkillCard
                key={key}
                imgSrc={imgSrc}
                label={label}
                desc={desc}
                classes="reveal-up"
              />
            ))
          }
        </div>

      </div>
    </section>
  )
}

export default Skill
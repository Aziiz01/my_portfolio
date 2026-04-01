/**
 * @copyright 2024 
 * @license Apache-2.0
 */


import SkillToolsCloud from './skill-cloud/SkillToolsCloud';
import { skillCloudItems } from '../data/skillCloudItems';

const Skill = () => {
  return (
    <section id="skills" className="section">
      <div className="container">

        <h2 className="headline-2 reveal-up">
          Essential Tools I use
        </h2>

        <p className="mt-3 mb-8 max-w-[50ch] text-zinc-400 reveal-up">
          Discover the powerful tools and technologies I use to create exceptional, high-performing websites & applications.
        </p>

        <SkillToolsCloud items={skillCloudItems} />

      </div>
    </section>
  )
}

export default Skill
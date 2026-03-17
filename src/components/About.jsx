/**
 * @copyright 2024 
 * @license Apache-2.0
 */


const aboutItems = [
  {
    label: 'Projects done',
    number: 15
  },
  {
    label: 'Years of experience',
    number: 3
  }
];


const About = () => {
  return (
    <section
      id="about"
      className="section"
    >
      <div className="container">

        <div className="bg-zinc-800/50 p-7 rounded-2xl md:p-12 reveal-up">
          <div className="space-y-5 md:space-y-6 md:text-xl md:max-w-[65ch] text-zinc-300 mb-6 md:mb-8">
            <p>
              I'm Mohamed Aziz, a software engineer with a National Engineering Degree in Computer Science, graduated with highest honors.
            </p>
            <p>
              I gained international experience as a full-stack developer intern in Tunisia and the Netherlands, contributing to production systems and shipping real product features.
            </p>
            <p>
              I focus on building web applications and backend systems with React, Node.js, and modern development tools, solving practical engineering challenges from APIs to full-stack applications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 md:gap-7">
            {
              aboutItems.map(({ label, number }, key) => (
                <div key={key}>
                  <div className="flex items-center md:mb-2">
                    <span className="text-2xl font-semibold md:text-4xl">{number}</span>
                    <span className="text-sky-400 font-semibold md:text-3xl">+</span>
                  </div>

                  <p className="text-sm text-zinc-400">{label}</p>
                </div>
              ))
            }

            <img
              src="/images/logo.svg"
              alt="Logo"
              width={30}
              height={30}
              className="ml-auto md:w-[40px] md:h-[40px]"
            />
          </div>
        </div>

      </div>
    </section>
  )
}

export default About

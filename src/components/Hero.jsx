/**
 * @copyright 2024 
 * @license Apache-2.0
 */


/**
 * Components
 */
import { ButtonPrimary, ButtonOutline } from "./Button";
import "./hero.css";

const Hero = () => {
  return (
    <section
      id="home"
      className="pt-28 lg:pt-36"
    >
      <div className="container items-center lg:grid lg:grid-cols-2 lg:gap-10">

        <div className="reveal-left">
          <div className="flex items-center gap-3">
            <figure className="img-box w-9 h-9 rounded-lg">
              <img
                src="/images/mepng.png"
                width={40}
                height={40}
                alt="aziz-portfolio portrait"
                className="img-cover"
              />
            </figure>

            <div className="flex items-center gap-1.5 text-zinc-400 text-sm tracking-wide">
              <span className="relative w-2 h-2 rounded-full bg-emerald-400">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping"></span>
              </span>

              Available for work
            </div>
          </div>

          <h2 className="headline-1 max-w-[15ch] sm:max-w-[20ch] lg:max-w-[15ch] mt-5 mb-4 lg:mb-5">
            Software Engineer · Full-Stack Development
          </h2>
          <p className="text-zinc-400 text-lg mb-8 lg:mb-10 max-w-[45ch]">
            Computer Science engineer with international experience, focused on building scalable web applications.
          </p>

          <div className="flex items-center gap-3">
           

            <ButtonOutline
              href="#about"
              label="Scroll down"
              icon="arrow_downward"
            />
          </div>
        </div>

        <div className="hidden lg:block reveal-right">
          <figure className="parallax-soft w-full max-w-[480px] ml-auto bg-gradient-to-t from-sky-400 via-25% via-sky-400/40 to-65% rounded-[60px] overflow-hidden">
            <img
              src="/images/mepng.png"
              width={656}
              height={800}
              alt="aziz-portfolio"
                                      />
          </figure>
        </div>

      </div>

    </section>
  )
}

export default Hero
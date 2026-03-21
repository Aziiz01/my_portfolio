/**
 * @copyright 2024
 * @license Apache-2.0
 */

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { EMAILJS_CONFIG } from '../data/emailjsConfig';
import FormSuccessMessage from './FormSuccessMessage';

const STARS = [1, 2, 3, 4, 5];

const SiteFeedback = () => {
  const formRef = useRef(null);
  const [rating, setRating] = useState(null);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hasReset, setHasReset] = useState(false);

  const sendFeedback = (e) => {
    e.preventDefault();
    if (rating == null) {
      toast.error('Please choose a star rating first.', { position: 'top-right' });
      return;
    }

    const form = formRef.current;
    const fd = new FormData(form);
    const visitorName = (fd.get('visitor_name') || '').toString().trim() || 'Anonymous visitor';
    const visitorEmail = (fd.get('visitor_email') || '').toString().trim() || 'anonymous@example.com';
    const comment = (fd.get('feedback_comment') || '').toString().trim();

    const message = [
      '[Portfolio site feedback]',
      '',
      `Rating: ${rating} / 5`,
      '',
      comment ? `Comment:\n${comment}` : 'Comment: (none)',
    ].join('\n');

    setSending(true);

    emailjs
      .send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          name: visitorName,
          email: visitorEmail,
          message,
        },
        EMAILJS_CONFIG.publicKey
      )
      .then(() => {
        setSubmitted(true);
        form.reset();
        setRating(null);
      })
      .catch((err) => {
        console.error('Feedback email failed:', err);
        toast.error('Could not send feedback. Try again later.', {
          position: 'top-right',
          autoClose: 3000,
        });
      })
      .finally(() => setSending(false));
  };

  const resetForm = () => {
    setSubmitted(false);
    setRating(null);
    setHasReset(true);
  };

  return (
    <section
      id="feedback"
      className="section border-t border-zinc-800/60"
      aria-labelledby="feedback-heading"
    >
      <div className="container max-w-5xl">
        {/* Distinct from Contact: inset panel, amber accent, reversed desktop columns */}
        <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-950/25 via-zinc-900/50 to-zinc-950/80 p-6 sm:p-8 lg:p-10 ring-1 ring-inset ring-white/[0.04] shadow-[0_0_0_1px_rgba(251,191,36,0.06)]">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl"
            aria-hidden
          />
          <div className="relative lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-10 xl:gap-14">
            {submitted ? (
              <div className="relative z-10 order-2 lg:order-1 lg:col-span-1 lg:pr-4 xl:pr-8">
                <FormSuccessMessage
                  message="Thanks for your feedback!"
                  subtext="Your rating and comment have been sent."
                  onSendAnother={resetForm}
                  accentColor="emerald"
                />
              </div>
            ) : (
            <form
              ref={formRef}
              onSubmit={sendFeedback}
              className={'relative z-10 order-2 flex flex-col gap-4 lg:order-1 lg:pr-4 xl:pr-8' + (hasReset ? ' reveal-up-skip' : '')}
            >
              <div className="reveal-up">
                <p className="label mb-2">Your rating</p>
                <div
                  role="radiogroup"
                  aria-label="Rate this portfolio from 1 to 5 stars"
                  className="flex items-center gap-0.5"
                >
                  {STARS.map((value) => {
                    const active = rating != null && value <= rating;
                    return (
                      <label
                        key={value}
                        className={`cursor-pointer p-1 rounded-lg transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-amber-400/60 has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-zinc-900 ${
                          active ? 'text-amber-400' : 'text-zinc-600 hover:text-zinc-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="portfolio_rating_ui"
                          className="sr-only"
                          checked={rating === value}
                          onChange={() => setRating(value)}
                          value={value}
                        />
                        <span
                          className="material-symbols-rounded text-3xl leading-none pointer-events-none block"
                          style={{
                            fontVariationSettings: active ? '"FILL" 1, "wght" 400' : '"FILL" 0, "wght" 400',
                          }}
                          aria-hidden
                        >
                          star
                        </span>
                        <span className="sr-only">{value} star{value !== 1 ? 's' : ''}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="reveal-up">
                <label htmlFor="feedback_comment" className="label">
                  Comment <span className="text-zinc-500 font-normal">(optional)</span>
                </label>
                <textarea
                  name="feedback_comment"
                  id="feedback_comment"
                  rows={3}
                  placeholder="What stood out, or what could be better?"
                  className="text-field resize-y min-h-24 max-h-40 w-full bg-zinc-950/50"
                />
              </div>

              <div className="md:grid md:grid-cols-2 md:gap-3 reveal-up">
                <div>
                  <label htmlFor="visitor_name" className="label">
                    Name <span className="text-zinc-500 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="visitor_name"
                    id="visitor_name"
                    autoComplete="name"
                    placeholder="Anonymous"
                    className="text-field w-full bg-zinc-950/50"
                  />
                </div>
                <div>
                  <label htmlFor="visitor_email" className="label">
                    Email <span className="text-zinc-500 font-normal">(optional)</span>
                  </label>
                  <input
                    type="email"
                    name="visitor_email"
                    id="visitor_email"
                    autoComplete="email"
                    placeholder="For a reply"
                    className="text-field w-full bg-zinc-950/50"
                  />
                </div>
              </div>

              <div className="flex w-full justify-end pt-1 max-lg:mt-2 max-lg:border-t max-lg:border-zinc-800/50 max-lg:pt-4">
                <button
                  type="submit"
                  disabled={sending}
                  className="btn btn-primary shrink-0 justify-center reveal-up disabled:opacity-60 disabled:pointer-events-none"
                >
                  {sending ? 'Sending…' : 'Send feedback'}
                </button>
              </div>
            </form>
            )}

            <div className="order-1 mb-8 flex flex-col lg:order-2 lg:mb-0 lg:items-end lg:text-right">
              <p className="reveal-up text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/90">
                Visitor feedback
              </p>
              <h2
                id="feedback-heading"
                className="title-1 mt-2 max-w-[18ch] text-zinc-100 lg:ml-auto lg:max-w-[16ch] reveal-up"
              >
                Enjoyed my portfolio?
              </h2>
              <p className="mt-3 max-w-[45ch] text-zinc-400 lg:ml-auto lg:max-w-[28ch] reveal-up">
                Your rating helps me improve. Optional comment and name — feedback is sent to my email.
              </p>
              {rating != null && (
                <div className="mt-6 flex items-center gap-2 lg:ml-auto reveal-up">
                  <span className="text-amber-400">
                    <span
                      className="material-symbols-rounded text-2xl"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      star
                    </span>
                  </span>
                  <span className="font-medium tabular-nums text-zinc-300">{rating} / 5</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SiteFeedback;

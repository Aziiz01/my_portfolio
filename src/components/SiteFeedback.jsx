import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
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
      '[Portfolio site feedback]', '',
      `Rating: ${rating} / 5`, '',
      comment ? `Comment:\n${comment}` : 'Comment: (none)',
    ].join('\n');

    setSending(true);
    emailjs
      .send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, { name: visitorName, email: visitorEmail, message }, EMAILJS_CONFIG.publicKey)
      .then(() => { setSubmitted(true); form.reset(); setRating(null); })
      .catch((err) => { console.error(err); toast.error('Could not send feedback.', { position: 'top-right', autoClose: 3000 }); })
      .finally(() => setSending(false));
  };

  const resetForm = () => { setSubmitted(false); setRating(null); setHasReset(true); };

  return (
    <section id="feedback" className="section" aria-labelledby="feedback-heading">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '16px',
            border: '1px solid rgba(255,189,36,0.12)',
            background: 'linear-gradient(135deg, rgba(255,150,0,0.04) 0%, var(--bg-surface-1) 50%, var(--bg-base) 100%)',
            padding: 'clamp(24px, 4vw, 40px)',
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,189,36,0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
            aria-hidden
          />

          <div style={{ position: 'relative' }} className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">

            {/* Left: form */}
            {submitted ? (
              <div>
                <FormSuccessMessage
                  message="Thanks for your feedback!"
                  subtext="Your rating has been sent."
                  onSendAnother={resetForm}
                  accentColor="emerald"
                />
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={sendFeedback}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                className={hasReset ? 'reveal-up-skip' : ''}
              >
                {/* Star rating */}
                <div>
                  <p className="label" style={{ marginBottom: '10px' }}>Rate this portfolio</p>
                  <div role="radiogroup" aria-label="Rate 1 to 5 stars" style={{ display: 'flex', gap: '4px' }}>
                    {STARS.map((value) => {
                      const active = rating != null && value <= rating;
                      return (
                        <label
                          key={value}
                          style={{
                            cursor: 'pointer',
                            padding: '6px',
                            borderRadius: '8px',
                            color: active ? '#fbbf24' : 'rgba(136,136,136,0.4)',
                            transition: 'color 0.2s ease',
                          }}
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
                            className="material-symbols-rounded"
                            style={{
                              fontSize: '28px',
                              lineHeight: 1,
                              display: 'block',
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

                <div>
                  <label htmlFor="feedback_comment" className="label">Comment <span style={{ fontWeight: 400, color: 'rgba(136,136,136,0.4)' }}>(optional)</span></label>
                  <textarea
                    name="feedback_comment"
                    id="feedback_comment"
                    rows={3}
                    placeholder="What stood out? What could be better?"
                    className="text-field"
                    style={{ resize: 'vertical', minHeight: '80px', maxHeight: '140px' }}
                  />
                </div>

                <div style={{ display: 'grid', gap: '10px' }} className="md:!grid-cols-2">
                  <div>
                    <label htmlFor="visitor_name" className="label">Name <span style={{ fontWeight: 400, color: 'rgba(136,136,136,0.4)' }}>(optional)</span></label>
                    <input type="text" name="visitor_name" id="visitor_name" autoComplete="name" placeholder="Anonymous" className="text-field" />
                  </div>
                  <div>
                    <label htmlFor="visitor_email" className="label">Email <span style={{ fontWeight: 400, color: 'rgba(136,136,136,0.4)' }}>(optional)</span></label>
                    <input type="email" name="visitor_email" id="visitor_email" autoComplete="email" placeholder="For a reply" className="text-field" />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn btn-primary"
                    style={{ opacity: sending ? 0.6 : 1, pointerEvents: sending ? 'none' : 'auto' }}
                  >
                    {sending ? 'Sending…' : 'Send feedback'}
                  </button>
                </div>
              </form>
            )}

            {/* Right: heading */}
            <div style={{ marginBottom: '32px' }} className="lg:!mb-0 lg:!text-right">
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#fbbf24',
                  marginBottom: '8px',
                  opacity: 0.8,
                }}
              >
                Visitor feedback
              </p>
              <h2
                id="feedback-heading"
                className="title-1"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text-primary)',
                  marginBottom: '12px',
                }}
              >
                Enjoyed this portfolio?
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.7,
                  maxWidth: '32ch',
                  marginLeft: 'auto',
                }}
                className="max-lg:!mx-0"
              >
                Your rating helps me improve. Takes 10 seconds.
              </p>
              {rating != null && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '20px',
                    justifyContent: 'flex-end',
                  }}
                  className="max-lg:!justify-start"
                >
                  <span style={{ color: '#fbbf24', fontSize: '20px' }}>★</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>
                    {rating} / 5
                  </span>
                </div>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SiteFeedback;

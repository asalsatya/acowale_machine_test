import { useFeedbackForm } from '../../hooks/useFeedback';
import CategoryCards from './CategoryCards';
import { CheckCircle2, XCircle, Send, Check } from 'lucide-react';

export default function FeedbackForm() {
  const { form, loading, error, success, coolDown, handleChange, handleSubmit, resetSuccess } = useFeedbackForm();

  if (success) {
    return (
      <div style={{ background: 'var(--color-card-bg)', borderRadius: 'var(--radius-xl)', padding: '60px 40px', maxWidth: 600, width: '100%', margin: '0 auto', boxShadow: 'var(--shadow-float)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: '1px solid var(--border-color)' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--color-badge-green-bg)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <Check size={40} strokeWidth={3} />
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 12px' }}>Feedback Submitted!</h2>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', margin: '0 0 32px', maxWidth: 400 }}>
          Thank you for taking the time to share your thoughts. We review every submission to make our product better.
        </p>
        <button onClick={resetSuccess} className="btn-secondary" style={{ padding: '12px 24px', borderRadius: '12px' }}>
          Submit Another Response
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--color-card-bg)', borderRadius: 'var(--radius-xl)', padding: '40px', maxWidth: 600, width: '100%', margin: '0 auto', boxShadow: 'var(--shadow-float)', border: '1px solid var(--border-color)' }}>
      <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Send size={24} />
        </div>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px' }}>
            Share Your Feedback
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>We read every submission and use it to improve.</p>
        </div>
      </div>

      {error && (
        <div role="alert" className="toast-animate" style={{ position: 'fixed', top: 24, right: 24, zIndex: 9999, background: '#EF4444', color: 'white', padding: '16px 24px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontWeight: 500 }}>
          <XCircle size={20} /> {error}
        </div>
      )}

      <div style={{ position: 'relative' }}>
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <CategoryCards value={form.category} onChange={handleChange} />

            <div>
              <label htmlFor="comment-field" style={{ display: 'block', marginBottom: 12, fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
                Your Feedback <span style={{ color: 'var(--error)' }}>*</span>
              </label>
              <textarea
                id="comment-field"
                name="comment"
                value={form.comment}
                onChange={handleChange}
                placeholder="Tell us what's on your mind… (minimum 10 characters)"
                rows={5}
                maxLength={500}
                className="input-field"
                required
                style={{ resize: 'vertical', minHeight: 120 }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>
                  {form.comment.length} / 500
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="email-field" style={{ display: 'block', marginBottom: 12, fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
                Email <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span>
              </label>
              <input id="email-field" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="input-field" />
            </div>

            <button id="submit-feedback-btn" type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', marginTop: 8, padding: '14px 20px', borderRadius: '12px', fontSize: 16 }}>
              {loading ? (
                <>
                  <div className="btn-spinner" style={{ borderTopColor: 'white' }}></div>
                  Submitting…
                </>
              ) : 'Submit Feedback'}
            </button>
          </div>
        </form>

        {coolDown > 0 && (
          <div style={{ position: 'absolute', inset: -16, backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', backgroundColor: 'rgba(255,255,255,0.5)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px' }}>
            <div style={{ background: 'var(--color-card-bg)', padding: '16px 24px', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-float)', textAlign: 'center', fontWeight: 600, color: 'var(--text-primary)', maxWidth: '80%' }}>
              Please wait for <span style={{ color: 'var(--color-primary)', fontVariantNumeric: 'tabular-nums', display: 'inline-block', width: '2ch', textAlign: 'center' }}>{coolDown}</span> seconds before submitting another feedback
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { setTag, trackEvent } from './analytics';

const LOOPS_FORM_URL = 'https://app.loops.so/api/newsletter-form/cmpfndk7a027p0jvsdr9a4bud';

// An Error with a user-facing message plus a short `reason` for analytics
const signupError = (reason, message) => Object.assign(new Error(message), { reason });

async function submitToLoops(email, extraFields) {
  let response;
  try {
    response = await fetch(LOOPS_FORM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ email, ...extraFields }).toString()
    });
  } catch {
    throw signupError('network', 'Network failure. Check your connection and try again.');
  }

  if (response.ok) return;

  if (response.status === 429) {
    throw signupError('rate_limited', 'Too many signup attempts. Wait a minute and try again.');
  }

  let message = '';
  try {
    message = (await response.json()).message || '';
  } catch {
    // Non-JSON error body
  }
  console.error('Subscription failed:', response.status, message);
  throw signupError(
    response.status >= 500 ? 'server_error' : 'rejected',
    message || 'Subscription failed. Please try again.'
  );
}

// Submits an email to the Loops newsletter form and records the attempt in
// Clarity, tagged with the form it came from and, on failure, the reason.
// Resolves on success, throws an Error with a user-facing message otherwise.
export async function subscribe(email, form, extraFields = {}) {
  setTag('subscribe_form', form);
  trackEvent('subscribe_submit');

  try {
    await submitToLoops(email, extraFields);
  } catch (error) {
    setTag('subscribe_error', error.reason);
    trackEvent('subscribe_error');
    throw error;
  }

  trackEvent('subscribe_success');
}

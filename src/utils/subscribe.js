const LOOPS_FORM_URL = 'https://app.loops.so/api/newsletter-form/cmpfndk7a027p0jvsdr9a4bud';

// Submits an email to the Loops newsletter form.
// Resolves on success, throws an Error with a user-facing message otherwise.
export async function subscribe(email, extraFields = {}) {
  let response;
  try {
    response = await fetch(LOOPS_FORM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ email, ...extraFields }).toString()
    });
  } catch {
    throw new Error('Network failure. Check your connection and try again.');
  }

  if (response.ok) return;

  if (response.status === 429) {
    throw new Error('Too many signup attempts. Wait a minute and try again.');
  }

  let message = '';
  try {
    message = (await response.json()).message || '';
  } catch {
    // Non-JSON error body
  }
  console.error('Subscription failed:', response.status, message);
  throw new Error(message || 'Subscription failed. Please try again.');
}

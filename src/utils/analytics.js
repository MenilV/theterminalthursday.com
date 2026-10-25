// Thin wrapper around the Microsoft Clarity client API loaded in index.html.
// The snippet there queues calls made before Clarity's script arrives; if an ad
// blocker or CSP stops Clarity entirely, these calls do nothing and never throw.
const clarity = (...args) => {
  try {
    window.clarity?.(...args);
  } catch {
    // Analytics must never break the site
  }
};

// Custom event: shows up under Smart events and as a recordings filter
export const trackEvent = (name) => clarity('event', name);

// Custom tag on the session: repeated calls with the same key add values
export const setTag = (key, value) => clarity('set', key, value);

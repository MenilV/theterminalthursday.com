// localStorage throws a SecurityError when the browser blocks site storage
// (e.g. "Block all cookies"), so preferences must never be able to crash the app.
export function readSetting(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

export function writeSetting(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage unavailable; the preference just won't persist
  }
}

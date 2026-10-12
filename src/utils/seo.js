export const DEFAULT_META = {
  title: 'The Terminal Thursday',
  description: 'A weekly serial homage to the open-source projects, tools, and maintainers forming the bedrock of the modern web.',
  url: 'https://theterminalthursday.com/'
};

export function updatePageMeta({ title, description, url } = {}) {
  const finalTitle = title || DEFAULT_META.title;
  const finalDesc = description || DEFAULT_META.description;
  const finalUrl = url || DEFAULT_META.url;

  // Title
  document.title = finalTitle;

  // Helper to set attribute
  const setAttr = (selector, attr, val) => {
    let el = document.querySelector(selector);
    if (!el && selector.startsWith('meta[')) {
      el = document.createElement('meta');
      const nameMatch = selector.match(/name="([^"]+)"/);
      const propMatch = selector.match(/property="([^"]+)"/);
      if (nameMatch) el.setAttribute('name', nameMatch[1]);
      if (propMatch) el.setAttribute('property', propMatch[1]);
      document.head.appendChild(el);
    } else if (!el && selector.startsWith('link[')) {
      el = document.createElement('link');
      el.setAttribute('rel', 'canonical');
      document.head.appendChild(el);
    }
    if (el) {
      el.setAttribute(attr, val);
    }
  };

  // Canonical URL
  setAttr('link[rel="canonical"]', 'href', finalUrl);

  // Meta Description
  setAttr('meta[name="description"]', 'content', finalDesc);

  // Open Graph
  setAttr('meta[property="og:title"]', 'content', finalTitle);
  setAttr('meta[property="og:description"]', 'content', finalDesc);
  setAttr('meta[property="og:url"]', 'content', finalUrl);

  // Twitter Cards
  setAttr('meta[name="twitter:title"]', 'content', finalTitle);
  setAttr('meta[name="twitter:description"]', 'content', finalDesc);
  setAttr('meta[name="twitter:url"]', 'content', finalUrl);
}

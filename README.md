# The Terminal Thursday

Source for [theterminalthursday.com](https://theterminalthursday.com). It's a weekly newsletter about open-source projects, tools and maintainers, presented as a Windows 95 / UNIX desktop.

- **Stack:** React 19, Vite, [react-markdown](https://github.com/remarkjs/react-markdown) for issue pages, Oxlint
- **Hosting:** Cloudflare Pages (`public/_redirects` sends every route to the SPA)
- **Newsletter:** signups go to a [Loops](https://loops.so) form

## Development

```sh
npm install
npm run dev       # local dev server
npm run lint      # oxlint
npm run build     # full production build into dist/
npm run preview   # serve dist/ locally
```

## How the build works

`npm run build` runs these steps in order:

1. `scripts/generate_rss.js` → `public/rss.xml`
2. `scripts/generate_search_index.js` → `src/data/search_index.json` (archive search)
3. `scripts/generate_sitemap.js` → `public/sitemap.xml`
4. `vite build` → `dist/`
5. `scripts/generate_static_pages.js` → `dist/archive/<id>.html` and `dist/archive/<id>/index.html`, each with that issue's title, description, Open Graph tags and JSON-LD

The outputs of steps 1–3 are committed, so re-run the build and commit them whenever `posts.json` or an issue changes.

## Publishing an issue

1. Add the markdown to `public/archive/<id>.md`. `scripts/import_issue.py` converts the sent Loops email (`.eml`) into it. `AGENTS.md` has the required heading format.
2. Add an entry to the top of `src/data/posts.json`:

   | Field | Example | Notes |
   |---|---|---|
   | `id` | `"011"` | three digits, matches the markdown filename |
   | `date` | `"10-29-2026"` | `MM-DD-YYYY` |
   | `title` | `"THE_CVE_SEASON"` | upper snake case; underscores become spaces in page titles |
   | `description` | | used for the archive card, meta tags, RSS and search |
   | `category` | `"OSS"` | |
   | `publishDate` | `"2026-10-29T07:20:00+02:00"` | optional; hides the issue in the UI until then |

3. Bump `version` in `package.json`. The footer, SYSMON widget and CLI banner all read it.
4. Run `npm run build` and commit the regenerated `rss.xml`, `sitemap.xml` and `search_index.json`.

`publishDate` only hides the issue in the UI. The markdown file is public as soon as it's deployed. The RSS feed, sitemap, search index and pre-rendered page are built ahead of time, so they only include the issue after a build that runs once `publishDate` has passed.

## Layout

```
public/archive/   issue markdown, fetched at runtime by IssueReader
src/components/   desktop windows: Archive, IssueReader, Newsletter, CliTerminal, …
src/data/         posts.json (issue list) and the generated search_index.json
src/utils/        shared helpers (page meta, …)
scripts/          build-time generators
```

# Journal build

Pages in `content/*.txt` are turned into HTML by `build_journal.py` (run from the repo root: `python3 _build/build_journal.py`).
Then run `python3 _build/make_sitemap.py` to refresh sitemap.xml.

Format: a meta block (title, h1, dek, cat, hero = file | alt text, desc, blurb, updated, related), then sections starting with `@take` (bullets),
`@lead`, `@body` (## headings, blank-line paragraphs, `- ` lists, `1. ` lists, `!warn ...`, `!box Title: text`, `> pull quote`, [^n] citations, [text](url) links),
`@faq` (Q:/A: lines) and `@refs` (Label | URL, numbered in order). Folder starts with an underscore so GitHub Pages does not publish it.
Voice order for every page: happy-writer (reader and feeling), then ghostwriter, then anti-ai-writing check.

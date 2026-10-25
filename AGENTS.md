# The Terminal Thursday Archive Formatting Rules

When adding a new issue to `public/archive/` for The Terminal Thursday, you MUST ALWAYS include a specific H1 title format immediately following the banner image (or at the very top of the file).

The format must be exactly:
`# 🗞️ Issue #<ISSUE_NUMBER>: <ISSUE_TITLE_IN_TITLE_CASE>`

Example:
![Issue Banner](https://images.vialoops.com/...)

# 🗞️ Issue #001: Taking Control Back

## Importing an issue from the Loops email

Export the sent email as `.eml`, then run:

```sh
python3 scripts/import_issue.py <issue.eml> <ISSUE_NUMBER> "<Issue Title In Title Case>" [--preheader "<email preview text>"]
```

This writes `public/archive/<ISSUE_NUMBER>.md` with the H1 above and strips tracking pixels, the Loops footer and the preview text. Review the closing CTA by hand, then add the issue to `src/data/posts.json`.

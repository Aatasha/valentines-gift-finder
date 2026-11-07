# TASKS — Valentine's Gift Finder

Plan: `~/.claude/plans/alright-i-think-this-glittery-babbage.md` (approved 7 Nov 2026).

## Status

Workstream 1 (Foundations) in progress. Nothing deployed yet. Production still serves the Feb 2026 build.

**Outcome target (by 7 Feb 2027):** ≥25 UK keywords in top 20 and ≥8 in top 10; ≥2,000 sessions 15 Jan–14 Feb; ≥200 affiliate clicks; enough qualifying Amazon sales to keep the account.
**Baseline (DataForSEO, 7 Nov 2026):** 59 ranked UK keywords, best position 48, about 2 visits a month.

## Active Work

- [x] Commit blog sitemap entries (live but never committed; in the Foundations commit)
- [x] Merge `main` (drops the opening "reaction" quiz question; category AI picks first)
- [x] Technical fixes: countdown auto-year, titles, quiz/search metadata, noindex `/search` and `/gifts/*`, canonicals, per-post OG images, `rel="sponsored nofollow noopener"` (no noreferrer, per Amazon's rules), disclosure by buy buttons, blog outbound click tracking
- [x] Trust: `/about`, `/how-we-pick`, bylines credited to the site, Published/Updated date, Organization author schema
- [x] Build passes; lint unchanged (33 existing findings, none new); independent review done and its 6 should-fix items applied; local render checks pass
- [ ] Deploy and verify live

## Next Step

Finish verification of Foundations, then start Workstream 2 (AI engine swap and verified catalogue).

## Waiting on Alistair

- [ ] Amazon Associates: check account status and reapply if closed (tag `aanthony08-21` may change)
- [ ] Operator details: UK E-Commerce Regulations 2002 expect the site to name who runs it, with a postal address and email. A company name and registered office would do; the site currently names no one
- [ ] Decide whether to make the GitHub repo private (it is public, and its commits and `CLAUDE.md` show the owner's name)
- [ ] Virgin Experience Days (Impact): approval status. Apply to Buyagift's affiliate programme
- [ ] Bing Webmaster Tools: verify the site and submit the sitemap
- [ ] Decide whether to move the repo out of iCloud Drive (see Known issues)

## Decisions

- 7 Nov 2026: Valentine's 2027 first on this domain. Rebrand decided after 14 Feb.
- 7 Nov 2026: Quiz model chosen by blind eval on cost and quality; any provider (OpenRouter). Rule: cheapest model within 5% of best score with p50 under 4s.
- 7 Nov 2026: `/gifts/[id]` noindexed and removed from the sitemap until they become real product pages.
- 7 Nov 2026: Contact email stays `hello@valentinesgiftfinder.co.uk` (the .co.uk has the real mailbox; the .com only forwards).
- 8 Nov 2026: The site stays anonymous. Bylines and schema credit "Valentine's Gift Finder" (Organization), not a person. No invented pen names or author bios.

## Known issues

- **iCloud Drive evicts repo files.** Evicted `.git` files made `git commit` hang until they were re-downloaded. `node_modules` is also largely evicted (thousands of files), which makes local lint and build very slow. Workaround: build in a copy outside iCloud. Lasting fix: move the repo to a non-iCloud folder, e.g. `~/Developer`.
- `git diff --stat` and some porcelain commands stall while any `.git` file is evicted. Check with `find .git -flags +dataless | wc -l`.

## Weekly readback (from 4 Jan 2027)

| Week | GSC clicks | Top-10 keywords | Sessions | Affiliate clicks | Amazon orders | AI citations (of 10) |
|---|---|---|---|---|---|---|

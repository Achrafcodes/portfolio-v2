# Portfolio Fix Plan — portfolio-v2

Fixes ordered by priority. Each item has: the problem, why it matters, and the exact change to make. Work top to bottom — P0 items are trust-killers, P2 items are polish.

---

## P0 — Credibility (fix these first)

### FIX-01: Reconcile the project-count stats
**Problem:** Hero says `04 in production`. About section says `10+ client projects delivered` AND `04 live case studies`. The numbers contradict each other and a skeptical client will notice.

**Why it matters:** The site's entire pitch is "trust me, everything here is real." One inconsistent number undermines all the others.

**Change:**
- Keep `04` in the hero (it's verifiable — 4 projects are shown).
- In the about-section stats, replace the two competing stats with one honest pair:
  - `10+ / PROJECTS DELIVERED` with a sub-label or adjacent line: `4 shown below — the rest are client-owned or under NDA`
- Move the existing sentence "the rest are real, just not deployed publicly, which is why they're not featured here" OUT of the paragraph and attach it directly to the stat as a caption. The explanation must live next to the number it explains.

### FIX-02: Fix the testimonials section
**Problem:** Two of three testimonials are attributed to anonymous "CLIENT — PDF EDITOR PRODUCT" and "CLIENT — REAL ESTATE WEBSITE". Anonymous quotes read as fabricated on a site whose whole angle is authenticity.

**Change (pick one):**
- **Option A (preferred):** Get permission from those two clients to use first name + company or first name + country. Even "Sarah — PropertyCo, Netherlands" fixes it.
- **Option B (if no permission):** Cut both anonymous quotes. Keep only the Julien Moreau quote in the testimonials section, styled as a single featured quote. One named quote > one named + two anonymous.
- Do NOT keep the anonymous quotes as-is.

### FIX-03: Remove the duplicate Julien Moreau quote
**Problem:** The same client quote appears in the hero banner AND the testimonials section. Looks like there's only one client.

**Change:**
- Keep it in ONE place only. Recommendation: keep the hero banner version (it's high-impact placement), and in the testimonials section replace it with a different Julien quote if available, or restructure per FIX-02 Option B.

### FIX-04: Verify or reword the "95+ Lighthouse" claim
**Problem:** The portfolio itself has heavy imagery, smoke effects, and device mockups. If the portfolio scores below 95 when a client tests it, the claim backfires.

**Change:**
1. Run Lighthouse (mobile + desktop) on the live portfolio right now.
2. If portfolio scores 95+: keep the stat, no change.
3. If it doesn't: reword the stat label to make its scope explicit, e.g. `95+ / LIGHTHOUSE ON CLIENT BUILDS` — or fix the portfolio's performance until the claim is true for the site the visitor is standing on.

---

## P1 — Copy

### FIX-05: Remove "vibe-coded" from hero copy
**Problem:** "not vibe-coded like a weekend hack" is AI-Twitter insider slang. Real estate agents and vehicle dealers don't know the term; devs who do may read it as defensive.

**Change:**
- Hero subtext: replace `scoped like a project, not vibe-coded like a weekend hack` with `scoped like a project, not hacked together over a weekend`.

### FIX-06: Split the overloaded hero subtext
**Problem:** The hero paragraph crams three ideas: niche, anti-hack positioning, and "everything is live."

**Change:**
- Hero keeps only: `I build for real estate agents, vehicle dealers, and founders who need an MVP that actually ships — scoped like a project, not hacked together over a weekend.`
- Move `Everything on this page is live right now, not a demo.` to the "Things I've built" section header area, e.g. as a sub-line under the heading: `Things I've built. — All live. Click through and use them.`
- That placement puts the claim next to the proof.

### FIX-07: Convert the "0 agency layers" stat to text
**Problem:** A stat card showing `0` visually reads as a placeholder/error at a glance.

**Change:**
- Remove `0 / AGENCY LAYERS BETWEEN US` from the stats row.
- Fold the idea into the about copy where it already exists ("whoever you talk to about your project is the person writing the code") — it's stronger as a sentence than a number.
- If the stats grid needs a 4th item for layout balance, use something countable, e.g. `<24h / REPLY TIME` (matches the existing "replies within 24h" badge).

---

## P2 — Design

### FIX-08: Replace the orange smoke hero background
**Problem:** The smoke/gradient effect is the one element that reads "trendy AI-generated template." It's decorative, will date fast, and competes with the text.

**Change:**
- Remove the smoke asset entirely.
- Replace with something from the existing engineering-schedule design system, e.g.:
  - a faint redline/markup SVG motif (already in the design language), or
  - a subtle grid/gantt-line background at very low opacity, or
  - plain dark background — the typography is strong enough to carry the hero.
- Keep the orange as the accent color in CTAs/labels; just stop using it as atmosphere.

### FIX-09: Unify the project status taxonomy
**Problem:** Project labels mix three taxonomies: `01 — LIVE`, `02 — SHIPPED`, `03 — LIVE`, `04 — CLIENT WORK`. "Shipped" vs "live" vs "client work" aren't the same axis.

**Change:**
- Status axis only, one of: `LIVE` or `SHIPPED` (pick per project truthfully).
- Add a separate small tag for ownership: `CLIENT WORK` or `OWN PRODUCT` rendered as a secondary chip next to the status.
- Result e.g.: `04 — LIVE · CLIENT WORK` for Legacy Import.

### FIX-10: Mobile — compress the vitals section
**Problem:** On mobile, the hero stat cards stack into a long scroll of dark boxes before any actual proof (projects) appears.

**Change:**
- On viewports < 768px, render the vitals as a single horizontal row of compact inline stats (or a 2-col compact grid), not full stacked cards.
- Goal: "Things I've built" visible within ~1.5 screen-heights of scroll on a standard phone.

### FIX-11: Align the CTAs to one primary action
**Problem:** Hero says "Book a free scope call", footer says "Send an email", plus WhatsApp. Three competing labels dilute the funnel.

**Change:**
- Primary CTA everywhere (hero + footer): `Book a free scope call` — same label, same style.
- Footer: keep email and WhatsApp but demote them to secondary text links under the primary button: `Prefer email or WhatsApp? →`
- One funnel, multiple doors, one label.

---

## Verification checklist (after all fixes)

- [ ] No number on the site contradicts another number
- [ ] Every testimonial has a name attached (or section restructured to single featured quote)
- [ ] Julien Moreau quote appears exactly once
- [ ] Lighthouse claim verified against the live portfolio (mobile + desktop)
- [ ] "vibe-coded" appears nowhere on the site
- [ ] Hero background contains no smoke/AI-gradient asset
- [ ] All project labels follow `NN — STATUS · OWNERSHIP` format
- [ ] Mobile: projects section reachable within ~1.5 screen-heights
- [ ] All primary CTAs share the exact same label
- [ ] Run the site past one non-technical friend: ask "what does this person do, and would you pay them?" — they should answer both in under 30 seconds

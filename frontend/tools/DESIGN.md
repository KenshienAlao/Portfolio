# DESIGN.md

A guide for AI assistants designing UI for this project. Follow this exactly. When in doubt, do less.

---

## Before You Design Anything

Check in this order, stop when you find it:

1. Existing CSS variables/tokens in the codebase
2. Existing component patterns already in use
3. Typography scale already defined
4. Spacing system already defined

Never invent a value that already exists somewhere. Never introduce a new pattern when an existing one fits.

---

## Aesthetic Direction

**Clean SaaS.** Think Linear, Notion, Stripe. Calm, precise, confident. Every element earns its place.

This is not:

- Warm/cozy editorial (no paper textures, no terracotta vibes)
- Dark hacker aesthetic (no acid accents, no glowing borders)
- Marketing-site maximalism (no big gradients, no hero blobs)
- Generic dashboard (no card-shadow stacking, no blue primary buttons by default)

The target feel: a product that respects the user's attention. Spacious but not empty. Sharp but not cold.

---

## Color

Never hardcode hex values. Always use the existing CSS variables from the project.

Tokens to look for (names may vary per project):

```
background, surface, subtle          -- layer hierarchy
border, border-focus                 -- structural + interactive
text-primary, text-secondary, text-disabled
accent / brand                       -- one color, used sparingly
status: success, warning, error, info
```

Rules:

- Accent color is for primary actions and active states only. Not decoration.
- No gradients. Solid surfaces only.
- Surfaces create depth through border and subtle background shifts, not shadows.
- If a shadow is needed: one layer, low opacity, small spread. Never stacked.
- Dark mode is handled by the token system. Never write separate dark-mode color overrides.

---

## Typography

Use the project's existing type scale. Do not invent new sizes.

General rules regardless of project:

- Font size steps only from the defined scale. No `font-size: 13px` one-offs.
- Labels and captions: uppercase tracking only if the project already uses it. Default is sentence case.
- No decorative fonts unless the project already uses one.
- Line height: body text 1.5-1.6, headings 1.1-1.25, UI labels 1.3-1.4.
- Letter spacing: tighten display/h1 slightly (-0.01em to -0.02em). Leave body at normal.
- Weight: use the minimum weight that achieves the hierarchy. Avoid bold everywhere.

Type hierarchy for a typical page:

- One H1 per view. Not styled like a hero unless it is a hero.
- Section labels: small, muted, uppercase or semibold. Not H2 if they are just labels.
- Body copy: regular weight, comfortable line height, muted color for secondary content.

---

## Spacing and Layout

Spacing scale (8-point grid, hard rule):
`4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px`

No arbitrary values. `margin-top: 20px` is wrong. Use `16px` or `24px`.

Layout rules:

- Max content width: 1280px. Comfortable reading width for text-heavy sections: 680px.
- Padding inside containers: minimum `24px`. Never `10px` or `15px` edge padding.
- Group related items tightly (8-12px gap). Separate unrelated sections generously (48-64px).
- Vertical rhythm matters more than horizontal. Scan flow is top-to-bottom first.

---

## Components

### Buttons

Three variants, nothing else:

**Primary** -- one per view, the main action.

- Background: accent color. Text: contrast white or dark based on token.
- Border radius: use project's existing radius token (typically 6-8px).
- Padding: `10px 20px` for default, `8px 16px` for small.
- Hover: slight opacity drop (0.88-0.92) or background shift. No translateY unless the project already uses it.
- Never: gradient fill, shadow on hover, outline glow.

**Secondary / Ghost** -- supporting actions.

- Border: 1px solid border token. Background: transparent or surface.
- Hover: surface background fills in, border intensifies slightly.
- Same radius and padding as primary.

**Destructive** -- destructive actions only.

- Uses status-error token. Same structure as primary.
- Never use for cancel or dismiss.

States every button needs: default, hover, active (pressed), focus-visible, disabled.
Focus-visible: 2px offset ring using the focus border token. Never remove outline without replacing it.

### Cards

- Background: surface token.
- Border: 1px solid border token. No border-radius above 12px.
- Padding: `24px` default. `16px` for compact/dense views.
- Hover (if interactive): border color shifts to focus token. Subtle shadow optional (one layer only).
- Never: multiple shadow layers, gradient backgrounds, thick borders, colored backgrounds.

### Inputs

- Border: 1px solid border token.
- Background: surface or subtle token.
- Focus: border shifts to focus token + 2px ring outside. Not just a color change.
- Placeholder: disabled/placeholder text token.
- Error state: border switches to status-error token. Error message below in small status-error text.
- Padding: `10px 12px`. Consistent height with buttons in the same row.

### Dividers / Separators

Only use when sections have genuinely different content contexts. Not between every item in a list.

- 1px, border token color, no margin gymnastics.
- Prefer whitespace over a divider when the gap is enough.

---

## Motion

Default to no animation. Add only when it communicates something.

Allowed:

- State transitions (hover, focus, active): `150-200ms ease`
- Appearing content (modals, dropdowns): `200ms` ease-out on opacity + slight translateY (4-8px max)
- Loading states: simple opacity pulse or spinner. No skeleton animations unless the project already uses them.

Never:

- Entrance animations on page load for static content
- Continuous/idle animations
- `transition: all` -- always specify the property

---

## Non-Negotiables

These are not suggestions:

- No hardcoded hex or rgb values. Use tokens.
- No gradients.
- No `!important` except to override a third-party library.
- No `z-index` above 50 without a comment explaining the stack.
- Every interactive element has a visible `focus-visible` state.
- WCAG AA contrast minimum on all text.
- No placeholder text as the only label for an input.
- Error messages are specific. "Something went wrong" is not an error message.
- Responsive down to 375px width unless explicitly told otherwise.

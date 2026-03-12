# Glass UI Design System — Principles

A complete UI/UX design language for building dark-first, glass-morphism interfaces with premium feel. Apply these principles to any website — adapt colors and fonts to your brand.

Load `glass-ui-patterns.md` for component JSX templates and `glass-ui-motion.md` for animation patterns.

---

## 1. Design Philosophy

- **Dark-first, premium-but-approachable.** The interface feels like a beautiful hacker terminal — technical enough to feel credible, polished enough to feel inviting.
- **Monospace labels = tech credibility.** Sans-serif body text = readability. This contrast is the signature of the design.
- **Every element earns its place.** No decorative elements without function. Glows indicate interactivity. Blur indicates layering. Color intensity indicates importance.
- **Glass over solid.** Prefer semi-transparent surfaces with backdrop blur over opaque backgrounds. This creates depth and lets ambient effects shine through.

---

## 2. Color Architecture

### Background Hierarchy (5 levels)
Each level is slightly lighter than the previous. The difference between levels is subtle — just enough to create visual separation without harsh contrast.

| Level | Name | Purpose | Dark Approach | Light Approach |
|-------|------|---------|---------------|----------------|
| 1 | base | Page background | Near-black (#02-#05) | Near-white (#fefe-#f5f3) |
| 2 | deeper | Recessed areas | Slightly lighter | Slightly darker |
| 3 | surface | Card backgrounds | Dark gray (#0a) | White (#fff) |
| 4 | elevated | Raised cards, modals | Lighter gray (#0f) | White with shadow |
| 5 | overlay | Overlapping panels | Medium gray (#1a) | Light gray (#e2) |

### Text Hierarchy (4 levels)
Linear contrast reduction. Each level is noticeably less prominent.

| Level | Name | Purpose | Contrast |
|-------|------|---------|----------|
| 1 | primary | Headings, important content | Maximum contrast |
| 2 | secondary | Body text, descriptions | ~65% contrast |
| 3 | muted | Tertiary info, inactive states | ~45% contrast |
| 4 | faint | Decorative text, least important | ~30% contrast |

### Border Hierarchy (3 levels)
**Critical: borders are always semi-transparent, never solid colors.**

| Level | Name | Opacity (dark) | Opacity (light) |
|-------|------|----------------|-----------------|
| 1 | subtle | rgba(white, 0.06) | rgba(black, 0.10) |
| 2 | default | rgba(white, 0.10) | rgba(black, 0.14) |
| 3 | strong | rgba(white, 0.20) | rgba(black, 0.25) |

### Accent Color System
- **1 primary accent** (vibrant, high-energy) — CTAs, active states, glows
- **1 secondary accent** (warm) — highlights, badges, special elements
- **1 success color** (bright green) — completed states, confirmations
- Accents are MORE vibrant in dark mode, MORE muted in light mode

### Opacity Tinting Formula (**the most important pattern**)
When you have an accent color `{C}`, derive all tints from it:

```
{C}08  → barely visible background (subtle hint)
{C}15  → card background tint, icon container fill
{C}20  → stronger card background, hover state
{C}25  → icon container border, subtle emphasis
{C}35  → medium border, badge border
{C}40  → strong glow shadow
{C}50  → strong border, active state border
{C}    → full color for text, icons, active elements
```

This formula applies to ANY accent color. It creates consistent visual weight across the entire interface.

### Fill Utility Layers (theme-adaptive)
For overlays that work in both themes, use the dominant channel:

| Layer | Dark | Light |
|-------|------|-------|
| subtle | rgba(white, 0.05) | rgba(black, 0.05) |
| light | rgba(white, 0.10) | rgba(black, 0.08) |
| medium | rgba(white, 0.20) | rgba(black, 0.12) |

### Glass Effect
- Dark: semi-transparent black (60% opacity) + backdrop blur
- Light: semi-transparent white (85% opacity) + backdrop blur
- Always: subtle border + soft shadow

---

## 3. Dual Theme System

Implement via **CSS custom properties** on a root-level attribute (e.g., `data-theme`).

### Rules:
- **ALL** colors reference CSS variables — never hardcode except in gradient color stops
- Dark theme = default (no attribute). Light = opt-in (`[data-theme="light"]`)
- Accents shift between themes: vibrant in dark → muted/darker in light (for contrast on white)
- `card-shadow`: `none` in dark (use glows instead), soft multi-layer shadow in light
- Glass opacity: lower in dark (60%), higher in light (85%)
- Glow effects: prominent in dark, subtle in light
- Borders: rgba(white, X) in dark → rgba(black, X) in light

### Implementation pattern:
```css
:root {
  --bg-base: #020202;
  --bg-surface: #0a0a0a;
  --bg-elevated: #0f0f0f;
  --text-primary: #ffffff;
  --text-secondary: #a1a1a1;
  --text-muted: #6f6f6f;
  --text-faint: #4a4a4a;
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-default: rgba(255, 255, 255, 0.10);
  --accent: /* your brand color */;
  --accent-glow: /* your brand color at 30% opacity */;
  --glass-bg: rgba(5, 5, 5, 0.6);
  --glass-border: rgba(255, 255, 255, 0.08);
  --fill-subtle: rgba(255, 255, 255, 0.05);
  --card-shadow: none;
}

[data-theme="light"] {
  --bg-base: #fefefc;
  --bg-surface: #ffffff;
  --bg-elevated: #ffffff;
  --text-primary: #1a1a1a;
  --text-secondary: #4a4a4a;
  --text-muted: #6f6f6f;
  --text-faint: #a1a1a1;
  --border-subtle: rgba(0, 0, 0, 0.10);
  --border-default: rgba(0, 0, 0, 0.14);
  --accent: /* your brand color, darker variant */;
  --accent-glow: /* your brand color at 15% opacity */;
  --glass-bg: rgba(255, 255, 255, 0.85);
  --glass-border: rgba(0, 0, 0, 0.12);
  --fill-subtle: rgba(0, 0, 0, 0.05);
  --card-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 6px 16px rgba(0,0,0,0.04);
}
```

---

## 4. Typography System

### Font Pairing
- **Display/Body font:** Geometric sans-serif (e.g., Space Grotesk, Outfit, Sora). Headings, body, buttons.
- **Code/Label font:** Monospace (e.g., JetBrains Mono, Fira Code, IBM Plex Mono). Labels, meta, badges, timestamps.

### Hierarchy

| Element | Font | Size | Weight | Extra |
|---------|------|------|--------|-------|
| Page title | sans | 2xl (24px) | black (900) | tight tracking |
| Section heading | sans | lg-xl (18-20px) | black (900) | — |
| Card title | sans | base-lg (16-18px) | bold-black | — |
| Body text | sans | sm (14px) | regular (400) | relaxed line-height (1.625) |
| **Mono label** | **mono** | **9-10px** | **bold** | **uppercase, tracking 0.1-0.2em** |
| Meta / faint text | mono | 10px | regular | — |

### The Mono Label Pattern (signature element)
This is the single most distinctive typographic element. Use it for:
- Category names above card titles
- Status indicators
- Section labels
- Meta information (dates, durations, technical IDs)
- Navigation tab labels

```
font-size: 9-10px
font-family: monospace
text-transform: uppercase
letter-spacing: 0.1em to 0.2em
font-weight: bold (for labels) or regular (for meta)
color: muted or accent color
```

### Gradient Text (for hero headings)
```css
background: linear-gradient(135deg, {accent1}, {accent2}, {accent3});
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Section Divider Pattern
Icon + mono label + horizontal line that fills remaining space:
```
[icon 4x4] [MONO LABEL TEXT] [————————————————————]
```

---

## 5. Spacing & Layout

### Border-Radius Scale
| Token | Value | Use |
|-------|-------|-----|
| lg | 8px | Small cards, buttons, inputs |
| xl | 12px | Standard cards, panels |
| 2xl | 16px | Large cards, modals, icon containers |
| full | 9999px | Pills, badges, avatars |

### Padding Scale
| Size | Value | Use |
|------|-------|-----|
| compact | 12px | Compact cards, list items |
| standard | 20px | Standard cards, panels |
| spacious | 24-32px | Featured cards, hero sections, sidebar |

### Responsive Approach
- **Mobile-first layout**, desktop enhancements via JS detection or media queries
- Mobile: single column, bottom tab navigation, stacked content, full-width cards
- Desktop: sidebar (280px fixed) + scrollable main area, OR full-width with max-width
- Content max-width: ~900px for reading, ~1150px for dashboards

### Section Spacing
- Between sections: header with divider line, mb-3 to mb-4
- Card lists: space-y-4 (normal), space-y-2 (compact)
- Within cards: gap-3 or gap-4 for flex items

---

## 6. Visual Effects

### Glass Morphism
```
background: var(--glass-bg)
backdrop-filter: blur(12px)
border: 1px solid var(--glass-border)
box-shadow: 0 8px 32px 0 var(--glass-shadow)
```
Use for: navigation bars, floating panels, overlays, tab bars.

### Glow Effects
Replace traditional shadows with colored glows in dark mode:
```
Standard glow:  box-shadow: 0 0 20px {accent}30
Strong glow:    box-shadow: 0 0 15px {accent-glow}
Text glow:      text-shadow: 0 0 15px {accent}60
```

### Decorative Corner Glow
Place in corners of containers for ambient warmth:
```
position: absolute
size: 128-192px square
border-radius: full
filter: blur(48-72px)
background: accent-glow color
pointer-events: none
```

### Scanlines (subtle texture)
```css
background: repeating-linear-gradient(
  0deg, transparent, transparent 2px,
  rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px
);
opacity: 0.2;
pointer-events: none;
position: absolute; inset: 0;
```

### Gradient Accent Bar
1px-high gradient line at the top of cards or sections:
```
height: 1px
background: linear-gradient(to right, {accent1}, {accent2})
```

### Color Tinting on Icon Containers
```
background: {accent}18
border: 1px solid {accent}35
box-shadow: 0 0 20px {accent}30  (optional, for featured)
```

### Progress Bar
```
track: fill-subtle background, rounded-full
fill: gradient from accent1 to accent2, rounded-full
glow: box-shadow with accent-glow on the fill
transition: width 700ms
```

---

## 7. Interaction Principles

### Hover States
- **Cards:** scale(1.02), transition-all
- **Buttons:** scale(1.02-1.05) + optional y-shift (-2px)
- **Featured cards:** scale(1.04) + y-shift (-2px)
- **Sidebar items:** backgroundColor transition from transparent to fill-subtle
- Always use `transition-all` — never instant state changes

### Active/Tap States
- **Press feedback:** scale(0.95-0.98) — "pressed in" feeling
- Apply to ALL clickable elements

### Pointer-Tracking Gradient
Premium cards have a radial gradient spotlight that follows the mouse:
- Gradient: radial, centered on pointer position
- Colors: accent → secondary → transparent
- Size: 200-400px radius
- Opacity: ~0.8 on hover, 0 when not hovering

### Animated Border Beam
Important cards have a glowing beam traveling along the border:
- Small square element (50-80px) moves along card perimeter
- Colors: gradient from warm to cool accent
- Duration: 6-8s, linear, infinite
- Only on active/incomplete items

---

## 8. Anti-Patterns — NEVER DO

| Never | Instead |
|-------|---------|
| Utility color classes for theme colors (`bg-gray-800`, `text-white`) | CSS custom properties (`var(--bg-surface)`, `var(--text-primary)`) |
| Hardcoded hex/rgb for backgrounds or text | CSS variables (except gradient color-stops) |
| Solid border colors (`border-gray-700`) | Semi-transparent borders (`rgba(white, 0.10)`) |
| Traditional box-shadow in dark mode | Colored glow effects (`box-shadow: 0 0 20px {accent}30`) |
| Standard square buttons | Always rounded (xl+) with transition-all |
| Static lists (instant appear) | Staggered entrance animations |
| `font-bold` for headings | `font-black` (weight 900) for all headings |
| Emojis as UI icons | SVG icon library (lucide-react, heroicons, etc.) |
| Single-theme design | Dual theme (dark + light) with CSS variables from day one |

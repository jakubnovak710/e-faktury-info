# Glass UI Motion System — Animation Patterns

Companion to `glass-ui-design.md`. Defines how elements enter, respond to interaction, and create ambient atmosphere.

**Core principle:** Nothing appears instantly. Every element is animated into existence, creating a feeling of a living interface.

---

## Animation Library

This system works with any declarative motion library (Motion for React, GSAP, or pure CSS). Examples use React + Motion syntax — adapt to your stack.

```tsx
// Motion for React
import { motion, AnimatePresence } from 'motion/react';
```

---

## 6 Core Motion Patterns

### 1. Staggered List Entrance

**When:** Any list of cards, items, or grid elements entering the view.

```tsx
{items.map((item, idx) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: idx * 0.06 }}
  >
    <Card item={item} />
  </motion.div>
))}
```

**Variants:**
- From left: `initial={{ opacity: 0, x: -24, scale: 0.97 }}`
- From right: `initial={{ opacity: 0, x: 24, scale: 0.97 }}`
- Alternate sides: `initial={{ opacity: 0, x: isLeft ? -40 : 40 }}`
- With scale: `initial={{ opacity: 0, y: 20, scale: 0.95 }}`

**Timing:** 0.06s stagger, 0.3–0.5s duration, ease-out.

### 2. Spring Pop (Celebration)

**When:** Success states, achievements, important reveals.

```tsx
<motion.div
  initial={{ scale: 0.5, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
>
  <SuccessContent />
</motion.div>
```

### 3. Hover / Tap Interaction

**When:** Interactive cards, buttons, clickable elements.

```tsx
<motion.button
  whileHover={{ scale: 1.04, y: -2 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
>
  Content
</motion.button>
```

**Scale guide:** Subtle 1.02 | Standard 1.04 | Prominent 1.05 | Tap 0.95–0.98

### 4. Expand / Collapse

**When:** Accordions, expandable details, show/hide.

```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      key="expandable"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden"
    >
      <div className="p-4">Content</div>
    </motion.div>
  )}
</AnimatePresence>
```

### 5. Delayed Cascade (Multi-Element)

**When:** Page/section with distinct elements (not a list).

```tsx
<motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0 }}>
  <Header />
</motion.div>
<motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}>
  <Description />
</motion.div>
<motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}>
  <Actions />
</motion.div>
```

0.1–0.2s between elements. Total cascade under 0.5s.

### 6. Progress Bar Animation

**When:** Progress indicators, loading bars.

```tsx
<motion.div
  className="h-full rounded-full"
  style={{ background: `linear-gradient(to right, ${accent1}, ${accent2})` }}
  initial={{ width: `${prev}%` }}
  animate={{ width: `${current}%` }}
  transition={{ delay: 0.3, duration: 0.6 }}
/>
```

---

## Tab Transition

```tsx
<AnimatePresence mode="wait">
  {activeTab === id && (
    <motion.div key={id}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2 }}>
      <Content />
    </motion.div>
  )}
</AnimatePresence>
```

---

## CSS Keyframe Patterns

### Glow Pulse
```css
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 8px var(--accent-glow); }
  50% { box-shadow: 0 0 16px var(--accent-glow-strong), 0 0 4px var(--accent); }
}
```

### Float Up
```css
@keyframes floatUp {
  0% { transform: translateY(100vh) rotate(0deg) scale(0.8); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-20vh) rotate(20deg) scale(1); opacity: 0; }
}
```

### Scan Beam
```css
@keyframes scanBeam {
  0% { top: -2px; }
  100% { top: 100vh; }
}
/* Fixed 2px gradient bar, opacity 0.4, 8s linear infinite */
```

### Shimmer
```css
@keyframes shimmerBar {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

### Fade / Slide Entrances
```css
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideRight { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
```

### Shine
```css
@keyframes shine {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}
```

---

## Timing Conventions

| Pattern | Duration | Easing | Stagger |
|---------|----------|--------|---------|
| List entrance | 0.3–0.5s | ease-out | 0.06s/item |
| Tab switch | 0.2s | ease | — |
| Expand/collapse | 0.25s | ease | — |
| Hover scale | 0.15s | spring(400, 25) | — |
| Spring pop | auto | spring(200, 15) | — |
| Progress bar | 0.6s | ease, delay 0.3s | — |
| Cascade | 0.3s each | ease-out | 0.1–0.2s |
| Glow pulse | 2s | ease-in-out | infinite |
| Float up | 15–35s | linear | infinite |
| Scan beam | 8s | linear | infinite |
| Shimmer | 2s | linear | infinite |

---

## Principles

1. **Everything animates in.** Even a 0.2s fade-in makes a difference.
2. **Lists always stagger.** 60ms between items — the visual signature.
3. **Hover = lift, Tap = press.** Scale up on hover, scale down on tap.
4. **Spring for joy.** Use spring physics for celebration moments.
5. **Ambient motion for atmosphere.** Slow glows, floating particles, scan beams.
6. **Duration hierarchy.** Micro (0.15s) < transitions (0.2–0.3s) < entrances (0.3–0.5s) < ambient (∞).
7. **Exit animations matter.** Use AnimatePresence — don't let things just disappear.

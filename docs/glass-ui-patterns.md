# Glass UI Component Patterns — JSX Templates

Companion to `glass-ui-design.md`. Ready-to-use component patterns with placeholder values. Replace `{accent}`, `var(--bg-elevated)`, etc. with your project's CSS variables.

---

## Decision Tree

```
What am I building?
├── A container for content?
│   ├── Important / interactive → Interactive Card (pointer-tracking)
│   ├── Standard content box → Elevated Card
│   ├── Overlay on busy background → Glass Card
│   ├── Hero / highlight → Featured Card
│   └── Compact list item → Compact Card
├── A clickable action?
│   ├── Primary CTA → Gradient Button
│   ├── Secondary action → Glass Button
│   ├── Subtle / back nav → Text Button
│   └── Icon-only → Icon Button
├── A label or category?
│   ├── Category above title → Mono Label
│   ├── Section header → Section Divider
│   └── Hero heading → Gradient Heading
├── A status indicator?
│   ├── Completed → Status Badge (green)
│   ├── Special feature → Highlight Badge
│   └── Time / count → Time Badge (mono)
├── A page structure?
│   ├── Full-screen app → Fullscreen Shell
│   ├── Scrollable content → Scrollable Shell
│   └── Desktop with sidebar → Sidebar + Main
└── Navigation?
    ├── Mobile bottom → Bottom Tab Bar
    ├── Desktop left → Sidebar Nav
    └── Top sticky → Glass Nav Bar
```

---

## Cards

### 1. Interactive Card (Pointer-Tracking Gradient)

**When:** Important list items, featured content, primary actions.

```jsx
<InteractiveCard
  className="rounded-xl cursor-pointer"
  gradientFrom={accentColor}
  gradientTo={secondaryColor}
  gradientSize={250}
>
  <div className="relative p-5" style={{ zIndex: 1 }}>
    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
         style={{ backgroundColor: `${accentColor}18`, border: `1px solid ${accentColor}35` }}>
      <Icon className="w-6 h-6" style={{ color: accentColor }} />
    </div>
    <div className="text-[10px] font-mono uppercase tracking-widest mb-1"
         style={{ color: accentColor }}>Category</div>
    <h3 className="text-lg font-black mb-1"
        style={{ color: 'var(--text-primary)' }}>Card Title</h3>
    <p className="text-sm leading-relaxed"
       style={{ color: 'var(--text-secondary)' }}>Brief description.</p>
  </div>
</InteractiveCard>
```

### 2. Elevated Card

**When:** Standard containers, settings, info boxes.

```jsx
<div className="rounded-xl p-5 transition-all hover:scale-[1.01]"
     style={{
       backgroundColor: 'var(--bg-elevated)',
       border: '1px solid var(--border-default)',
       boxShadow: 'var(--card-shadow, none)',
     }}>
  {children}
</div>
```

### 3. Glass Card

**When:** Overlaying busy backgrounds, floating panels, popups.

```jsx
<div className="rounded-2xl p-5"
     style={{
       backgroundColor: 'var(--glass-bg)',
       backdropFilter: 'blur(12px)',
       WebkitBackdropFilter: 'blur(12px)',
       border: '1px solid var(--glass-border)',
       boxShadow: '0 8px 32px 0 var(--glass-shadow)',
     }}>
  {children}
</div>
```

### 4. Featured Card

**When:** Hero sections, highlighted content.

```jsx
<div className="relative rounded-2xl p-6 overflow-hidden"
     style={{
       background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}08)`,
       border: `2px solid ${accentColor}50`,
     }}>
  {/* Decorative corner glow */}
  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
       style={{ backgroundColor: `${accentColor}30`, filter: 'blur(48px)' }} />
  <div className="relative z-10">
    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
         style={{
           backgroundColor: `${accentColor}25`,
           border: `1px solid ${accentColor}50`,
           boxShadow: `0 0 30px ${accentColor}40`,
         }}>
      <Icon className="w-8 h-8" style={{ color: accentColor }} />
    </div>
    <h2 className="text-2xl font-black mb-2"
        style={{ color: 'var(--text-primary)' }}>Featured Title</h2>
    <p className="text-sm leading-relaxed"
       style={{ color: 'var(--text-secondary)' }}>Description text.</p>
  </div>
</div>
```

### 5. Compact Card

**When:** Secondary items, compact lists.

```jsx
<button className="w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
        style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
        onClick={handleClick}>
  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
       style={{ backgroundColor: `${accentColor}15`, border: `1px solid ${accentColor}25` }}>
    <Icon className="w-5 h-5" style={{ color: accentColor }} />
  </div>
  <div className="flex-1 min-w-0">
    <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Title</div>
    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Subtitle</div>
  </div>
  <ChevronRight className="w-4 h-4 shrink-0" style={{ color: 'var(--text-faint)' }} />
</button>
```

---

## Buttons

### 1. Gradient CTA

```jsx
<button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
        style={{
          background: `linear-gradient(135deg, ${accentDark}, ${accentVibrant})`,
          color: '#fff',
          boxShadow: `0 0 20px ${accentGlow}`,
        }}>
  <Icon className="w-4 h-4" />
  Call to Action
</button>
```

### 2. Glass Button

```jsx
<button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
        style={{
          backgroundColor: 'var(--glass-bg)',
          backdropFilter: 'blur(8px)',
          border: '1px solid var(--border-default)',
          color: 'var(--text-primary)',
        }}>
  Button Text
</button>
```

### 3. Text Button

```jsx
<button className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest transition-colors"
        style={{ color: 'var(--text-faint)' }}>
  <ArrowLeft className="w-3.5 h-3.5" />
  Back
</button>
```

### 4. Icon Button

```jsx
<button className="p-2 rounded-lg transition-all hover:scale-110"
        style={{ color: 'var(--text-muted)' }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--fill-subtle)')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
  <Settings className="w-4 h-4" />
</button>
```

---

## Typography Patterns

### Mono Label
```jsx
<span className="text-[10px] font-mono uppercase tracking-widest font-bold"
      style={{ color: 'var(--text-muted)' }}>LABEL TEXT</span>
```

Accent variant: `style={{ color: accentColor }}`
Extra small: `className="text-[9px] ... tracking-[0.2em]"`

### Section Divider
```jsx
<div className="flex items-center gap-2 mb-3 px-1">
  <Icon className="w-4 h-4" style={{ color: 'var(--text-faint)' }} />
  <span className="text-[10px] font-mono uppercase tracking-widest font-bold"
        style={{ color: 'var(--text-faint)' }}>Section Name</span>
  <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-subtle)' }} />
</div>
```

### Gradient Heading
```jsx
<h1 className="text-2xl font-black">
  <span style={{
    background: `linear-gradient(135deg, ${accent1}, ${accent2}, ${accent3})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }}>Gradient Title</span>
</h1>
```

### Card Title + Description
```jsx
<div>
  <div className="text-[10px] font-mono uppercase tracking-widest mb-0.5"
       style={{ color: accentColor }}>Category</div>
  <h3 className="text-lg font-black mb-1" style={{ color: 'var(--text-primary)' }}>Title</h3>
  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>Description.</p>
</div>
```

---

## Badges & Pills

### Status Badge
```jsx
<div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full"
     style={{ backgroundColor: `${successColor}15`, color: successColor }}>
  <CheckCircle className="w-3 h-3" />
  <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Done</span>
</div>
```

### Highlight Badge
```jsx
<span className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full font-mono uppercase tracking-widest"
      style={{ backgroundColor: `${color}10`, color, border: `1px solid ${color}20` }}>
  <Zap className="w-2.5 h-2.5 fill-current" /> Featured
</span>
```

### Time Badge
```jsx
<span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold"
      style={{ backgroundColor: 'var(--fill-subtle)', color: 'var(--text-secondary)', border: '1px solid var(--border-default)' }}>
  09:00
</span>
```

---

## Icon Containers

| Size | Container | Icon | Radius | Use |
|------|-----------|------|--------|-----|
| compact | w-9 h-9 | w-4 h-4 | rounded-lg | List items, sidebar |
| standard | w-12 h-12 | w-6 h-6 | rounded-xl | Standard cards |
| featured | w-14 h-14 | w-7 h-7 | rounded-2xl | Important cards |
| hero | w-16-20 | w-8-10 | rounded-2xl | Featured/hero |

```jsx
<div className="{size} {radius} flex items-center justify-center shrink-0"
     style={{ backgroundColor: `${color}18`, border: `1px solid ${color}35` }}>
  <Icon className="{iconSize}" style={{ color }} />
</div>
```

---

## Navigation

### Bottom Tab Bar (Mobile)
```jsx
<nav className="shrink-0 flex items-center justify-around px-2 py-2"
     style={{
       backgroundColor: 'color-mix(in srgb, var(--bg-elevated) 95%, transparent)',
       backdropFilter: 'blur(16px)',
       borderTop: '1px solid var(--border-subtle)',
     }}>
  {tabs.map(tab => (
    <button key={tab.id} onClick={() => setActive(tab.id)}
            className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all"
            style={active === tab.id ? {
              backgroundColor: 'var(--accent-glow)',
              boxShadow: '0 0 15px var(--accent-glow)',
            } : {}}>
      <tab.icon className={`w-5 h-5 transition-all ${active === tab.id ? 'scale-110' : ''}`}
                style={{ color: active === tab.id ? 'var(--accent)' : 'var(--text-muted)' }} />
      <span className="text-[9px] font-mono uppercase tracking-widest font-bold"
            style={{ color: active === tab.id ? 'var(--accent)' : 'var(--text-muted)' }}>
        {tab.label}
      </span>
    </button>
  ))}
</nav>
```

### Sidebar (Desktop)
```jsx
<aside className="w-72 shrink-0 flex flex-col p-8 relative overflow-hidden"
       style={{ borderRight: '1px solid var(--border-default)', backgroundColor: 'var(--glass-bg)' }}>
  <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
       style={{ backgroundColor: 'var(--accent-glow)' }} />
  <div className="relative z-10">{/* Logo, nav items, footer */}</div>
</aside>
```

### Glass Nav Bar (Top Sticky)
```jsx
<nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3"
     style={{
       backgroundColor: 'var(--glass-bg)',
       backdropFilter: 'blur(16px)',
       WebkitBackdropFilter: 'blur(16px)',
       borderBottom: '1px solid var(--border-subtle)',
     }}>
  {/* Left: logo/back | Center: title | Right: actions */}
</nav>
```

---

## Layout Shells

### Fullscreen App
```jsx
<div className="h-screen flex flex-col overflow-hidden"
     style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
  <header className="shrink-0">...</header>
  <main className="flex-1 overflow-y-auto px-4 py-4 pb-24">{children}</main>
  <BottomTabBar />
</div>
```

### Scrollable Page
```jsx
<div className="min-h-screen"
     style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
  <GlassNavBar />
  <main className="max-w-4xl mx-auto px-6 py-12">{children}</main>
</div>
```

### Sidebar + Main (Desktop)
```jsx
<div className="h-screen flex overflow-hidden"
     style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
  <Sidebar />
  <main className="flex-1 overflow-y-auto px-10 py-8">{children}</main>
</div>
```

---

## Quick Reference Effects

```jsx
// Glass Panel
style={{ backgroundColor: 'var(--glass-bg)', backdropFilter: 'blur(12px)',
         border: '1px solid var(--glass-border)', boxShadow: '0 8px 32px 0 var(--glass-shadow)' }}

// Decorative Corner Glow
<div className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
     style={{ backgroundColor: `${accent}30`, filter: 'blur(48px)' }} />

// Scanlines
<div className="absolute inset-0 pointer-events-none opacity-[0.03]"
     style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)' }} />

// Gradient Accent Bar
<div className="absolute top-0 left-0 w-full h-px"
     style={{ background: `linear-gradient(to right, ${accent1}, ${accent2})` }} />

// Progress Bar
<div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--fill-subtle)' }}>
  <div className="h-full rounded-full transition-all duration-700"
       style={{ width: `${pct}%`, background: `linear-gradient(to right, ${a1}, ${a2})`,
                boxShadow: `0 0 10px ${glow}` }} />
</div>
```

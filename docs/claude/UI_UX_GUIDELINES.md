# 🎨 UI/UX Guidelines

## Design Philosophy

**Minimalist • Modern • Accessible • Performant**

Our design system prioritizes clarity, usability, and delight through thoughtful interactions and clean aesthetics.

## 🎨 Visual Design

### Color System
```css
/* Primary Palette */
--primary: #3b82f6      /* Blue - Main brand color */
--accent: #06b6d4       /* Cyan - Accent highlights */
--success: #10b981      /* Green - Success states */
--warning: #f59e0b      /* Amber - Warnings */
--error: #ef4444        /* Red - Errors */

/* Neutral Palette */
--background: #0a0a0a   /* Dark mode bg */
--foreground: #fafafa   /* Dark mode text */
--muted: #71717a        /* Muted text */
--border: #27272a       /* Borders */
```

### Typography
```css
/* Font Stack */
font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;

/* Type Scale */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */

/* Font Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing System
```css
/* 8px Grid */
--space-1: 0.25rem;     /* 4px */
--space-2: 0.5rem;      /* 8px */
--space-3: 0.75rem;     /* 12px */
--space-4: 1rem;        /* 16px */
--space-6: 1.5rem;      /* 24px */
--space-8: 2rem;        /* 32px */
--space-12: 3rem;       /* 48px */
--space-16: 4rem;       /* 64px */
--space-24: 6rem;       /* 96px */
```

## 🎯 Component Patterns

### Buttons
```tsx
/* Primary Button */
<button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
  Action
</button>

/* Secondary Button */
<button className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors">
  Secondary
</button>

/* Ghost Button */
<button className="px-6 py-3 hover:bg-muted/50 rounded-lg transition-colors">
  Ghost
</button>
```

### Cards
```tsx
/* Standard Card */
<div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-lg transition-shadow">
  <h3 className="text-xl font-semibold mb-2">Title</h3>
  <p className="text-muted-foreground">Content</p>
</div>

/* Glass Card */
<div className="glass-morphism rounded-xl p-6 backdrop-blur-md">
  Content
</div>

/* 3D Card */
<div className="rounded-xl p-6 transform hover:scale-105 hover:rotate-1 transition-transform">
  Content
</div>
```

### Forms
```tsx
/* Input Field */
<input
  type="text"
  className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
  placeholder="Enter text..."
/>

/* Textarea */
<textarea
  className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
  rows={4}
  placeholder="Enter message..."
/>
```

## 🎭 Animation Guidelines

### Timing Functions
```css
/* Easing */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

### Duration Standards
```css
/* Animation Durations */
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-slower: 700ms;
```

### Motion Principles
1. **Purpose**: Every animation should have a clear purpose
2. **Performance**: Use CSS transforms over position changes
3. **Subtlety**: Less is more - avoid overwhelming users
4. **Consistency**: Similar actions should have similar animations
5. **Accessibility**: Respect prefers-reduced-motion

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First */
--screen-sm: 640px;   /* Small tablets */
--screen-md: 768px;   /* Tablets */
--screen-lg: 1024px;  /* Desktop */
--screen-xl: 1280px;  /* Large desktop */
--screen-2xl: 1536px; /* Extra large */
```

### Grid System
```tsx
/* Container */
<div className="container mx-auto px-4 sm:px-6 lg:px-8">

/* Responsive Grid */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

/* Flex Layout */
<div className="flex flex-col lg:flex-row gap-6">
```

### Mobile Considerations
- Touch targets minimum 44x44px
- Thumb-friendly navigation zones
- Simplified navigation for mobile
- Optimized images for mobile bandwidth
- Gesture support for swipe actions

## ♿ Accessibility Standards

### WCAG 2.1 Level AA Compliance
- Color contrast ratio: 4.5:1 minimum
- Large text contrast: 3:1 minimum
- Focus indicators on all interactive elements
- Keyboard navigation support
- Screen reader compatibility

### Accessibility Checklist
```tsx
/* Good Practices */
// Alt text for images
<img src="..." alt="Descriptive text" />

// ARIA labels
<button aria-label="Close dialog">×</button>

// Semantic HTML
<nav>, <main>, <article>, <section>

// Skip links
<a href="#main" className="skip-to-main">Skip to content</a>

// Focus management
const ref = useRef()
useEffect(() => ref.current?.focus(), [])
```

## 🎨 Special Effects

### Glass Morphism
```css
.glass-morphism {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Gradient Text
```css
.gradient-text {
  background: linear-gradient(to right, #3b82f6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Glow Effects
```css
.glow {
  box-shadow: 
    0 0 20px rgba(59, 130, 246, 0.5),
    0 0 40px rgba(59, 130, 246, 0.3),
    0 0 60px rgba(59, 130, 246, 0.1);
}
```

### Parallax Scrolling
```tsx
<motion.div
  initial={{ y: 0 }}
  animate={{ y: scrollY * 0.5 }}
  transition={{ type: "spring" }}
>
  Content
</motion.div>
```

## 🔄 Interactive States

### Hover States
- Color change: Darken/lighten by 10%
- Scale: 1.02-1.05 for cards
- Shadow: Increase elevation
- Cursor: Always show appropriate cursor

### Focus States
- Outline: 2px solid primary color
- Offset: 2px from element
- Visible: Never remove, only style
- Contrast: High contrast with background

### Active States
- Scale: 0.98 for buttons
- Color: Darken by 20%
- Shadow: Reduce elevation

### Disabled States
- Opacity: 0.5
- Cursor: not-allowed
- Interaction: Prevent all interactions
- Tooltip: Explain why disabled

## 📐 Layout Principles

### Visual Hierarchy
1. **Size**: Larger = more important
2. **Color**: Bright/contrast = attention
3. **Space**: More space = more important
4. **Position**: Top/left = first seen

### White Space
- Use generous padding
- Group related elements
- Separate sections clearly
- Let content breathe

### Alignment
- Consistent grid system
- Align to baseline grid
- Center vs left-align appropriately
- Maintain visual balance

## 🎯 UX Best Practices

### Navigation
- Clear hierarchy
- Consistent placement
- Breadcrumbs for deep navigation
- Search functionality
- Mobile-friendly menu

### Feedback
- Loading states for all async operations
- Success/error messages
- Progress indicators
- Skeleton screens
- Micro-interactions

### Performance
- Lazy load images
- Code splitting
- Optimistic UI updates
- Perceived performance
- Progressive enhancement

### Content
- Clear headlines
- Scannable text
- Appropriate line length (45-75 chars)
- Visual breaks
- Call-to-action clarity

## 🚀 Innovation Areas

### Current Trends
- Neural network patterns
- Quantum-inspired borders
- Holographic gradients
- 3D transforms
- Magnetic interactions

### Future Considerations
- AR/VR interfaces
- Voice UI integration
- Gesture controls
- AI-powered personalization
- Adaptive interfaces

---

**Last Updated**: January 19, 2025  
**Design System Version**: 2.0  
**Status**: Active Development
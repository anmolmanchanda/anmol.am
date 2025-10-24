# Contributing to anmol.am Portfolio

Thank you for your interest in contributing to this AI-powered portfolio project! This document provides comprehensive guidelines for contributing to the codebase.

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Git Workflow](#git-workflow)
5. [Code Style Guidelines](#code-style-guidelines)
6. [Component Guidelines](#component-guidelines)
7. [Testing Guidelines](#testing-guidelines)
8. [Documentation Guidelines](#documentation-guidelines)
9. [Pull Request Process](#pull-request-process)
10. [Issue Reporting](#issue-reporting)

## 🤝 Code of Conduct

This project adheres to a code of conduct that promotes a welcoming and inclusive environment:

- **Be respectful**: Treat all contributors with respect and kindness
- **Be collaborative**: Work together to improve the project
- **Be constructive**: Provide helpful feedback and suggestions
- **Be patient**: Remember that everyone has different experience levels

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and npm
- **Git** for version control
- **Modern code editor** (VS Code recommended)
- **Basic understanding** of React, Next.js, and TypeScript

### Local Development Setup

1. **Fork and clone the repository:**
```bash
git clone https://github.com/yourusername/anmol.am.git
cd anmol.am
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. **Start development server:**
```bash
npm run dev
```

5. **Verify setup:**
   - Open [http://localhost:3000](http://localhost:3000)
   - Ensure all features work correctly

## 💻 Development Workflow

### Branch Strategy

**🚨 CRITICAL: Never work directly on the main branch!**

This project enforces strict git workflow rules with pre-commit hooks and safety measures.

1. **Create a feature branch:**
```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes:**
   - Follow existing code patterns
   - Add TypeScript types for new features
   - Update documentation for significant changes

3. **Test your changes:**
```bash
npm run lint          # Check code style
npm run type-check    # TypeScript validation
npm run build         # Ensure build succeeds
```

4. **Commit your changes:**
```bash
git add .
git commit -m "feat: add real-time analytics dashboard

- Implement visitor counter with localStorage fallback
- Add online user indicator
- Integrate with Vercel Analytics API
- Add responsive mobile layout"
```

### Commit Message Convention

Use conventional commits for clear change tracking:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(analytics): add real-time visitor tracking
fix(mobile): resolve touch target sizing issues
docs(readme): update installation instructions
style(components): improve code formatting
refactor(api): optimize GitHub integration
test(contact): add form validation tests
chore(deps): update Next.js to latest version
```

## 🔧 Git Workflow

### Safety Measures

This project includes multiple safety measures to prevent working on main:

1. **Pre-commit hooks** prevent direct commits to main
2. **Multiple reminder files** document the workflow
3. **NPM scripts** provide branch checking utilities

### Git Commands

```bash
# Check current branch (safe command)
npm run check-branch

# Display current branch with warnings
npm run safe-branch

# Show main branch protection reminder
npm run protect-main

# Create new feature branch
git checkout -b feature/your-feature-name

# Push feature branch
git push -u origin feature/your-feature-name
```

### Branch Naming Convention

Use descriptive branch names:

```bash
feature/command-palette-mobile-optimization
feature/github-integration-rate-limiting
fix/responsive-design-tablet-view
docs/api-documentation-update
refactor/component-architecture-cleanup
```

## 🎨 Code Style Guidelines

### TypeScript Guidelines

**1. Use proper typing:**
```typescript
// ✅ Good
interface ProjectData {
  id: string
  title: string
  description: string
  technologies: string[]
  featured: boolean
}

// ❌ Avoid
const project: any = { ... }
```

**2. Prefer interfaces over types for object shapes:**
```typescript
// ✅ Good
interface ComponentProps {
  title: string
  children: React.ReactNode
}

// ❌ Less preferred
type ComponentProps = {
  title: string
  children: React.ReactNode
}
```

**3. Use const assertions for literal types:**
```typescript
// ✅ Good
const themes = ['light', 'dark'] as const
type Theme = typeof themes[number]

// ❌ Avoid
const themes = ['light', 'dark']
```

### React Component Guidelines

**1. Use functional components with hooks:**
```typescript
// ✅ Good
import { useState, useEffect } from 'react'

interface Props {
  initialCount: number
}

export function Counter({ initialCount }: Props) {
  const [count, setCount] = useState(initialCount)
  
  useEffect(() => {
    // Effect logic
  }, [])
  
  return <div>{count}</div>
}

// ❌ Avoid class components (unless necessary)
class Counter extends React.Component { ... }
```

**2. Implement proper prop validation:**
```typescript
// ✅ Good
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
}

export function Button({ variant, size = 'md', children, onClick }: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

**3. Follow single responsibility principle:**
```typescript
// ✅ Good - Each component has one responsibility
function UserAvatar({ src, alt, size }: AvatarProps) { ... }
function UserName({ name, role }: NameProps) { ... }
function UserCard({ user }: UserCardProps) {
  return (
    <div>
      <UserAvatar src={user.avatar} alt={user.name} size="md" />
      <UserName name={user.name} role={user.role} />
    </div>
  )
}

// ❌ Avoid - Component doing too much
function UserEverything({ user }: Props) {
  // Handles avatar, name, role, actions, etc.
}
```

### Styling Guidelines

**1. Use Tailwind CSS utility classes:**
```typescript
// ✅ Good
<div className="flex items-center gap-4 p-6 rounded-lg border">

// ❌ Avoid inline styles
<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
```

**2. Prefer composition over long className strings:**
```typescript
// ✅ Good
const cardStyles = "liquid-glass p-6 rounded-xl border backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300"

<div className={cardStyles}>

// ❌ Avoid
<div className="liquid-glass p-6 rounded-xl border backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 cyber-border group interactive-element">
```

**3. Use CSS variables for theme values:**
```css
/* ✅ Good */
.neural-glow {
  box-shadow: 0 0 20px hsl(var(--primary) / 0.5);
}

/* ❌ Avoid hardcoded colors */
.neural-glow {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}
```

## 🧩 Component Guidelines

### Component Structure

```typescript
// components/ExampleComponent.tsx
"use client" // Only if needed

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icon } from 'lucide-react'
import { cn } from '@/lib/utils'

// Types and interfaces
interface ExampleComponentProps {
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
}

// Component implementation
export function ExampleComponent({
  title,
  description,
  children,
  className
}: ExampleComponentProps) {
  // Hooks
  const [isActive, setIsActive] = useState(false)
  
  // Event handlers
  const handleClick = () => {
    setIsActive(!isActive)
  }
  
  // Render
  return (
    <motion.div
      className={cn(
        "base-styles",
        isActive && "active-styles",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={handleClick}
    >
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {children}
    </motion.div>
  )
}
```

### Animation Guidelines

**1. Use Framer Motion for complex animations:**
```typescript
// ✅ Good
import { motion } from 'framer-motion'

<motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

**2. Use CSS for simple animations:**
```css
/* ✅ Good for simple effects */
.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**3. Consider performance for mobile:**
```typescript
// ✅ Good - Reduced motion on mobile
const isMobile = useMediaQuery('(max-width: 768px)')

<motion.div
  animate={{ y: isMobile ? 0 : 20 }}
  transition={{ duration: isMobile ? 0.2 : 0.5 }}
>
```

## 🧪 Testing Guidelines

### Testing Philosophy

While this project doesn't currently have extensive tests, contributions should consider testability:

**1. Write testable code:**
```typescript
// ✅ Good - Pure function, easy to test
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// ❌ Hard to test - Side effects
export function formatAndLogDate(date: Date): string {
  const formatted = date.toLocaleDateString()
  console.log(formatted) // Side effect
  return formatted
}
```

**2. Separate business logic from UI:**
```typescript
// ✅ Good - Logic separated
export function useAnalytics() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetchAnalyticsData().then(setData)
  }, [])
  
  return data
}

export function AnalyticsWidget() {
  const data = useAnalytics()
  return <div>{data?.visitors}</div>
}
```

### Manual Testing Checklist

Before submitting a PR, test:

- [ ] All pages load correctly
- [ ] Mobile responsiveness works
- [ ] Dark/light mode switching
- [ ] Command palette functionality (⌘K)
- [ ] Contact form submission
- [ ] GitHub integration displays
- [ ] PWA install prompt works
- [ ] All interactive elements are touch-friendly (44px minimum)

## 📚 Documentation Guidelines

### Code Documentation

**1. Add JSDoc comments for complex functions:**
```typescript
/**
 * Fetches GitHub activity data with rate limiting and fallback
 * @param username - GitHub username to fetch activity for
 * @param token - Optional GitHub token for higher rate limits
 * @returns Promise resolving to formatted activity data
 */
export async function fetchGitHubActivity(
  username: string,
  token?: string
): Promise<GitHubActivity[]> {
  // Implementation
}
```

**2. Document component props:**
```typescript
interface ComponentProps {
  /** Primary title displayed in the component */
  title: string
  /** Optional description text */
  description?: string
  /** Whether the component should animate on mount */
  animate?: boolean
}
```

**3. Update README for significant changes:**
- Add new features to the features list
- Update setup instructions if needed
- Document new environment variables
- Update technology stack if adding dependencies

## 🔄 Pull Request Process

### Before Submitting

1. **Ensure your branch is up to date:**
```bash
git checkout main
git pull origin main
git checkout your-feature-branch
git rebase main
```

2. **Run all checks:**
```bash
npm run lint
npm run type-check
npm run build
```

3. **Test thoroughly:**
   - Manual testing on desktop and mobile
   - Check all interactive features
   - Verify no broken functionality

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on desktop browsers
- [ ] Tested on mobile devices
- [ ] Verified accessibility
- [ ] Checked performance impact

## Screenshots
<!-- If applicable, add screenshots -->

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed the code
- [ ] Added comments for complex logic
- [ ] Updated documentation if needed
- [ ] No new warnings or errors
- [ ] Tested edge cases
```

### Review Process

1. **Automated checks** must pass
2. **Manual review** by maintainers
3. **Testing** on multiple devices/browsers
4. **Merge** after approval

## 🐛 Issue Reporting

### Bug Reports

Use this template for bug reports:

```markdown
**Describe the bug**
Clear description of what the bug is

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
Clear description of what you expected to happen

**Screenshots**
If applicable, add screenshots

**Desktop:**
 - OS: [e.g. iOS]
 - Browser [e.g. chrome, safari]
 - Version [e.g. 22]

**Mobile:**
 - Device: [e.g. iPhone6]
 - OS: [e.g. iOS8.1]
 - Browser [e.g. stock browser, safari]
 - Version [e.g. 22]

**Additional context**
Any other context about the problem
```

### Feature Requests

Use this template for feature requests:

```markdown
**Is your feature request related to a problem?**
Clear description of what the problem is

**Describe the solution you'd like**
Clear description of what you want to happen

**Describe alternatives you've considered**
Alternative solutions or features you've considered

**Additional context**
Any other context or screenshots about the feature request
```

## 📞 Getting Help

- **Documentation**: Check [README.md](README.md) and [DEPLOYMENT.md](DEPLOYMENT.md)
- **Issues**: Search existing issues before creating new ones
- **Discussions**: Use GitHub Discussions for questions
- **Code Review**: Ask for help in PR comments

## 🙏 Recognition

Contributors will be recognized in:
- Project README
- Release notes for significant contributions
- Special thanks for major features

Thank you for contributing to the advancement of AI-powered development! 🚀
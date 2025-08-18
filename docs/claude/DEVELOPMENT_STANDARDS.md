# 🛠️ Development Standards & Best Practices

## 📋 Code Quality Standards

### DRY Principle (Don't Repeat Yourself) - MANDATORY
**This is a CRITICAL rule that must ALWAYS be followed:**

#### Never Duplicate Code
```typescript
// ❌ WRONG - Duplicated logic
function UserCard({ user }) {
  return (
    <div className="p-4 rounded-lg border">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  )
}

function AdminCard({ admin }) {
  return (
    <div className="p-4 rounded-lg border">
      <h3>{admin.name}</h3>
      <p>{admin.email}</p>
    </div>
  )
}

// ✅ CORRECT - Reusable component
function PersonCard({ person, type }) {
  return (
    <div className="p-4 rounded-lg border">
      <h3>{person.name}</h3>
      <p>{person.email}</p>
      {type && <span className="badge">{type}</span>}
    </div>
  )
}
```

#### Extract Common Logic
```typescript
// Create utilities for repeated operations
export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US').format(date)
}

// Create hooks for repeated state logic
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  
  return debouncedValue
}
```

#### Use Constants for Repeated Values
```typescript
// constants/index.ts
export const API_ENDPOINTS = {
  USERS: '/api/users',
  POSTS: '/api/posts',
  COMMENTS: '/api/comments'
}

export const QUERY_KEYS = {
  USERS: 'users',
  POSTS: 'posts', 
  COMMENTS: 'comments'
}
```

#### Create Shared Types
```typescript
// types/index.ts
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Use throughout the app
const userResponse: ApiResponse<User> = await fetchUser()
const postsResponse: ApiResponse<Post[]> = await fetchPosts()
```

### TypeScript Configuration
```typescript
// Always use strict TypeScript settings
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noImplicitReturns": true
}
```

### Code Style Rules

#### 1. File Organization
```typescript
// Order of imports
import React from 'react'                    // 1. React
import { useState, useEffect } from 'react'  // 2. React hooks
import Link from 'next/link'                 // 3. Next.js
import { motion } from 'framer-motion'       // 4. Third-party
import { Button } from '@/components/ui'     // 5. Internal components
import { cn } from '@/lib/utils'             // 6. Utilities
import type { User } from '@/types'          // 7. Types
```

#### 2. Component Structure
```typescript
// Always follow this structure:
export function ComponentName({ prop1, prop2 }: Props) {
  // 1. Hooks
  const [state, setState] = useState()
  const router = useRouter()
  
  // 2. Computed values
  const computedValue = useMemo(() => {}, [])
  
  // 3. Effects
  useEffect(() => {}, [])
  
  // 4. Handlers
  const handleClick = () => {}
  
  // 5. Render
  return <div>...</div>
}
```

#### 3. Naming Conventions
```typescript
// Components: PascalCase
export function UserProfile() {}

// Functions: camelCase
function calculateTotal() {}

// Constants: UPPER_SNAKE_CASE
const MAX_RETRIES = 3

// Interfaces/Types: PascalCase
interface UserData {}
type ButtonProps = {}

// Files:
// - Components: PascalCase.tsx
// - Utilities: camelCase.ts
// - Constants: UPPER_SNAKE_CASE.ts
```

## 🎨 React/Next.js Patterns

### 1. Data Fetching
```typescript
// Server Components (preferred)
async function Page() {
  const data = await fetchData()
  return <Component data={data} />
}

// Client Components (when needed)
'use client'
function ClientComponent() {
  const [data, setData] = useState()
  useEffect(() => {
    fetchData().then(setData)
  }, [])
  return <div>{data}</div>
}
```

### 2. Error Handling
```typescript
// Always handle errors gracefully
try {
  const result = await riskyOperation()
  return { success: true, data: result }
} catch (error) {
  console.error('Operation failed:', error)
  return { success: false, error: 'User-friendly message' }
}
```

### 3. Performance Optimization
```typescript
// Use dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSkeleton />,
  ssr: false
})

// Memoize expensive computations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data)
}, [data])

// Optimize re-renders
const MemoizedComponent = memo(Component)
```

## 🏗️ Project Structure

```
/Users/Shared/anmol.am/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Route groups
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── features/         # Feature-specific components
│   └── layouts/          # Layout components
├── lib/                   # Utilities and helpers
│   ├── utils.ts          # General utilities
│   ├── api.ts           # API helpers
│   └── constants.ts     # App constants
├── hooks/                # Custom React hooks
├── types/                # TypeScript types
├── styles/               # Global styles
├── public/               # Static assets
└── docs/                 # Documentation
    └── claude/          # Claude-specific docs
```

## 🔧 Development Workflow

### 1. Before Starting Development
```bash
# Always start fresh
git checkout main && git pull
npm install  # Ensure dependencies are up-to-date
npm run dev  # Start dev server
```

### 2. During Development
```bash
# Test frequently
npm run lint     # Check code quality
npm run typecheck # Check types
npm run build    # Verify production build
```

### 3. Before Committing
```bash
# Quality checks
npm run lint:fix  # Auto-fix issues
npm run format    # Format code
npm run test      # Run tests
npm run build     # Final build check
```

## 📊 Performance Standards

### Core Web Vitals Targets
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **Lighthouse Score**: > 95

### Bundle Size Limits
```javascript
// Maximum sizes
- Initial JS: < 200KB
- Per route: < 100KB
- Images: Optimized with next/image
- Fonts: Subset and preloaded
```

## ♿ Accessibility Requirements

### WCAG 2.1 Level AA Compliance
```typescript
// Always include:
- aria-label for interactive elements
- alt text for images
- proper heading hierarchy (h1 -> h2 -> h3)
- keyboard navigation support
- focus indicators
- color contrast ratio > 4.5:1
```

### Accessibility Checklist
- [ ] Keyboard navigable
- [ ] Screen reader compatible
- [ ] Focus management
- [ ] ARIA labels
- [ ] Alt text
- [ ] Color contrast
- [ ] Skip links
- [ ] Error messages

## 🔒 Security Best Practices

### 1. Never Expose Secrets
```typescript
// WRONG
const apiKey = "sk_live_abc123"

// CORRECT
const apiKey = process.env.API_KEY
```

### 2. Validate All Input
```typescript
// Always validate and sanitize
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  age: z.number().min(0).max(120)
})

const validated = schema.parse(input)
```

### 3. Use HTTPS Only
```typescript
// Force HTTPS in production
if (process.env.NODE_ENV === 'production' && !req.secure) {
  return res.redirect('https://' + req.headers.host + req.url)
}
```

## 📦 Dependencies Management

### Adding Dependencies
```bash
# Think before adding
# Ask: Is this really needed?
# Check: Bundle size impact
# Verify: Active maintenance
# Test: Security vulnerabilities

npm install package-name
npm audit  # Check for vulnerabilities
```

### Updating Dependencies
```bash
# Regular updates (weekly)
npm update

# Major updates (monthly)
npm outdated
npx npm-check-updates -u
npm install
```

## 🧪 Testing Standards

### Unit Tests
```typescript
describe('Component', () => {
  it('should render correctly', () => {
    render(<Component />)
    expect(screen.getByText('Text')).toBeInTheDocument()
  })
  
  it('should handle clicks', () => {
    const handleClick = jest.fn()
    render(<Component onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })
})
```

### E2E Tests
```typescript
test('user flow', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Get Started')
  await expect(page).toHaveURL('/dashboard')
})
```

## 📝 Documentation Standards

### Component Documentation
```typescript
/**
 * UserProfile component displays user information
 * @param {UserProfileProps} props - Component props
 * @param {User} props.user - User data object
 * @param {() => void} props.onEdit - Edit callback
 * @returns {JSX.Element} Rendered component
 * @example
 * <UserProfile user={userData} onEdit={handleEdit} />
 */
```

### Function Documentation
```typescript
/**
 * Calculates the total price including tax
 * @param {number} price - Base price
 * @param {number} taxRate - Tax rate as decimal
 * @returns {number} Total price with tax
 */
function calculateTotal(price: number, taxRate: number): number {
  return price * (1 + taxRate)
}
```

## 🚀 Optimization Techniques

### 1. Image Optimization
```typescript
import Image from 'next/image'

// Always use next/image
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
/>
```

### 2. Code Splitting
```typescript
// Dynamic imports for heavy components
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false
})
```

### 3. Caching Strategies
```typescript
// API route caching
export const revalidate = 3600  // Revalidate every hour

// Static generation
export async function generateStaticParams() {
  return paths
}
```

## ✅ Code Review Checklist

Before submitting code:
- [ ] Follows naming conventions
- [ ] No console.logs in production
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Responsive design
- [ ] Accessibility compliant
- [ ] Tests written
- [ ] Documentation updated
- [ ] Performance optimized
- [ ] Security reviewed

---

**Last Updated**: January 19, 2025  
**Version**: 2.0
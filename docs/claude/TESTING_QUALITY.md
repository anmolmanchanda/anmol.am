# ✅ Testing & Quality Assurance Guide

## 🧪 Testing Strategy

### Testing Pyramid
```
         /\
        /E2E\      <- 10% (Critical user flows)
       /------\
      /  Integ  \  <- 30% (API & integrations)
     /----------\
    /   Unit     \ <- 60% (Components & functions)
   /--------------\
```

## 🔍 Pre-Commit Checklist

### Always Run Before Committing:
```bash
# 1. Lint check
npm run lint

# 2. Type check
npm run build

# 3. Format code
npm run format

# 4. Run tests
npm run test

# 5. Build production
npm run build

# 6. Check bundle size
npm run analyze
```

## 📦 Unit Testing

### Component Testing
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/Button'

describe('Button Component', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button')
    
    expect(button).toBeDisabled()
    expect(button).toHaveClass('opacity-50')
  })
})
```

### Hook Testing
```typescript
import { renderHook, act } from '@testing-library/react'
import { useCounter } from '@/hooks/useCounter'

describe('useCounter Hook', () => {
  it('increments counter', () => {
    const { result } = renderHook(() => useCounter())
    
    act(() => {
      result.current.increment()
    })
    
    expect(result.current.count).toBe(1)
  })
})
```

### Utility Testing
```typescript
import { formatDate, calculateReadTime } from '@/lib/utils'

describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = '2025-01-19'
      expect(formatDate(date)).toBe('January 19, 2025')
    })
  })

  describe('calculateReadTime', () => {
    it('calculates reading time', () => {
      const text = 'word '.repeat(200) // 200 words
      expect(calculateReadTime(text)).toBe(1) // 1 minute
    })
  })
})
```

## 🔄 Integration Testing

### API Route Testing
```typescript
import { createMocks } from 'node-mocks-http'
import handler from '@/app/api/contact/route'

describe('/api/contact', () => {
  it('sends email successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello'
      }
    })

    await handler(req, res)
    
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({
      success: true,
      message: 'Email sent successfully'
    })
  })

  it('validates required fields', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { name: 'John' } // Missing email
    })

    await handler(req, res)
    
    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toHaveProperty('error')
  })
})
```

### Database Testing
```typescript
import { prismaMock } from '@/test/prisma-mock'

describe('Database Operations', () => {
  it('creates user', async () => {
    const user = { id: 1, name: 'John', email: 'john@example.com' }
    prismaMock.user.create.mockResolvedValue(user)
    
    const result = await createUser(user)
    expect(result).toEqual(user)
  })
})
```

## 🎭 E2E Testing

### Playwright Tests
```typescript
import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Anmol Manchanda/)
    
    const hero = page.locator('[data-testid="hero"]')
    await expect(hero).toBeVisible()
  })

  test('navigation works', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Projects')
    await expect(page).toHaveURL('/projects')
    
    await page.click('text=About')
    await expect(page).toHaveURL('/about')
  })

  test('contact form submission', async ({ page }) => {
    await page.goto('/contact')
    
    await page.fill('[name="name"]', 'Test User')
    await page.fill('[name="email"]', 'test@example.com')
    await page.fill('[name="message"]', 'Test message')
    
    await page.click('button[type="submit"]')
    
    await expect(page.locator('.success-message')).toBeVisible()
  })
})
```

### Mobile Testing
```typescript
test.describe('Mobile View', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('mobile menu works', async ({ page }) => {
    await page.goto('/')
    
    // Menu should be hidden
    await expect(page.locator('nav.desktop')).not.toBeVisible()
    
    // Open mobile menu
    await page.click('[data-testid="menu-toggle"]')
    await expect(page.locator('nav.mobile')).toBeVisible()
    
    // Navigate
    await page.click('nav.mobile >> text=Projects')
    await expect(page).toHaveURL('/projects')
  })
})
```

## 🎯 Performance Testing

### Lighthouse CI
```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['/', '/projects', '/blog', '/about', '/contact'],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
}
```

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npm run analyze

# Check for:
- Duplicate dependencies
- Large dependencies
- Unused code
- Tree-shaking opportunities
```

## ♿ Accessibility Testing

### Automated Testing
```typescript
import { axe } from '@axe-core/react'

describe('Accessibility', () => {
  it('has no violations on homepage', async () => {
    const { container } = render(<HomePage />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

### Manual Testing Checklist
- [ ] Keyboard navigation works
- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] Screen reader announces correctly
- [ ] Color contrast meets WCAG AA
- [ ] Interactive elements have labels
- [ ] Error messages are accessible
- [ ] Skip links work
- [ ] Zoom to 200% works

## 🔒 Security Testing

### Dependency Scanning
```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Check with Snyk
npx snyk test
```

### Input Validation Testing
```typescript
describe('Security', () => {
  it('prevents XSS attacks', () => {
    const maliciousInput = '<script>alert("XSS")</script>'
    const sanitized = sanitizeInput(maliciousInput)
    expect(sanitized).not.toContain('<script>')
  })

  it('prevents SQL injection', () => {
    const maliciousQuery = "'; DROP TABLE users; --"
    expect(() => executeQuery(maliciousQuery)).toThrow()
  })
})
```

## 📊 Quality Metrics

### Code Coverage Requirements
```javascript
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}
```

### Quality Gates
- **Coverage**: > 80%
- **Duplication**: < 3%
- **Complexity**: < 10 per function
- **Maintainability**: A rating
- **Technical Debt**: < 5 days

## 🐛 Debugging Guide

### Debug Tools
```typescript
// Browser debugging
console.log('Debug:', variable)
debugger // Breakpoint

// React DevTools
const { debug } = render(<Component />)
debug() // Prints DOM

// Network debugging
console.log('API Response:', await response.json())
```

### Common Issues & Solutions

#### Issue: Component not rendering
```typescript
// Check:
1. Import path correct?
2. Props passed correctly?
3. Conditional rendering logic?
4. Error in console?

// Debug:
console.log('Props:', props)
console.log('State:', state)
```

#### Issue: State not updating
```typescript
// Check:
1. Using setState correctly?
2. Mutating state directly?
3. Async update timing?

// Fix:
setState(prev => ({ ...prev, newValue }))
```

#### Issue: API call failing
```typescript
// Check:
1. Correct endpoint?
2. Auth headers included?
3. CORS configured?
4. Network tab in DevTools

// Debug:
try {
  const response = await fetch(url)
  console.log('Status:', response.status)
  console.log('Headers:', response.headers)
  const data = await response.json()
  console.log('Data:', data)
} catch (error) {
  console.error('Error:', error)
}
```

## 📝 Test Documentation

### Test File Naming
```
ComponentName.test.tsx   // Unit tests
ComponentName.e2e.ts     // E2E tests
api.test.ts             // API tests
utils.test.ts           // Utility tests
```

### Test Structure
```typescript
describe('Feature/Component', () => {
  // Setup
  beforeEach(() => {})
  afterEach(() => {})

  describe('Scenario', () => {
    it('should do something', () => {
      // Arrange
      const input = 'test'
      
      // Act
      const result = function(input)
      
      // Assert
      expect(result).toBe('expected')
    })
  })
})
```

## 🚀 Continuous Testing

### Pre-Push Hook
```bash
# .husky/pre-push
npm run lint
npm run test
npm run build
```

### CI Pipeline
```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm ci
      - run: npm run lint
      - run: npm run test:ci
      - run: npm run build
```

## ✅ Quality Checklist

Before marking task as complete:
- [ ] All tests pass
- [ ] Coverage > 80%
- [ ] No linting errors
- [ ] No TypeScript errors
- [ ] Accessibility check passed
- [ ] Performance budget met
- [ ] Security scan clean
- [ ] Documentation updated
- [ ] Code reviewed
- [ ] Deployed successfully

---

**Last Updated**: January 19, 2025  
**Testing Framework**: Jest + React Testing Library + Playwright  
**Coverage Target**: 80%
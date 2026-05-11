# Testing Guide - VirtualFit AR Try-On

## Overview

This project implements comprehensive testing across three levels:
- **Unit Tests**: Individual function testing with Jest
- **Integration Tests**: API and utility interaction testing
- **E2E Tests**: Full application workflow testing with Playwright

## Coverage Goals

- **Minimum Coverage**: 75% (lines, functions, statements)
- **Branch Coverage**: 70%
- **Target Coverage**: 85%+

## Running Tests Locally

### Prerequisites

```bash
# Install dependencies
pnpm install

# Install Playwright browsers
pnpm exec playwright install
```

### Unit & Integration Tests

```bash
# Run all unit and integration tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run specific test file
pnpm test products.test.ts

# Generate coverage report
pnpm test --coverage

# View coverage in browser
open coverage/lcov-report/index.html
```

### E2E Tests

```bash
# Run Playwright tests
pnpm test:e2e

# Run specific E2E test file
pnpm test:e2e home.spec.ts

# Run in headed mode (see browser)
pnpm test:e2e --headed

# Run on specific browser
pnpm test:e2e --project=chromium

# Debug with inspector
pnpm test:e2e --debug

# View test report
pnpm exec playwright show-report
```

## Test Structure

```
__tests__/
├── unit/
│   ├── auth.test.ts          # Authentication utilities
│   ├── products.test.ts      # Product filtering and search
│   └── validation.test.ts    # Data validation functions
├── integration/
│   └── api.test.ts           # API request handling
└── e2e/
    ├── home.spec.ts          # Home page workflows
    └── shop.spec.ts          # Shop and product interactions
```

## Test Types

### Unit Tests (Jest)

Test individual utility functions in isolation.

**Example:**
```typescript
describe('Product Utilities', () => {
  it('should filter products by category', () => {
    const result = filterProductsByCategory(products, 'sunglasses');
    expect(result).toHaveLength(5);
  });
});
```

### Integration Tests (Jest)

Test how multiple units interact, typically focusing on API layers and data flow.

**Example:**
```typescript
describe('fetchAPI', () => {
  it('should handle API errors gracefully', async () => {
    const result = await fetchAPI('/api/invalid');
    expect(result.success).toBeFalsy();
  });
});
```

### E2E Tests (Playwright)

Test complete user workflows across the application.

**Example:**
```typescript
test('should add product to favorites', async ({ page }) => {
  await page.goto('/shop');
  await page.click('[data-testid="favorite-button"]');
  await expect(page.locator('.favorite-count')).toContainText('1');
});
```

## Coverage Requirements

### By Module

| Module | Target | Type |
|--------|--------|------|
| `lib/utils` | 85% | Unit + Integration |
| `lib/constants` | 100% | Unit |
| `app/api/*` | 80% | Unit + Integration |
| `components/*` | 75% | E2E |
| `hooks/*` | 80% | Unit |

### Coverage Calculation

```
Coverage = (Items Tested / Total Items) × 100%
```

**Types:**
- **Line Coverage**: % of code lines executed
- **Branch Coverage**: % of conditional branches taken
- **Function Coverage**: % of functions called
- **Statement Coverage**: % of statements executed

## Continuous Integration

Tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests
- Daily schedule (E2E only)

### CI Status

- ✅ Unit tests must pass
- ✅ E2E tests must pass
- ✅ Coverage must meet thresholds
- ✅ Build must succeed
- ✅ Linting must pass

## Debugging Tests

### Jest Debugging

```bash
# Run single test file in debug mode
node --inspect-brk node_modules/.bin/jest __tests__/unit/products.test.ts
```

### Playwright Debugging

```bash
# Interactive Playwright Inspector
pnpm test:e2e --debug

# Headed mode with visible browser
pnpm test:e2e --headed

# Slow down test execution
pnpm test:e2e --headed --debug
```

## Test Data

Tests use:
- **Mock data**: `lib/constants/products.ts` (MOCK_PRODUCTS)
- **Fixtures**: Test-specific data defined in test files
- **Mocked APIs**: Jest mocks for `fetch` and Supabase calls

## Best Practices

1. **Descriptive test names**: Use `should...` pattern
2. **Arrange-Act-Assert**: Clear test structure
3. **DRY**: Use `beforeEach`/`afterEach` for setup
4. **Isolation**: Tests should not depend on each other
5. **Coverage-first**: Write tests for critical paths
6. **Mock external services**: Isolate unit tests
7. **E2E for user journeys**: Test real user flows

## Troubleshooting

### Tests Timing Out

```typescript
// Increase timeout for specific test
test('slow operation', async ({ page }) => {
  // test code
}, { timeout: 60000 });
```

### Flaky E2E Tests

```typescript
// Add explicit waits
await page.waitForSelector('[data-testid="item"]');
await page.waitForFunction(() => document.querySelectorAll('[data-testid="item"]').length > 0);
```

### Coverage Not Meeting Threshold

```bash
# Find untested lines
pnpm test --coverage
open coverage/lcov-report/index.html
```

## Next Steps

1. Maintain >75% code coverage
2. Add tests for new features before implementation
3. Review coverage reports in PR reviews
4. Run E2E tests before releases
5. Monitor test execution time

## References

- [Jest Documentation](https://jestjs.io/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library Best Practices](https://testing-library.com/)

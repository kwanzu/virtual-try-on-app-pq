import { test, expect } from '@playwright/test'

test.describe('Home Page - End-to-End Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page
    await page.goto('/')
  })

  test('should display home page with hero section', async ({ page }) => {
    // Check for main heading
    await expect(page.locator('h1')).toContainText('Try Before You Buy')
    
    // Check for navigation
    const shopButton = page.locator('a:has-text("Shop")')
    await expect(shopButton).toBeVisible()
  })

  test('should navigate to shop from home', async ({ page }) => {
    // Click shop button
    await page.click('a:has-text("Shop")')
    
    // Verify navigation
    await expect(page).toHaveURL('/shop')
  })

  test('should display feature cards', async ({ page }) => {
    const featureCards = page.locator('[class*="card"]')
    const count = await featureCards.count()
    
    // Expect at least 3 feature cards
    expect(count).toBeGreaterThanOrEqual(3)
  })

  test('should have working login link', async ({ page }) => {
    const loginButton = page.locator('a:has-text("Login")')
    await expect(loginButton).toBeVisible()
    
    await loginButton.click()
    await expect(page).toHaveURL(/auth|login/)
  })

  test('should have accessible footer', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    
    // Check for copyright notice
    const copyright = footer.locator('text=/copyright|©/i')
    await expect(copyright).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check that main content is still visible
    const mainContent = page.locator('main')
    await expect(mainContent).toBeVisible()
  })

  test('should load images without errors', async ({ page }) => {
    // Set up listener for failed image loads
    let imageErrors = 0
    page.on('response', response => {
      if (response.request().resourceType() === 'image' && !response.ok()) {
        imageErrors++
      }
    })
    
    // Wait for page load
    await page.waitForLoadState('networkidle')
    
    // No image load errors
    expect(imageErrors).toBe(0)
  })

  test('should have proper meta tags', async ({ page }) => {
    // Check title
    const title = await page.title()
    expect(title).toBeTruthy()
    expect(title.length).toBeGreaterThan(0)
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /.+/)
  })
})

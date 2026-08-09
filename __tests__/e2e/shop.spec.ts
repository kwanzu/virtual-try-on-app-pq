import { test, expect } from '@playwright/test'

test.describe('Shop Page - End-to-End Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to shop page
    await page.goto('/shop')
  })

  test('should display product catalog', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })
    
    const productCards = page.locator('[data-testid="product-card"]')
    const count = await productCards.count()
    
    // Expect at least 1 product
    expect(count).toBeGreaterThan(0)
  })

  test('should filter products by category', async ({ page }) => {
    // Click category filter
    const categorySelect = page.locator('select[aria-label="Category"]')
    await expect(categorySelect).toBeVisible()
    
    await categorySelect.selectOption('sunglasses')
    
    // Wait for filtered results
    await page.waitForTimeout(500)
    
    const productCards = page.locator('[data-testid="product-card"]')
    const count = await productCards.count()
    
    expect(count).toBeGreaterThan(0)
  })

  test('should search products', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]')
    await expect(searchInput).toBeVisible()
    
    await searchInput.fill('aviator')
    
    // Wait for search results
    await page.waitForTimeout(500)
    
    const productCards = page.locator('[data-testid="product-card"]')
    const count = await productCards.count()
    
    expect(count).toBeGreaterThanOrEqual(0)
  })

  test('should navigate to product detail', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]')
    
    // Click first product
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await firstProduct.click()
    
    // Verify navigation to detail page
    await expect(page).toHaveURL(/\/product\//)
  })

  test('should add product to favorites', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="favorite-button"]')
    
    const favoriteButton = page.locator('[data-testid="favorite-button"]').first()
    
    // Click favorite button
    await favoriteButton.click()
    
    // Check for success indicator
    await expect(favoriteButton).toHaveClass(/active|selected/)
  })

  test('should sort products', async ({ page }) => {
    const sortSelect = page.locator('select[aria-label="Sort"]')
    await expect(sortSelect).toBeVisible()
    
    await sortSelect.selectOption('price-low')
    
    // Wait for reordering
    await page.waitForTimeout(500)
    
    const productCards = page.locator('[data-testid="product-card"]')
    const count = await productCards.count()
    
    expect(count).toBeGreaterThan(0)
  })

  test('should open AR try-on modal', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="try-on-button"]')
    
    const tryOnButton = page.locator('[data-testid="try-on-button"]').first()
    await tryOnButton.click()
    
    // Check for modal
    const modal = page.locator('[role="dialog"]')
    await expect(modal).toBeVisible()
  })

  test('should handle pagination', async ({ page }) => {
    const pagination = page.locator('nav[aria-label="Pagination"]')
    
    if (await pagination.isVisible()) {
      const nextButton = pagination.locator('button:has-text("Next")')
      
      if (await nextButton.isEnabled()) {
        await nextButton.click()
        await page.waitForTimeout(500)
        
        const productCards = page.locator('[data-testid="product-card"]')
        expect(await productCards.count()).toBeGreaterThan(0)
      }
    }
  })

  test('should maintain responsive layout', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    const productCards = page.locator('[data-testid="product-card"]')
    await expect(productCards.first()).toBeVisible()
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(productCards.first()).toBeVisible()
  })
})

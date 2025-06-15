import { test, expect } from '@playwright/test';

test.describe('BudouX Components E2E Tests', () => {
  test.describe('React', () => {
    test('should apply BudouX to Japanese text', async ({ page }) => {
      await page.goto('http://localhost:5173');
      
      // Wait for the component to load
      await page.waitForSelector('.container');
      
      // Check that BudouX spans are applied
      const spans = await page.locator('.large-text span.whitespace-nowrap').count();
      expect(spans).toBeGreaterThan(0);
      
      // Test segment visibility toggle
      await page.click('.toggle-segments');
      await expect(page.locator('.container')).toHaveClass(/show-segments/);
      
      // Verify text content is preserved
      const text = await page.locator('.demo-box.narrow .large-text').first().textContent();
      expect(text).toContain('今日は天気が良いので、公園に散歩に行きました。');
    });
  });

  test.describe('Vue', () => {
    test('should apply BudouX to Japanese text', async ({ page }) => {
      await page.goto('http://localhost:5174');
      
      // Wait for the component to load
      await page.waitForSelector('.container');
      
      // Check that BudouX spans are applied
      const spans = await page.locator('.large-text span.whitespace-nowrap').count();
      expect(spans).toBeGreaterThan(0);
      
      // Test segment visibility toggle
      await page.click('.toggle-segments');
      await expect(page.locator('.container')).toHaveClass(/show-segments/);
      
      // Verify text content is preserved
      const text = await page.locator('.demo-box.narrow .large-text').first().textContent();
      expect(text).toContain('今日は天気が良いので、公園に散歩に行きました。');
    });
  });

  test.describe('Astro', () => {
    test('should apply BudouX to Japanese text', async ({ page }) => {
      await page.goto('http://localhost:5175');
      
      // Wait for the component to load
      await page.waitForSelector('.container');
      
      // Check that BudouX spans are applied
      const spans = await page.locator('.large-text span.whitespace-nowrap').count();
      expect(spans).toBeGreaterThan(0);
      
      // Test segment visibility toggle
      await page.click('#toggle-btn');
      await expect(page.locator('.container')).toHaveClass(/show-segments/);
      
      // Verify text content is preserved
      const text = await page.locator('.demo-box.narrow .large-text').first().textContent();
      expect(text).toContain('今日は天気が良いので、公園に散歩に行きました。');
    });
  });
});
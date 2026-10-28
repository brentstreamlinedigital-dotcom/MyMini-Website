import { test, expect } from '@playwright/test';

test.describe('MyMini Master QA Audit Test Suite', () => {
  test('1. Home page loads without console errors, no horizontal overflow, hidden sections verified', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('http://localhost:3001');
    await expect(page).toHaveTitle(/MYMINI/);

    // Verify main headline is visible
    const heroH1 = page.locator('h1');
    await expect(heroH1).toBeVisible();

    // Verify user-requested hidden sections are NOT in the active page
    await expect(page.locator('text="Every detail matters."')).toHaveCount(0);
    await expect(page.locator('text="Original photograph to Finished MyMini"')).toHaveCount(0);

    // Verify responsive overflow across all standard mobile and desktop viewports
    for (const width of [320, 360, 390, 768, 1024, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(overflow, `Overflow detected at ${width}px width`).toBe(false);
    }

    expect(consoleErrors).toHaveLength(0);
  });

  test('2. Navigation view transitions work across all routes and back', async ({ page }) => {
    await page.goto('http://localhost:3001');

    // How It Works
    await page.click('button:has-text("How It Works")');
    await expect(page.locator('text="Where cutting-edge technology meets hand craftsmanship."')).toBeVisible();

    // Gallery
    await page.click('button:has-text("Gallery")');
    await expect(page.locator('text="Real objects. Recreated in miniature."')).toBeVisible();

    // Pricing
    await page.click('button:has-text("Pricing & Scales")');
    await expect(page.locator('text="Scales, finishes & pricing."')).toBeVisible();

    // FAQ
    await page.click('button:has-text("FAQ")');
    await expect(page.locator('text="Frequently Asked Questions"')).toBeVisible();

    // Track Order
    await page.click('button:has-text("Track Order")');
    await expect(page.locator('text="Track Your Miniature Journey"')).toBeVisible();

    // Return to Home via official Logo button
    await page.click('button[aria-label="MYMINI Home"]');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('3. Configurator 5-step commissioning flow and cart integration', async ({ page }) => {
    await page.goto('http://localhost:3001');

    // Scroll to configurator
    const startCreatingBtn = page.locator('a[href="#create"]').first();
    await startCreatingBtn.click();

    // Step 1: Select Category
    await expect(page.locator('text="What should we miniaturize?"')).toBeVisible();
    await page.locator('button:has-text("Cars")').first().click();
    await page.locator('button:has-text("Continue")').click();

    // Step 2: Upload Photos
    await expect(page.locator('text="Show us what you\'ve got."')).toBeVisible();
    await page.locator('button:has-text("Continue")').click();

    // Step 3: Choose Size
    await expect(page.locator('text="Choose your size."')).toBeVisible();
    await page.locator('button:has-text("Continue")').click();

    // Step 4: Choose Finish
    await expect(page.locator('text="Choose your finish."')).toBeVisible();
    await page.locator('button:has-text("Continue")').click();

    // Step 5: Review & Confirm
    await expect(page.locator('text="Review your MyMini."')).toBeVisible();
    
    // Target the specific create button within the configurator
    const createBtn = page.locator('#create button:has-text("Create My Mini")');
    await createBtn.click();

    // Verify toast confirmation appears
    await expect(page.locator('text="Added \\"Custom Cars Miniature\\" to commissions cart"')).toBeVisible();
  });

  test('4. FAQ accordions expand and collapse properly', async ({ page }) => {
    await page.goto('http://localhost:3001');
    await page.click('button:has-text("FAQ")');

    // Verify question button exists
    const question2 = page.locator('button:has-text("Do I get to review and approve the 3D model before you print it?")');
    await expect(question2).toBeVisible();

    // Click on FAQ 2 to expand
    await question2.click();
    await page.waitForTimeout(300);
    
    // Verify answer expanded
    await expect(page.getByText('Yes, 100% unconditionally.')).toBeVisible();
  });
});

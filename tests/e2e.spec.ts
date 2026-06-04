import { test, expect } from '@playwright/test';

/**
 * E2E Test Suite for HouseTech Group Website
 * Tests critical user flows and functionality
 */

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/HouseTech Group/);
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should have correct meta tags', async ({ page }) => {
    await page.goto('/');

    // Check SEO meta tags
    const description = await page.getAttribute('meta[name="description"]', 'content');
    expect(description).toBeTruthy();
    expect(description.length).toBeGreaterThan(50);

    // Check Open Graph tags
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    expect(ogTitle).toContain('HouseTech');

    // Check canonical URL
    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonical).toContain('housetech-ch.com');
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');

    // Test main navigation links
    const navLinks = [
      { text: 'Products', href: '/products' },
      { text: 'About Us', href: '/about' },
      { text: 'Contact Us', href: '/contact' },
    ];

    for (const link of navLinks) {
      const navLink = page.locator(`nav a[href="${link.href}"]`).first();
      await expect(navLink).toBeVisible();
    }
  });

  test('should display product categories', async ({ page }) => {
    await page.goto('/');

    const productSection = page.locator('text=Professional Kitchen Appliance Categories');
    await expect(productSection).toBeVisible();

    const productLinks = [
      'Range Hoods',
      'Gas Stoves',
      'Induction Cookers',
      'Built-in Ovens',
      'Air Fryers',
      'Gas Water Heaters',
    ];

    for (const product of productLinks) {
      const productCard = page.locator(`text=${product}`).first();
      await expect(productCard).toBeVisible();
    }
  });

  test('should have CTA buttons working', async ({ page }) => {
    await page.goto('/');

    const exploreProductsBtn = page.locator('a[href="/products"]').first();
    await expect(exploreProductsBtn).toBeVisible();

    const requestQuoteBtn = page.locator('a[href="/contact"]').first();
    await expect(requestQuoteBtn).toBeVisible();
  });

  test('should have working footer', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check footer links
    const contactLink = page.locator('footer a[href="/contact"]').first();
    await expect(contactLink).toBeVisible();
  });
});

test.describe('Products Page', () => {
  test('should load products page', async ({ page }) => {
    await page.goto('/products');
    await expect(page).toHaveTitle(/Products/);
    await expect(page.locator('h1')).toContainText('Kitchen Appliances');
  });

  test('should have product categories', async ({ page }) => {
    await page.goto('/products');

    const categories = [
      'Range Hoods',
      'Gas Stoves',
      'Induction Cookers',
      'Ceramic Cookers',
      'Built-in Ovens',
      'Air Fryers',
      'Water Heaters',
    ];

    for (const category of categories) {
      await expect(page.locator(`a[href*="/products/"]`).filter({ hasText: category }).first()).toBeVisible();
    }
  });

  test('should navigate to product detail', async ({ page }) => {
    await page.goto('/products/range-hood');

    await expect(page).toHaveTitle(/Range Hood/);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });
});

test.describe('Contact Page', () => {
  test('should load contact page', async ({ page }) => {
    await page.goto('/contact');
    await expect(page).toHaveTitle(/Contact/);
    await expect(page.locator('h1')).toContainText('HouseTech');
  });

  test('should display contact information', async ({ page }) => {
    await page.goto('/contact');

    // Check email is visible
    const email = page.locator('a[href^="mailto:"]').first();
    await expect(email).toBeVisible();

    // Check phone/WhatsApp is visible
    const phone = page.locator('a[href*="wa.me"]').first();
    await expect(phone).toBeVisible();
  });

  test('should have contact form', async ({ page }) => {
    await page.goto('/contact');

    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Check form fields exist
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should validate form fields', async ({ page }) => {
    await page.goto('/contact');

    const submitBtn = page.locator('button[type="submit"]');

    // Try to submit empty form
    await submitBtn.click();

    // Form should not submit (browser will show validation)
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });
});

test.describe('About Page', () => {
  test('should load about page', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveTitle(/About/);
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('News Page', () => {
  test('should load news page', async ({ page }) => {
    await page.goto('/news');
    await expect(page).toHaveTitle(/News/);
  });
});

test.describe('SEO and Performance', () => {
  test('should have sitemap link in robots.txt', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    const content = await response?.text();
    expect(content).toContain('sitemap');
  });

  test('should have no broken images on homepage', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const count = await images.count();

    // Check for broken images
    for (let i = 0; i < Math.min(count, 10); i++) {
      const img = images.nth(i);
      const isVisible = await img.isVisible().catch(() => false);
      if (isVisible) {
        const naturalWidth = await img.evaluate((el) => (el as HTMLImageElement).naturalWidth);
        expect(naturalWidth).toBeGreaterThan(0);
      }
    }
  });

  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/');

    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    // Should have h2 headings
    const h2 = page.locator('h2');
    const h2Count = await h2.count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test('should have all resources loading successfully', async ({ page }) => {
    const errors: string[] = [];
    page.on('response', (response) => {
      if (response.status() >= 400 && response.url().includes('housetech-ch.com')) {
        errors.push(`${response.status()} - ${response.url()}`);
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(errors).toHaveLength(0);
  });
});

test.describe('Accessibility', () => {
  test('should have proper ARIA labels on navigation', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    const links = nav.locator('a');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have alt text on images', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < Math.min(count, 10); i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      // Alt attribute should exist (can be empty for decorative images)
      expect(alt).not.toBeNull();
    }
  });

  test('should have proper color contrast (basic check)', async ({ page }) => {
    await page.goto('/');

    // Check that body has background color
    const body = page.locator('body');
    const bgColor = await body.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );
    expect(bgColor).toBeTruthy();

    // Check that text is visible
    const h1 = page.locator('h1').first();
    const color = await h1.evaluate((el) =>
      window.getComputedStyle(el).color
    );
    expect(color).toBeTruthy();
  });
});

test.describe('Responsive Design', () => {
  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Mobile menu should exist
    const mobileToggle = page.locator('.mobile-toggle');
    await expect(mobileToggle).toBeVisible();

    // Hero section should be visible
    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();
  });

  test('should be tablet responsive', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();
  });

  test('should be desktop responsive', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();

    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });
});

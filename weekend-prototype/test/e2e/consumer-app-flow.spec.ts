import { test, expect } from '@playwright/test';

test.describe('Consumer Learning App E2E Flow', () => {
  test('Happy Path: Sign in -> Add Children -> Scan -> Plan -> Quiz -> Insight', async ({ page }) => {
    // 1. Visit Login
    await page.goto('/login');
    await expect(page).toHaveTitle(/NetCyberAI/);

    // 2. Perform Quick Demo Sign-in
    const quickDemoBtn = page.getByRole('button', { name: /Quick Demo/i });
    if (await quickDemoBtn.isVisible()) {
      await quickDemoBtn.click();
    } else {
      await page.fill('input[type="tel"]', '919876543210');
      await page.click('button[type="submit"]');
      await page.waitForSelector('input[placeholder="123456"]');
      await page.fill('input[placeholder="123456"]', '123456');
      await page.click('button[type="submit"]');
    }

    // 3. Lands on Home Dashboard
    await page.waitForURL('**/');
    await expect(page.getByText(/Today's Learning Focus/i)).toBeVisible();

    // 4. Test Sibling Switcher
    const profileBtn = page.locator('header').getByRole('button').first();
    await profileBtn.click();
    await expect(page.getByText(/Switch Profile/i)).toBeVisible();

    // 5. Navigate to Syllabus Scan
    await page.goto('/scan');
    await expect(page.getByText(/Syllabus & Textbook Scanner/i)).toBeVisible();
    await page.getByRole('button', { name: /Scan Textbook Index/i }).click();
    await expect(page.getByText(/Extracted Syllabus Profile/i)).toBeVisible();

    // 6. Navigate to Day-wise Plan
    await page.goto('/plan');
    await expect(page.getByRole('heading', { name: /Study Plan/i })).toBeVisible();
    await expect(page.getByText(/No Shaming Backlog Wall/i)).toBeVisible();

    // 7. Take Daily Quiz
    await page.goto('/quiz');
    await expect(page.getByText(/Question 1 of/i)).toBeVisible();
    // Click option B
    const option = page.locator('button').filter({ hasText: 'm/s²' });
    await option.click();
    await expect(page.getByText(/Why this is correct:/i)).toBeVisible();

    // 8. View Weekly Parent Insight
    await page.goto('/insight');
    await expect(page.getByText(/Weekly Learning Summary/i)).toBeVisible();
    await expect(page.getByText(/What Was Studied This Week/i)).toBeVisible();
    await expect(page.getByText(/Where The Child Needed Guidance/i)).toBeVisible();
    await expect(page.getByText(/What Is Coming Up Next/i)).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = path.join(process.cwd(), 'docs', 'screenshots', 'mobile-v3');

test.describe('Mobile Verification v3 (390px Viewport)', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15',
  });

  test.beforeAll(() => {
    if (!fs.existsSync(SCREENSHOTS_DIR)) {
      fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
    }
  });

  test('Captures all 18 Mobile UI routes in EN and Hindi (Devanagari)', async ({ page, context }) => {
    // Block slow external font downloads
    await context.route('**/*fonts.googleapis.com/**', (route) => route.abort());
    await context.route('**/*fonts.gstatic.com/**', (route) => route.abort());

    async function snap(filename: string) {
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, filename),
        animations: 'disabled',
        timeout: 10000,
      });
      console.log(`Captured: ${filename}`);
    }

    async function navigateTo(targetUrl: string) {
      await page.goto(targetUrl, { waitUntil: 'commit', timeout: 20000 });
      await page.waitForTimeout(600);
    }

    async function switchToHindi() {
      const hiBtn = page.getByRole('button', { name: 'हिंदी' }).first();
      if (await hiBtn.isVisible()) {
        await hiBtn.click();
        await page.waitForTimeout(500);
      }
    }

    async function switchToEnglish() {
      const enBtn = page.getByRole('button', { name: 'EN' }).first();
      if (await enBtn.isVisible()) {
        await enBtn.click();
        await page.waitForTimeout(500);
      }
    }

    // 1. Header with Bell Icon & Live Unread Count Badge
    await navigateTo('/family');
    await snap('01-bell-badge-mobile-390px.png');

    // 2. Notification Center Drawer / Bottom Sheet
    const bellBtn = page.getByRole('button', { name: 'Notification Center' }).first();
    await expect(bellBtn).toBeVisible();
    await bellBtn.click();
    await page.waitForTimeout(700);
    await snap('02-notification-drawer-mobile-390px.png');

    // 3. Weekly Sunday WhatsApp Digest View
    const digestTab = page.getByRole('button', { name: /Digest|साप्ताहिक/i }).first();
    if (await digestTab.isVisible()) {
      await digestTab.click();
      await page.waitForTimeout(600);
      await snap('03-notification-digest-mobile-390px.png');
    }

    // Close drawer
    const closeBtn = page.getByRole('button', { name: /Close|बंद/i }).first();
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await page.waitForTimeout(500);
    }

    // 4. Family Home Dashboard (EN & HI)
    await navigateTo('/family');
    await snap('04-home-family-mobile-390px.png');

    await switchToHindi();
    await snap('04-home-family-hi-390px.png');
    await switchToEnglish();

    // 5. Syllabus Scanner (/scan)
    await navigateTo('/scan');
    await snap('05-scan-mobile-390px.png');

    await switchToHindi();
    await snap('05-scan-hi-390px.png');
    await switchToEnglish();

    // 6. Concept Breakdown (/explain)
    await navigateTo('/explain');
    await snap('06-explain-mobile-390px.png');

    await switchToHindi();
    await snap('06-explain-hi-390px.png');
    await switchToEnglish();

    // 7. Interactive Mind Map visualization
    await navigateTo('/explain');
    const mindMapTab = page.getByRole('button', { name: /Mind Map|माइंड मैप/i }).first();
    if (await mindMapTab.isVisible()) {
      await mindMapTab.click();
      await page.waitForTimeout(700);
    }
    await snap('07-mind-map-mobile-390px.png');

    // 8. Day-wise Study Plan (/plan)
    await navigateTo('/plan');
    await snap('08-plan-mobile-390px.png');

    await switchToHindi();
    await snap('08-plan-hi-390px.png');
    await switchToEnglish();

    // 9. Daily Quiz & Celebration Confetti (/quiz)
    await navigateTo('/quiz');
    await snap('09-quiz-celebration-mobile-390px.png');

    await switchToHindi();
    await snap('09-quiz-hi-390px.png');
    await switchToEnglish();

    // 10. Curated Video Library (/videos)
    await navigateTo('/videos');
    await snap('10-videos-mobile-390px.png');

    await switchToHindi();
    await snap('10-videos-hi-390px.png');
    await switchToEnglish();

    // 11. Doubt Saathi Socratic Tutor (/doubt-saathi)
    await navigateTo('/doubt-saathi');
    await snap('11-doubt-saathi-mobile-390px.png');

    await switchToHindi();
    await snap('11-doubt-saathi-hi-390px.png');
    await switchToEnglish();

    // 12. Exam-Day Toolkit (/toolkit)
    await navigateTo('/toolkit');
    await snap('12-toolkit-mobile-390px.png');

    await switchToHindi();
    await snap('12-toolkit-hi-390px.png');
    await switchToEnglish();

    // 13. Parent Insight Diagnostic (/insight)
    await navigateTo('/insight');
    await snap('13-insight-mobile-390px.png');

    await switchToHindi();
    await snap('13-insight-hi-390px.png');
    await switchToEnglish();

    // 14. Lifetime Learning Vault (/vault)
    await navigateTo('/vault');
    await snap('14-vault-mobile-390px.png');

    await switchToHindi();
    await snap('14-vault-hi-390px.png');
    await switchToEnglish();

    // 15. Opportunities Radar (/opportunities)
    await navigateTo('/opportunities');
    await snap('15-opportunities-mobile-390px.png');

    await switchToHindi();
    await snap('15-opportunities-hi-390px.png');
    await switchToEnglish();

    // 16. School Connect Attendance & Notices (/school-connect)
    await navigateTo('/school-connect');
    await snap('16-school-connect-attendance-mobile-390px.png');

    await switchToHindi();
    await snap('16-school-connect-hi-390px.png');
    await switchToEnglish();

    // 17. Homework Helper Method Guidance (/homework-helper)
    await navigateTo('/homework-helper');
    await snap('17-homework-helper-mobile-390px.png');

    await switchToHindi();
    await snap('17-homework-helper-hi-390px.png');
    await switchToEnglish();

    // 18. Sibling Switcher Sheet (Junior vs Senior Theme)
    await navigateTo('/family');
    const siblingBtn = page.getByRole('button', { name: /Diya|Aarav/i }).first();
    if (await siblingBtn.isVisible()) {
      await siblingBtn.click();
      await page.waitForTimeout(600);
    }
    await snap('18-sibling-switcher-mobile-390px.png');
  });
});

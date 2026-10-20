import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = path.join(process.cwd(), 'docs', 'screenshots', 'mobile-v3');

async function main() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15',
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  const baseUrl = 'http://127.0.0.1:3002';

  console.log('Capturing mobile v3 screenshots from:', baseUrl);

  async function snap(filename: string) {
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, filename),
    });
    console.log(`✓ ${filename}`);
  }

  async function navigateTo(url: string) {
    await page.goto(url);
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

  // 1. Bell icon & unread badge in header
  await navigateTo(`${baseUrl}/family`);
  await snap('01-bell-badge-mobile-390px.png');

  // 2. Notification Drawer / Bottom Sheet
  const bellBtn = page.getByRole('button', { name: 'Notification Center' }).first();
  if (await bellBtn.isVisible()) {
    await bellBtn.click();
    await page.waitForTimeout(600);
    await snap('02-notification-drawer-mobile-390px.png');

    // 3. Weekly Sunday WhatsApp Digest View
    const digestTab = page.getByRole('button', { name: /Digest|साप्ताहिक/i }).first();
    if (await digestTab.isVisible()) {
      await digestTab.click();
      await page.waitForTimeout(500);
      await snap('03-notification-digest-mobile-390px.png');
    }

    // Close drawer
    const closeBtn = page.getByRole('button', { name: /Close|बंद/i }).first();
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await page.waitForTimeout(400);
    }
  }

  // 4. Family Home (EN & HI)
  await navigateTo(`${baseUrl}/family`);
  await snap('04-home-family-mobile-390px.png');

  await switchToHindi();
  await snap('04-home-family-hi-390px.png');
  await switchToEnglish();

  // 5. Syllabus Scan (/scan)
  await navigateTo(`${baseUrl}/scan`);
  await snap('05-scan-mobile-390px.png');

  await switchToHindi();
  await snap('05-scan-hi-390px.png');
  await switchToEnglish();

  // 6. Explain (/explain)
  await navigateTo(`${baseUrl}/explain`);
  await snap('06-explain-mobile-390px.png');

  await switchToHindi();
  await snap('06-explain-hi-390px.png');
  await switchToEnglish();

  // 7. Mind Map visualization
  await navigateTo(`${baseUrl}/explain`);
  const mindMapTab = page.getByRole('button', { name: /Mind Map|माइंड मैप/i }).first();
  if (await mindMapTab.isVisible()) {
    await mindMapTab.click();
    await page.waitForTimeout(600);
  }
  await snap('07-mind-map-mobile-390px.png');

  // 8. Study Plan (/plan)
  await navigateTo(`${baseUrl}/plan`);
  await snap('08-plan-mobile-390px.png');

  await switchToHindi();
  await snap('08-plan-hi-390px.png');
  await switchToEnglish();

  // 9. Daily Quiz & Celebration (/quiz)
  await navigateTo(`${baseUrl}/quiz`);
  await snap('09-quiz-celebration-mobile-390px.png');

  await switchToHindi();
  await snap('09-quiz-hi-390px.png');
  await switchToEnglish();

  // 10. Videos (/videos)
  await navigateTo(`${baseUrl}/videos`);
  await snap('10-videos-mobile-390px.png');

  await switchToHindi();
  await snap('10-videos-hi-390px.png');
  await switchToEnglish();

  // 11. Doubt Saathi (/doubt-saathi)
  await navigateTo(`${baseUrl}/doubt-saathi`);
  await snap('11-doubt-saathi-mobile-390px.png');

  await switchToHindi();
  await snap('11-doubt-saathi-hi-390px.png');
  await switchToEnglish();

  // 12. Exam Toolkit (/toolkit)
  await navigateTo(`${baseUrl}/toolkit`);
  await snap('12-toolkit-mobile-390px.png');

  await switchToHindi();
  await snap('12-toolkit-hi-390px.png');
  await switchToEnglish();

  // 13. Parent Insight (/insight)
  await navigateTo(`${baseUrl}/insight`);
  await snap('13-insight-mobile-390px.png');

  await switchToHindi();
  await snap('13-insight-hi-390px.png');
  await switchToEnglish();

  // 14. Learning Vault (/vault)
  await navigateTo(`${baseUrl}/vault`);
  await snap('14-vault-mobile-390px.png');

  await switchToHindi();
  await snap('14-vault-hi-390px.png');
  await switchToEnglish();

  // 15. Opportunities (/opportunities)
  await navigateTo(`${baseUrl}/opportunities`);
  await snap('15-opportunities-mobile-390px.png');

  await switchToHindi();
  await snap('15-opportunities-hi-390px.png');
  await switchToEnglish();

  // 16. School Connect (/school-connect)
  await navigateTo(`${baseUrl}/school-connect`);
  await snap('16-school-connect-attendance-mobile-390px.png');

  await switchToHindi();
  await snap('16-school-connect-hi-390px.png');
  await switchToEnglish();

  // 17. Homework Helper (/homework-helper)
  await navigateTo(`${baseUrl}/homework-helper`);
  await snap('17-homework-helper-mobile-390px.png');

  await switchToHindi();
  await snap('17-homework-helper-hi-390px.png');
  await switchToEnglish();

  // 18. Sibling Switcher Sheet
  await navigateTo(`${baseUrl}/family`);
  const siblingBtn = page.getByRole('button', { name: /Diya|Aarav/i }).first();
  if (await siblingBtn.isVisible()) {
    await siblingBtn.click();
    await page.waitForTimeout(600);
  }
  await snap('18-sibling-switcher-mobile-390px.png');

  await browser.close();
  console.log('All mobile v3 screenshots captured successfully into:', SCREENSHOTS_DIR);
}

main().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = path.join(process.cwd(), 'docs', 'screenshots', '3d-design');

async function main() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });

  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15',
    deviceScaleFactor: 2,
  });

  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const mobilePage = await mobileContext.newPage();
  const desktopPage = await desktopContext.newPage();
  const baseUrl = 'http://127.0.0.1:3002';

  console.log('Capturing 3D Design screenshots from:', baseUrl);

  async function snapMobile(page: any, filename: string) {
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, filename) });
    console.log(`✓ [Mobile] ${filename}`);
  }

  async function snapDesktop(page: any, filename: string) {
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, filename) });
    console.log(`✓ [Desktop] ${filename}`);
  }

  // 1. Home Page with 3D Tokens, Gamified Path & Subject Portals (Mobile & Desktop)
  await mobilePage.goto(`${baseUrl}/`);
  await mobilePage.waitForTimeout(800);
  await snapMobile(mobilePage, '01-home-3d-gamified-mobile-390px.png');

  await desktopPage.goto(`${baseUrl}/`);
  await desktopPage.waitForTimeout(800);
  await snapDesktop(desktopPage, '01-home-3d-gamified-desktop-1440px.png');

  // Hindi Home
  const hiBtn = mobilePage.getByRole('button', { name: 'हिंदी' }).first();
  if (await hiBtn.isVisible()) {
    await hiBtn.click();
    await mobilePage.waitForTimeout(600);
    await snapMobile(mobilePage, '02-home-3d-hindi-mobile-390px.png');
    await mobilePage.getByRole('button', { name: 'EN' }).first().click();
    await mobilePage.waitForTimeout(400);
  }

  // 2. Interactive 3D Physics Simulation Lab (/explain)
  await mobilePage.goto(`${baseUrl}/explain`);
  await mobilePage.waitForTimeout(600);
  const simBtn = mobilePage.getByRole('button', { name: /3D Sim Lab|3D सिमुलेशन/i }).first();
  if (await simBtn.isVisible()) {
    await simBtn.click();
    await mobilePage.waitForTimeout(700);
  }
  await snapMobile(mobilePage, '03-interactive-3d-simulation-lab-mobile-390px.png');

  await desktopPage.goto(`${baseUrl}/explain`);
  await desktopPage.waitForTimeout(600);
  const deskSimBtn = desktopPage.getByRole('button', { name: /3D Sim Lab|3D सिमुलेशन/i }).first();
  if (await deskSimBtn.isVisible()) {
    await deskSimBtn.click();
    await desktopPage.waitForTimeout(700);
  }
  await snapDesktop(desktopPage, '03-interactive-3d-simulation-lab-desktop-1440px.png');

  // 3. 90-Day English Programme (/english)
  await mobilePage.goto(`${baseUrl}/english`);
  await mobilePage.waitForTimeout(800);
  await snapMobile(mobilePage, '04-english-90day-programme-mobile-390px.png');

  await desktopPage.goto(`${baseUrl}/english`);
  await desktopPage.waitForTimeout(800);
  await snapDesktop(desktopPage, '04-english-90day-programme-desktop-1440px.png');

  // 4. Career Pathway Explorer (/careers)
  await mobilePage.goto(`${baseUrl}/careers`);
  await mobilePage.waitForTimeout(800);
  await snapMobile(mobilePage, '05-career-pathways-mobile-390px.png');

  await desktopPage.goto(`${baseUrl}/careers`);
  await desktopPage.waitForTimeout(800);
  await snapDesktop(desktopPage, '05-career-pathways-desktop-1440px.png');

  // 5. Daily Quiz Celebration Moment (/quiz)
  await mobilePage.goto(`${baseUrl}/quiz`);
  await mobilePage.waitForTimeout(800);
  await snapMobile(mobilePage, '06-quiz-celebration-mobile-390px.png');

  await browser.close();
  console.log('All 3D Design screenshots captured into:', SCREENSHOTS_DIR);
}

main().catch((err) => {
  console.error('3D screenshot capture failed:', err);
  process.exit(1);
});

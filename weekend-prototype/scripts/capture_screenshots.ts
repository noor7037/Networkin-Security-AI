import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = path.join(process.cwd(), 'docs', 'screenshots');

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

  const baseUrl = 'http://localhost:3000';

  console.log('Capturing screenshots from:', baseUrl);

  // 1. Login (EN)
  await mobilePage.goto(`${baseUrl}/login`);
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '01-login-390px.png') });

  await desktopPage.goto(`${baseUrl}/login`);
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({ path: path.join(SCREENSHOTS_DIR, '01-login-1440px.png') });

  // 2. Login (Hindi Devanagari)
  const hiBtn = mobilePage.getByRole('button', { name: 'हिंदी' }).first();
  if (await hiBtn.isVisible()) {
    await hiBtn.click();
    await mobilePage.waitForTimeout(500);
    await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '02-login-hi-390px.png') });
  }

  // 3. Home Dashboard (EN & HI)
  await mobilePage.goto(baseUrl);
  await mobilePage.waitForTimeout(800);
  await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '03-home-dashboard-390px.png') });

  await desktopPage.goto(baseUrl);
  await desktopPage.waitForTimeout(800);
  await desktopPage.screenshot({ path: path.join(SCREENSHOTS_DIR, '03-home-dashboard-1440px.png') });

  // Switch to Hindi for mobile home
  const homeHiBtn = mobilePage.getByRole('button', { name: 'हिंदी' }).first();
  if (await homeHiBtn.isVisible()) {
    await homeHiBtn.click();
    await mobilePage.waitForTimeout(600);
    await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '04-home-hi-390px.png') });
    // Switch back to EN
    await mobilePage.getByRole('button', { name: 'EN' }).first().click();
  }

  // 4. Sibling Switcher Animation
  const switchTrigger = mobilePage.locator('header').getByRole('button').first();
  await switchTrigger.click();
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '05-profile-switcher-animation-390px.png') });

  // 5. Syllabus Scan Flow & Extracted Profile
  await mobilePage.goto(`${baseUrl}/scan`);
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '06-scan-flow-390px.png') });

  // Trigger scan on desktop
  await desktopPage.goto(`${baseUrl}/scan`);
  const scanBtn = desktopPage.getByRole('button', { name: /Scan Textbook Index/i }).first();
  if (await scanBtn.isVisible()) {
    await scanBtn.click();
    await desktopPage.waitForTimeout(1200);
  }
  await desktopPage.screenshot({ path: path.join(SCREENSHOTS_DIR, '07-syllabus-profile-extracted-1440px.png') });

  // 6. Explain Screen (Pedagogy Playbook)
  await mobilePage.goto(`${baseUrl}/explain`);
  await mobilePage.waitForTimeout(700);
  await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '08-explain-pedagogy-playbook-390px.png') });

  await desktopPage.goto(`${baseUrl}/explain`);
  await desktopPage.waitForTimeout(700);
  await desktopPage.screenshot({ path: path.join(SCREENSHOTS_DIR, '08-explain-pedagogy-playbook-1440px.png') });

  // 7. Animated Mind Map
  const mindMapTab = desktopPage.getByRole('button', { name: /Mind Map/i }).first();
  if (await mindMapTab.isVisible()) {
    await mindMapTab.click();
    await desktopPage.waitForTimeout(800);
  }
  await desktopPage.screenshot({ path: path.join(SCREENSHOTS_DIR, '09-explain-animated-mind-map-1440px.png') });

  // 8. Day-wise Study Plan
  await mobilePage.goto(`${baseUrl}/plan`);
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '10-day-plan-calendar-390px.png') });

  await desktopPage.goto(`${baseUrl}/plan`);
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({ path: path.join(SCREENSHOTS_DIR, '10-day-plan-calendar-1440px.png') });

  // 9. Daily Quiz in progress & celebration
  await mobilePage.goto(`${baseUrl}/quiz`);
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '11-quiz-in-progress-390px.png') });

  // Complete answers to trigger celebration modal
  for (let q = 0; q < 5; q++) {
    const opt = mobilePage.locator('button').filter({ hasText: /m\/s²|Constant|0 meters|ut \+ ½at²|Negative/i }).first();
    if (await opt.isVisible()) {
      await opt.click();
      await mobilePage.waitForTimeout(300);
      const nextBtn = mobilePage.getByRole('button', { name: /Next Question|See Results/i }).first();
      if (await nextBtn.isVisible()) {
        await nextBtn.click();
        await mobilePage.waitForTimeout(400);
      }
    }
  }
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '12-quiz-celebration-confetti-390px.png') });

  // 10. Curated Videos Grid & Embedded Player
  await desktopPage.goto(`${baseUrl}/videos`);
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({ path: path.join(SCREENSHOTS_DIR, '13-video-grid-player-1440px.png') });

  // 11. Learning Vault Lifetime Timeline
  await mobilePage.goto(`${baseUrl}/vault`);
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '14-vault-lifetime-timeline-390px.png') });

  await desktopPage.goto(`${baseUrl}/vault`);
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({ path: path.join(SCREENSHOTS_DIR, '14-vault-lifetime-timeline-1440px.png') });

  // 12. Exam-Day Toolkit
  await mobilePage.goto(`${baseUrl}/toolkit`);
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '15-exam-day-toolkit-390px.png') });

  await desktopPage.goto(`${baseUrl}/toolkit`);
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({ path: path.join(SCREENSHOTS_DIR, '15-exam-day-toolkit-1440px.png') });

  // 13. Weekly Parent Insight
  await mobilePage.goto(`${baseUrl}/insight`);
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '16-weekly-parent-insight-390px.png') });

  await desktopPage.goto(`${baseUrl}/insight`);
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({ path: path.join(SCREENSHOTS_DIR, '16-weekly-parent-insight-1440px.png') });

  // 14. Opportunities Radar & Founder Review Queue
  await mobilePage.goto(`${baseUrl}/opportunities`);
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '17-opportunities-radar-390px.png') });

  await desktopPage.goto(`${baseUrl}/opportunities`);
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({ path: path.join(SCREENSHOTS_DIR, '17-opportunities-radar-1440px.png') });

  const founderQueueBtn = desktopPage.getByRole('button', { name: /Founder Review Queue/i }).first();
  if (await founderQueueBtn.isVisible()) {
    await founderQueueBtn.click();
    await desktopPage.waitForTimeout(600);
    await desktopPage.screenshot({ path: path.join(SCREENSHOTS_DIR, '18-founder-review-queue-1440px.png') });
  }

  // 15. School Connect & Disconnect Retention Guarantee
  await mobilePage.goto(`${baseUrl}/school-connect`);
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '19-school-connect-mirrored-390px.png') });

  await desktopPage.goto(`${baseUrl}/school-connect`);
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({ path: path.join(SCREENSHOTS_DIR, '19-school-connect-mirrored-1440px.png') });

  const disconnectBtn = mobilePage.getByRole('button', { name: /Disconnect School/i }).first();
  if (await disconnectBtn.isVisible()) {
    await disconnectBtn.click();
    await mobilePage.waitForTimeout(600);
    await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '20-school-disconnect-retention-guarantee-390px.png') });
  }

  // 16. Homework Helper
  await mobilePage.goto(`${baseUrl}/homework-helper`);
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '21-homework-helper-390px.png') });

  // 17. Socratic Doubt Saathi Voice Mic
  await mobilePage.goto(`${baseUrl}/doubt-saathi`);
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '22-doubt-saathi-voice-390px.png') });

  await browser.close();
  console.log('ALL SCREENSHOTS CAPTURED SUCCESSFULLY!');
}

main().catch(console.error);

import { chromium } from 'playwright';
import path from 'path';

async function test() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  await context.route('**/*fonts.googleapis.com/**', (route) => route.abort());
  await context.route('**/*fonts.gstatic.com/**', (route) => route.abort());

  const page = await context.newPage();
  console.log('Navigating with commit...');
  await page.goto('http://127.0.0.1:3002/family', { waitUntil: 'commit', timeout: 15000 });
  await page.waitForSelector('header', { timeout: 10000 });
  await page.waitForTimeout(500);
  console.log('Taking screenshot...');
  const outPath = path.join(process.cwd(), 'docs', 'screenshots', 'mobile-v3', 'test-snap.png');
  await page.screenshot({ path: outPath, animations: 'disabled' });
  console.log('Screenshot success! Saved to:', outPath);
  await browser.close();
}

test().catch(console.error);

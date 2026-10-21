// Run against a fresh production server. See docs/LOCAL_RUNBOOK.md.
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE
  ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const baseURL = process.env.SERVICE_TEST_URL || 'http://127.0.0.1:3000';
const evidence = [];
await mkdir('qa-screenshots', { recursive: true });

async function checkPage(width, touch = false, reducedMotion = 'no-preference') {
  const context = await browser.newContext({
    viewport: { width, height: width < 768 ? 812 : 1024 }, hasTouch: touch, reducedMotion,
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {
    if (response.status() >= 400 && response.url().includes('/_next/static/')) {
      errors.push(`Static asset ${response.status()}: ${response.url()}`);
    }
  });
  await page.goto(`${baseURL}/servizi`);
  const stacked = width < 768 && reducedMotion !== 'reduce';
  const region = page.getByRole('region', {
    name: stacked ? 'Servizi Grossi Moto, carosello orizzontale infinito'
      : 'Servizi Grossi Moto da sfogliare', exact: true,
  });
  await region.scrollIntoViewIfNeeded();
  const result = { width, input: touch ? 'Chromium touch emulation' : 'Chromium mouse', reducedMotion, checks: [] };
  const pass = name => result.checks.push(name);
  const button = () => region.getByRole('button');
  const expanded = async value => assert.equal(await button().getAttribute('aria-expanded'), String(value));
  const activeIndex = () => region.locator('[data-service-stack-card]:not([inert])').getAttribute('data-service-virtual-index');
  async function point() {
    const box = await (stacked ? button() : region).boundingBox();
    assert.ok(box);
    return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  }
  async function mouseDrag(dx, dy = 0, back = false) {
    const p = await point();
    await page.mouse.move(p.x, p.y);
    await page.mouse.down();
    await page.mouse.move(p.x + dx, p.y + dy, { steps: 8 });
    if (back) await page.mouse.move(p.x, p.y, { steps: 8 });
    await page.mouse.up();
    await page.waitForTimeout(1050);
  }
  async function touchGesture(dx, dy, cancel = false) {
    const p = await point();
    const cdp = await context.newCDPSession(page);
    const send = (type, points) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: points });
    await send('touchStart', [{ ...p, id: 1 }]);
    for (let step = 1; step <= 12; step++) {
      await send('touchMove', [{ x: p.x + dx * step / 12, y: p.y + dy * step / 12, id: 1 }]);
      await page.waitForTimeout(16);
    }
    await send(cancel ? 'touchCancel' : 'touchEnd', []);
    await cdp.detach();
    await page.waitForTimeout(1100);
  }
  if (stacked) {
    await button().waitFor({ state: 'visible' });
    await page.waitForTimeout(300);
    const initial = await activeIndex();
    // This is the original failure: use real pointer events, not DOM .click().
    await button().click();
    await expanded(true);
    assert.ok(await button().evaluate(el => document.activeElement === el));
    pass('stationary mouse click opens and retains focus');
    if (!touch) {
      await page.waitForTimeout(350);
      await page.screenshot({ path: 'qa-screenshots/service-carousel-open-375.png' });
    }
    await button().click();
    await expanded(false);
    pass('mouse click closes');
    await mouseDrag(-6, 3);
    await expanded(true);
    pass('small pointer jitter remains a click');
    await button().press('Escape');
    await expanded(false);
    await mouseDrag(-20);
    await expanded(false);
    assert.equal(await activeIndex(), initial);
    pass('short drag neither toggles nor advances');
    await mouseDrag(-60, 0, true);
    await expanded(false);
    assert.equal(await activeIndex(), initial);
    pass('drag out and back never becomes a click');
    await button().click();
    await expanded(true);
    await mouseDrag(-110);
    assert.notEqual(await activeIndex(), initial);
    await expanded(false);
    assert.ok(await region.evaluate(el => document.activeElement === el));
    pass('long mouse drag advances, closes details and preserves usable focus');
    await button().click();
    await expanded(true);
    pass('next click after drag opens immediately');
    await button().press('Escape');
    await expanded(false);
    await button().press('Enter');
    await expanded(true);
    await button().press('Space');
    await expanded(false);
    pass('Escape / Enter / Space and disclosure focus');
    await button().press('Enter');
    await button().press('ArrowRight');
    await expanded(false);
    assert.ok(await region.evaluate(el => document.activeElement === el));
    await region.press('ArrowLeft');
    await region.press('Home');
    assert.equal(await activeIndex(), '6');
    await region.press('End');
    assert.equal(await activeIndex(), '11');
    await region.press('Home');
    pass('arrow keys / Home / End close details and retain carousel focus');
    const next = page.getByRole('button', { name: 'Servizio successivo', exact: true }).filter({ visible: true });
    const prev = page.getByRole('button', { name: 'Servizio precedente', exact: true }).filter({ visible: true });
    await next.click();
    await page.waitForTimeout(1050);
    assert.equal(await activeIndex(), '7');
    await prev.press('Enter');
    assert.equal(await activeIndex(), '6');
    await next.press('Space');
    assert.equal(await activeIndex(), '7');
    pass('arrow buttons via mouse / Enter / Space');
    await region.press('Home');
    assert.equal(await region.locator('[data-service-stack-card][inert]').count(), 17);
    assert.equal(await region.locator('[data-service-stack-card][inert] button').count(), 0);
    assert.equal(await region.locator('[data-service-stack-card][inert][aria-hidden="true"]').count(), 17);
    await region.press('Tab');
    assert.ok(await button().evaluate(el => document.activeElement === el));
    await button().press('Tab');
    assert.ok(await prev.evaluate(el => document.activeElement === el));
    pass('decorative copies inert / hidden / without controls; Tab order');
    if (touch) {
      const p = await point();
      await page.touchscreen.tap(p.x, p.y);
      await expanded(true);
      await page.touchscreen.tap(p.x, p.y);
      await expanded(false);
      pass('emulated touch tap opens and closes');
      await touchGesture(-20, 0);
      assert.equal(await activeIndex(), '6');
      await expanded(false);
      await touchGesture(-110, 0);
      assert.equal(await activeIndex(), '7');
      await expanded(false);
      pass('emulated short / long touch drag');
      await touchGesture(-20, 0, true);
      const again = await point();
      await page.touchscreen.tap(again.x, again.y);
      await expanded(true);
      await button().press('Escape');
      pass('touch cancellation does not poison the next tap');
    }
    await region.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `qa-screenshots/service-carousel-${width}-${touch ? 'touch' : 'mouse'}.png` });
  } else {
    const initial = await region.evaluate(el => el.scrollLeft);
    await mouseDrag(-300);
    assert.ok(await region.evaluate(el => el.scrollLeft) > initial);
    pass('native rail mouse drag');
    await region.press('Home');
    await region.press('ArrowRight');
    assert.ok(await region.evaluate(el => el.scrollLeft) > 10);
    await region.press('End');
    await region.press('Home');
    pass('native rail arrow keys / Home / End');
    for (const key of ['Enter', 'Space']) {
      const before = await region.evaluate(el => el.scrollLeft);
      await page.getByRole('button', { name: 'Servizio successivo', exact: true }).filter({ visible: true }).press(key);
      assert.ok(await region.evaluate(el => el.scrollLeft) > before);
    }
    pass('native rail arrow buttons via Enter / Space');
    if (touch) {
      await region.press('Home');
      await touchGesture(-220, 0);
      assert.ok(await region.evaluate(el => el.scrollLeft) > 10);
      pass('emulated native horizontal touch scroll');
    }
    await region.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `qa-screenshots/service-carousel-${width}-${reducedMotion}-${touch ? 'touch' : 'mouse'}.png` });
  }
  await region.scrollIntoViewIfNeeded();
  const beforeY = await page.evaluate(() => scrollY);
  if (touch) await touchGesture(2, -160);
  else {
    const p = await point();
    await page.mouse.move(p.x, p.y);
    await page.mouse.wheel(0, 180);
    await page.waitForTimeout(1000);
  }
  assert.ok(await page.evaluate(() => scrollY) > beforeY + 30);
  pass(touch ? 'emulated vertical touch scroll reaches page' : 'vertical mouse wheel reaches page');
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  assert.deepEqual(errors, []);
  pass('no global horizontal overflow or JavaScript errors');
  evidence.push(result);
  console.log(JSON.stringify(result));
  await context.close();
}

try {
  await checkPage(375);
  await checkPage(375, true);
  await checkPage(768);
  await checkPage(768, true);
  await checkPage(375, true, 'reduce');
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(`${baseURL}/servizi`);
  assert.equal(await page.locator('[data-service-stack-card]:visible').count(), 0);
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await page.screenshot({ path: 'qa-screenshots/service-carousel-1440.png' });
  evidence.push({ width: 1440, checks: ['desktop layout retained; compact carousel hidden; no horizontal overflow'] });
  await writeFile('qa-screenshots/service-carousel-results.json', JSON.stringify(evidence, null, 2));
} finally {
  await browser.close();
}

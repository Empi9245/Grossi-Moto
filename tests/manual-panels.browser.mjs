// Regression: a manual selection must remain readable after focus leaves and a tab returns.
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

export async function checkManualPanels(page, section, touch = false) {
  const tabs = section.getByRole('tab');
  const count = await tabs.count();
  assert.ok(count > 1);
  const initialHeight = (await section.boundingBox()).height;
  if (touch) await tabs.nth(2).tap();
  else await tabs.nth(2).click();
  const chosen = await tabs.nth(2).getAttribute('id');
  await page.evaluate(() => document.activeElement?.blur());
  await page.mouse.move(0, 0);
  // Real time: longer than both the old six-second cycle and the proposed nine-second cycle.
  await page.waitForTimeout(11000);
  assert.equal(await section.getByRole('tab', {selected:true}).getAttribute('id'), chosen);
  await section.getByRole('tab', {selected:true}).focus();
  await page.keyboard.press('End');
  assert.equal(await tabs.nth(count-1).getAttribute('aria-selected'), 'true');
  await page.keyboard.press('Home');
  await page.keyboard.press('ArrowRight');
  const active = tabs.nth(1);
  const panelId = await active.getAttribute('aria-controls');
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(()=>document.activeElement.id), panelId);
  assert.equal(await section.getByRole('tabpanel').count(), 1);
  assert.equal(await section.getByRole('tabpanel').getAttribute('aria-labelledby'), await active.getAttribute('id'));
  const otherPanels = section.locator('[role="tabpanel"][aria-hidden="true"]');
  assert.equal(await otherPanels.count(), count-1);
  for (const panel of await otherPanels.all()) assert.equal(await panel.getAttribute('inert'), '');
  assert.ok(Math.abs((await section.boundingBox()).height-initialHeight)<2, 'selection changes reading height');
  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', {configurable:true, get:()=> 'hidden'});
    document.dispatchEvent(new Event('visibilitychange'));
    document.activeElement?.blur();
  });
  await page.waitForTimeout(300);
  await page.evaluate(()=>{delete document.visibilityState; document.dispatchEvent(new Event('visibilitychange'));});
  assert.equal(await active.getAttribute('aria-selected'), 'true');
  await page.emulateMedia({reducedMotion:'reduce'});
  await tabs.nth(0).focus(); await page.keyboard.press('End');
  assert.equal(await tabs.nth(count-1).getAttribute('aria-selected'),'true');
  await page.emulateMedia({reducedMotion:'no-preference'});
  return {categories:count, realReadingMs:11000, activePanel:await tabs.nth(count-1).getAttribute('aria-controls')};
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const {chromium} = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
  const browser = await chromium.launch({channel:'chrome',headless:true});
  const base = process.env.READING_TEST_URL || 'http://127.0.0.1:3000';
  try {
    for (const width of [375,820,1440]) {
      const context = await browser.newContext({viewport:{width,height:width===375?812:1000},hasTouch:width<1024});
      const page = await context.newPage();
      for (const [path,selector] of [['/','section[aria-labelledby="accessories-heading"]'],['/servizi','section[aria-labelledby="service-process-heading"]']]) {
        await page.goto(base+path);
        const section = page.locator(selector);
        await section.scrollIntoViewIfNeeded();
        console.log(width,path,await checkManualPanels(page,section,width<1024));
      }
      await context.close();
    }
  } finally {await browser.close();}
}

import { test } from '@playwright/test';

// Discovery only. A 320 CSS-pixel viewport approximates the available width
// of a 1280 CSS-pixel viewport at 400% zoom, but is NOT a substitute for
// testing actual browser zoom, screen magnification or text-spacing overrides.
const routes = [
  '/',
  '/platform',
  '/solutions',
  '/pricing',
  '/tutorials',
  '/book-demo',
  '/contact',
  '/about',
  '/credentials',
  '/company-information',
  '/home-care-scheduling-software',
  '/emar-software',
  '/care-planning-software',
  '/birdie-alternative',
  '/signup',
  '/legal/index.html',
  '/legal/privacy.html',
];

for (const width of [320, 640]) {
  for (const route of routes) {
    test('reflow discovery ' + width + 'px ' + route, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const report = await page.evaluate(() => {
        const viewport = document.documentElement.clientWidth;
        const documentWidth = Math.max(
          document.documentElement.scrollWidth,
          document.body?.scrollWidth ?? 0,
        );
        const overflowPx = Math.max(0, documentWidth - viewport);
        const candidates = overflowPx > 1
          ? [...document.querySelectorAll<HTMLElement>('body *')]
              .filter((el) => {
                const rect = el.getBoundingClientRect();
                const style = getComputedStyle(el);
                return rect.width > 0 && rect.height > 0 &&
                  style.display !== 'none' && style.visibility !== 'hidden' &&
                  (rect.right > viewport + 2 || rect.left < -2);
              })
              .slice(0, 15)
              .map((el) => ({
                tag: el.tagName.toLowerCase(),
                id: el.id || undefined,
                className: typeof el.className === 'string' ? el.className.slice(0, 180) : undefined,
                text: (el.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 80),
                left: Math.round(el.getBoundingClientRect().left),
                right: Math.round(el.getBoundingClientRect().right),
              }))
          : [];
        const oversizedContainers = overflowPx > 1
          ? [...document.querySelectorAll<HTMLElement>('html, body, body *')]
              .filter((el) => el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 2)
              .map((el) => {
                const rect = el.getBoundingClientRect();
                const style = getComputedStyle(el);
                return {
                  tag: el.tagName.toLowerCase(),
                  id: el.id || undefined,
                  className: typeof el.className === 'string' ? el.className.slice(0, 140) : undefined,
                  clientWidth: el.clientWidth,
                  scrollWidth: el.scrollWidth,
                  overflowBy: el.scrollWidth - el.clientWidth,
                  overflowX: style.overflowX,
                  position: style.position,
                  whiteSpace: style.whiteSpace,
                  rectLeft: Math.round(rect.left),
                  rectRight: Math.round(rect.right),
                };
              })
              .sort((a, b) => b.overflowBy - a.overflowBy)
              .slice(0, 25)
          : [];
        return {
          viewport, documentWidth, overflowPx, candidates, oversizedContainers,
          bodyScrollWidth: document.body?.scrollWidth ?? null,
          rootScrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
        };
      });

      console.log(
        '[reflow discovery; NOT conformance] ' + route + ' @' +
        width + 'px: horizontal overflow ' + report.overflowPx + 'px',
      );
      await testInfo.attach('reflow-discovery.json', {
        body: JSON.stringify({ route, requestedWidth: width, ...report }, null, 2),
        contentType: 'application/json',
      });

      // Intentionally non-gating until actual overflow is reviewed. Allowable
      // exceptions include two-dimensional content; decorative offscreen
      // elements also require manual inspection before assigning an issue.
    });
  }
}

// Regression gate: the prior 48px Platform heading had a 316px scroll width
// inside a 288px content column and caused 12px of horizontal page scroll.
test('Platform hero heading reflows at 320 CSS px without horizontal page overflow', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/platform');
  const measurements = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    return {
      page: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heading: h1 ? h1.scrollWidth - h1.clientWidth : null,
    };
  });
  if (measurements.heading === null) throw new Error('Expected Platform page h1');
  if (measurements.heading > 1 || measurements.page > 1) {
    throw new Error('Platform heading/page horizontal overflow at 320px: ' + JSON.stringify(measurements));
  }
});

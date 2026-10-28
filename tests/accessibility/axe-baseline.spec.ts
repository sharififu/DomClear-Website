import AxeBuilder from '@axe-core/playwright';
import { test } from '@playwright/test';

// Discovery scan only. This intentionally does not assert zero violations:
// passing these tests is NOT a WCAG conformance result.
// Review results, remediate in batches, then add explicit, gating assertions.
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
  '/care-management-app',
  '/birdie-alternative',
  '/login',
  '/signup',
  '/legal',
  '/legal/privacy',
  '/legal/terms',
  '/legal/cookies',
  '/legal/acceptable-use',
  '/legal/service-level',
  '/legal/index.html',
  '/legal/privacy.html',
  '/legal/terms.html',
];

for (const route of routes) {
  test(`axe baseline ${route}`, async ({ page }, testInfo) => {
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    const summary = {
      route,
      runAt: new Date().toISOString(),
      rulesWithViolations: result.violations.length,
      nodesWithViolations: result.violations.reduce((sum, violation) => sum + violation.nodes.length, 0),
      violations: result.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        help: violation.help,
        helpUrl: violation.helpUrl,
        nodes: violation.nodes.map((node) => ({
          target: node.target,
          failureSummary: node.failureSummary,
        })),
      })),
      incomplete: result.incomplete.map((item) => ({ id: item.id, impact: item.impact })),
    };

    await testInfo.attach('axe-baseline.json', {
      body: Buffer.from(JSON.stringify(summary, null, 2)),
      contentType: 'application/json',
    });
    console.log(
      `[axe discovery; NOT conformance] ${route}: ${summary.rulesWithViolations} violated rules, ${summary.nodesWithViolations} affected nodes, ${summary.incomplete.length} incomplete checks`
    );
  });
}

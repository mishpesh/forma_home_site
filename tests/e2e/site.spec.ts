import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const paths = [
  '/',
  '/projects',
  '/services',
  '/about',
  '/contact',
  '/estimate',
  '/credits',
  '/projects/casa-calma',
  '/projects/the-mediterranean-house',
  '/projects/a-place-to-gather',
  '/projects/the-daily-retreat',
  '/projects/studio-north',
  '/projects/light-on-the-wall',
];
test('every public route loads without page errors or broken images', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator('main h1')).toBeVisible();
    await page.locator('img').evaluateAll((imgs) =>
      Promise.all(
        imgs.map((img) => {
          img.setAttribute('loading', 'eager');
          return (img as HTMLImageElement).decode();
        }),
      ),
    );
    expect(
      await page
        .locator('img')
        .evaluateAll((imgs) => imgs.every((img) => (img as HTMLImageElement).naturalWidth > 0)),
      path,
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});
test('portfolio filters all categories and opens project detail', async ({ page }) => {
  await page.goto('/projects');
  await expect(page.locator('.project-card')).toHaveCount(6);
  for (const [category, count] of [
    ['Apartments', 2],
    ['Houses', 1],
    ['Kitchens', 1],
    ['Bathrooms', 1],
    ['Commercial Spaces', 1],
  ] as const) {
    await page.getByRole('button', { name: category, exact: true }).click();
    await expect(page.locator('.project-card')).toHaveCount(count);
  }
  await page.getByRole('button', { name: 'All Projects' }).click();
  await expect(page.locator('.project-card')).toHaveCount(6);
  await page.getByRole('link', { name: /Casa Calma/ }).click();
  await expect(page).toHaveURL(/\/projects\/casa-calma/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Casa Calma');
});
test('before after supports keyboard and pointer input', async ({ page }) => {
  await page.goto('/');
  const slider = page.getByRole('slider', { name: 'Before and after comparison' });
  await slider.focus();
  await expect(slider).toHaveValue('50');
  await slider.press('ArrowRight');
  await expect(slider).toHaveValue('51');
  await slider.press('Home');
  await expect(slider).toHaveValue('0');
  await slider.press('End');
  await expect(slider).toHaveValue('100');
  const box = await slider.boundingBox();
  if (!box) throw Error('No slider');
  await page.mouse.click(box.x + box.width * 0.3, box.y + box.height / 2);
  expect(Number(await slider.inputValue())).toBeGreaterThan(20);
  expect(Number(await slider.inputValue())).toBeLessThan(40);
});
test('calculator validates area, retains data, downloads exact total and prefills consultation', async ({
  page,
}) => {
  await page.goto('/estimate');
  await page.getByRole('radio', { name: 'House', exact: true }).click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  const area = page.getByLabel('Property size', { exact: true });
  await area.fill('251');
  await expect(page.getByRole('button', { name: 'Next', exact: true })).toBeDisabled();
  await expect(area).toHaveAttribute('aria-invalid', 'true');
  await area.fill('75');
  await expect(page.getByRole('slider', { name: 'Property size in square metres' })).toHaveValue(
    '75',
  );
  await page.getByRole('slider', { name: 'Property size in square metres' }).fill('80');
  await expect(area).toHaveValue('80');
  await area.fill('75');
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await page.getByRole('radio', { name: /Standard/ }).click();
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await expect(area).toHaveValue('75');
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await page.getByRole('button', { name: /Interior Design/ }).click();
  await page.getByRole('button', { name: /Kitchen Remodeling/ }).click();
  await page.getByRole('button', { name: 'See My Estimate' }).click();
  await expect(page.locator('.result-amount')).toContainText('€55,875');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: /Download Estimate/ }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('FORMA-concept-estimate.txt');
  const stream = await download.createReadStream();
  let content = '';
  if (stream) for await (const chunk of stream) content += chunk.toString();
  expect(content).toContain('Estimated total: €55,875');
  expect(content).toContain('Property: House');
  await page.getByRole('link', { name: 'Request Consultation' }).click();
  await expect(page).toHaveURL(/property=House/);
  await page.getByRole('button', { name: 'Your Project', exact: true }).click();
  await expect(page.getByLabel('Full Name')).toBeVisible();
  await page.getByLabel('Full Name').fill('Alex Morgan');
  await page.getByLabel('Email', { exact: false }).fill('invalid');
  await page.getByRole('button', { name: 'Your Project', exact: true }).click();
  await expect(page.getByLabel('Email', { exact: false })).toBeVisible();
  await page.getByLabel('Email', { exact: false }).fill('alex@example.com');
  await page.getByRole('button', { name: 'Your Project', exact: true }).click();
  await expect(page.getByLabel('Project Type')).toHaveValue('House');
  await expect(page.getByLabel('Estimated Budget')).toHaveValue('55875');
  await expect(page.getByLabel('Project Description')).toContainText('75 m² house');
  await page.getByRole('button', { name: 'Review Preview' }).click();
  await expect(page.locator('.calculator-reference')).toContainText('€55,875');
  await page.getByRole('button', { name: 'Complete Demo' }).click();
  await expect(page.getByText('Demo completed — nothing was sent')).toBeVisible();
  await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.getByRole('button', { name: 'Copy Project Details' }).click();
  await expect(page.getByRole('button', { name: 'Copied to clipboard' })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('Alex Morgan');
});
test('mobile navigation opens, traps focus, closes on Escape and navigates', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Open menu' });
  await menu.click();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await expect(
    page
      .getByRole('navigation', { name: 'Mobile navigation' })
      .getByRole('link', { name: '01 Home' }),
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0);
  await menu.click();
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Projects' })
    .click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0);
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
});
test('responsive pages have no horizontal overflow at mobile, tablet and desktop widths', async ({
  page,
}) => {
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      '/',
      '/projects',
      '/services',
      '/about',
      '/contact',
      '/estimate',
      '/projects/casa-calma',
    ]) {
      await page.goto(path);
      await expect(page.locator('main h1')).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        `${path} at ${width}px`,
      ).toBe(true);
    }
  }
});
test('key pages meet automated WCAG checks', async ({ page }) => {
  for (const path of ['/', '/projects', '/estimate', '/contact']) {
    await page.goto(path);
    await expect(page.locator('main h1')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        description: v.description,
        nodes: v.nodes.map((n) => n.target),
      })),
      path,
    ).toEqual([]);
  }
});
test('captures desktop and mobile visual review', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main h1')).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await page.locator('img').evaluateAll((imgs) =>
    Promise.all(
      imgs.map((img) => {
        img.setAttribute('loading', 'eager');
        return (img as HTMLImageElement).decode();
      }),
    ),
  );
  await page.screenshot({ path: 'test-results/home-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('main h1')).toBeVisible();
  await page.locator('img').evaluateAll((imgs) =>
    Promise.all(
      imgs.map((img) => {
        img.setAttribute('loading', 'eager');
        return (img as HTMLImageElement).decode();
      }),
    ),
  );
  await page.screenshot({ path: 'test-results/home-mobile.png', fullPage: true });
  await page.goto('/estimate');
  await expect(page.locator('.wizard-content h2')).toBeVisible();
  await page.screenshot({ path: 'test-results/estimate-mobile.png', fullPage: true });
});
test('unknown routes show a useful 404 page', async ({ page }) => {
  const response = await page.goto('/projects/non-existent');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'Let’s find your space.' })).toBeVisible();
});

test('calculator works with keyboard choices and touch-sized mobile controls', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/estimate');
  const apartment = page.getByRole('radio', { name: 'Apartment', exact: true });
  await apartment.focus();
  await apartment.press('ArrowRight');
  await expect(page.getByRole('radio', { name: 'House', exact: true })).toHaveAttribute(
    'aria-checked',
    'true',
  );
  await page.keyboard.press('End');
  await expect(page.getByRole('radio', { name: 'Commercial Space', exact: true })).toHaveAttribute(
    'aria-checked',
    'true',
  );
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await page.getByLabel('Property size', { exact: true }).fill('25');
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await page.getByRole('radio', { name: /Standard/ }).focus();
  await page.keyboard.press('Home');
  await expect(page.getByRole('radio', { name: /Basic/ })).toHaveAttribute('aria-checked', 'true');
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  const kitchen = page.getByRole('button', { name: /Kitchen Remodeling/ });
  await kitchen.click();
  await expect(kitchen).toHaveAttribute('aria-pressed', 'true');
  await kitchen.click();
  await expect(kitchen).toHaveAttribute('aria-pressed', 'false');
  await page.getByRole('button', { name: 'See My Estimate' }).click();
  await expect(page.locator('.result-amount')).toContainText('€8,750');
  await expect(page.locator('.result-facts')).toContainText('Commercial Space');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('normal motion reveals content without hydration errors', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  await page.goto('/');
  await expect(page.locator('.hero-copy [data-reveal]')).toHaveCSS('opacity', '1');
  await page.locator('.transformation').scrollIntoViewIfNeeded();
  await expect(page.locator('.transformation [data-reveal]')).toHaveCSS('opacity', '1');
  expect(errors).toEqual([]);
});

test('editorial headings never display escaped newline characters', async ({ page }) => {
  for (const path of ['/', '/projects', '/services', '/about', '/estimate', '/contact']) {
    await page.goto(path);
    await expect(page.locator('main h1')).toBeVisible();
    for (const text of await page.locator('main h1, main h2, main h3').allTextContents()) {
      expect(text, path).not.toContain('\\n');
    }
    if (path === '/projects') {
      await expect(page.locator('.cta h2 br')).toHaveCount(1);
      await expect(page.locator('.cta h2')).toContainText('A space that feels');
      await expect(page.locator('.cta h2')).toContainText('like you.');
    }
  }
});

test('comparison moves smoothly to precise pointer positions and supports larger keyboard steps', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const slider = page.getByRole('slider', { name: 'Before and after comparison' });
  await slider.scrollIntoViewIfNeeded();
  await expect(page.locator('.transformation [data-reveal]')).toHaveCSS('opacity', '1');
  const box = await slider.boundingBox();
  if (!box) throw new Error('Comparison is missing');
  await page.mouse.click(box.x + box.width * 0.8, box.y + box.height / 2);
  await expect(slider).toHaveValue('80');
  const visualPosition = () =>
    page.locator('.comparison-divider').evaluate((el) => {
      const container = el.parentElement!.getBoundingClientRect();
      return ((el.getBoundingClientRect().left - container.left - 1) / (container.width - 2)) * 100;
    });
  expect(await visualPosition()).toBeLessThan(79.5);
  await expect.poll(visualPosition).toBeGreaterThan(79.5);
  await page.mouse.move(box.x + box.width * 0.8, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.253, box.y + box.height / 2, { steps: 20 });
  await page.mouse.up();
  expect(Number(await slider.inputValue())).toBeCloseTo(25.3, 0);
  await slider.press('Home');
  await slider.press('Shift+ArrowRight');
  await expect(slider).toHaveValue('10');
});

test('original visual identity is restored and photographic atmosphere respects reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(242, 237, 222)');
  await expect(page.locator('body')).toHaveCSS('color', 'rgb(0, 0, 0)');
  const size = await page
    .locator('main h1')
    .evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  expect(size).toBeGreaterThan(48);
  const band = page.getByRole('region', { name: 'Interior inspiration' });
  await band.scrollIntoViewIfNeeded();
  const images = band.getByRole('img');
  await expect(images).toHaveCount(2);
  for (const image of await images.all()) {
    await image.evaluate((el) => (el as HTMLImageElement).decode());
    expect(await image.evaluate((el) => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  const layer = band.locator('[data-atmosphere-image]');
  const initial = await layer.evaluate((el) => el.style.transform);
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'instant' }));
  await expect.poll(() => layer.evaluate((el) => el.style.transform)).not.toBe(initial);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(layer).toHaveCSS('transform', 'none');
  await expect(page.locator('.services-preview')).toHaveCSS(
    'background-color',
    'rgb(175, 100, 70)',
  );
});

test('comparison tracks a real touch drag on mobile', async ({ browser, baseURL }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: 'reduce',
  });
  try {
    const page = await context.newPage();
    await page.goto(`${baseURL}/`);
    const slider = page.getByRole('slider', { name: 'Before and after comparison' });
    await slider.scrollIntoViewIfNeeded();
    const box = await slider.boundingBox();
    if (!box) throw new Error('Comparison is missing');
    const cdp = await context.newCDPSession(page);
    const y = box.y + box.height / 2;
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x: box.x + box.width * 0.25, y, id: 1 }],
    });
    for (let i = 1; i <= 12; i++) {
      await cdp.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [{ x: box.x + box.width * (0.25 + (0.5 * i) / 12), y, id: 1 }],
      });
    }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    expect(Number(await slider.inputValue())).toBeGreaterThan(73);
    expect(Number(await slider.inputValue())).toBeLessThan(77);
    await expect(page.locator('.comparison')).not.toHaveClass(/is-dragging/);
  } finally {
    await context.close();
  }
});

test('service previews respond to pointer and keyboard focus on a flat terracotta surface', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const section = page.locator('.services-preview');
  await section.scrollIntoViewIfNeeded();
  const kitchen = section.getByRole('link', { name: /Kitchen & Bathroom Remodeling/ });
  await expect(kitchen.locator('..')).toHaveCSS('transform', 'none');
  await kitchen.hover();
  await expect(section.locator('.service-photo-caption')).toContainText('03 / 05');
  await expect(section.locator('.service-image-layer').nth(2)).toHaveCSS('opacity', '1');
  const planning = section.getByRole('link', { name: /Space Planning/ });
  await planning.focus();
  await expect(section.locator('.service-photo-caption')).toContainText('04 / 05');
  await expect(section.locator('.service-image-layer').nth(3)).toHaveCSS('opacity', '1');
  await expect(section).toHaveCSS('background-image', 'none');
  await expect(section.locator('.daylight')).toHaveCount(0);
  await planning.press('Enter');
  await expect(page).toHaveURL(/\/services#space-planning$/);
});

test('hero image and reading progress respond to scroll and respect reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('main h1')).toBeVisible();
  const layer = page.locator('.hero-parallax-layer');
  const initial = await layer.evaluate((el) => getComputedStyle(el).transform);
  await page.evaluate(() => window.scrollTo(0, 420));
  await expect.poll(() => layer.evaluate((el) => getComputedStyle(el).transform)).not.toBe(initial);
  await expect
    .poll(() => page.locator('.reading-progress').evaluate((el) => getComputedStyle(el).transform))
    .not.toBe('none');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(layer).toHaveCSS('transform', 'none');
});

test('new comparison uses the two native-size unretouched frames responsively', async ({
  page,
}) => {
  await page.goto('/');
  const comparison = page.locator('.comparison');
  await comparison.scrollIntoViewIfNeeded();
  for (const state of ['before', 'after']) {
    const naturalSize = await comparison
      .locator(`.comparison-image.${state}`)
      .evaluate(async (el) => {
        const url = getComputedStyle(el).backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1];
        const image = new Image();
        image.src = url || '';
        await image.decode();
        return [image.naturalWidth, image.naturalHeight];
      });
    expect(naturalSize).toEqual([1672, 941]);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page.locator('.comparison-wrap').scrollIntoViewIfNeeded();
  const bounds = await comparison.boundingBox();
  expect(bounds?.width).toBeLessThan(390);
  expect((bounds?.width || 0) / (bounds?.height || 1)).toBeCloseTo(1672 / 941, 1);
  await page
    .locator('.comparison-wrap')
    .screenshot({ path: 'test-results/preserved-comparison-mobile.png' });
});

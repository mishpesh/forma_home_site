import { existsSync } from 'node:fs';
import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    browserName: 'chromium',
    launchOptions: {
      executablePath:
        process.env.PLAYWRIGHT_CHROME_EXECUTABLE ||
        (existsSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
          ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
          : undefined),
    },
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
  },
  timeout: 45000,
});

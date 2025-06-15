import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // Run tests sequentially to avoid port conflicts
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Use single worker
  reporter: 'html',
  timeout: 60000, // 60 seconds timeout
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment to test with other browsers after running: npx playwright install
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  webServer: [
    {
      command: 'npm run dev:react',
      port: 5173,
      cwd: '../../example',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run dev:vue',
      port: 5174,
      cwd: '../../example',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run dev:astro',
      port: 5175,
      cwd: '../../example',
      reuseExistingServer: !process.env.CI,
    },
  ],
});
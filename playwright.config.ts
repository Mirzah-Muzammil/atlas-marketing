import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  outputDir: "/tmp/atlas-marketing-test-results",
  fullyParallel: true,
  workers: 2,
  retries: 0,
  reporter: [["line"]],
  use: {
    baseURL: "http://127.0.0.1:3210",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm start -- -p 3210",
    url: "http://127.0.0.1:3210",
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    {
      name: "desktop-edge",
      use: { browserName: "chromium", channel: "msedge", viewport: { width: 1440, height: 1000 } },
    },
    {
      name: "mobile-edge",
      use: {
        browserName: "chromium",
        channel: "msedge",
        hasTouch: true,
        isMobile: true,
        viewport: { width: 390, height: 844 },
      },
    },
  ],
});

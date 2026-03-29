import { test, expect } from "@playwright/test";

// These tests require a real authenticated session.
// Set TEST_USER_EMAIL and TEST_USER_PASSWORD env vars to run them.
const TEST_EMAIL = process.env.TEST_USER_EMAIL || "";
const TEST_PASSWORD = process.env.TEST_USER_PASSWORD || "";

test.describe("Onboarding wizard", () => {
  test.skip(!TEST_EMAIL, "Skipped: TEST_USER_EMAIL not set");

  test.beforeEach(async ({ page }) => {
    // Sign in first
    await page.goto("/login");
    await page.getByLabel(/email address/i).fill(TEST_EMAIL);
    await page.getByLabel(/password/i).fill(TEST_PASSWORD);
    await page.getByRole("button", { name: /sign in/i }).click();
    await page.waitForURL(/dashboard|onboarding/, { timeout: 10000 });
    await page.goto("/onboarding");
  });

  test("step 1 — validates name and grade are required", async ({ page }) => {
    await page.getByRole("button", { name: /next/i }).click();
    await expect(page.getByText(/please enter your name/i)).toBeVisible();
  });

  test("step 1 — advances with valid name and grade", async ({ page }) => {
    await page.getByPlaceholder(/e\.g\. Alex/i).fill("Test Student");
    await page.getByRole("combobox").selectOption("10");
    await page.getByRole("button", { name: /next/i }).click();
    // Should now be on step 2 (board selection)
    await expect(page.getByText(/which curriculum board/i)).toBeVisible();
  });

  test("step indicator shows correct step count", async ({ page }) => {
    // 5 steps total
    await expect(page.getByText("Your Info")).toBeVisible();
    await expect(page.getByText("Board")).toBeVisible();
    await expect(page.getByText("Subjects")).toBeVisible();
    await expect(page.getByText("Background")).toBeVisible();
    await expect(page.getByText("Marksheet")).toBeVisible();
  });
});

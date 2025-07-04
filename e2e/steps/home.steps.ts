import { createBdd } from "playwright-bdd";
import { expect, Page } from "@playwright/test";

const { When, Then } = createBdd<{ page: Page }>();

When('I go to {string} page', async ({ page }, pageName: string) => {
  if (pageName === "home") {
    await page.goto("/"); // Use baseURL from config
  } else {
    throw new Error("Unknown page: " + pageName);
  }
});

Then("I should see the home page displayed", async ({ page }) => {
  await expect(page.locator(".home-page")).toBeVisible();
});

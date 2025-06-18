import { createBdd } from "playwright-bdd";
import { Browser, BrowserContext, Page, chromium } from "playwright";
import { expect } from "@playwright/test";

let browser: Browser;
let context: BrowserContext;
let page: Page;

const { BeforeAll, Before, AfterAll, After, Given, When, Then } = createBdd();

// Launch browser once before all tests
BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});

// Close browser after all tests
AfterAll(async function () {
  await browser.close();
});

// Create new context and page for each scenario

Before(async function () {
  context = await browser.newContext();
  page = await context.newPage();
});

// Close context after each scenario
After(async function () {
  await context.close();
});

When('I go to {string} page', async function ({}, pageName: string) {
  if (pageName === "home") {
    await page.goto("https://owl-writey.hemit.fr/");
  } else {
    throw new Error("Unknown page: " + pageName);
  }
});

Then("I should see the home page displayed", async function () {
  await expect(page.locator(".home-page")).toBeVisible();
});

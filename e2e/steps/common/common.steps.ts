import { createBdd } from 'playwright-bdd';
import { expect, Page } from '@playwright/test';
import { LoginPo } from '../../tests/pages/login.po';
import { ExercicePo } from '../../tests/pages/exercice.po';

const { Given, When, Then } = createBdd<{ page: Page }>();

// Common verification steps
Then('I should see the heading {string}', async ({ page }, headingText: string) => {
  await expect(page.getByRole('heading', { level: 1, name: headingText })).toBeVisible();
});

Then('I should see the text {string}', async ({ page }, text: string) => {
  await expect(page.locator(`text=${text}`)).toBeVisible();
});

// Authentication steps
Given('I am logged in as {string}', async ({ page }, username: string) => {
  const loginPo = new LoginPo(page);
  await loginPo.goTo();
  await loginPo.logAsUser(username as 'pseudo' | 'bob');
});

When('I log in as {string}', async ({ page }, username: string) => {
  const loginPo = new LoginPo(page);
  await loginPo.goTo();
  await loginPo.logAsUser(username as 'pseudo' | 'bob');
});

When('I log out', async ({ page }) => {
  const exercicePo = new ExercicePo(page);
  await exercicePo.logout();
});

// Navigation steps
Given('I am on the dashboard', async ({ page }) => {
  const exercicePo = new ExercicePo(page);
  await exercicePo.goTo();
  await exercicePo.verifyDashboard();
});

When('I navigate to the dashboard', async ({ page }) => {
  await page.goto('/dashboard');
});

When('I reload the page', async ({ page }) => {
  await page.reload();
});

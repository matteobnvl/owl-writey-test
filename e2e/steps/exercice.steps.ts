import { createBdd } from 'playwright-bdd';
import { expect, Page } from '@playwright/test';
import { LoginPo } from '../tests/pages/login.po';
import { ExercicePo } from '../tests/pages/exercice.po';

const { Given, When, Then } = createBdd<{ page: Page }>();

let sharedLink: string;

// --- common steps ---

Given('I am logged in as {string}', async ({ page }, username: string) => {
  const loginPo = new LoginPo(page);
  await loginPo.goTo();
  await loginPo.logAsUser(username as 'pseudo' | 'bob');
});

Then('I should see the text {string}', async ({ page }, text: string) => {
  await expect(page.locator(`text=${text}`)).toBeVisible();
});


// --- create a new exercice ---

When('I create a new exercice', async ({ page }) => {
  const exercicePo = new ExercicePo(page);
  await page.locator('button[routerlink="/exercises/new"]').click();
  await expect(page.getByRole('heading', { level: 1, name: 'Nouvel exercice' })).toBeVisible();
  await exercicePo.createExercice();
});


// --- delete an existing exercice ---

When('I delete the exercice named {string}', async ({ page }, name: string) => {
  const exercicePo = new ExercicePo(page);
  await page.locator('button[routerlink="/exercises/new"]').click();
  await expect(page.getByRole('heading', { level: 1, name: 'Nouvel exercice' })).toBeVisible();
  await exercicePo.createExercice();
  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { level: 1, name: 'Mes Romans' })).toBeVisible();
  await exercicePo.handleDeleteButton(name);
});

Then('I should not see the exercice named {string}', async ({ page }, name: string) => {
  await expect(
    page.locator('owl-dashboard-exercise-card').filter({ hasText: name })
  ).toHaveCount(0);
});


// --- play an exercice ---

When('I play the exercice named {string} with content {string}', async ({ page }, name: string, content: string) => {
  const card = page.locator('owl-dashboard-exercise-card').filter({ hasText: name });
  await card.locator('a:has(mat-icon:text("play_arrow"))').click();
  await page.getByRole('button', { name: 'À mon tour !' }).click();
  await page.locator('.NgxEditor__Content').fill(content);
  await page.getByRole('button', { name: 'Soumettre' }).click();
});

Then('I should see the text {string} in the details', async ({ page }, content: string) => {
  await expect(page.locator('owl-exquisite-corpse-details').filter({ hasText: content })).toBeVisible();
});

// --- share an exercice ---

When('I share the exercice {string}', async ({ page }, name: string) => {
const card = page.locator('owl-dashboard-exercise-card').filter({ hasText: name });
  await card.locator('a:has(mat-icon:text("play_arrow"))').click();
  await page.locator('a:has(mat-icon:text("link"))').click();
});

Then('I should see a share link', async ({ page }) => {
  const input = page.locator('div.share-dialog__link--input input[type="text"]');
  sharedLink = await input.inputValue();
  expect(sharedLink).toMatch(/^https?:\/\//);
  console.log('Shared link:', sharedLink);
  await page.getByRole('button', { name: 'Fermer' }).click();
});

When('I log out', async ({ page }) => {
  await page.locator('.header__username').click();
  await page.getByRole('menuitem', { name: 'Déconnexion' }).click();
});

When('I log in as {string}', async ({ page }, username: string) => {
  const loginPo = new LoginPo(page);
  await loginPo.goTo();
  await loginPo.logAsUser(username as 'pseudo' | 'bob');
});

When('I open the shared link', async ({ page }) => {
  await page.goto(sharedLink);
});

// --- finish ---

When('I play the exercice named {string}', async ({ page }, name: string) => {
  const card = page.locator('owl-dashboard-exercise-card').filter({ hasText: name });
  await card.locator('a:has(mat-icon:text("play_arrow"))').click();
});

When('I click on finish game', async ({ page }) => {
  const exercicePo = new ExercicePo(page);
  await exercicePo.handleFinishButton();
});
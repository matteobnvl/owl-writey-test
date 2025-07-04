import { createBdd } from 'playwright-bdd';
import { expect, Page } from '@playwright/test';
import { ExercicePo } from '../tests/pages/exercice.po';

const { When, Then } = createBdd<{ page: Page }>();

let sharedLink: string;

// --- Exercise Creation ---

When('I create a new exercice', async ({ page }) => {
  const exercicePo = new ExercicePo(page);
  await exercicePo.createFullExerciceFlow();
});

When('I create a new exercice named {string}', async ({ page }, name: string) => {
  const exercicePo = new ExercicePo(page);
  await exercicePo.goToNewExercice();
  await expect(exercicePo.newExerciceHeading).toBeVisible();
  await exercicePo.createExercice(name);
});

Then('I should see the exercice titled {string}', async ({ page }, title: string) => {
  const exercicePo = new ExercicePo(page);
  await exercicePo.verifyExerciceTitle(title);
});

// --- Exercise Deletion ---

When('I delete the exercice named {string}', async ({ page }, name: string) => {
  const exercicePo = new ExercicePo(page);
  await exercicePo.createFullExerciceFlow(name);
  await exercicePo.goTo();
  await exercicePo.handleDeleteButton(name);
});

Then('I should not see the exercice named {string}', async ({ page }, name: string) => {
  const exercicePo = new ExercicePo(page);
  await exercicePo.verifyExerciceNotVisible(name);
});

// --- Exercise Participation ---

When('I play the exercice named {string}', async ({ page }, name: string) => {
  const exercicePo = new ExercicePo(page);
  await exercicePo.playExercice(name);
});

When('I play the exercice named {string} with content {string}', async ({ page }, name: string, content: string) => {
  const exercicePo = new ExercicePo(page);
  await exercicePo.participateInExercice(content);
});

Then('I should see the text {string} in the details', async ({ page }, content: string) => {
  const exercicePo = new ExercicePo(page);
  await exercicePo.verifyParticipationText(content);
});

// --- Exercise Sharing ---

When('I share the exercice {string}', async ({ page }) => {
  const exercicePo = new ExercicePo(page);
  sharedLink = await exercicePo.shareExercice();
});

Then('I should see a share link', async ({ page }) => {
  const exercicePo = new ExercicePo(page);
  await exercicePo.verifyShareLink(sharedLink);
  console.log('Shared link:', sharedLink);
  await exercicePo.closeButton.click({ trial: false });
});

When('I open the shared link', async ({ page }) => {
  await page.goto(sharedLink);
});

// --- Exercise Completion ---

When('I click on finish game', async ({ page }) => {
  const exercicePo = new ExercicePo(page);
  await exercicePo.handleFinishButton();
});

When('I finish the exercice named {string}', async ({ page }, name: string) => {
  const exercicePo = new ExercicePo(page);
  await exercicePo.playExercice(name);
  await exercicePo.handleFinishButton();
});

Then('the exercice named {string} should be finished', async ({ page }, name: string) => {
  const exercicePo = new ExercicePo(page);
  await exercicePo.verifyExerciceNotVisible(name);
});
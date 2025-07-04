import { createBdd } from 'playwright-bdd';
import { Page } from '@playwright/test';
import { LoginPo } from '../tests/pages/login.po';

const { Given, When } = createBdd<{ page: Page }>();

Given('I am on the login page', async ({ page }) => {
  await new LoginPo(page).goTo();
});

When('I log in with user {string}', async ({ page }, username: string) => {
  await new LoginPo(page).logAsUser(username as 'pseudo' | 'bob');
});

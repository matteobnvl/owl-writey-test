import { createBdd } from 'playwright-bdd';
import { expect, Page } from '@playwright/test';

const { Then } = createBdd<{ page: Page }>();

Then('I should see the heading {string}', async ({ page }, headingText: string) => {
  await expect(page.getByRole('heading', { level: 1, name: headingText })).toBeVisible();
});

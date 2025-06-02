import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1, name: 'L\'imaginaire à portée de Plume !' })).toBeVisible();
  await expect(page).toHaveTitle(/Owl Writey/)
});

test('get started link', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Connexion' }).click();
  await expect(page.getByRole('heading', { level: 2, name: 'Connexion' })).toBeVisible();
});

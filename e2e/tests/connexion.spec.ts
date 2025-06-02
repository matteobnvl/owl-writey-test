import { test, expect } from '@playwright/test';
import { login } from './helpers/login';

test('connexion with valid credentials', async ({ page }) => {
    await login(page);
    await expect(page.getByRole('heading', { level: 1, name: 'Mes Romans' })).toBeVisible();
});


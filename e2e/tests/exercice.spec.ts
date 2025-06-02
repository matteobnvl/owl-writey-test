import { test, expect } from '@playwright/test';
import { login } from './helpers/login';

test('create exercice', async ({ page }) => {
    await login(page);
    await page.getByTitle('Créer un exercice').click({ trial: false });
    await expect(page.getByRole('heading', { level: 1, name: 'Nouvel exercice' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Titre' }).fill('Test e2e');
    await page.getByRole('spinbutton', { name: 'Nombre de tours' }).fill('10');

    await page.getByRole('combobox', { name: "Durée d'un tour" }).click();
    await page.getByRole('option', { name: 'Infini' }).click();
    // await page.locator('mat-option').filter({ hasText: 'Infini' }).click();

    await page.getByRole('spinbutton', { name: 'Minimum de mots' }).fill('10');
    await page.getByRole('spinbutton', { name: 'Maximum de mots' }).fill('30');
    await page.getByRole('textbox', { name: 'Écrivez le début de votre histoire :' }).fill('Le mec parle trop fort là');
    await page.getByRole('button', { name: 'Valider'}).click({ trial: false });
    await expect(page.getByRole('heading', { level: 1, name: 'Test e2e' })).toBeVisible();
});

test('delete exercice', async ({ page }) => {
    await login(page);
    await expect(page.getByRole('heading', { level: 1, name: 'Mes Romans' })).toBeVisible();
    const element = page.locator('owl-dashboard-exercise-card').filter({ hasText: 'Test e2e' });
    await element.getByRole('link', { name: 'Jouer' }).click({ trial: false });
    await page.getByTitle('Supprimer').click({ trial: false });
    await page.getByRole('button').filter({ hasText: 'Oui' }).click({ trial: false });
    await expect(page.getByRole('heading', { level: 1, name: 'Mes Romans' })).toBeVisible();
    await expect(element).not.toBeVisible();
});


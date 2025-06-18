import { test, expect } from '@playwright/test';
import { LoginPo } from './pages/login.po';
import { ExercicePo } from './pages/exercice.po';

test.describe('Exercice Page', () => {
    let loginPo: LoginPo
    let exercicePo: ExercicePo

    test.beforeEach(async ({ page }) => {
        loginPo = new LoginPo(page);
        exercicePo = new ExercicePo(page);
        await loginPo.goTo();
        await loginPo.logAsUser('pseudo');
    })

    test('create exercice', async ({ page }) => {
        await page.getByTitle('Créer un exercice').click({ trial: false });
        await expect(page.getByRole('heading', { level: 1, name: 'Nouvel exercice' })).toBeVisible();
        await exercicePo.createExercice();
        await expect(page.getByRole('heading', { level: 1, name: 'Test e2e' })).toBeVisible();
    });

    test('play exercice', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1, name: 'Mes Romans' })).toBeVisible();
        const element = page.locator('owl-dashboard-exercise-card').filter({ hasText: 'Test e2e' });
        await element.getByRole('link', { name: 'Jouer' }).click({ trial: false });

        await page.getByRole('button', { name: ' À mon tour !' }).click({ trial: false });
        await page.locator('.NgxEditor__Content').fill('il a fini par mourir dans un grand éclat de rire');
        await page.getByRole('button', { name: 'Soumettre' }).click({ trial: false });

        await expect(page.locator('owl-exquisite-corpse-details').filter({ hasText: 'il a fini par mourir dans un grand éclat de rire' })).toBeVisible();

        await page.getByTitle('Partager').click({ trial: false });
        const shareLink = await page.getByRole('button', { name: 'Copier' }).getAttribute('href');
        console.log('Share Link:', shareLink);
    });

    test('delete exercice', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1, name: 'Mes Romans' })).toBeVisible();
        const element = await exercicePo.handleDeleteButton();
        await expect(page.getByRole('heading', { level: 1, name: 'Mes Romans' })).toBeVisible();
        await expect(element).not.toBeVisible();
    });
})


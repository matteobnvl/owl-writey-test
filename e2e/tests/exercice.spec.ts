import { test, expect } from '@playwright/test';
import { LoginPo } from './pages/login.po';
import { ExercicePo } from './pages/exercice.po';

test.describe('Exercice Page', () => {

    let loginPo: LoginPo
    let exercicePo: ExercicePo

    function waitFor(timeout: number) {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

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
        const input = page.locator('div.share-dialog__link--input input[type="text"]');
        const link = await input.inputValue();
        console.log('Shared link:', link);

        await page.getByRole('button', { name: 'Fermer' }).click({ trial: false });
        await page.locator('.header__username').click({ trial: false });
        await page.getByRole('menuitem', { name: 'Déconnexion' }).click({ trial: false });

        await page.reload();
        await loginPo.goTo();
        await loginPo.logAsUser('bob');
        
        // await page.goto(link);
        // const occurrences = await page.locator('body', { hasText: 'il a fini par mourir dans un grand éclat de rire' }).count();
        // expect(occurrences).toBeGreaterThan(0);




    });

    test('delete exercice', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1, name: 'Mes Romans' })).toBeVisible();
        const element = await exercicePo.handleDeleteButton();
        await expect(page.getByRole('heading', { level: 1, name: 'Mes Romans' })).toBeVisible();
        await expect(element).not.toBeVisible();
    });
})


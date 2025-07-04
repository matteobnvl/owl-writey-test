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
        await page.locator('button[routerlink="/exercises/new"]').click({ trial: false });
        await expect(page.getByRole('heading', { level: 1, name: 'Nouvel exercice' })).toBeVisible();
        await exercicePo.createExercice();
        await expect(page.getByRole('heading', { level: 1, name: 'Test e2e' })).toBeVisible();
    });

    test('play exercice', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1, name: 'Mes Romans' })).toBeVisible();
        const element = page.locator('owl-dashboard-exercise-card').filter({ hasText: 'Test e2e' });
        element.locator('a:has(mat-icon:text("play_arrow"))').click({ trial: false });
        
        await page.getByRole('button', { name: ' À mon tour !' }).click({ trial: false });
        await page.locator('.NgxEditor__Content').fill('il a fini par mourir dans un grand éclat de rire');
        await page.getByRole('button', { name: 'Soumettre' }).click({ trial: false });

        await expect(page.locator('owl-exquisite-corpse-details').filter({ hasText: 'il a fini par mourir dans un grand éclat de rire' })).toBeVisible();
    });

    test('share exercice', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1, name: 'Mes Romans' })).toBeVisible();
        const element = page.locator('owl-dashboard-exercise-card').filter({ hasText: 'Test e2e' });
        element.locator('a:has(mat-icon:text("play_arrow"))').click({ trial: false });
        
        await page.locator('a:has(mat-icon:text("link"))').click({ trial: false });
        const input = page.locator('div.share-dialog__link--input input[type="text"]');
        const link = await input.inputValue();
        expect(link).toContain('https://owl-writey.hemit.fr/exercises/');

        await page.getByRole('button', { name: 'Fermer' }).click({ trial: false });
        await page.locator('.header__username').click({ trial: false });
        await page.getByRole('menuitem', { name: 'Déconnexion' }).click({ trial: false });

        await page.reload();
        await loginPo.goTo();
        await loginPo.logAsUser('bob');
        await expect(page.getByRole('heading', { level: 1, name: 'Mes Romans' })).toBeVisible();
        page.goto(link);

        await expect(page.getByRole('heading', { level: 1, name: 'Test e2e' })).toBeVisible();
    });

    test('play exercice with participant', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1, name: 'Mes Romans' })).toBeVisible();
        await page.locator('.header__username').click({ trial: false });
        await page.getByRole('menuitem', { name: 'Déconnexion' }).click({ trial: false });

        await page.reload();
        await loginPo.goTo();
        await loginPo.logAsUser('bob');

        await expect(page.getByRole('heading', { level: 1, name: 'Mes Romans' })).toBeVisible();
        const element = page.locator('owl-dashboard-exercise-card').filter({ hasText: 'Test e2e' });
        element.locator('a:has(mat-icon:text("play_arrow"))').click({ trial: false });
        
        await page.getByRole('button', { name: ' À mon tour !' }).click({ trial: false });
        await page.locator('.NgxEditor__Content').fill('je suis bob et je joue avec le test e2e');
        await page.getByRole('button', { name: 'Soumettre' }).click({ trial: false });

        await expect(page.locator('owl-exquisite-corpse-details').filter({ hasText: 'je suis bob et je joue avec le test e2e' })).toBeVisible();
    });

    test('finish exercice', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1, name: 'Mes Romans' })).toBeVisible();
        let element = page.locator('owl-dashboard-exercise-card').filter({ hasText: 'Test e2e' });
        element.locator('a:has(mat-icon:text("play_arrow"))').click({ trial: false });
        await exercicePo.handleFinishButton();
        await expect(page.locator('owl-dashboard-exercise-card').filter({ hasText: 'Test e2e' })).not.toBeVisible();
    });

    test('delete exercice', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1, name: 'Mes Romans' })).toBeVisible();
        await page.locator('button[routerlink="/exercises/new"]').click({ trial: false });
        await expect(page.getByRole('heading', { level: 1, name: 'Nouvel exercice' })).toBeVisible();
        await exercicePo.createExercice();
        await page.goto('/dashboard');
        const element = await exercicePo.handleDeleteButton();
        await expect(page.getByRole('heading', { level: 1, name: 'Mes Romans' })).toBeVisible();
        await expect(element).not.toBeVisible();
    });
})


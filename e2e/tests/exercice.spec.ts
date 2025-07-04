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
        await exercicePo.verifyDashboard();
    })

    test('create exercice', async () => {
        await exercicePo.createFullExerciceFlow();
        await exercicePo.verifyExerciceTitle('Test e2e');
    });

    test('play exercice', async ({ page }) => {
        await exercicePo.createFullExerciceFlow('Play e2e');
        await exercicePo.verifyExerciceTitle('Play e2e');
        await page.goto('/dashboard');
        await exercicePo.playExercice('Play e2e');
        await exercicePo.participateInExercice('il a fini par mourir dans un grand éclat de rire');
        await exercicePo.verifyParticipationText('il a fini par mourir dans un grand éclat de rire');
    });

    test('share exercice and play', async ({ page }) => {
        await exercicePo.createFullExerciceFlow('Share e2e');
        await exercicePo.verifyExerciceTitle('Share e2e');
        const link = await exercicePo.shareExercice();
        await exercicePo.verifyShareLink(link);

        await exercicePo.closeButton.click({ trial: false });
        await exercicePo.logout();

        await page.reload();
        await loginPo.goTo();
        await loginPo.logAsUser('bob');
        await exercicePo.verifyDashboard();
        await page.goto(link);

        await exercicePo.verifyExerciceTitle('Share e2e');
        await exercicePo.participateInExercice('je suis bob et je joue avec le test e2e');
        await exercicePo.verifyParticipationText('je suis bob et je joue avec le test e2e');
    });

    test('finish exercice', async ({ page }) => {
        await exercicePo.createFullExerciceFlow('Finish e2e');
        await exercicePo.verifyExerciceTitle('Finish e2e');
        await page.goto('/dashboard');
        await exercicePo.verifyDashboard();
        await exercicePo.playExercice('Finish e2e');
        await exercicePo.handleFinishButton();
        await exercicePo.verifyExerciceNotVisible('Finish e2e');
    });

    test('delete exercice', async ({ page }) => {
        await exercicePo.createFullExerciceFlow('Delete e2e');
        await page.goto('/dashboard');
        const element = await exercicePo.handleDeleteButton('Delete e2e');
        await exercicePo.verifyDashboard();
        await expect(element).not.toBeVisible();
    });
})


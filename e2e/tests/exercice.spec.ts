import { test, expect } from '@playwright/test';
import { LoginPo } from './pages/login.po';
import { ExercicePo } from './pages/exercice.po';

test.describe('Exercice Page', () => {

    let loginPo: LoginPo
    let exercicePo: ExercicePo

    // function waitFor(timeout: number) {
    //     return new Promise(resolve => setTimeout(resolve, timeout));
    // }

    test.beforeEach(async ({ page }) => {
        loginPo = new LoginPo(page);
        exercicePo = new ExercicePo(page);
        await loginPo.goTo();
        await loginPo.logAsUser('pseudo');
    })

    test('create exercice', async ({ page }) => {
        await exercicePo.createFullExerciceFlow();
        await exercicePo.verifyExerciceTitle('Test e2e');
    });

    test('play exercice', async ({ page }) => {
        await exercicePo.verifyDashboard();
        await exercicePo.playExercice();
        await exercicePo.participateInExercice('il a fini par mourir dans un grand éclat de rire');
        await exercicePo.verifyParticipationText('il a fini par mourir dans un grand éclat de rire');
    });

    test('share exercice', async ({ page }) => {
        await exercicePo.verifyDashboard();
        const link = await exercicePo.shareExercice();
        await exercicePo.verifyShareLink(link);

        await exercicePo.closeButton.click({ trial: false });
        await exercicePo.logout();

        await page.reload();
        await loginPo.goTo();
        await loginPo.logAsUser('bob');
        await exercicePo.verifyDashboard();
        await page.goto(link);

        await exercicePo.verifyExerciceTitle('Test e2e');
    });

    test('play exercice with participant', async ({ page }) => {
        await exercicePo.verifyDashboard();
        await exercicePo.logout();

        await page.reload();
        await loginPo.goTo();
        await loginPo.logAsUser('bob');

        await exercicePo.verifyDashboard();
        await exercicePo.playExercice();
        await exercicePo.participateInExercice('je suis bob et je joue avec le test e2e');
        await exercicePo.verifyParticipationText('je suis bob et je joue avec le test e2e');
    });

    test('finish exercice', async ({ page }) => {
        await exercicePo.verifyDashboard();
        await exercicePo.playExercice();
        await exercicePo.handleFinishButton();
        await exercicePo.verifyExerciceNotVisible('Test e2e');
    });

    test('delete exercice', async ({ page }) => {
        await exercicePo.verifyDashboard();
        await exercicePo.createFullExerciceFlow();
        await page.goto('/dashboard');
        const element = await exercicePo.handleDeleteButton();
        await exercicePo.verifyDashboard();
        await expect(element).not.toBeVisible();
    });
})


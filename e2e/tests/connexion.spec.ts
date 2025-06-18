import { test, expect } from '@playwright/test';
import { LoginPo } from './pages/login.po';

test.describe('Login page', () => {
    let loginPo: LoginPo;

    test.beforeEach(async ({ page }) => {
        loginPo = new LoginPo(page);
        await loginPo.goTo();
    })

    test('connexion with valid credentials', async ({ page }) => {
        await loginPo.logAsUser('pseudo');
        await expect(page.getByRole('heading', { level: 1, name: 'Mes Romans' })).toBeVisible();
    });
})


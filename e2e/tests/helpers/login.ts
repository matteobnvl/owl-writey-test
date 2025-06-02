// tests/helpers/login.ts
import { Page } from '@playwright/test';


export async function login(page: Page) {
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('pseudo@gmail.com');
    await page.getByRole('textbox', { name: 'Mot de passe' }).fill('Test1234@');
    await page.getByRole('button', { name: 'Connexion' }).nth(1).click({ trial: false });
}

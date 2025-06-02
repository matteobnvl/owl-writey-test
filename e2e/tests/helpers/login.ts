// tests/helpers/login.ts
import { Page } from '@playwright/test';


export async function login(page: Page, email: string = 'pseudo@gmail.com', password: string = 'Test1234@'): Promise<void> {
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Mot de passe' }).fill(password);
    await page.getByRole('button', { name: 'Connexion' }).nth(1).click({ trial: false });
}

import { expect, Locator, Page } from '@playwright/test';

import { Auth } from '../tools/auth';
import { BasePo } from './base.po';

export class LoginPo extends BasePo {
  private auth = new Auth();
  get pageLocator(): Locator {
    return this.page.locator('.login-page');
  }
  get loginInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Email' });
  }
  get passwordInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Mot de passe' });
  }
  get submitButton(): Locator {
    return this.pageLocator.getByRole('button', {name: 'Connexion'});
  }

  constructor(page: Page) {
    super(page);
  }

  async goTo(): Promise<void> {
    await this.page.goto('/login');
  }

  async shouldBeDisplayed(): Promise<void> {
    await expect(this.pageLocator).toBeVisible();
  }

  async logAs(login: string, password: string): Promise<void> {
    await this.loginInput.fill(login);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async logAsUser(userName: 'pseudo' | 'bob'): Promise<void> {
    const user = this.auth.getUser(userName);
    await this.logAs(user.login, user.password);
  }
}
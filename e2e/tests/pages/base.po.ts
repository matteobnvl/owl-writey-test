import { Page } from '@playwright/test';

export abstract class BasePo {
  protected readonly page: Page;

  protected constructor(page: Page) {
    this.page = page;
  }
}
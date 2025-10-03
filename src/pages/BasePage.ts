import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { HeaderComponent } from './components/HeaderComponent.js';

export class BasePage {
  readonly header: HeaderComponent;

  constructor(protected readonly page: Page) {
    this.header = new HeaderComponent(page);
  }

  async goto(path: string) {
    await this.page.goto(path);
  }

  async expectUrlContains(part: string) {
    await expect(this.page).toHaveURL(new RegExp(part));
  }
}

import type { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto('/');
  }
}

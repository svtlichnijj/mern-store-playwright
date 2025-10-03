import { expect, type Locator, type Page } from '@playwright/test';
import { DashboardBasePage } from './DashboardBasePage.js';

export class DashboardPage extends DashboardBasePage {
  readonly detailsBlock: Locator;
  readonly accountDescBlock: Locator;
  readonly accountEmailBlock: Locator;
  readonly accountTypeBlock: Locator;
  readonly detailsForm: Locator;

  constructor(page: Page) {
    super(page);
    this.detailsBlock = page.locator('.account-details');
    this.accountDescBlock = this.detailsBlock.locator('.info .desc');
    this.accountEmailBlock = this.accountDescBlock.locator('p');
    this.accountTypeBlock = this.accountDescBlock.locator('span');
    this.detailsForm = this.detailsBlock.getByRole('form');
  }

  async open() {
    await this.goto('/dashboard');
    await this.expectLoggedInUserDashboard();
  }

  async expectUserEmail(email: string) {
    await expect(this.accountEmailBlock).toHaveText(email);
  }

  async isUserMember() {
    await expect(this.accountTypeBlock).toHaveText('Member');
  }
}

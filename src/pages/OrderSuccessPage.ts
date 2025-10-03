import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class OrderSuccessPage extends BasePage {
  readonly successBlock: Locator;
  readonly thankYouOrderHeader: Locator;
  readonly actionBlock: Locator;
  readonly toMyOrdersButton: Locator;
  readonly toShopButton: Locator;

  constructor(page: Page) {
    super(page);
    this.successBlock = page.locator('.order-success');
    this.thankYouOrderHeader = this.successBlock.locator('.order-message > h2');
    this.actionBlock = this.successBlock.locator('.order-success-actions');
    this.toMyOrdersButton = this.actionBlock
      .getByRole('link')
      .filter({ has: this.page.locator('[href*="dashboard/orders"]') });
    this.toShopButton = this.actionBlock
      .getByRole('link')
      .filter({ has: this.page.locator('[href*="shop"]') });
  }

  async isOpened() {
    await this.expectUrlContains('/order/success');
  }

  async goToMyOrders() {
    await this.toMyOrdersButton.click();
  }
}

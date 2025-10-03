import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class CheckoutPage extends BasePage {
  readonly placeOrderBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.placeOrderBtn = page.locator("[data-test='place-order']");
  }

  async placeOrder() {
    await this.placeOrderBtn.click();
  }
}

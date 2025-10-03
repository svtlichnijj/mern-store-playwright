import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class ProductPage extends BasePage {
  readonly title: Locator;
  readonly addToBagBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('h1.item-name');
    this.addToBagBtn = page.locator('button:has(span:text("Add To Bag"))');
  }

  async addToCart() {
    await this.addToBagBtn.click();
  }

  async expectTitleVisible() {
    await expect(this.title).toBeVisible();
  }
}

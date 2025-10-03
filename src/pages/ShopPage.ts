import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class ShopPage extends BasePage {
  readonly productListBlock: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.productListBlock = page.locator('.product-list');
    this.productCards = this.productListBlock.locator('.item-box');
  }

  async isOpened() {
    await this.expectUrlContains('/shop');
  }

  protected async getProductName(productCart: Locator): Promise<string> {
    const productName = await productCart.locator('h1.item-name').textContent();
    return productName || '';
  }

  protected async getProductPrice(productCart: Locator): Promise<number> {
    let productPriceText = await productCart.locator('.price').textContent();
    productPriceText = productPriceText || '0';
    return parseFloat(productPriceText.replace(/[^0-9.]/g, ''));
  }

  protected async getProductSlug(productCart: Locator): Promise<string> {
    const productLinkAttr = await productCart
      .locator('.item-link > a')
      .getAttribute('href');
    const productLink = productLinkAttr || '';
    const matches = productLink.match(/([^/]+$)/);
    return matches ? matches[0] : '';
  }

  async openFirstProduct(): Promise<{
    name: string;
    price: number;
    slug: string;
  }> {
    const productCard = this.productCards.first();
    const productName = await this.getProductName(productCard);
    const productPrice = await this.getProductPrice(productCard);
    const productSlug = await this.getProductSlug(productCard);
    await productCard.click();
    return { name: productName, price: productPrice, slug: productSlug };
  }
}

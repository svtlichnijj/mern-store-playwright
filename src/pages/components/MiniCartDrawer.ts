import { type Page, type Locator, expect } from '@playwright/test';

export class MiniCartDrawer {
  readonly drawer: Locator;
  readonly closeButton: Locator;
  readonly itemsBlock: Locator;
  readonly itemBlocks: Locator;
  readonly checkoutBlock: Locator;
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    this.drawer = page.locator('.mini-cart');
    this.closeButton = this.drawer.getByRole('button', {
      name: 'close the cart',
    });
    this.itemsBlock = this.drawer.locator('.cart-list');
    this.itemBlocks = this.itemsBlock.locator('.item-details');
    this.checkoutBlock = this.drawer.locator('.cart-checkout');
    this.checkoutBtn = this.checkoutBlock.locator('button', {
      hasText: 'Proceed To Checkout',
    });
  }

  async isVisible() {
    await expect(this.drawer).toBeVisible();
  }

  async isHidden() {
    await expect(this.drawer).not.toBeVisible();
  }

  async close() {
    await this.closeButton.click();
    await this.isHidden();
  }

  async expectHasItems(expectedCount: number = 1) {
    await expect(this.itemBlocks).toBeVisible();
    expect(await this.itemBlocks.count()).toBeGreaterThanOrEqual(expectedCount);
  }

  async checkProductInCart(productName: string) {
    const itemBlock = this.itemBlocks.filter({ hasText: productName });
    await expect(itemBlock).toBeVisible();
  }

  async getProductDetailsInCart(
    index: number = 0
  ): Promise<{ name: string; price: number; quantity: number }> {
    const item = this.itemBlocks.nth(index);
    const nameText = (await item.locator('h2.item-name').textContent()) || '';
    const priceText = (await item.locator('.price').textContent()) || '';
    const quantityText = (await item.locator('.quantity').innerText()) || '1';

    const name = nameText.trim();
    const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
    const quantity = parseInt(quantityText, 10) || 1;

    return { name, price, quantity };
  }

  async expectProductInCartDetails(
    expectedProduct: { name: string; price: number; quantity?: number },
    index: number = 0
  ) {
    const actualProduct = await this.getProductDetailsInCart(index);
    expect(actualProduct.name).toEqual(expectedProduct.name);
    expect(actualProduct.price).toEqual(expectedProduct.price);

    if (expectedProduct.quantity !== undefined) {
      expect(actualProduct.quantity).toEqual(expectedProduct.quantity);
    }
  }

  async proceedToCheckout() {
    await this.checkoutBtn.click();
    await this.isHidden();
  }
}

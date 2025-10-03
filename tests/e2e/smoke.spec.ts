import { test } from '../../src/fixtures/test-fixtures.js';

test.describe('Smoke', () => {
  test('Add first product to cart from Home -> Shop -> Product -> Shop -> Cart', async ({
    home,
    shop,
    product,
    cart,
  }) => {
    let selectedProduct: { name: string; price: number; slug: string };

    await test.step('Open Home', async () => {
      await home.open();
      await home.header.openShop();
    });

    await test.step('Shop is opened', async () => {
      await shop.isOpened();
    });

    await test.step('Open first product', async () => {
      selectedProduct = await shop.openFirstProduct();
      await product.expectTitleVisible();
    });

    await test.step('Add to cart and go to Cart', async () => {
      await product.addToCart();
      await cart.isVisible();
      await cart.expectHasItems(1);
      await cart.checkProductInCart(selectedProduct.name);
      await cart.expectProductInCartDetails(
        {
          name: selectedProduct.name,
          price: selectedProduct.price,
          quantity: 1,
        },
        0
      );
    });
  });
});

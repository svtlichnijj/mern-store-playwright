import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { ShopPage } from '../pages/ShopPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { MiniCartDrawer } from '../pages/components/MiniCartDrawer.js';
import { OrderSuccessPage } from '../pages/OrderSuccessPage.js';
import { ApiClient } from '../api/ApiClient.js';
import { AuthService } from '../api/AuthServiceClient.js';
import { ProductService } from '../api/ProductServiceClient.js';
import { OrderService } from '../api/OrderService.js';
import { CartService } from '../api/CartServise.js';

interface ApiServices {
  main: ApiClient;
  auth: AuthService;
  product: ProductService;
  order: OrderService;
  cart: CartService;
}

type MyFixtures = {
  api: ApiServices;
  home: HomePage;
  shop: ShopPage;
  product: ProductPage;
  cart: MiniCartDrawer;
  orderSuccess: OrderSuccessPage;
};

export const test = base.extend<MyFixtures>({
  api: async ({ request }, use) => {
    const client = new ApiClient(request);
    const services: ApiServices = {
      main: client,
      auth: new AuthService(client),
      product: new ProductService(client),
      order: new OrderService(client),
      cart: new CartService(client),
    };
    await use(services);
  },
  home: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  shop: async ({ page }, use) => {
    await use(new ShopPage(page));
  },
  product: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cart: async ({ page }, use) => {
    await use(new MiniCartDrawer(page));
  },
  orderSuccess: async ({ page }, use) => {
    await use(new OrderSuccessPage(page));
  },
});

export const expect = test.expect;

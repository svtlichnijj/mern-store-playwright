import type { Locator, Page } from '@playwright/test';

export class HeaderComponent {
  readonly header: Locator;
  readonly navBlock: Locator;
  readonly cartButton: Locator;
  readonly navbar: Locator;
  readonly brandsDropdown: Locator;
  readonly shopButton: Locator;
  readonly userDropdown: Locator;
  readonly loginButton: Locator;
  readonly signUpButton: Locator;
  readonly dashboardButton: Locator;
  readonly signOutButton: Locator;

  constructor(protected readonly page: Page) {
    this.header = page.locator('header');
    this.navBlock = this.header.locator('nav');
    this.cartButton = this.navBlock.locator("button[aria-label^='your cart']");
    this.navbar = this.navBlock.locator('ul.navbar-nav');
    this.brandsDropdown = this.navbar.locator('.dropdown.nav-item', {
      hasText: 'Brands',
    });
    this.shopButton = this.navbar.locator('a.nav-link[href="/shop"]');
    this.userDropdown = this.navbar.locator('.dropdown.nav-item').last();
    this.loginButton = this.userDropdown.locator('button', {
      hasText: 'Login',
    });
    this.signUpButton = this.userDropdown.locator('button', {
      hasText: 'Sign Up',
    });
    this.dashboardButton = this.userDropdown.getByRole('menuitem', {
      name: 'Dashboard',
    });
    this.signOutButton = this.userDropdown.getByRole('menuitem', {
      name: 'Sign Out',
    });
  }

  async openCart() {
    await this.cartButton.click();
  }

  async navigateToBrand(brandName: string) {
    await this.brandsDropdown.click();
    await this.page.locator(`a.dropdown-item:has-text("${brandName}")`).click();
  }

  async openShop() {
    await this.shopButton.click();
  }

  async isLogin(): Promise<boolean> {
    return await this.signUpButton.isVisible();
  }

  async getCurrentUserName(): Promise<string> {
    return await this.userDropdown.locator('a.nav-link').innerText();
  }
}

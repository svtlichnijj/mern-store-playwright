import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export type DashboardSection =
  | 'Details'
  | 'Security'
  | 'Address'
  | 'Orders'
  | 'Wishlist';

export class DashboardSidebar {
  readonly sidebar: Locator;
  readonly subpageHeader: Locator;
  readonly detailsLink: Locator;
  readonly securityLink: Locator;
  readonly addressLink: Locator;
  readonly ordersLink: Locator;
  readonly wishlistLink: Locator;

  readonly sidebarLocators: Record<
    DashboardSection,
    { headerText: string; urlPath: string }
  >;

  constructor(protected readonly page: Page) {
    this.sidebar = page.locator('.panel-sidebar');
    this.subpageHeader = page.locator('h3.md-0');

    this.sidebarLocators = {
      Details: { headerText: 'Profile', urlPath: '/dashboard' },
      Security: { headerText: 'Security', urlPath: '/dashboard/security' },
      Address: { headerText: 'Addresses', urlPath: '/dashboard/address' },
      Orders: { headerText: 'Orders', urlPath: '/dashboard/orders' },
      Wishlist: { headerText: 'Wishlist', urlPath: '/dashboard/wishlist' },
    };

    this.detailsLink = this.sidebar.getByRole('link', {
      name: 'Account Details',
    });
    this.securityLink = this.sidebar.getByRole('link', {
      name: 'Account Security',
    });
    this.addressLink = this.sidebar.getByRole('link', { name: 'Address' });
    this.ordersLink = this.sidebar.getByRole('link', { name: 'Orders' });
    this.wishlistLink = this.sidebar.getByRole('link', { name: 'Wishlist' });
  }

  async expectSidebarVisible() {
    await expect(this.sidebar).toBeVisible();
  }

  async navigateToSection(section: DashboardSection) {
    const sectionInfo = this.sidebarLocators[section];
    if (!sectionInfo) {
      throw new Error(
        `Section "${section}" is not found in DashboardSidebar configuration.`
      );
    }

    const link = this.sidebar.getByRole('link', {
      name: sectionInfo.headerText,
    });
    await link.click();
    await expect(this.page).toHaveURL(new RegExp(sectionInfo.urlPath));
    await expect(this.subpageHeader).toHaveText(sectionInfo.headerText);
  }

  async goToDetails() {
    await this.navigateToSection('Details');
  }
  async goToSecurity() {
    await this.navigateToSection('Security');
  }
  async goToOrders() {
    await this.navigateToSection('Orders');
  }
  async goToAddress() {
    await this.navigateToSection('Address');
  }
  async goToWishlist() {
    await this.navigateToSection('Wishlist');
  }
}

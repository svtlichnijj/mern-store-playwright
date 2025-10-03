import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from '../BasePage.js';
import {
  type DashboardSection,
  DashboardSidebar,
} from './components/DashboardSidebar.js';

export class DashboardBasePage extends BasePage {
  readonly sidebar: DashboardSidebar;

  constructor(page: Page) {
    super(page);
    this.sidebar = new DashboardSidebar(page);
  }

  async expectLoggedInUserDashboard() {
    await expect(this.page).toHaveURL(/dashboard/);
    await this.sidebar.expectSidebarVisible();
  }

  async navigateToDashboardSection(section: DashboardSection) {
    await this.sidebar.navigateToSection(section);
  }
}

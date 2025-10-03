# MERN Store Playwright E2E Tests

This repository contains E2E tests for the MERN demo store ([https://shopdemo-alex-hot.koyeb.app](https://shopdemo-alex-hot.koyeb.app)), developed using <u>Playwright</u> and <ins>TypeScript</ins>. The project adheres to the principles of the Page Object Model, SOLID, and generally accepted best practices in test automation.

[![CI Status](https://github.com/svtlichnijj/mern-store-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/svtlichnijj/mern-store-playwright/actions/workflows/playwright.yml)

## Quick start

To run tests locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/svtlichnijj/mern-store-playwright.git
cd mern-store-playwright
```

### 2. Setup environments

```shell 
npm install
npx playwright install --with-deps chromium
```
### 3. Set up environment variables
Create a file in the root of your project by copying `.env.example`: `.env`

```shell
cp .env.example .env
```

Open and fill in the required data. At a minimum, you will need `BASE_URL`. If you plan to use the API for authorization, you may need `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` (which are not required for `faker`).

```dotenv
BASE_URL=https://shopdemo-alex-hot.koyeb.app
# TEST_USER_EMAIL=your_test_email@example.com
# TEST_USER_PASSWORD=your_test_password
```

### 4. Run tests

```shell
npx playwright test
```

This will run all E2E and API tests defined in the project.

## Project structure

```
mern-store-playwright/
├── .github/                # GitHub Actions CI/CD Configurations
│ └── workflows/
│ └── playwright.yml
├── src/
│ ├── api/                  # API Client and Services (Auth, Product, Order, Cart)
│ ├── fixtures/             # Custom Playwright Fixtures
│ ├── pages/                # Page Object Model for UI Pages
│ │ ├── components/         # Reusable UI Components (Header, MiniCartDrawer)
│ │ └── dashboard/          # Page Objects for the "Dashboard" section
│ │   ├── components/       # Reusable Dashboard Components (DashboardSidebar)
│ └── types/                # TypeScript Interfaces for API Responses
├── tests/
│ ├── api/                  # API Tests
│ ├── e2e/                  # E2E UI Tests
│ └── setup/                # Global Settings (e.g. Authorization)
├── playwright-report/      # Playwright HTML Reports
├── test-results/           # JUnit XML Reports and other test artifacts
├── .env.example            # Example environment variable file
├── playwright.config.ts    # Playwright configuration
├── package.json            # Project dependencies and scripts
└── README.md               # This file
```

## CI/CD
The project is configured to use GitHub Actions to automatically run tests on `push` and `pull_request` to the `main` and `master` branches. Workflow: `playwright_ci_configuration.yml`.

## Reports
After running the tests, the following reports will be generated:
- **HTML Report:** Open in your browser after running locally, or download the artifact from GitHub Actions. `playwright-report/index.html``playwright-report`
- **JUnit XML Report:** File for integration with CI systems. `test-results/results.xml`

## Technologies
- **Language:** TypeScript
- **Test Framework:** Playwright Test
- **Package Manager:** npm
- **Lint/Formatting:** ESLint + Prettier
- **Data Generation:** @faker-js/faker

import { expect, request, type FullConfig, chromium } from '@playwright/test';
import { ApiClient } from '../../src/api/ApiClient.js';
import { faker } from '@faker-js/faker';
import { fileURLToPath } from 'url';
import path from 'path';
import { AuthService } from '../../src/api/AuthServiceClient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authFile = path.resolve(__dirname, '../../playwright/.auth/user.json');

export default async function globalSetup(config: FullConfig) {
  const project = config.projects[0];

  if (!project) {
    throw new Error(
      'Playwright configuration must have at least one Project defined.'
    );
  }

  const baseURL = project.use.baseURL;

  if (typeof baseURL !== 'string' || baseURL.trim() === '') {
    throw new Error(
      'Playwright Project configuration must define a "baseURL".'
    );
  }

  const apiRequestContext = await request.newContext({
    baseURL: baseURL,
  });

  const apiClient = new ApiClient(apiRequestContext);
  const apiAuth = new AuthService(apiClient);

  const email = faker.internet.email();
  const password = faker.internet.password();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  console.log({
    isSubscribed: false,
    email,
    firstName,
    lastName,
    password,
  });

  console.log(`Attempting to register/login user: "${email}"`);

  let token: string;
  try {
    const registerResponse = await apiAuth.registerUser({
      isSubscribed: false,
      email,
      firstName,
      lastName,
      password,
    });

    token = registerResponse.token;
    console.info(`Registered new user: '${email}' with token: '${token}'`);

    expect(registerResponse.success).toBe(true);
    expect(registerResponse.token).toBeDefined();
  } catch (error) {
    console.warn(
      `Registration failed for ${email}. Trying to use existing credentials if available.`
    );
    const existingEmail = process.env.TEST_USER_EMAIL;
    const existingPassword = process.env.TEST_USER_PASSWORD;

    if (existingEmail && existingPassword) {
      const loginResponse = await apiAuth.loginUser({
        email: existingEmail,
        password: existingPassword,
      });
      token = loginResponse.token;
      console.info(
        `Logged in as existing user: ${existingEmail} with token: ${token}`
      );
    } else {
      throw new Error(
        `Failed to register or login: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  if (!token) {
    throw new Error('No token obtained after registration or login.');
  }

  apiClient.setAuthToken(token);

  // OR _______
  const userInfo = await apiAuth.getUserInfo();
  expect(userInfo.user.email).toEqual(email);
  expect(userInfo.user.firstName).toEqual(firstName);

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(baseURL);

  await page.evaluate((authToken) => {
    localStorage.setItem('token', authToken);
  }, token);

  const storedToken = await page.evaluate(() => localStorage.getItem('token'));
  expect(storedToken).toEqual(token);

  await context.storageState({ path: authFile });
  console.log(`Authentication state saved to: '${authFile}'`);

  await browser.close();
  await apiRequestContext.dispose();

  // OR -------

  // const storageState = {
  //   origins: [
  //     {
  //       origin: config.projects[0].use.baseURL!,
  //       localStorage: [{ name: 'token', value: token }],
  //     },
  //   ],
  // };
  //
  // await apiRequestContext.storageState({
  //   path: authFile,
  //   origins: storageState.origins,
  // });
  // console.log(`Authentication state saved to: '${authFile}'`);
  //
  // await apiRequestContext.dispose();
  // OR ^^^^^^^^
}

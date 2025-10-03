import { test, expect } from '../../src/fixtures/test-fixtures.js';
import { faker } from '@faker-js/faker';

test.describe('Auth API', () => {
  test('Should register a new user', async ({ api }) => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const userData = {
      isSubscribed: false,
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    };

    const response = await api.auth.registerUser(userData);

    expect(response.success).toBe(true);
    expect(response.token).toBeDefined();
    expect(response.user).not.toBeNull();

    expect(response.user.email).toEqual(email);
    expect(api.main.getAuthToken()).toEqual(response.token);
  });

  test('Should login an existing user', async ({ api }) => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    await api.auth.registerUser({
      isSubscribed: false,
      email,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      password,
    });

    const loginResponse = await api.auth.loginUser({ email, password });

    expect(loginResponse.token).toBeDefined();
    expect(loginResponse.user.email).toEqual(email);
    expect(api.main.getAuthToken()).toEqual(loginResponse.token);
  });

  test('Should get user info after login', async ({ api }) => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    await api.auth.registerUser({
      isSubscribed: false,
      email,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      password,
    });

    const userInfo = await api.auth.getUserInfo();
    expect(userInfo.user.email).toEqual(email);
    expect(userInfo.user.firstName).toBeDefined();
  });
});

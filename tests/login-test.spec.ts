/// <reference types="node" />
import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login Test', () => {
    let loginPage : LoginPage;

    const email = process.env.ORG_ADMIN_EMAIL;
    const password = process.env.ORG_ADMIN_PASSWORD;
    const url = process.env.BASE_URL || process.env.BASEURL;

    if (!email) {
      throw new Error('ORG_ADMIN_EMAIL is not set. Add it to your .env file.');
    }
    if (!password) {
      throw new Error('ORG_ADMIN_PASSWORD is not set. Add it to your .env file.');
    }
    if (!url) {
      throw new Error('BASE_URL is not set. Add it to your .env file.');
    }

    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      throw new Error('BASE_URL must start with http:// or https://.');
    }

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      await loginPage.goto(url);
    });

    test('Login to Chairlyo with valid credentials', async ({ page }) => {
      await loginPage.login(email, password);
      await loginPage.verifySuccessfulLogin(url, email);
    });
});
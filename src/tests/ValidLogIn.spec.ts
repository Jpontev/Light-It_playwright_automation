import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ENV } from '../config/environment';
import { logStep } from '../utils/common';

test.describe.configure({ mode: 'parallel' });

test.describe('Log In with valid credentials', () => {

  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    logStep('Setting up test environment');
    homePage = new HomePage(page);
    await page.setViewportSize({
      width: ENV.viewport.width,
      height: ENV.viewport.height
    });
    await homePage.goToHomePage();
  });

  test('Valid LogIn Path', async () => {
    await homePage.clickLogInButton();
    await homePage.fillLoginUsername(ENV.testData.validUser.username);
    await homePage.fillLoginPassword(ENV.testData.validUser.password);
    await homePage.submitLoginModal();
    await homePage.validateLogIn(ENV.testData.validUser.username);
  });
});

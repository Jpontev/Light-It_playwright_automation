import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { ENV } from '@/config/environment';
import { validLogin } from '@/utils/common';

test.describe.configure({ mode: 'parallel' });

test.describe('Completing a Valid payment Order of 1 product', () => {
  
  let homePage: HomePage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  const data = {
    name: 'Test User',
    country: 'Argentina',
    city: 'Buenos Aires',
    card: '1234 5678 9012 3456',
    month: '12',
    year: '2025'
  }

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    await page.setViewportSize({
      width: ENV.viewport.width,
      height: ENV.viewport.height
    });
    await homePage.goToHomePage();
    await validLogin(page);
    const selectedProduct = await homePage.selectRandomProduct();
    await productPage.addProductToCart();
    await productPage.acceptConfirmationMessage();
    await homePage.clickCartButton();
    //await cartPage.validateProductOnCart(selectedProduct);
  });

  
  test('Complete placement order', async () => {
    await cartPage.clickplaceOrderButton();
    await cartPage.completePlacementForm();
    await cartPage.clickPurchaseButton();
    await cartPage.validatePurchaseConfirmationModal();
  });
});

import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { ENV } from '@/config/environment';
import { validLogin } from '@/utils/common';

test.describe.configure({ mode: 'parallel' });

test.describe('Adding a random product to the cart', () => {

  let homePage: HomePage;
  let productPage: ProductPage;
  let cartPage: CartPage;

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
  });

  test('Add Product to Cart', async () => {

    const selectedProduct = await homePage.selectRandomProduct();
    await productPage.addProductToCart();
    await productPage.acceptConfirmationMessage();
    await homePage.clickCartButton();
    await cartPage.validateProductOnCart(selectedProduct);
  });
});

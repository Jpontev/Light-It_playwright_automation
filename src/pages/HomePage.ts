import { expect, Page } from '@playwright/test';
import { BasePage } from '../utils/common';
import { logStep } from '../utils/common';
import { ENV } from '@/config/environment';
import { CartPage } from './CartPage';
import { ProductPage } from './ProductPage';

export class HomePage extends BasePage {
  private readonly locators = {
    // Header elements
    button_SignUp: '[data-target="#signInModal"]',
    button_LogIn: '[data-target="#logInModal"]',
    button_Cart: '[id="cartur"]',
    button_AboutUs: '[data-target="#videoModal"]',
    button_Contact: '[data-target="#exampleModal"]',
    button_Home: '[li[class="nav-item active"] a[class="nav-link"]]',
    button_Username: '[id="nameofuser"]',

    //LogIn modal
    input_loginmodal_username: '[id="loginusername"]',
    input_loginmodal_password: '[id="loginpassword"]',
    button_loginmodal_LogIn: 'button[onclick="logIn()"]',

    // Products
    button_products: '#tbodyid .card-title a'
  
  };


  constructor(page: Page) {
    super(page);
  }

  getLocators(): Record<string, string> {
    return this.locators;
  }

  async goToHomePage(): Promise<void> {
    logStep('Navigating to home page');
    await this.navigateTo('/index.html');
  }

  async clickLogInButton(): Promise<void> {
    logStep('clicking LogIn button');
    await this.clickElement(this.locators.button_LogIn);
  }

  async fillLoginUsername(value: string): Promise<void> {
    logStep(`filling field username from LogIn Modal`);
    await this.fillInput(this.locators.input_loginmodal_username, value);
  }

  async fillLoginPassword(value: string): Promise<void> {
    logStep(`filling field password from LogIn Modal`);
    await this.fillInput(this.locators.input_loginmodal_password, value);
  }

  async submitLoginModal(): Promise<void> {
    logStep(`clicking LogIn button from LogIn Modal`);
    await this.clickElement(this.locators.button_loginmodal_LogIn);
  }

  async validateLogIn(username: string): Promise<void> {
    logStep(`clicking LogIn button from LogIn Modal`);
    const usernameElement = this.page.locator(this.locators.button_Username);
    await expect(usernameElement).toHaveText(`Welcome ${username}`);
  }

  async selectRandomProduct(): Promise<string> {
    logStep('selecting a random product from home page');
    const products = this.page.locator(this.locators.button_products);
    const count = await products.count();
    const randomIndex = Math.floor(Math.random() * count);
    const product = products.nth(randomIndex);
    const productName = await product.innerText();

    await product.click();
    return productName;
  }

  async clickCartButton(): Promise<void> {
    logStep('navigating to cart');
    await this.page.locator(this.locators.button_Cart).click();
  }

  async addProductToCart(page: Page): Promise<void> {
    logStep('adding product to cart');
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const selectedProduct = await this.selectRandomProduct();
    await productPage.addProductToCart();
    await productPage.acceptConfirmationMessage();
    await this.clickCartButton();
    await cartPage.validateProductOnCart(selectedProduct);
  }
}

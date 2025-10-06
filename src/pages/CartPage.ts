import { expect, Page } from '@playwright/test';
import { BasePage } from '../utils/common';
import { logStep } from '../utils/common';

export class CartPage extends BasePage {
  private readonly locators = {
    cartItems: '#tbodyid tr',
    button_placeOrder: '[data-target="#orderModal"]',
    input_Name: 'input[id="name"]',
    input_Country: 'input[id="country"]',
    input_City: 'input[id="city"]',
    input_CreditCard: 'input[id="card"]',
    input_Month: 'input[id="month"]',
    input_Year: 'input[id="year"]',
    button_purchase: 'button[onclick="purchaseOrder()"]',
    confirmationModal: '.sweet-alert',
    buttton_ok: 'button[class="confirm btn btn-lg btn-primary"]'
  };

  constructor(page: Page) {
    super(page);
  }

  async clickplaceOrderButton(): Promise<void> {
    logStep('Clicking Place Order button');
    await this.page.locator(this.locators.button_placeOrder).click();
  }

  async completePlacementForm(
    name = 'Test User',
    country = 'Argentina',
    city = 'Buenos Aires',
    card = '1234 5678 9012 3456',
    month = '12',
    year = '2025'
  ): Promise<void> {
    logStep('Filling place order form');
    await this.page.locator(this.locators.input_Name).fill(name);
    await this.page.locator(this.locators.input_Country).fill(country);
    await this.page.locator(this.locators.input_City).fill(city);
    await this.page.locator(this.locators.input_CreditCard).fill(card);
    await this.page.locator(this.locators.input_Month).fill(month);
    await this.page.locator(this.locators.input_Year).fill(year);
  }

  async clickPurchaseButton(): Promise<void> {
    logStep('Clicking Purchase button');
    await this.page.locator(this.locators.button_purchase).click();
  }

  async validatePurchaseConfirmationModal(): Promise<void> {
    logStep('Validating purchase confirmation modal');
    const modal = this.page.locator(this.locators.confirmationModal);
    await expect(modal).toBeVisible();
    await this.page.locator(this.locators.buttton_ok).click();
  }

  async validateProductOnCart(expectedProduct: string): Promise<void> {
    logStep(`Validating product ${expectedProduct} is present in cart`);
    this.locators.cartItems = '#tbodyid tr td'
    const cartItems = this.page.locator(this.locators.cartItems).getByText(expectedProduct,{exact: true});
    await expect(cartItems).toContainText(expectedProduct);
  }
}

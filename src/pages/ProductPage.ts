import { Page } from '@playwright/test';
import { BasePage } from '../utils/common';
import { logStep } from '../utils/common';

export class ProductPage extends BasePage {
  private readonly locators = {
    addToCartButton: 'a.btn.btn-success.btn-lg'
  };

  constructor(page: Page) {
    super(page);
  }

  getLocators(): Record<string, string> {
    return this.locators;
  }

  async addProductToCart(): Promise<void> {
    logStep('Adding product to cart');
    await this.page.locator(this.locators.addToCartButton).click();
  }

  async acceptConfirmationMessage(): Promise<void> {
    logStep('Accepting confirmation message');
    this.page.on('dialog', async dialog => {
      await dialog.accept();
    });
  }
}
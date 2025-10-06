import { Page, Locator, expect } from '@playwright/test';
import { ENV } from '../config/environment';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { ProductPage } from '../pages/ProductPage';



export class BasePage {
  protected page: Page;
  protected baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = ENV.baseUrl;
  }

  async navigateTo(url: string = ''): Promise<void> {
    logStep(`Navigating to: ${this.baseUrl}${url}`);
    await this.page.goto(`${this.baseUrl}${url}`);
  }

  protected async waitForElement(selector: string, timeout: number = ENV.timeout): Promise<Locator> {
    return await waitForElementToBeVisible(this.page, selector, timeout);
  }

  protected async waitForClickableElement(selector: string, timeout: number = ENV.timeout): Promise<Locator> {
    return await waitForElementToBeClickable(this.page, selector, timeout);
  }

  protected async clickElement(selector: string, timeout: number = ENV.timeout): Promise<void> {
    logStep(`Clicking element: ${selector}`);
    await safeClick(this.page, selector, timeout);
  }

 
  protected async fillInput(selector: string, text: string, timeout: number = ENV.timeout): Promise<void> {
    logStep(`Filling input ${selector} with: ${text}`);
    await safeFill(this.page, selector, text, timeout);
  }
}

 async function waitForElementToBeClickable(page: Page, selector: string, timeout: number = ENV.timeout): Promise<Locator> {
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible', timeout });
  await element.waitFor({ state: 'attached', timeout });
  return element;
}

export async function waitForElementToBeVisible(page: Page, selector: string, timeout: number = ENV.timeout): Promise<Locator> {
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible', timeout });
  return element;
}

export async function waitForElementToBeHidden(page: Page, selector: string, timeout: number = ENV.timeout): Promise<void> {
  const element = page.locator(selector);
  await element.waitFor({ state: 'hidden', timeout });
}

export async function safeClick(page: Page, selector: string, timeout: number = ENV.timeout): Promise<void> {
  const element = await waitForElementToBeClickable(page, selector, timeout);
  await element.click();
}

export async function safeFill(page: Page, selector: string, text: string, timeout: number = ENV.timeout): Promise<void> {
  const element = await waitForElementToBeVisible(page, selector, timeout);
  await element.clear();
  await element.fill(text);
}

export async function safeSelectOption(page: Page, selector: string, value: string, timeout: number = ENV.timeout): Promise<void> {
  const element = await waitForElementToBeVisible(page, selector, timeout);
  await element.selectOption(value);
}

export async function setViewportSize(page: Page, width: number = ENV.viewport.width, height: number = ENV.viewport.height): Promise<void> {
  await page.setViewportSize({ width, height });
}

export async function validLogin(page:Page): Promise<void> {
  const homePage = new HomePage(page)
  await homePage.clickLogInButton();
  await homePage.fillLoginUsername(ENV.testData.validUser.username);
  await homePage.fillLoginPassword(ENV.testData.validUser.password);
  await homePage.submitLoginModal();
  await homePage.validateLogIn(ENV.testData.validUser.username);
}


export function logStep(step: string): void {
  console.log(`[STEP] ${step}`);
}
/*
export async function addRandomProductToCart(page: Page): Promise<void> {
  const homePage =  new HomePage(page);
  const productPage =  new ProductPage(page);
  const cartPage =  new CartPage(page);

  const selectedProduct = await homePage.selectRandomProduct();
  await productPage.addProductToCart();
  await productPage.acceptConfirmationMessage();
  await homePage.clickCartButton();
  await cartPage.validateProductOnCart(selectedProduct);

}*/

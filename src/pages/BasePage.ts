import { Page, Locator, expect } from '@playwright/test';
import { ENV } from '../config/environment';
import { 
  waitForElementToBeClickable, 
  waitForElementToBeVisible, 
  safeClick, 
  safeFill,
  waitForPageLoad,
  takeScreenshot,
  logStep
} from '../utils/common';

/**
 * Base Page Object Model class
 * This class contains common functionality that all page objects can inherit
 */
export abstract class BasePage {
  protected page: Page;
  protected baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = ENV.baseUrl;
  }

  /**
   * Navigate to a specific URL
   */
  async navigateTo(url: string = ''): Promise<void> {
    logStep(`Navigating to: ${this.baseUrl}${url}`);
    await this.page.goto(`${this.baseUrl}${url}`);
    await waitForPageLoad(this.page);
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Wait for page to be loaded
   */
  async waitForPageToLoad(): Promise<void> {
    await waitForPageLoad(this.page);
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await takeScreenshot(this.page, name);
  }

  /**
   * Wait for element to be visible
   */
  protected async waitForElement(selector: string, timeout: number = ENV.timeout): Promise<Locator> {
    return await waitForElementToBeVisible(this.page, selector, timeout);
  }

  /**
   * Wait for element to be clickable
   */
  protected async waitForClickableElement(selector: string, timeout: number = ENV.timeout): Promise<Locator> {
    return await waitForElementToBeClickable(this.page, selector, timeout);
  }

  /**
   * Click element safely
   */
  protected async clickElement(selector: string, timeout: number = ENV.timeout): Promise<void> {
    logStep(`Clicking element: ${selector}`);
    await safeClick(this.page, selector, timeout);
  }

  /**
   * Fill input field safely
   */
  protected async fillInput(selector: string, text: string, timeout: number = ENV.timeout): Promise<void> {
    logStep(`Filling input ${selector} with: ${text}`);
    await safeFill(this.page, selector, text, timeout);
  }

  /**
   * Get element text
   */
  protected async getElementText(selector: string): Promise<string> {
    const element = await this.waitForElement(selector);
    return await element.textContent() || '';
  }

  /**
   * Check if element is visible
   */
  protected async isElementVisible(selector: string): Promise<boolean> {
    try {
      await this.waitForElement(selector, 1000);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if element is enabled
   */
  protected async isElementEnabled(selector: string): Promise<boolean> {
    const element = await this.waitForElement(selector);
    return await element.isEnabled();
  }

  /**
   * Wait for text to be present in element
   */
  protected async waitForTextInElement(selector: string, text: string, timeout: number = ENV.timeout): Promise<void> {
    const element = await this.waitForElement(selector, timeout);
    await expect(element).toContainText(text, { timeout });
  }

  /**
   * Scroll element into view
   */
  protected async scrollToElement(selector: string): Promise<void> {
    const element = await this.waitForElement(selector);
    await element.scrollIntoViewIfNeeded();
  }

  /**
   * Get element attribute
   */
  protected async getElementAttribute(selector: string, attribute: string): Promise<string | null> {
    const element = await this.waitForElement(selector);
    return await element.getAttribute(attribute);
  }

  /**
   * Wait for URL to contain specific text
   */
  protected async waitForUrlToContain(text: string, timeout: number = ENV.timeout): Promise<void> {
    await this.page.waitForURL(`**/*${text}*`, { timeout });
  }

  /**
   * Wait for URL to match pattern
   */
  protected async waitForUrlToMatch(pattern: string | RegExp, timeout: number = ENV.timeout): Promise<void> {
    await this.page.waitForURL(pattern, { timeout });
  }

  /**
   * Refresh page
   */
  async refreshPage(): Promise<void> {
    logStep('Refreshing page');
    await this.page.reload();
    await this.waitForPageToLoad();
  }

  /**
   * Go back in browser history
   */
  async goBack(): Promise<void> {
    logStep('Going back in browser history');
    await this.page.goBack();
    await this.waitForPageToLoad();
  }

  /**
   * Go forward in browser history
   */
  async goForward(): Promise<void> {
    logStep('Going forward in browser history');
    await this.page.goForward();
    await this.waitForPageToLoad();
  }

  /**
   * Wait for network to be idle
   */
  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for DOM content to be loaded
   */
  async waitForDOMContentLoaded(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Abstract method to be implemented by child classes
   * This should contain the main locators for the page
   */
  abstract getLocators(): Record<string, string>;

  /**
   * Abstract method to verify page is loaded
   * This should contain the main verification that the page has loaded correctly
   */
  abstract verifyPageLoaded(): Promise<void>;
}

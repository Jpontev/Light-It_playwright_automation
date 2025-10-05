import { Page, Locator, expect } from '@playwright/test';
import { ENV } from '../config/environment';

/**
 * Common utility functions for Playwright tests
 */

/**
 * Wait for element to be visible and clickable
 */
export async function waitForElementToBeClickable(page: Page, selector: string, timeout: number = ENV.timeout): Promise<Locator> {
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible', timeout });
  await element.waitFor({ state: 'attached', timeout });
  return element;
}

/**
 * Wait for element to be visible
 */
export async function waitForElementToBeVisible(page: Page, selector: string, timeout: number = ENV.timeout): Promise<Locator> {
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible', timeout });
  return element;
}

/**
 * Wait for element to be hidden
 */
export async function waitForElementToBeHidden(page: Page, selector: string, timeout: number = ENV.timeout): Promise<void> {
  const element = page.locator(selector);
  await element.waitFor({ state: 'hidden', timeout });
}

/**
 * Safe click with retry mechanism
 */
export async function safeClick(page: Page, selector: string, timeout: number = ENV.timeout): Promise<void> {
  const element = await waitForElementToBeClickable(page, selector, timeout);
  await element.click();
}

/**
 * Safe fill with retry mechanism
 */
export async function safeFill(page: Page, selector: string, text: string, timeout: number = ENV.timeout): Promise<void> {
  const element = await waitForElementToBeVisible(page, selector, timeout);
  await element.clear();
  await element.fill(text);
}

/**
 * Safe select option from dropdown
 */
export async function safeSelectOption(page: Page, selector: string, value: string, timeout: number = ENV.timeout): Promise<void> {
  const element = await waitForElementToBeVisible(page, selector, timeout);
  await element.selectOption(value);
}

/**
 * Wait for page to load completely
 */
export async function waitForPageLoad(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Take screenshot with timestamp
 */
export async function takeScreenshot(page: Page, name: string): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({ 
    path: `test-results/screenshots/${name}-${timestamp}.png`,
    fullPage: true 
  });
}

/**
 * Generate random string
 */
export function generateRandomString(length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate random email
 */
export function generateRandomEmail(): string {
  const randomString = generateRandomString(8);
  return `${randomString}@example.com`;
}

/**
 * Generate random number
 */
export function generateRandomNumber(min: number = 1, max: number = 1000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Wait for API response
 */
export async function waitForApiResponse(page: Page, urlPattern: string | RegExp, timeout: number = ENV.timeout): Promise<any> {
  const response = await page.waitForResponse(response => {
    const url = response.url();
    if (typeof urlPattern === 'string') {
      return url.includes(urlPattern);
    }
    return urlPattern.test(url);
  }, { timeout });
  
  return response.json();
}

/**
 * Scroll element into view
 */
export async function scrollIntoView(page: Page, selector: string): Promise<void> {
  const element = page.locator(selector);
  await element.scrollIntoViewIfNeeded();
}

/**
 * Check if element exists without throwing error
 */
export async function elementExists(page: Page, selector: string): Promise<boolean> {
  try {
    const element = page.locator(selector);
    await element.waitFor({ state: 'attached', timeout: 1000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Get element text safely
 */
export async function getElementText(page: Page, selector: string): Promise<string> {
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible' });
  return await element.textContent() || '';
}

/**
 * Get element attribute safely
 */
export async function getElementAttribute(page: Page, selector: string, attribute: string): Promise<string | null> {
  const element = page.locator(selector);
  await element.waitFor({ state: 'attached' });
  return await element.getAttribute(attribute);
}

/**
 * Wait for text to be present in element
 */
export async function waitForTextInElement(page: Page, selector: string, text: string, timeout: number = ENV.timeout): Promise<void> {
  const element = page.locator(selector);
  await expect(element).toContainText(text, { timeout });
}

/**
 * Clear all cookies and local storage
 */
export async function clearBrowserData(page: Page): Promise<void> {
  await page.context().clearCookies();
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}

/**
 * Set viewport size
 */
export async function setViewportSize(page: Page, width: number = ENV.viewport.width, height: number = ENV.viewport.height): Promise<void> {
  await page.setViewportSize({ width, height });
}

/**
 * Wait for navigation to complete
 */
export async function waitForNavigation(page: Page): Promise<void> {
  await page.waitForURL('**/*', { timeout: ENV.timeout });
}

/**
 * Retry function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
}

/**
 * Format date for test data
 */
export function formatDate(date: Date = new Date(), format: string = 'YYYY-MM-DD'): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return format
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day);
}

/**
 * Log test step
 */
export function logStep(step: string): void {
  console.log(`[STEP] ${step}`);
}

/**
 * Log test data
 */
export function logTestData(data: any): void {
  console.log(`[TEST DATA] ${JSON.stringify(data, null, 2)}`);
}

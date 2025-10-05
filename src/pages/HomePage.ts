import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { logStep } from '../utils/common';

/**
 * Home Page Object Model
 * This is an example implementation of a page object following the POM pattern
 */
export class HomePage extends BasePage {
  // Page locators - define all selectors for this page
  private readonly locators = {
    // Header elements
    logo: '[data-testid="logo"]',
    navigationMenu: '[data-testid="navigation-menu"]',
    searchInput: '[data-testid="search-input"]',
    searchButton: '[data-testid="search-button"]',
    
    // Main content
    heroSection: '[data-testid="hero-section"]',
    heroTitle: '[data-testid="hero-title"]',
    heroSubtitle: '[data-testid="hero-subtitle"]',
    ctaButton: '[data-testid="cta-button"]',
    
    // Features section
    featuresSection: '[data-testid="features-section"]',
    featureCards: '[data-testid="feature-card"]',
    
    // Footer
    footer: '[data-testid="footer"]',
    footerLinks: '[data-testid="footer-link"]',
    
    // Common elements
    loadingSpinner: '[data-testid="loading-spinner"]',
    errorMessage: '[data-testid="error-message"]',
    successMessage: '[data-testid="success-message"]',
  };

  constructor(page: Page) {
    super(page);
  }

  /**
   * Get all locators for this page
   */
  getLocators(): Record<string, string> {
    return this.locators;
  }

  /**
   * Verify that the home page has loaded correctly
   */
  async verifyPageLoaded(): Promise<void> {
    logStep('Verifying home page is loaded');
    
    // Wait for key elements to be visible
    await this.waitForElement(this.locators.logo);
    await this.waitForElement(this.locators.heroSection);
    await this.waitForElement(this.locators.navigationMenu);
    
    // Verify page title
    const title = await this.getTitle();
    expect(title).toContain('Home'); // Adjust based on your actual page title
    
    logStep('Home page loaded successfully');
  }

  /**
   * Navigate to home page
   */
  async goToHomePage(): Promise<void> {
    logStep('Navigating to home page');
    await this.navigateTo('/');
    await this.verifyPageLoaded();
  }

  /**
   * Perform search
   */
  async performSearch(searchTerm: string): Promise<void> {
    logStep(`Performing search for: ${searchTerm}`);
    
    await this.fillInput(this.locators.searchInput, searchTerm);
    await this.clickElement(this.locators.searchButton);
    
    // Wait for search results or navigation
    await this.waitForNetworkIdle();
  }

  /**
   * Click on CTA button
   */
  async clickCTAButton(): Promise<void> {
    logStep('Clicking CTA button');
    await this.clickElement(this.locators.ctaButton);
  }

  /**
   * Get hero section title
   */
  async getHeroTitle(): Promise<string> {
    return await this.getElementText(this.locators.heroTitle);
  }

  /**
   * Get hero section subtitle
   */
  async getHeroSubtitle(): Promise<string> {
    return await this.getElementText(this.locators.heroSubtitle);
  }

  /**
   * Check if search input is visible
   */
  async isSearchInputVisible(): Promise<boolean> {
    return await this.isElementVisible(this.locators.searchInput);
  }

  /**
   * Check if navigation menu is visible
   */
  async isNavigationMenuVisible(): Promise<boolean> {
    return await this.isElementVisible(this.locators.navigationMenu);
  }

  /**
   * Get all feature cards
   */
  async getFeatureCards(): Promise<Locator[]> {
    const cards = this.page.locator(this.locators.featureCards);
    const count = await cards.count();
    const cardElements: Locator[] = [];
    
    for (let i = 0; i < count; i++) {
      cardElements.push(cards.nth(i));
    }
    
    return cardElements;
  }

  /**
   * Get feature card text by index
   */
  async getFeatureCardText(index: number): Promise<string> {
    const cards = await this.getFeatureCards();
    if (index < cards.length) {
      return await cards[index].textContent() || '';
    }
    throw new Error(`Feature card at index ${index} not found`);
  }

  /**
   * Click on feature card by index
   */
  async clickFeatureCard(index: number): Promise<void> {
    logStep(`Clicking feature card at index: ${index}`);
    const cards = await this.getFeatureCards();
    if (index < cards.length) {
      await cards[index].click();
    } else {
      throw new Error(`Feature card at index ${index} not found`);
    }
  }

  /**
   * Wait for loading spinner to disappear
   */
  async waitForLoadingToComplete(): Promise<void> {
    logStep('Waiting for loading to complete');
    try {
      await this.waitForElement(this.locators.loadingSpinner, 1000);
      // If spinner is visible, wait for it to disappear
      await this.page.waitForSelector(this.locators.loadingSpinner, { 
        state: 'hidden', 
        timeout: 10000 
      });
    } catch {
      // Spinner might not be present, which is fine
    }
  }

  /**
   * Check if error message is displayed
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.locators.errorMessage);
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    if (await this.isErrorMessageDisplayed()) {
      return await this.getElementText(this.locators.errorMessage);
    }
    return '';
  }

  /**
   * Check if success message is displayed
   */
  async isSuccessMessageDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.locators.successMessage);
  }

  /**
   * Get success message text
   */
  async getSuccessMessage(): Promise<string> {
    if (await this.isSuccessMessageDisplayed()) {
      return await this.getElementText(this.locators.successMessage);
    }
    return '';
  }

  /**
   * Scroll to features section
   */
  async scrollToFeaturesSection(): Promise<void> {
    logStep('Scrolling to features section');
    await this.scrollToElement(this.locators.featuresSection);
  }

  /**
   * Scroll to footer
   */
  async scrollToFooter(): Promise<void> {
    logStep('Scrolling to footer');
    await this.scrollToElement(this.locators.footer);
  }

  /**
   * Get footer links count
   */
  async getFooterLinksCount(): Promise<number> {
    const links = this.page.locator(this.locators.footerLinks);
    return await links.count();
  }

  /**
   * Click footer link by index
   */
  async clickFooterLink(index: number): Promise<void> {
    logStep(`Clicking footer link at index: ${index}`);
    const links = this.page.locator(this.locators.footerLinks);
    const count = await links.count();
    
    if (index < count) {
      await links.nth(index).click();
    } else {
      throw new Error(`Footer link at index ${index} not found`);
    }
  }
}

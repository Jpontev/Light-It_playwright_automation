import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ENV } from '../config/environment';
import { logStep, logTestData } from '../utils/common';

/**
 * Example Test Suite
 * This is a template for creating new test files following best practices
 */

// Test data
const testData = {
  searchTerm: 'playwright automation',
  expectedTitle: 'Home Page',
  featureCardCount: 3,
};

// Test configuration
test.describe.configure({ mode: 'parallel' });

test.describe('Home Page Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    logStep('Setting up test environment');
    
    // Initialize page object
    homePage = new HomePage(page);
    
    // Set viewport size
    await page.setViewportSize({ 
      width: ENV.viewport.width, 
      height: ENV.viewport.height 
    });
    
    // Navigate to home page
    await homePage.goToHomePage();
    
    logTestData(testData);
  });

  test.afterEach(async ({ page }) => {
    logStep('Cleaning up after test');
    
    // Take screenshot on failure
    if (test.info().status === 'failed') {
      await homePage.takeScreenshot(`failed-${test.info().title}`);
    }
  });

  test('should load home page successfully', async () => {
    logStep('Verifying home page loads correctly');
    
    // Verify page title
    const title = await homePage.getTitle();
    expect(title).toContain(testData.expectedTitle);
    
    // Verify key elements are visible
    expect(await homePage.isNavigationMenuVisible()).toBe(true);
    expect(await homePage.isSearchInputVisible()).toBe(true);
    
    // Verify hero section content
    const heroTitle = await homePage.getHeroTitle();
    expect(heroTitle).toBeTruthy();
    
    const heroSubtitle = await homePage.getHeroSubtitle();
    expect(heroSubtitle).toBeTruthy();
  });

  test('should perform search functionality', async () => {
    logStep('Testing search functionality');
    
    // Perform search
    await homePage.performSearch(testData.searchTerm);
    
    // Wait for search results or navigation
    await homePage.waitForNetworkIdle();
    
    // Verify search was performed (adjust based on your app behavior)
    const currentUrl = homePage.getCurrentUrl();
    expect(currentUrl).toContain('search');
  });

  test('should display feature cards', async () => {
    logStep('Testing feature cards display');
    
    // Scroll to features section
    await homePage.scrollToFeaturesSection();
    
    // Get feature cards
    const featureCards = await homePage.getFeatureCards();
    expect(featureCards.length).toBeGreaterThan(0);
    
    // Verify first feature card has content
    const firstCardText = await homePage.getFeatureCardText(0);
    expect(firstCardText).toBeTruthy();
  });

  test('should navigate to feature card details', async () => {
    logStep('Testing feature card navigation');
    
    // Scroll to features section
    await homePage.scrollToFeaturesSection();
    
    // Click on first feature card
    await homePage.clickFeatureCard(0);
    
    // Wait for navigation
    await homePage.waitForNetworkIdle();
    
    // Verify navigation occurred (adjust based on your app behavior)
    const currentUrl = homePage.getCurrentUrl();
    expect(currentUrl).not.toBe(ENV.baseUrl);
  });

  test('should display footer with links', async () => {
    logStep('Testing footer display');
    
    // Scroll to footer
    await homePage.scrollToFooter();
    
    // Verify footer is visible
    const footerLinksCount = await homePage.getFooterLinksCount();
    expect(footerLinksCount).toBeGreaterThan(0);
  });

  test('should handle CTA button click', async () => {
    logStep('Testing CTA button functionality');
    
    // Click CTA button
    await homePage.clickCTAButton();
    
    // Wait for navigation or modal
    await homePage.waitForNetworkIdle();
    
    // Verify action was performed (adjust based on your app behavior)
    // This could be navigation, modal opening, etc.
  });
});

test.describe('Home Page Error Handling', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goToHomePage();
  });

  test('should handle invalid search gracefully', async () => {
    logStep('Testing invalid search handling');
    
    // Perform search with empty term
    await homePage.performSearch('');
    
    // Wait for any error handling
    await homePage.waitForNetworkIdle();
    
    // Verify no error message is displayed for empty search
    expect(await homePage.isErrorMessageDisplayed()).toBe(false);
  });

  test('should handle network errors gracefully', async ({ page }) => {
    logStep('Testing network error handling');
    
    // Simulate network failure
    await page.route('**/*', route => route.abort());
    
    // Try to perform an action that requires network
    await homePage.performSearch(testData.searchTerm);
    
    // Verify error handling (adjust based on your app behavior)
    // This might show an error message, retry mechanism, etc.
  });
});

test.describe('Home Page Responsive Design', () => {
  let homePage: HomePage;

  test('should work on mobile viewport', async ({ page }) => {
    logStep('Testing mobile viewport');
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    homePage = new HomePage(page);
    await homePage.goToHomePage();
    
    // Verify page loads correctly on mobile
    expect(await homePage.isNavigationMenuVisible()).toBe(true);
    
    // Verify search functionality works on mobile
    await homePage.performSearch(testData.searchTerm);
    await homePage.waitForNetworkIdle();
  });

  test('should work on tablet viewport', async ({ page }) => {
    logStep('Testing tablet viewport');
    
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    homePage = new HomePage(page);
    await homePage.goToHomePage();
    
    // Verify page loads correctly on tablet
    expect(await homePage.isNavigationMenuVisible()).toBe(true);
    
    // Verify feature cards are displayed properly
    await homePage.scrollToFeaturesSection();
    const featureCards = await homePage.getFeatureCards();
    expect(featureCards.length).toBeGreaterThan(0);
  });
});

test.describe('Home Page Performance', () => {
  let homePage: HomePage;

  test('should load within acceptable time', async ({ page }) => {
    logStep('Testing page load performance');
    
    const startTime = Date.now();
    
    homePage = new HomePage(page);
    await homePage.goToHomePage();
    
    const loadTime = Date.now() - startTime;
    
    // Verify page loads within 5 seconds
    expect(loadTime).toBeLessThan(5000);
    
    logStep(`Page loaded in ${loadTime}ms`);
  });

  test('should handle multiple rapid interactions', async ({ page }) => {
    logStep('Testing rapid interactions');
    
    homePage = new HomePage(page);
    await homePage.goToHomePage();
    
    // Perform multiple rapid interactions
    await Promise.all([
      homePage.performSearch('test1'),
      homePage.performSearch('test2'),
      homePage.performSearch('test3'),
    ]);
    
    // Verify page is still responsive
    await homePage.waitForNetworkIdle();
    expect(await homePage.isNavigationMenuVisible()).toBe(true);
  });
});

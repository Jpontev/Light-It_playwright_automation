/**
 * Environment Configuration
 * This file contains all environment variables and configuration settings
 */

export interface EnvironmentConfig {
  baseUrl: string;
  apiUrl: string;
  timeout: number;
  retries: number;
  headless: boolean;
  slowMo: number;
  viewport: {
    width: number;
    height: number;
  };
  user: {
    username: string;
    password: string;
    email: string;
  };
  testData: {
    validUser: {
      username: string;
      password: string;
      email: string;
    };
    invalidUser: {
      username: string;
      password: string;
    };
  };
}

/**
 * Get environment configuration based on the current environment
 */
export function getEnvironmentConfig(): EnvironmentConfig {
  const environment = process.env.NODE_ENV || 'development';
  
  const configs: Record<string, EnvironmentConfig> = {
    development: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
      apiUrl: process.env.API_URL || 'http://localhost:3000/api',
      timeout: parseInt(process.env.TIMEOUT || '30000'),
      retries: parseInt(process.env.RETRIES || '2'),
      headless: process.env.HEADLESS === 'true',
      slowMo: parseInt(process.env.SLOW_MO || '0'),
      viewport: {
        width: parseInt(process.env.VIEWPORT_WIDTH || '1280'),
        height: parseInt(process.env.VIEWPORT_HEIGHT || '720'),
      },
      user: {
        username: process.env.TEST_USERNAME || 'testuser',
        password: process.env.TEST_PASSWORD || 'testpass123',
        email: process.env.TEST_EMAIL || 'test@example.com',
      },
      testData: {
        validUser: {
          username: process.env.VALID_USERNAME || 'validuser',
          password: process.env.VALID_PASSWORD || 'validpass123',
          email: process.env.VALID_EMAIL || 'valid@example.com',
        },
        invalidUser: {
          username: process.env.INVALID_USERNAME || 'invaliduser',
          password: process.env.INVALID_PASSWORD || 'invalidpass',
        },
      },
    },
    staging: {
      baseUrl: process.env.BASE_URL || 'https://staging.example.com',
      apiUrl: process.env.API_URL || 'https://staging.example.com/api',
      timeout: parseInt(process.env.TIMEOUT || '30000'),
      retries: parseInt(process.env.RETRIES || '2'),
      headless: process.env.HEADLESS !== 'false',
      slowMo: parseInt(process.env.SLOW_MO || '0'),
      viewport: {
        width: parseInt(process.env.VIEWPORT_WIDTH || '1280'),
        height: parseInt(process.env.VIEWPORT_HEIGHT || '720'),
      },
      user: {
        username: process.env.TEST_USERNAME || 'staginguser',
        password: process.env.TEST_PASSWORD || 'stagingpass123',
        email: process.env.TEST_EMAIL || 'staging@example.com',
      },
      testData: {
        validUser: {
          username: process.env.VALID_USERNAME || 'stagingvaliduser',
          password: process.env.VALID_PASSWORD || 'stagingvalidpass123',
          email: process.env.VALID_EMAIL || 'stagingvalid@example.com',
        },
        invalidUser: {
          username: process.env.INVALID_USERNAME || 'staginginvaliduser',
          password: process.env.INVALID_PASSWORD || 'staginginvalidpass',
        },
      },
    },
    production: {
      baseUrl: process.env.BASE_URL || 'https://example.com',
      apiUrl: process.env.API_URL || 'https://example.com/api',
      timeout: parseInt(process.env.TIMEOUT || '30000'),
      retries: parseInt(process.env.RETRIES || '2'),
      headless: true,
      slowMo: 0,
      viewport: {
        width: parseInt(process.env.VIEWPORT_WIDTH || '1280'),
        height: parseInt(process.env.VIEWPORT_HEIGHT || '720'),
      },
      user: {
        username: process.env.TEST_USERNAME || 'produser',
        password: process.env.TEST_PASSWORD || 'prodpass123',
        email: process.env.TEST_EMAIL || 'prod@example.com',
      },
      testData: {
        validUser: {
          username: process.env.VALID_USERNAME || 'prodvaliduser',
          password: process.env.VALID_PASSWORD || 'prodvalidpass123',
          email: process.env.VALID_EMAIL || 'prodvalid@example.com',
        },
        invalidUser: {
          username: process.env.INVALID_USERNAME || 'prodinvaliduser',
          password: process.env.INVALID_PASSWORD || 'prodinvalidpass',
        },
      },
    },
  };

  return configs[environment] || configs.development;
}

/**
 * Export the current environment configuration
 */
export const ENV = getEnvironmentConfig();

/**
 * Helper function to get a specific environment variable with a default value
 */
export function getEnvVar(key: string, defaultValue: string = ''): string {
  return process.env[key] || defaultValue;
}

/**
 * Helper function to check if we're running in CI
 */
export function isCI(): boolean {
  return !!process.env.CI;
}

/**
 * Helper function to check if we're running in headless mode
 */
export function isHeadless(): boolean {
  return process.env.HEADLESS === 'true' || isCI();
}

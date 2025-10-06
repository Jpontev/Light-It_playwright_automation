/**
 * Environment Configuration
 * This file contains all environment variables and configuration settings
 */

export interface EnvironmentConfig {
  baseUrl: string;
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

export function getEnvironmentConfig(): EnvironmentConfig {
  const environment = process.env.NODE_ENV || 'production';
  
  const configs: Record<string, EnvironmentConfig> = {
    production: {
      baseUrl: process.env.BASE_URL || 'https://www.demoblaze.com',
      timeout: parseInt(process.env.TIMEOUT || '30000'),
      retries: parseInt(process.env.RETRIES || '2'),
      headless: true,
      slowMo: 0,
      viewport: {
        width: parseInt(process.env.VIEWPORT_WIDTH || '1280'),
        height: parseInt(process.env.VIEWPORT_HEIGHT || '720'),
      },
      user: {
        username: process.env.TEST_USERNAME || 'joaquinprueba123',
        password: process.env.TEST_PASSWORD || '123',
        email: process.env.TEST_EMAIL || 'prod@example.com',
      },
      testData: {
        validUser: {
          username: process.env.VALID_USERNAME || 'joaquinprueba123',
          password: process.env.VALID_PASSWORD || '123',
          email: process.env.VALID_EMAIL || 'prodvalid@example.com',
        },
        invalidUser: {
          username: process.env.INVALID_USERNAME || 'joaquinpruebaWrong',
          password: process.env.INVALID_PASSWORD || '1234',
        },
      },
    },
  };

  return configs[environment] || configs.development;
}

export const ENV = getEnvironmentConfig();

export function getEnvVar(key: string, defaultValue: string = ''): string {
  return process.env[key] || defaultValue;
}

export function isCI(): boolean {
  return !!process.env.CI;
}

export function isHeadless(): boolean {
  return process.env.HEADLESS === 'true' || isCI();
}

/**
 * Test Data Fixtures
 * This file contains all test data used across different test suites
 */

export interface UserData {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ProductData {
  name: string;
  price: number;
  description: string;
  category: string;
  sku: string;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
  phone: string;
  company: string;
}

// User test data
export const testUsers = {
  validUser: {
    username: 'testuser',
    password: 'TestPass123!',
    email: 'testuser@example.com',
    firstName: 'Test',
    lastName: 'User',
  },
  adminUser: {
    username: 'admin',
    password: 'AdminPass123!',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
  },
  invalidUser: {
    username: 'invaliduser',
    password: 'wrongpassword',
    email: 'invalid@example.com',
    firstName: 'Invalid',
    lastName: 'User',
  },
  newUser: {
    username: 'newuser',
    password: 'NewPass123!',
    email: 'newuser@example.com',
    firstName: 'New',
    lastName: 'User',
  },
};

// Product test data
export const testProducts = {
  laptop: {
    name: 'Gaming Laptop',
    price: 1299.99,
    description: 'High-performance gaming laptop with RTX graphics',
    category: 'Electronics',
    sku: 'LAPTOP-001',
  },
  smartphone: {
    name: 'Smartphone Pro',
    price: 899.99,
    description: 'Latest smartphone with advanced camera features',
    category: 'Electronics',
    sku: 'PHONE-001',
  },
  book: {
    name: 'Programming Guide',
    price: 49.99,
    description: 'Comprehensive guide to modern programming',
    category: 'Books',
    sku: 'BOOK-001',
  },
};

// Form test data
export const testForms = {
  contactForm: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    message: 'This is a test message for contact form',
    phone: '+1234567890',
    company: 'Test Company',
  },
  newsletterForm: {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    message: 'Please subscribe me to the newsletter',
    phone: '+0987654321',
    company: 'Newsletter Corp',
  },
  supportForm: {
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    message: 'I need help with my account',
    phone: '+1122334455',
    company: 'Support Inc',
  },
};

// Search test data
export const searchTerms = {
  valid: [
    'laptop',
    'smartphone',
    'book',
    'electronics',
    'gaming',
  ],
  invalid: [
    'xyz123nonexistent',
    '!@#$%^&*()',
    '',
    '   ',
  ],
  specialCharacters: [
    'café',
    'naïve',
    'résumé',
    '测试',
    'тест',
  ],
};

// URL test data
export const testUrls = {
  home: '/',
  login: '/login',
  register: '/register',
  products: '/products',
  about: '/about',
  contact: '/contact',
  cart: '/cart',
  checkout: '/checkout',
  profile: '/profile',
  settings: '/settings',
};

// API endpoints test data
export const apiEndpoints = {
  login: '/api/auth/login',
  register: '/api/auth/register',
  logout: '/api/auth/logout',
  users: '/api/users',
  products: '/api/products',
  orders: '/api/orders',
  search: '/api/search',
};

// Error messages test data
export const errorMessages = {
  login: {
    invalidCredentials: 'Invalid username or password',
    emptyFields: 'Please fill in all required fields',
    accountLocked: 'Account is temporarily locked',
  },
  register: {
    emailExists: 'Email already exists',
    weakPassword: 'Password must be at least 8 characters',
    invalidEmail: 'Please enter a valid email address',
  },
  general: {
    networkError: 'Network error. Please try again.',
    serverError: 'Server error. Please try again later.',
    notFound: 'Page not found',
    unauthorized: 'Unauthorized access',
  },
};

// Success messages test data
export const successMessages = {
  login: 'Login successful',
  register: 'Registration successful',
  logout: 'Logout successful',
  profileUpdate: 'Profile updated successfully',
  passwordChange: 'Password changed successfully',
  orderPlaced: 'Order placed successfully',
};

// Browser test data
export const browserConfigs = {
  desktop: {
    chrome: { width: 1920, height: 1080 },
    firefox: { width: 1920, height: 1080 },
    safari: { width: 1920, height: 1080 },
  },
  tablet: {
    ipad: { width: 768, height: 1024 },
    android: { width: 768, height: 1024 },
  },
  mobile: {
    iphone: { width: 375, height: 667 },
    android: { width: 360, height: 640 },
    samsung: { width: 360, height: 740 },
  },
};

// Performance test data
export const performanceThresholds = {
  pageLoad: 3000, // 3 seconds
  apiResponse: 1000, // 1 second
  imageLoad: 2000, // 2 seconds
  scriptExecution: 500, // 500ms
};

// Accessibility test data
export const accessibilityTests = {
  colorContrast: {
    minRatio: 4.5,
    largeTextRatio: 3.0,
  },
  keyboardNavigation: {
    tabOrder: true,
    focusVisible: true,
    skipLinks: true,
  },
  screenReader: {
    altText: true,
    ariaLabels: true,
    headings: true,
  },
};

// File upload test data
export const testFiles = {
  images: {
    jpg: 'test-image.jpg',
    png: 'test-image.png',
    gif: 'test-image.gif',
  },
  documents: {
    pdf: 'test-document.pdf',
    doc: 'test-document.doc',
    txt: 'test-document.txt',
  },
  invalid: {
    exe: 'test-file.exe',
    bat: 'test-file.bat',
    tooLarge: 'large-file.zip',
  },
};

// Date and time test data
export const dateTimeData = {
  currentDate: new Date().toISOString().split('T')[0],
  futureDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  pastDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  formats: {
    us: 'MM/DD/YYYY',
    eu: 'DD/MM/YYYY',
    iso: 'YYYY-MM-DD',
  },
};

// Helper functions for test data
export function generateRandomUser(): UserData {
  const randomId = Math.floor(Math.random() * 10000);
  return {
    username: `user${randomId}`,
    password: `Pass${randomId}!`,
    email: `user${randomId}@example.com`,
    firstName: `User${randomId}`,
    lastName: `Last${randomId}`,
  };
}

export function generateRandomProduct(): ProductData {
  const randomId = Math.floor(Math.random() * 10000);
  return {
    name: `Product ${randomId}`,
    price: Math.floor(Math.random() * 1000) + 10,
    description: `Description for product ${randomId}`,
    category: 'Test Category',
    sku: `SKU-${randomId}`,
  };
}

export function getRandomSearchTerm(): string {
  const terms = searchTerms.valid;
  return terms[Math.floor(Math.random() * terms.length)];
}

export function getRandomError(): string {
  const errors = Object.values(errorMessages.general);
  return errors[Math.floor(Math.random() * errors.length)];
}

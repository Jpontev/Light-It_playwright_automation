# Light-It Playwright Automation Framework

## ❓ Questions & Answers

**a. Why did you choose them?**
Because they cover the business-critical flows: being able to log in, add a product to the cart, and complete a purchase.

**b. What validations would you include in each?**
Visualization checks and value matching against expected results were added, but the validations could be made more robust by ensuring each object has a unique ID and follows a specific format.

---

## 🛑 Problems, Errors, and Blockers Encountered

The main challenge was creating the locators. Some elements had a field similar to `data-test`, others had `id` but it wasn’t unique, and the same issue appeared with `class` attributes. Because of that, I had to use different methods to define the elements within the locators.

Another problem appeared when re-running the test for adding a product to the cart. Since more than one product was present, the locator broke. I solved this by searching based on the product text that had been previously added.

---

## 🚀 Features

* **Playwright** with TypeScript for robust and reliable testing
* **Page Object Model (POM)** to keep code organized and reusable
* **Flexible environment configuration** for different setups
* **Common functions** for repetitive operations
* **Ready-to-use test templates**
* **Multi-browser support** (Chrome, Firefox, Safari)
* **Multi-device support** (Desktop, Tablet, Mobile)
* **Detailed HTML reports** with screenshots and videos
* **CI/CD integration** ready

## 🛠️ Installation

### Prerequisites

* Node.js (version 16 or higher)
* npm or yarn
* Git

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd Light-It_playwright_automation
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Install Playwright browsers:**

   ```bash
   npm run test --install
   ```

4. **Configure environment variables:**

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your specific settings.

## 🎯 Available Commands

### Test Execution

```bash
# Run all tests
npm test

# Run tests in headed mode (with UI)
npm run test --headed

# Run tests with Playwright UI
npm run test --ui

# Run tests in debug mode
npm run test --debug

# Show test report
npm run test --report

# Generate test code automatically
npm run test --codegen
```

### Specific Execution

```bash
# Run specific tests
npx playwright test src/tests/example.spec.ts

# Run tests in a specific browser
npx playwright test --project=chromium

# Run tests in parallel
npx playwright test --workers=4

# Run tests with custom timeout
npx playwright test --timeout=60000
```

## 📝 Configuration

### Environment Variables

The `.env` file contains the following main settings:

```env
# Application URLs
BASE_URL=http://localhost:3000
API_URL=http://localhost:3000/api

# Test configuration
NODE_ENV=development
TIMEOUT=30000
HEADLESS=false

# Test credentials
TEST_USERNAME=testuser
TEST_PASSWORD=testpass123
```

### Playwright Configuration

The `playwright.config.ts` file contains the main setup:

* **Supported browsers:** Chrome, Firefox, Safari, Edge
* **Devices:** Desktop, Tablet, Mobile
* **Reports:** HTML, JSON, JUnit
* **Screenshots and videos** on failures
* **Traces** for debugging

## 🔧 Useful Git Commands

### Initial Setup

```bash
# Set username
git config --global user.name "Your Name"

# Set email
git config --global user.email "your.email@example.com"

# Set editor
git config --global core.editor "code --wait"
```

### Workflow

```bash
# Create new branch
git checkout -b feature/new-feature

# Add changes
git add .

# Commit with descriptive message
git commit -m "feat: add login tests"

# Push to remote branch
git push origin feature/new-feature

# Create Pull Request (from GitHub/GitLab)
```

### Other Useful Commands

```bash
# Check repository status
git status

# View commit history
git log --oneline

# View differences
git diff

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo changes in a specific file
git checkout -- file.txt

# List branches
git branch -a

# Switch to branch
git checkout branch-name

# Merge branch
git merge branch-name

# Delete local branch
git branch -d branch-name
```

## 📊 Reports

### HTML Report

After running the tests, you can view the HTML report:

```bash
npm run test:report
```

The report includes:

* ✅ Summary of executed tests
* 📸 Screenshots of failures
* 🎥 Execution videos
* 📈 Performance metrics
* 🔍 Debugging traces

## 📚 Additional Resources

* [Playwright Official Docs](https://playwright.dev/)
* [TypeScript Guide](https://www.typescriptlang.org/docs/)
* [Testing Best Practices](https://playwright.dev/docs/best-practices)
* [Page Object Model](https://playwright.dev/docs/pom)

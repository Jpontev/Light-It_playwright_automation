# Light-It Playwright Automation Framework

Este proyecto contiene un framework de automatización de pruebas completo utilizando Playwright con TypeScript, siguiendo las mejores prácticas y el patrón de diseño Page Object Model (POM).

## 🚀 Características

- **Playwright** con TypeScript para pruebas robustas y confiables
- **Page Object Model (POM)** para mantener el código organizado y reutilizable
- **Configuración de entorno** flexible para diferentes ambientes
- **Funciones comunes** para operaciones repetitivas
- **Templates de pruebas** listos para usar
- **Soporte multi-navegador** (Chrome, Firefox, Safari)
- **Soporte multi-dispositivo** (Desktop, Tablet, Mobile)
- **Reportes HTML** detallados con screenshots y videos
- **Integración CI/CD** lista

## 📁 Estructura del Proyecto

```
├── src/
│   ├── config/           # Configuración de entorno
│   │   └── environment.ts
│   ├── pages/            # Page Objects (POM)
│   │   ├── BasePage.ts
│   │   └── HomePage.ts
│   ├── tests/            # Archivos de pruebas
│   │   └── example.spec.ts
│   ├── utils/            # Funciones comunes
│   │   └── common.ts
│   └── fixtures/         # Datos de prueba
│       └── testData.ts
├── test-results/         # Resultados de pruebas
├── playwright.config.ts  # Configuración de Playwright
├── tsconfig.json         # Configuración de TypeScript
└── package.json          # Dependencias y scripts
```

## 🛠️ Instalación

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Git

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <repository-url>
   cd Light-It_playwright_automation
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Instalar navegadores de Playwright:**
   ```bash
   npm run test:install
   ```

4. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```
   
   Edita el archivo `.env` con tus configuraciones específicas.

## 🎯 Comandos Disponibles

### Ejecución de Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo headed (con interfaz gráfica)
npm run test:headed

# Ejecutar pruebas con interfaz de usuario de Playwright
npm run test:ui

# Ejecutar pruebas en modo debug
npm run test:debug

# Mostrar reporte de pruebas
npm run test:report

# Generar código de prueba automáticamente
npm run test:codegen
```

### Ejecución Específica

```bash
# Ejecutar pruebas específicas
npx playwright test src/tests/example.spec.ts

# Ejecutar pruebas en un navegador específico
npx playwright test --project=chromium

# Ejecutar pruebas en modo paralelo
npx playwright test --workers=4

# Ejecutar pruebas con timeout personalizado
npx playwright test --timeout=60000
```

## 📝 Configuración

### Variables de Entorno

El archivo `.env` contiene las siguientes configuraciones principales:

```env
# URLs de la aplicación
BASE_URL=http://localhost:3000
API_URL=http://localhost:3000/api

# Configuración de pruebas
NODE_ENV=development
TIMEOUT=30000
HEADLESS=false

# Credenciales de prueba
TEST_USERNAME=testuser
TEST_PASSWORD=testpass123
```

### Configuración de Playwright

El archivo `playwright.config.ts` contiene la configuración principal:

- **Navegadores soportados:** Chrome, Firefox, Safari, Edge
- **Dispositivos:** Desktop, Tablet, Mobile
- **Reportes:** HTML, JSON, JUnit
- **Screenshots y videos** en caso de fallos
- **Traces** para debugging

## 🏗️ Desarrollo de Pruebas

### Crear una Nueva Página (Page Object)

1. **Crear archivo en `src/pages/`:**
   ```typescript
   import { Page } from '@playwright/test';
   import { BasePage } from './BasePage';

   export class LoginPage extends BasePage {
     private readonly locators = {
       usernameInput: '#username',
       passwordInput: '#password',
       loginButton: '#login-button',
     };

     constructor(page: Page) {
       super(page);
     }

     async login(username: string, password: string): Promise<void> {
       await this.fillInput(this.locators.usernameInput, username);
       await this.fillInput(this.locators.passwordInput, password);
       await this.clickElement(this.locators.loginButton);
     }
   }
   ```

2. **Implementar métodos abstractos:**
   ```typescript
   getLocators(): Record<string, string> {
     return this.locators;
   }

   async verifyPageLoaded(): Promise<void> {
     await this.waitForElement(this.locators.usernameInput);
   }
   ```

### Crear una Nueva Prueba

1. **Crear archivo en `src/tests/`:**
   ```typescript
   import { test, expect } from '@playwright/test';
   import { LoginPage } from '../pages/LoginPage';

   test.describe('Login Tests', () => {
     test('should login successfully', async ({ page }) => {
       const loginPage = new LoginPage(page);
       await loginPage.navigateTo('/login');
       await loginPage.login('testuser', 'testpass');
       // Verificaciones...
     });
   });
   ```

### Usar Funciones Comunes

```typescript
import { 
  waitForElementToBeVisible, 
  safeClick, 
  generateRandomEmail 
} from '../utils/common';

// Esperar elemento visible
await waitForElementToBeVisible(page, '#my-element');

// Click seguro con reintentos
await safeClick(page, '#my-button');

// Generar datos aleatorios
const email = generateRandomEmail();
```

## 🔧 Comandos Git Útiles

### Configuración Inicial

```bash
# Configurar usuario
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@ejemplo.com"

# Configurar editor
git config --global core.editor "code --wait"
```

### Flujo de Trabajo

```bash
# Crear nueva rama
git checkout -b feature/nueva-funcionalidad

# Agregar cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: agregar pruebas de login"

# Push a rama remota
git push origin feature/nueva-funcionalidad

# Crear Pull Request (desde GitHub/GitLab)
```

### Comandos Útiles

```bash
# Ver estado del repositorio
git status

# Ver historial de commits
git log --oneline

# Ver diferencias
git diff

# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Deshacer cambios en archivo específico
git checkout -- archivo.txt

# Ver ramas
git branch -a

# Cambiar a rama
git checkout nombre-rama

# Fusionar rama
git merge nombre-rama

# Eliminar rama local
git branch -d nombre-rama
```

## 📊 Reportes

### Reporte HTML

Después de ejecutar las pruebas, puedes ver el reporte HTML:

```bash
npm run test:report
```

El reporte incluye:
- ✅ Resumen de pruebas ejecutadas
- 📸 Screenshots de fallos
- 🎥 Videos de ejecución
- 📈 Métricas de rendimiento
- 🔍 Traces para debugging

### Reportes en CI/CD

El framework está configurado para generar reportes en formato:
- **HTML:** Para visualización humana
- **JSON:** Para integración con herramientas
- **JUnit:** Para integración con CI/CD

## 🚀 Integración CI/CD

### GitHub Actions

Crea `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npm test
    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
```

## 🐛 Debugging

### Modo Debug

```bash
# Ejecutar en modo debug
npm run test:debug

# Ejecutar prueba específica en debug
npx playwright test src/tests/example.spec.ts --debug
```

### Herramientas de Debug

- **Playwright Inspector:** Para debugging interactivo
- **Traces:** Para análisis detallado de ejecución
- **Screenshots:** Capturadas automáticamente en fallos
- **Videos:** Grabados en caso de fallos

## 📚 Recursos Adicionales

- [Documentación oficial de Playwright](https://playwright.dev/)
- [Guía de TypeScript](https://www.typescriptlang.org/docs/)
- [Mejores prácticas de testing](https://playwright.dev/docs/best-practices)
- [Page Object Model](https://playwright.dev/docs/pom)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 👥 Equipo

Desarrollado para el desafío de Light-It utilizando las mejores prácticas de automatización de pruebas.

---

**¡Happy Testing! 🎉**

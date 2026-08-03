# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.js >> Panel de Administración >> Admin Blog página carga
- Location: tests\admin.spec.js:47:3

# Error details

```
TimeoutError: page.waitForURL: Timeout 10000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e5]:
    - heading "TUAGENTE.PE" [level=1] [ref=e6]
    - paragraph [ref=e7]: Panel de Administración
  - generic [ref=e8]: "Failed to execute 'json' on 'Response': Unexpected end of JSON input"
  - generic [ref=e9]:
    - generic [ref=e10]:
      - generic [ref=e11]: Email
      - textbox "admin@tuagente.pe" [ref=e15]
    - generic [ref=e16]:
      - generic [ref=e17]: Contraseña
      - textbox "••••••••" [ref=e21]: admin123
    - button "Iniciar Sesión" [ref=e22] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const login = async (page) => {
  4  |   await page.goto('/login');
  5  |   await page.fill('input[type="email"]', 'admin@tuagente.pe');
  6  |   await page.fill('input[type="password"]', 'admin123');
  7  |   await page.click('button[type="submit"]');
> 8  |   await page.waitForURL(/admin/, { timeout: 10000 });
     |              ^ TimeoutError: page.waitForURL: Timeout 10000ms exceeded.
  9  | };
  10 | 
  11 | test.describe('Panel de Administración', () => {
  12 | 
  13 |   test('Login funciona con credenciales correctas', async ({ page }) => {
  14 |     await login(page);
  15 |     await expect(page).toHaveURL(/admin/);
  16 |   });
  17 | 
  18 |   test('Login falla con credenciales incorrectas', async ({ page }) => {
  19 |     await page.goto('/login');
  20 |     await page.fill('input[type="email"]', 'wrong@email.com');
  21 |     await page.fill('input[type="password"]', 'wrongpass');
  22 |     await page.click('button[type="submit"]');
  23 |     await page.waitForTimeout(2000);
  24 |     await expect(page).toHaveURL(/login/);
  25 |   });
  26 | 
  27 |   test('Dashboard muestra estadísticas', async ({ page }) => {
  28 |     await login(page);
  29 |     await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  30 |   });
  31 | 
  32 |   test('Admin Propiedades lista propiedades', async ({ page }) => {
  33 |     await login(page);
  34 |     await page.click('a[href="/admin/propiedades"]');
  35 |     await page.waitForTimeout(1000);
  36 |     await expect(page.getByRole('heading', { name: 'Propiedades' })).toBeVisible();
  37 |   });
  38 | 
  39 |   test('Admin Citas página carga', async ({ page }) => {
  40 |     await login(page);
  41 |     await page.click('a[href="/admin/citas"]');
  42 |     await page.waitForTimeout(1000);
  43 |     await expect(page.getByRole('heading', { name: 'Citas' })).toBeVisible();
  44 |     await expect(page.locator('text=Nueva Cita')).toBeVisible();
  45 |   });
  46 | 
  47 |   test('Admin Blog página carga', async ({ page }) => {
  48 |     await login(page);
  49 |     await page.click('a[href="/admin/blog"]');
  50 |     await page.waitForTimeout(1000);
  51 |     await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();
  52 |     await expect(page.locator('text=Nuevo Artículo')).toBeVisible();
  53 |   });
  54 | 
  55 |   test('Admin Blog muestra artículos existentes', async ({ page }) => {
  56 |     await login(page);
  57 |     await page.click('a[href="/admin/blog"]');
  58 |     await page.waitForTimeout(1000);
  59 |     await expect(page.getByRole('table').getByText('Santiago de Surco: El')).toBeVisible();
  60 |   });
  61 | 
  62 |   test('Admin Blog - abrir formulario de nuevo artículo', async ({ page }) => {
  63 |     await login(page);
  64 |     await page.click('a[href="/admin/blog"]');
  65 |     await page.waitForTimeout(1000);
  66 |     await page.click('a[href="/admin/blog/nuevo"]');
  67 |     await page.waitForTimeout(500);
  68 |     await expect(page.getByRole('heading', { name: 'Nuevo Artículo' })).toBeVisible();
  69 |   });
  70 | 
  71 |   test('Admin - sidebar tiene todas las secciones', async ({ page }) => {
  72 |     await login(page);
  73 |     const links = page.locator('a[href="/admin"], a[href="/admin/propiedades"], a[href="/admin/citas"], a[href="/admin/blog"], a[href="/admin/usuarios"]');
  74 |     await expect(links.first()).toBeVisible();
  75 |     const count = await links.count();
  76 |     expect(count).toBeGreaterThanOrEqual(5);
  77 |   });
  78 | 
  79 | });
  80 | 
```
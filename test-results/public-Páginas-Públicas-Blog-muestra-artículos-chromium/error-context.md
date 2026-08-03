# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public.spec.js >> Páginas Públicas >> Blog muestra artículos
- Location: tests\public.spec.js:23:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('a[href*="/blog/"]').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('a[href*="/blog/"]').first()

```

```yaml
- banner:
  - navigation:
    - link "TUAGENTE.PE":
      - /url: /
    - link "Inicio":
      - /url: /
    - link "Propiedades":
      - /url: /propiedades
      - text: Propiedades
      - img
    - link "Agentes":
      - /url: /agentes
    - link "Contacto":
      - /url: /contacto
    - link "Agenda tu visita":
      - /url: https://wa.me/51947859358?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20visita.
      - button "Agenda tu visita"
- main:
  - main:
    - heading "Blog" [level=1]
    - paragraph: Información inmobiliaria y consejos útiles
    - paragraph: No hay artículos disponibles.
- contentinfo:
  - link "TUAGENTE.PE":
    - /url: /
  - paragraph: Acompañamos a familias y empresas a encontrar la propiedad ideal en Lima desde 2014.
  - link:
    - /url: https://facebook.com/tuagente.pe
    - img
  - link:
    - /url: https://instagram.com/tuagente.pe
    - img
  - link:
    - /url: https://wa.me/51947859358
    - img
  - heading "Enlaces Rápidos" [level=3]
  - list:
    - listitem:
      - link "Inicio":
        - /url: /
    - listitem:
      - link "Propiedades":
        - /url: /propiedades
    - listitem:
      - link "Agentes":
        - /url: /agentes
    - listitem:
      - link "Contacto":
        - /url: /contacto
    - listitem:
      - link "Blog":
        - /url: /blog
  - heading "Tipos de Propiedad" [level=3]
  - list:
    - listitem:
      - link "Casas":
        - /url: /propiedades/casas
    - listitem:
      - link "Departamentos":
        - /url: /propiedades/departamentos
    - listitem:
      - link "Oficinas":
        - /url: /propiedades/oficinas
    - listitem:
      - link "Locales Comerciales":
        - /url: /propiedades/locales
    - listitem:
      - link "Lotes y Terrenos":
        - /url: /propiedades/lotes
  - heading "Contacto" [level=3]
  - img
  - text: Cll. Solidaridad Nro 105, Santiago de Surco, Lima
  - img
  - text: 947 859 358
  - img
  - text: contacto@tuagente.com.pe
  - heading "Newsletter" [level=4]
  - textbox "Tu email"
  - button "Suscribir"
  - paragraph: © 2026 TUAGENTE.PE. Todos los derechos reservados.
  - link "Política de Privacidad":
    - /url: /privacidad
  - link "Términos y Condiciones":
    - /url: /terminos
- link "Contactar por WhatsApp":
  - /url: https://wa.me/51947859358
  - img
  - text: Escríbenos por WhatsApp
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Páginas Públicas', () => {
  4  | 
  5  |   test('Home carga correctamente', async ({ page }) => {
  6  |     await page.goto('/');
  7  |     await expect(page).toHaveTitle(/TUAGENTE/);
  8  |     await expect(page.getByRole('navigation').getByRole('link', { name: 'TUAGENTE.PE' })).toBeVisible();
  9  |   });
  10 | 
  11 |   test('Navegación a Propiedades', async ({ page }) => {
  12 |     await page.goto('/');
  13 |     await page.click('a[href="/propiedades"]');
  14 |     await expect(page).toHaveURL(/propiedades/);
  15 |     await expect(page.getByRole('heading', { name: 'Propiedades' })).toBeVisible();
  16 |   });
  17 | 
  18 |   test('Navegación a Blog', async ({ page }) => {
  19 |     await page.goto('/blog');
  20 |     await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();
  21 |   });
  22 | 
  23 |   test('Blog muestra artículos', async ({ page }) => {
  24 |     await page.goto('/blog');
  25 |     await page.waitForTimeout(1000);
  26 |     const articles = page.locator('a[href*="/blog/"]');
> 27 |     await expect(articles.first()).toBeVisible();
     |                                    ^ Error: expect(locator).toBeVisible() failed
  28 |   });
  29 | 
  30 |   test('BlogPost carga correctamente', async ({ page }) => {
  31 |     await page.goto('/blog/santiago-de-surco');
  32 |     await expect(page.locator('h1')).toContainText('Santiago de Surco');
  33 |   });
  34 | 
  35 |   test('Navegación a Agentes', async ({ page }) => {
  36 |     await page.goto('/agentes');
  37 |     await expect(page.getByRole('heading', { name: 'Nuestros Agentes' })).toBeVisible();
  38 |   });
  39 | 
  40 |   test('Navegación a Contacto', async ({ page }) => {
  41 |     await page.goto('/contacto');
  42 |     await expect(page.locator('h1').first()).toContainText('Contacto');
  43 |   });
  44 | 
  45 |   test('Contacto tiene formulario', async ({ page }) => {
  46 |     await page.goto('/contacto');
  47 |     await expect(page.getByRole('textbox', { name: 'tu@email.com' })).toBeVisible();
  48 |     await expect(page.locator('textarea').first()).toBeVisible();
  49 |   });
  50 | 
  51 |   test('Login page carga', async ({ page }) => {
  52 |     await page.goto('/login');
  53 |     await expect(page.locator('text=Panel de Administración')).toBeVisible();
  54 |     await expect(page.locator('input[type="email"]')).toBeVisible();
  55 |   });
  56 | 
  57 |   test('Propiedad detail carga', async ({ page }) => {
  58 |     await page.goto('/propiedad/1');
  59 |     await page.waitForTimeout(1000);
  60 |     await expect(page.locator('text=Contactar Agente')).toBeVisible();
  61 |   });
  62 | 
  63 |   test('Botón WhatsApp flotante visible', async ({ page }) => {
  64 |     await page.goto('/');
  65 |     await expect(page.getByRole('link', { name: 'Contactar por WhatsApp' })).toBeVisible();
  66 |   });
  67 | 
  68 |   test('Header "Agenda tu visita"链接 existe', async ({ page }) => {
  69 |     await page.goto('/');
  70 |     await expect(page.getByRole('navigation').getByRole('link', { name: 'Agenda tu visita' })).toBeVisible();
  71 |   });
  72 | 
  73 | });
  74 | 
```
import { test, expect } from '@playwright/test';

test.describe('Páginas Públicas', () => {

  test('Home carga correctamente', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/TUAGENTE/);
    await expect(page.getByRole('navigation').getByRole('link', { name: 'TUAGENTE.PE' })).toBeVisible();
  });

  test('Navegación a Propiedades', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/propiedades"]');
    await expect(page).toHaveURL(/propiedades/);
    await expect(page.getByRole('heading', { name: 'Propiedades' })).toBeVisible();
  });

  test('Navegación a Blog', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();
  });

  test('Blog muestra artículos', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForTimeout(1000);
    const articles = page.locator('a[href*="/blog/"]');
    await expect(articles.first()).toBeVisible();
  });

  test('BlogPost carga correctamente', async ({ page }) => {
    await page.goto('/blog/santiago-de-surco');
    await expect(page.locator('h1')).toContainText('Santiago de Surco');
  });

  test('Navegación a Agentes', async ({ page }) => {
    await page.goto('/agentes');
    await expect(page.getByRole('heading', { name: 'Nuestros Agentes' })).toBeVisible();
  });

  test('Navegación a Contacto', async ({ page }) => {
    await page.goto('/contacto');
    await expect(page.locator('h1').first()).toContainText('Contacto');
  });

  test('Contacto tiene formulario', async ({ page }) => {
    await page.goto('/contacto');
    await expect(page.getByRole('textbox', { name: 'tu@email.com' })).toBeVisible();
    await expect(page.locator('textarea').first()).toBeVisible();
  });

  test('Login page carga', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('text=Panel de Administración')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test('Propiedad detail carga', async ({ page }) => {
    await page.goto('/propiedad/1');
    await page.waitForTimeout(1000);
    await expect(page.locator('text=Contactar Agente')).toBeVisible();
  });

  test('Botón WhatsApp flotante visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Contactar por WhatsApp' })).toBeVisible();
  });

  test('Header "Agenda tu visita"链接 existe', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Agenda tu visita' })).toBeVisible();
  });

});

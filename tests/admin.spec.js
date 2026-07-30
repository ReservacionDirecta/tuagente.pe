import { test, expect } from '@playwright/test';

const login = async (page) => {
  await page.goto('/login');
  await page.fill('input[type="email"]', 'admin@tuagente.pe');
  await page.fill('input[type="password"]', 'admin123');
  await page.click('button[type="submit"]');
  await page.waitForURL(/admin/, { timeout: 10000 });
};

test.describe('Panel de Administración', () => {

  test('Login funciona con credenciales correctas', async ({ page }) => {
    await login(page);
    await expect(page).toHaveURL(/admin/);
  });

  test('Login falla con credenciales incorrectas', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', 'wrong@email.com');
    await page.fill('input[type="password"]', 'wrongpass');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(/login/);
  });

  test('Dashboard muestra estadísticas', async ({ page }) => {
    await login(page);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('Admin Propiedades lista propiedades', async ({ page }) => {
    await login(page);
    await page.click('a[href="/admin/propiedades"]');
    await page.waitForTimeout(1000);
    await expect(page.getByRole('heading', { name: 'Propiedades' })).toBeVisible();
  });

  test('Admin Citas página carga', async ({ page }) => {
    await login(page);
    await page.click('a[href="/admin/citas"]');
    await page.waitForTimeout(1000);
    await expect(page.getByRole('heading', { name: 'Citas' })).toBeVisible();
    await expect(page.locator('text=Nueva Cita')).toBeVisible();
  });

  test('Admin Blog página carga', async ({ page }) => {
    await login(page);
    await page.click('a[href="/admin/blog"]');
    await page.waitForTimeout(1000);
    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();
    await expect(page.locator('text=Nuevo Artículo')).toBeVisible();
  });

  test('Admin Blog muestra artículos existentes', async ({ page }) => {
    await login(page);
    await page.click('a[href="/admin/blog"]');
    await page.waitForTimeout(1000);
    await expect(page.getByRole('table').getByText('Santiago de Surco: El')).toBeVisible();
  });

  test('Admin Blog - abrir formulario de nuevo artículo', async ({ page }) => {
    await login(page);
    await page.click('a[href="/admin/blog"]');
    await page.waitForTimeout(1000);
    await page.click('a[href="/admin/blog/nuevo"]');
    await page.waitForTimeout(500);
    await expect(page.getByRole('heading', { name: 'Nuevo Artículo' })).toBeVisible();
  });

  test('Admin - sidebar tiene todas las secciones', async ({ page }) => {
    await login(page);
    const links = page.locator('a[href="/admin"], a[href="/admin/propiedades"], a[href="/admin/citas"], a[href="/admin/blog"], a[href="/admin/usuarios"]');
    await expect(links.first()).toBeVisible();
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

});

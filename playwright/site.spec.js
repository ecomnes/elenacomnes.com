import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page, baseURL }) => {
  await page.route('**/*', route => new URL(route.request().url()).origin === baseURL
    ? route.continue()
    : route.abort())
})

test('the homepage links to the contact section', async ({ page }) => {
  expect((await page.goto('/'))?.status()).toBe(200)
  await expect(page.getByRole('heading', { name: 'Bienvenue!' })).toBeVisible()
  await page.getByRole('navigation').getByRole('link', { name: 'Elena Comnes' }).click()
  await expect(page).toHaveURL('/#contact')
  await expect(page.getByRole('link', { name: 'hi@elenacomnes.com' })).toHaveAttribute('href', 'mailto:hi@elenacomnes.com')
})

test('the portfolio gallery opens a photo and closes with Escape', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'look‑1', exact: true }).click()

  const lightbox = page.locator('.pswp')
  await expect(lightbox).toBeVisible()
  await expect(lightbox.locator('img.pswp__img[src$="look-1.webp"]')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(lightbox).toBeHidden()
})

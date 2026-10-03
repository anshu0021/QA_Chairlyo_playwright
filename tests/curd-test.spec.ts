import { test, expect, Page } from '@playwright/test';

test.describe.serial('CRUD Operations Suite', () => {
  let page: Page;

  const testUser = {
    name: 'Rahul Sharma',
    email: `rahul_${Date.now()}@test.com`,
    updatedName: 'Rahul Sharma Updated',
  };

  // Run login ONLY ONCE before all CRUD tests
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://qa03.stage.chairlyo.com/');

    await page.getByLabel('Email*').fill('skilladmin@test.com');
    await page.locator('[name="password"]').fill('skill@123');
    await page.getByRole('button', { name: 'Log in' }).click();

    // Wait until login completes and page navigates
    await page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
  });

  test.afterAll(async () => {
    await page.close();
  });

  // 1. CREATE Operation
  test('CREATE - Should add a new user', async () => {
    const addButton = page.getByRole('button', { name: /add/i }).first();
    await expect(addButton).toBeVisible({ timeout: 15000 });
    await addButton.click();

    await page.getByLabel(/name/i).fill(testUser.name);
    await page.getByLabel(/email/i).fill(testUser.email);
    await page.getByRole('button', { name: /save|submit|create/i }).click();
  });

  // 2. READ Operation
  test('READ - Should search and display user details', async () => {
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]').first();
    await expect(searchInput).toBeVisible({ timeout: 15000 });

    await searchInput.fill(testUser.name);
    await page.keyboard.press('Enter');

    await expect(page.getByText(testUser.name).first()).toBeVisible();
  });

  // 3. UPDATE Operation
  test('UPDATE - Should edit existing user details', async () => {
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]').first();
    await expect(searchInput).toBeVisible({ timeout: 15000 });
    await searchInput.fill(testUser.name);

    const userRow = page.locator('tr, div').filter({ hasText: testUser.name }).first();
    const editButton = userRow.getByRole('button', { name: /edit/i });

    await expect(editButton).toBeVisible({ timeout: 15000 });
    await editButton.click();

    const nameInput = page.getByLabel(/name/i);
    await nameInput.clear();
    await nameInput.fill(testUser.updatedName);
    await page.getByRole('button', { name: /save|update/i }).click();
  });

  // 4. DELETE Operation
  test('DELETE - Should remove user from the system', async () => {
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]').first();
    await expect(searchInput).toBeVisible({ timeout: 15000 });
    await searchInput.fill(testUser.updatedName);

    const userRow = page.locator('tr, div').filter({ hasText: testUser.updatedName }).first();
    const deleteButton = userRow.getByRole('button', { name: /delete|remove/i });

    await expect(deleteButton).toBeVisible({ timeout: 15000 });
    await deleteButton.click();

    const confirmButton = page.getByRole('button', { name: /confirm|yes|ok/i });
    if (await confirmButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await confirmButton.click();
    }
  });

});

// import { test, expect } from '@playwright/test';

// test.describe.serial('CRUD Operations Suite', () => {

//   const testUser = {
//     name: 'Rahul Sharma',
//     email: `rahul_${Date.now()}@test.com`,
//     updatedName: 'Rahul Sharma Updated',
//   };

//   test.beforeEach(async ({ page }) => {
//     // 1. Login page ma jane
//     await page.goto('https://qa03.stage.chairlyo.com/');

//     // 2. Credentials fill garne
//     await page.getByLabel('Email*').fill('skilladmin@test.com');
//     await page.locator('[name="password"]').fill('skill@123');
//     await page.getByRole('button', { name: 'Log in' }).click();

//     // 3. FIX: Network request finish na-hunjel ra dashboard element / toast message na-aunsamma wait garne
//     await page.waitForLoadState('networkidle');
    
//     // Yadi app ma 'Login successful!' text aauchha bhane teslai wait garne
//     await expect(page.getByText(/login successful/i).first()).toBeVisible({ timeout: 15000 }).catch(() => {});
//   });

//   // 1. CREATE Operation
//   test('CREATE - Should add a new user successfully', async ({ page }) => {
//     const addButton = page.getByRole('button', { name: /add/i }).first();
//     await expect(addButton).toBeVisible({ timeout: 15000 });
//     await addButton.click();

//     await page.getByLabel(/name/i).fill(testUser.name);
//     await page.getByLabel(/email/i).fill(testUser.email);
    
//     await page.getByRole('button', { name: /save|submit|create/i }).click();
//   });

//   // 2. READ Operation
//   test('READ - Should search and display user details', async ({ page }) => {
//     const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]').first();
//     await expect(searchInput).toBeVisible({ timeout: 15000 });
    
//     await searchInput.fill(testUser.name);
//     await page.keyboard.press('Enter');

//     await expect(page.getByText(testUser.name).first()).toBeVisible();
//   });

//   // 3. UPDATE Operation
//   test('UPDATE - Should edit existing user details', async ({ page }) => {
//     const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]').first();
//     await expect(searchInput).toBeVisible({ timeout: 15000 });
//     await searchInput.fill(testUser.name);

//     const userRow = page.locator('tr, div').filter({ hasText: testUser.name }).first();
//     const editButton = userRow.getByRole('button', { name: /edit/i });
    
//     await expect(editButton).toBeVisible({ timeout: 15000 });
//     await editButton.click();

//     const nameInput = page.getByLabel(/name/i);
//     await nameInput.clear();
//     await nameInput.fill(testUser.updatedName);
//     await page.getByRole('button', { name: /save|update/i }).click();
//   });

//   // 4. DELETE Operation
//   test('DELETE - Should remove user from the system', async ({ page }) => {
//     const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]').first();
//     await expect(searchInput).toBeVisible({ timeout: 15000 });
//     await searchInput.fill(testUser.updatedName);

//     const userRow = page.locator('tr, div').filter({ hasText: testUser.updatedName }).first();
//     const deleteButton = userRow.getByRole('button', { name: /delete|remove/i });
    
//     await expect(deleteButton).toBeVisible({ timeout: 15000 });
//     await deleteButton.click();

//     const confirmButton = page.getByRole('button', { name: /confirm|yes|ok/i });
//     if (await confirmButton.isVisible({ timeout: 3000 }).catch(() => false)) {
//       await confirmButton.click();
//     }
//   });

// });
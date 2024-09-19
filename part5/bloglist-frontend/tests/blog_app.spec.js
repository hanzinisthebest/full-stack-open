import { test, expect,request } from '@playwright/test';
test.describe('blog app', () => {
    let requestContext;

    test.beforeAll(async ({ playwright }) => {
        requestContext = await playwright.request.newContext();
    });

    test.beforeEach(async ({ page }) => {
        // Reset the database
        await requestContext.post('http://localhost:3003/api/testing/reset');
        // Create a user
        await requestContext.post('http://localhost:3003/api/users', {
          data: {
            name: 'motty',
            username: 'motty25',
            password: '12345mhn'
          }
        });

        await page.goto('http://localhost:5173');
    });

    test('user can login', async ({ page }) => {
        await page.goto('http://localhost:5173')
        await page.getByRole('button', { name: 'log in' }).click()
        await page.getByTestId('username').fill('motty25')
        await page.getByTestId('password').fill('12345mhn')
        await page.getByRole('button', { name: 'login' }).click()
      
        await expect(page.getByText('Welcome motty25')).toBeVisible()
    })

    test.describe('when logged in', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('http://localhost:5173')
            await page.getByRole('button', { name: 'log in' }).click()
            await page.getByTestId('username').fill('motty25')
            await page.getByTestId('password').fill('12345mhn')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('Welcome motty25')).toBeVisible()

        })

        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'cancel' }).click()
            await page.getByRole('button', { name: 'new blog' }).click()
            await page.getByPlaceholder('title').fill('testing blog')
            await page.getByPlaceholder('author').fill('tester')
            await page.getByPlaceholder('url').fill('www.testing.com')
            await page.getByRole('button', { name: 'create' }).click()
            await expect(page.getByText('a new blog testing blog by tester added')).toBeVisible()
        })

        test ('a blog can be liked', async ({ page }) => {
            await page.getByRole('button', { name: 'cancel' }).click()
            await page.getByRole('button', { name: 'new blog' }).click()
            await page.getByPlaceholder('title').fill('new testing blog')
            await page.getByPlaceholder('author').fill('new tester')
            await page.getByPlaceholder('url').fill('www.newtesting.com')
            await page.getByRole('button', { name: 'create' }).click()
            await expect(page.getByText('a new blog new testing blog by new tester added')).toBeVisible()

            await page.getByTestId('view-new testing blog').click()

            await expect(page.getByText('likes 0')).toBeVisible()

            await page.getByTestId('like-new testing blog').click()

            await expect(page.getByText('likes 1')).toBeVisible()
        })
        test('a blog can deleted', async ({ page }) => {
            await page.getByRole('button', { name: 'cancel' }).click()
            await page.getByRole('button', { name: 'new blog' }).click()
            await page.getByPlaceholder('title').fill('new1 testing blog')
            await page.getByPlaceholder('author').fill('new1 tester1')
            await page.getByPlaceholder('url').fill('www.newtesting1.com')
            await page.getByRole('button', { name: 'create' }).click()
            await expect(page.getByText('a new blog new testing1 blog by new tester1 added')).toBeVisible()

            await page.getByTestId('remove-new testing1 blog').click()

            page.on('dialog', dialog => dialog.accept());
            await page.getByRole('button').click();

            await expect(page.getByText('new testing1 blog by new tester1')).not.toBeVisible()    
    })
    })
    test('login fails with wrong password', async ({ page }) => {
        await page.getByRole('button', { name: 'log in' }).click()
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('wrong')
        await page.getByRole('button', { name: 'login' }).click()
    
        await expect(page.getByText('wrong credentials')).toBeVisible()
      })

      test.afterAll(async () => {
        await requestContext.dispose();
    });
    
})


    
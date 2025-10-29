import { test, expect } from '@playwright/test';
import { LoginPage } from '../main/Pages/LoginPage';
import { ProductsPage } from '../main/Pages/ProductsPage';
import { CartPage } from '../main/Pages/CartPage';
import { CheckoutPage } from '../main/Pages/CheckoutPage';
import { NavBar } from '../main/NavBar'

import userData from '../resources/users.json' with { type: 'json' };
import productData from '../resources/products.json' with { type: 'json' };

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const standardUser = userData.standard;

    loginPage.navigateTo();
    loginPage.loginUser(standardUser.username, standardUser.password);
    
    await expect(page).toHaveURL('inventory.html', {timeout: 10000}); 
});

test('user should be able to add items to cart, successfully checkout, & successfully logout', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'testrail_case_field', description: 'Simple user checkout'})
    
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    //Add items to cart
    testInfo.annotations.push({ type: 'testrail_case_comment', description: '1. Add items to Cart'});
    productsPage.addBackpackToCart();
    await page.waitForLoadState('networkidle', {timeout: 5_000});
    productsPage.addBikeLightToCart();
    productsPage.navigateToShopppingCart();
    await expect(page).toHaveURL('cart.html');

    //Verify cart contains correct items
    testInfo.annotations.push({ type: 'testrail_case_comment', description: '2. Verify items in cart'});
    const itemsInCart = cartPage.itemsInCart;
    await expect(itemsInCart).toHaveCount(2);
    await expect(itemsInCart.locator(cartPage.cartInventoryName))
    .toHaveText([productData.backpack.inventoryName, productData.bikeLight.inventoryName]);

    //Continue to checkout
    testInfo.annotations.push({ type: 'testrail_case_comment', description: '3. Continue to checkout'});
    const checkoutPage = new CheckoutPage(page);
    const standardUser = userData.standard;

    cartPage.checkout();
    await expect(page).toHaveURL('checkout-step-one.html');
    await expect(checkoutPage.firstNameField).toBeVisible();
    await expect(async () => {
          checkoutPage.fillOutCheckoutForm(standardUser.firstName, standardUser.lastName, standardUser.zipCode);
          await expect(checkoutPage.firstNameField).toHaveValue(standardUser.firstName);
          await expect(checkoutPage.lastNameField).toHaveValue(standardUser.lastName);
          await expect(checkoutPage.zipCodeField).toHaveValue(standardUser.zipCode);
    }).toPass({timeout: 10_000});
    checkoutPage.submitCheckoutForm();
    await expect(page).toHaveURL('checkout-step-two.html');

    //Finish checkout
    testInfo.annotations.push({ type: 'testrail_case_comment', description: '4. Finish/Complete checkout'});

    checkoutPage.finishCheckout();
    await expect(page).toHaveURL('checkout-complete.html')

    //Verify successful checkout message
    testInfo.annotations.push({ type: 'testrail_case_comment', description: '5. Verify succesful checkout'});
    expect(checkoutPage.completeMessageHeader).toHaveText('Thank you for your order!');

    //Logout
    const navBar = new NavBar(page);
    navBar.openNavBar();
    navBar.navigateToLogoutPage();
    await expect(page).toHaveURL('/');
});

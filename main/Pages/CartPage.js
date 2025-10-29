export class CartPage {
    constructor(page) {
        this.page = page;
        this.itemsInCart = page.getByTestId('inventory-item');
        this.checkoutButton = page.getByTestId('checkout');
        this.cartInventoryName = page.getByTestId('inventory-item-name');
    }

    async checkout() {
        await this.page.getByRole('button').and(this.checkoutButton).click();
    }
}

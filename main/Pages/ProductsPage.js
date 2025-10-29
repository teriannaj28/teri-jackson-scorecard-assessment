export class ProductsPage {
    constructor(page) {
        this.page = page;
        this.backPackProduct = page.getByTestId('add-to-cart-sauce-labs-backpack');
        this.bikeLight = page.getByTestId('add-to-cart-sauce-labs-bike-light');
        this.boltTshirt = page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt');
        this.fleeceJacket = page.getByTestId('add-to-cart-sauce-labs-fleece-jacket');
        this.onesie = page.getByTestId('add-to-cart-sauce-labs-onesie');
        this.shoppingCart = page.getByTestId('shopping-cart-link');
        this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
    }

    async addBackpackToCart() {
        await this.page.getByRole('button').and(this.backPackProduct).click();
    }

    async addBikeLightToCart() {
        await this.page.getByRole('button').and(this.bikeLight).click();
    }
    async addBoltTshirtToCart() {
        await this.page.getByRole('button').and(this.boltTshirt).click();
    }
    async addFleeceJacketToCart() {
        await this.page.getByRole('button').and(this.fleeceJacket).click();
    }
    async addOnesieToCart() {
        await this.page.getByRole('button').and(this.onesie).click();
    }

    getShoppingCartBadge() {
        return this.shoppingCartBadge;
    }

    async navigateToShopppingCart() {
        await this.shoppingCart.click();
    }
}

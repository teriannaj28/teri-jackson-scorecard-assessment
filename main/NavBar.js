export class NavBar {
    constructor(page) {
        this.page = page;
        this.hamburgerButton = page.locator('#react-burger-menu-btn');
        this.allItemsLink = page.getByTestId('inventory-sidebar-link');
        this.aboutLink = page.getByTestId('about-sidebar-link');
        this.logoutLink = page.getByTestId('logout-sidebar-link');
        this.resetAppLink = page.getByTestId('reset-sidebar-link');
    }

    async openNavBar() {
        await this.page.getByRole('button').and(this.hamburgerButton).click();
    }

    async navigateToAllItems() {
       await this.page.getByRole('link').and(this.allItemsLink).click();
    }
    async navigateToAboutPage() {
       await this.page.getByRole('link').and(this.aboutLink).click();
    }
    async navigateToLogoutPage() {
       await this.page.getByRole('link').and(this.logoutLink).click();
    }
    async resetAppState() {
       await this.page.getByRole('link').and(this.resetAppLink).click();
    }
}

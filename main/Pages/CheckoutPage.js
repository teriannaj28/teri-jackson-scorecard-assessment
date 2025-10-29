export class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstNameField = page.getByTestId('firstName');
        this.lastNameField = page.getByTestId('lastName');
        this.zipCodeField = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.finishButton = page.getByTestId('finish');
        this.completeMessageHeader = page.getByTestId('complete-header');
    }

    async fillOutCheckoutForm(firstName, lastName, postal) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.zipCodeField.fill(postal);
    }
    async submitCheckoutForm() {
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.page.getByRole('button').and(this.finishButton).click();
    }
}

export class LoginPage {
    constructor (page) {
        this.page = page;
        this.usernameField =  page.getByTestId('username');
        this.passwordField =  page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
    }

    async navigateTo() {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }

    async loginUser(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}

require("chromedriver");
const { Builder, By, until } = require("selenium-webdriver");

(async function openChromeTest() {
    // Open chrome browser
    let driver = await new Builder().forBrowser("chrome").build();
    let testPassed = false;

    try {
        // Go to website
        await driver.get("https://the-internet.herokuapp.com/login");

        // Find the elements of the form for entering a login and password
        let usernameField = await driver.findElement(By.id('username'));
        let passwordField = await driver.findElement(By.id('password'));
        let loginButton = await driver.findElement(By.css("button[type='submit']"));

        // Enter valid data
        await usernameField.sendKeys('tomsmith');
        await passwordField.sendKeys('SuperSecretPassword!');

        // Click the login button
        await loginButton.click();

        // Verify that the login is successful
        let welcomeMessage = await driver.findElement(By.id('flash-messages'));
        let isDisplayed = await welcomeMessage.isDisplayed();
        console.assert(isDisplayed, 'Login failed');
        
        // If assertion passed, test is successful
        testPassed = true;

    } catch (error) {
        console.error('Error during test execution:', error);
    } finally {
        // Close the chrome browser
        await driver.quit();

        // Print test result
        if (testPassed) {
            console.log('Test passed successfully.');
        } else {
            console.log('Test encountered errors.');
        }
    }
})();


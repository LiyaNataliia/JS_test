// import chromedriver so that selenium can by itself open a chrome driver
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const { Builder, By } = require("selenium-webdriver");

async function testLoginForm(browserName) {
  let driver;

  switch (browserName) {
    case "chrome":
      let chromeOptions = new chrome.Options();
      // Add any Chrome-specific options if needed
      driver = await new Builder().forBrowser("chrome").setChromeOptions(chromeOptions).build();
      break;

    case "firefox":
      let firefoxOptions = new firefox.Options();
      // Add any Firefox-specific options if needed
      driver = await new Builder().forBrowser("firefox").setFirefoxOptions(firefoxOptions).build();
      break;

    default:
      throw new Error(`Unsupported browser: ${browserName}`);
  }

  try {
    // Go to website
    await driver.get("https://the-internet.herokuapp.com/login");

    // Find login form elements
    let usernameField = await driver.findElement(By.id('username'));
    let passwordField = await driver.findElement(By.id('password'));
    let loginButton = await driver.findElement(By.css("button[type='submit']"));

    // Enter valid credentials
    await usernameField.sendKeys('tomsmith');
    await passwordField.sendKeys('SuperSecretPassword!');

    // Click login button
    await loginButton.click();

    // Check if login is successful, for example, by checking the presence of an element that appears after login
    let welcomeMessage = await driver.findElement(By.id('flash-messages'));
    let isDisplayed = await welcomeMessage.isDisplayed();
    console.assert(isDisplayed, 'Login failed in ' + browserName);

  } finally {
    // Close the browser
    await driver.quit();
  }
}

async function runTests() {
  try {
    // Run tests on Chrome
    console.log("Testing login form in Chrome...");
    await testLoginForm("chrome");

    // Run tests on Firefox
    console.log("Testing login form in Firefox...");
    await testLoginForm("firefox");

    console.log("All tests completed successfully!");
  } catch (error) {
    console.error("Test failed:", error);
  }
}

// Start running the tests
runTests();

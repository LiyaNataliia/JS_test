require('chromedriver');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function measureLoadTime(url, attempts) {
    let totalLoadTime = 0;

    for (let i = 0; i < attempts; i++) {
        const driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options())
            .build();

        try {
            // Create a CDP (Chrome DevTools Protocol) session
            const cdpSession = await driver.createCDPConnection('page');

            // Enable network emulation
            await cdpSession.send('Network.enable');
            await cdpSession.send('Network.emulateNetworkConditions', {
                offline: false,
                latency: 200, // 200 ms latency
                downloadThroughput: 780 * 1024 / 8, // 780 kbps
                uploadThroughput: 330 * 1024 / 8 // 330 kbps
            });

            const start = new Date().getTime();
            await driver.get(url);
            await driver.wait(until.elementLocated(By.id('login')), 10000);
            const end = new Date().getTime();
            const loadTime = end - start;
            totalLoadTime += loadTime;
            console.log(`Attempt ${i + 1}: ${loadTime} ms`);
        } finally {
            await driver.quit();
        }
    }

    return totalLoadTime / attempts;
}

const url = 'https://the-internet.herokuapp.com/login';
const attempts = 100;

measureLoadTime(url, attempts).then(avgLoadTime => {
    console.log(`Average loading time with throttling: ${avgLoadTime} ms`);
}).catch(err => {
    console.error('Error during loading time measurement with throttling:', err);
});

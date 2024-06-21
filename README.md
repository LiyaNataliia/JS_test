# JS Tests

## Description

This project is an example of using Selenium WebDriver to automate tests on a login page. The project includes several test scripts that verify various aspects of the functionality and performance of the page.

## Contents

- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Scripts](#test-scripts)
- [Dependencies](#dependencies)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/LiyaNataliia/JS_test
    cd JS_test
    ```

2. Install the necessary dependencies.

## Running Tests

To run the tests, use the following commands:

1. Run the positive login test:
    ```bash
    node loginPositiveTest.js
    ```

2. Run the compatibility test:
    ```bash
    node compatibilityTest.js
    ```

3. Run the load time measurement test with slow internet connection:
    ```bash
    node measureLoadTimeWithThrottling.js
    ```

## Automatic Test Execution

You can automatically run all tests using the `run_tests.sh` script. This will execute each test once and output the results. 
To execute the script, run:

```bash
bash run_tests.sh
```

## Test Scripts

Description of Test Scripts:

1. loginPositiveTest.js: Verifies successful login to the page.
   
2. compatibilityTest.js: Checks the compatibility of the page with different browsers.
   
3. measureLoadTimeWithThrottling.js: Measures the page load time under low internet speed conditions.

## Dependencies

The project uses the following main dependencies:

- Selenium WebDriver
- chromedriver
- geckodriver

# Cypress testing Suite




## Description
This project contains end-to-end tests for the application using Cypress. Cypress is a powerful, easy-to-use testing framework for front-end testing, allowing us to test user interactions, API responses, and more in an efficient and reliable way.

## Table of Contents

**Getting Started**

**Project Structure**

**Cypress configuration**

**Writing Tests**

**Running Tests**

**Git repo link**

**Video submission link**






### Getting Started

 **Prerequisites**
 
*-- Node.js (v14 or later recommended) --*

*-- Cypress (v10 or later)--*

**Make sure Node.js is installed by running**

```
node -v
```

### Installation

1. Clone the repository
```
git clone  CYPRESS-CHALLENGE
cd CYPRESS-CHALLENGE

```

2. Install dependencies

```
npm install
npm install cypress
```

### Project Structure

Cypress test files are typically organized under the cypress/ directory:

cypress/e2e/: Contains all end-to-end (e2e) test files.

cypress/fixtures/: Holds static data or mock data used in tests.

cypress/support/: Contains custom commands and setup files.





### Cypress Configuration

 1. Ensure your Cypress configuration (typically in cypress.config.js) includes separate setups for component and e2e tests. This is usually specified like this:


```
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Configuration specific to e2e tests
    setupNodeEvents(on, config) {
      // e2e plugins or setup
    },
  },
  component: {
    // Configuration specific to component tests
    setupNodeEvents(on, config) {
      // component testing plugins or setup
    },
  },
});

```


### Writing tests

Basic Example

Here’s an example of a simple Cypress test to check that the homepage loads correctly:

```
describe('Homepage', () => {
  it('should load successfully', () => {
    cy.visit('/');
    cy.contains('Welcome'); // Example assertion
  });
});
```

### Network Requests

To wait for a network request, set up an alias and use cy.wait():

javascript
```
cy.intercept('GET', '/api/questions').as('getQuestions');
cy.wait('@getQuestions');
```

### Delays

To add a fixed delay, use cy.wait() with a duration in milliseconds:

javascript
```
cy.wait(1000); // Waits for 1 second

```

### Running Tests

#### Open Cypress Test Runner

#### To open the interactive Cypress test runner, use:

```

Copy code
npx cypress open
```

-- This opens the Cypress dashboard, where you can run tests in an interactive browser environment.

### testing in CLI

our testing should use Cypress to run both the component tests and the end-to-end tests. The testing will be invoked using the following command:

```
npm run test

```


**In Cypress, if you want to run component tests from the CLI instead of end-to-end (e2e) tests, you can configure Cypress to differentiate between these test types. Here’s how to run component tests specifically**

### Set Up Separate Test Scripts in package.json

We ahve to  add a script in the root  package.json to explicitly run component tests:
```
json
{
  "scripts": {
    "test:e2e": "cypress run --e2e",
    "test:component": "cypress run --component"
  }
}
```



### Video submission link

Please feel free to find the vidoe submission link here:



### Git repo link:

 
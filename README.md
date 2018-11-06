# YET ANOTHER REACT INITIAL SETUP (YARIS)

## Stack


* React 16.6
* Babel 7
* Webpack 4
* React-Router V4
* Jest, for unit tests
* Cypress, for integration tests
* I18n
* redux-thunk
* redux-form
* lodash
* LESS and SCSS support
* ... and it works offline!


## Installation

`npm install -g yarn && yarn` and BOOOM!


## Run & Generate

**Development mode**

    yarn start

... and access http://localhost:8080

You may want to change the port, in case 8080 is already taken. For instance:

    PORT=8081 yarn start

... will start the server at port 8081.

**Build Web package**

    yarn build

The files will be located in the `dist` folder. To check bundle size, open the file `dist/bundle-analyzer.html` in the browser.


**Deploy**

Comming soon...


## Tests

The project is covered by tests using Jest and [Cypress](https://cypress.io).

To unit tests, execute:

    yarn test

Please refer to [jest-cli documentation](https://jestjs.io/docs/en/cli) to see the available parameters that can be appended to the command above.


... and integration tests with:

    yarn test:e2e:ci

Make sure port 8080 is free to run the e2e server.

## Known issues

* Bundle size is very big since `react-i18nify` (required by `react-redux-i18n`) requires `moment` (urrgghh)... we should try `react-i18next`.
* Remove `redux-logger` from production bundle
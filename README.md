# express-checkout

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Express Checkout is an abstraction for third-party express checkout providers such as PayPal Express and Amazon Pay.
For more details please check the official documentation:

https://www.optile.io/express-checkout

## Prerequisites
* node - for installation visit https://nodejs.org/en/download/

* npm - for installation visit https://www.npmjs.com/get-npm


## Steps to run demo that present the component usage

`npm install`

`npm start`

Open http://localhost:3000/

## Steps to build the component

`npm install`

`npm run build`

## Steps to run test cases

`npm test`


[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

## How to implement

TODO: Update if something change later

```javascript
import React from "react";
import { render } from "react-dom";

import ExpressCheckout from "express-checkout";
const attributes = {
    configuration: {
        baseURL: "....",
        clientId: "....",
        country: "DE",
        paymentMethodsConfiguration: [],
    },
    createTransactionDetails: function(requestData) {
        return {
            transactionId: "tr-" + new Date().getTime(),
            country: "DE",
            providerRequest: requestData,
            payment: {
                amount: 2,
                currency: "EUR",
                reference: "Payment #1",
                longReference: {
                    essential: "Thank you for your purchase!",
                },
            },
            products: [
                {
                    name: "product 1 (green)",
                    amount: 2,
                },
            ],
        };
    },
    customFunctions: {
        // getExpressList: ({ url, clientId, country }) => console.log(""), // Get the List of Networks
        // createExpressPreset: ({ url, transaction, network, clientId }) => console.log(""), // Creates Express Preset,
        // updateExpressPreset: ({ url, transaction, network }) => console.log(""), // Update Express Preset,
        // confirmExpressPreset: ({ url, network }) => console.log(""),

        // onProceed: preset => console.log(preset),
        // onAbort: (preset, step) => console.log(preset, step)
        // onReload: (preset, step) => console.log(preset, step)
        // onRetry: (preset, step) => console.log(preset, step)
        // onClientException: (preset, step) => console.log(preset, step)
        // onCustomerAbort: (preset) => console.log('Canceled by user'),
    },
};
const Demo = () => {
    const attributes = getAttributes();

    return (
        <div>
            <h1>Merchant Demo</h1>
            <ExpressCheckout {...attributes} />
        </div>
    );
};

render(<Demo />, document.querySelector("#demo"));
```

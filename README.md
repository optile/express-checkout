# Express Checkout

Express Checkout is an abstraction for third-party express checkout providers such as PayPal Express and Amazon Pay.
For more details please check the official documentation:

<https://www.optile.io/express-checkout>

<br/>
<br/>

---
<br/>
<br/>

## Prerequisites
* node - for installation see <https://nodejs.org/en/download/>

* npm - for installation see <https://www.npmjs.com/get-npm>

* An existing optile merchant - see <https://optile.net>

* Create a Merchant Token - see <https://optile.io>

* Create Merchant Application and make sure to pass correct URL for (returnUrl, cancelUrl, summaryUrl, notificationUrl) - see <https://optile.io>


<br/>
<br/>

---
<br/>
<br/>

## Demos

3 demos are available for different use-cases:

* React implementation with a regular redirect (summary page on a separate URL), no overriding of customFunctions. The demo is located inside this project under `/demo`

* React implementation for a single page application (replacing regular redirect with react-router-dom).  The demo is located [here](https://github.com/optile/demo-express-checkout-react-spa)

* UMD implementation with a regular redirect. The demo is located [here](https://github.com/optile/demo-express-checkout-redirect)

## How to use Express Checkout

Install the component using npm:

`npm install express-checkout@latest --registry https://packagecloud.io/optile/javascript/npm/`

or

`yarn add express-checkout@latest --registry https://packagecloud.io/optile/javascript/npm/`

*Please do not forget to version the lock file (package-lock.json or yarn.lock, respectively)*

<br/>
<br/>

### React implementation

```javascript
import React from "react";
import { render } from "react-dom";

import ExpressCheckout from "express-checkout";
const attributes = {
    configuration: {
        baseURL: "....",
        clientId: "....",
        country: "DE",
        language: "en_US",
        translation: [
            {
                language: "en",
                resource: {
                    confirm: "confirm",
                },
            },
            {
                language: "de",
                resource: {
                    confirm: "bestätigen",
                },
            },
        ],
        paymentMethodsConfiguration: [
            {
                code: "PAYPAL",
                style: {
                    size: "small",
                    color: "gold",
                    shape: "rect",
                    label: "checkout",
                }
            },
            {
                code: "AMAZONPAY",
                type: "PwA",
                color: "Gold",
                size: "small",
                language: "en-GB",
                proceedButtonText: "Continue",
                cancelButtonText: "Cancel Payment",
                constraints: {
                    PaymentMethodNotAllowed:
                        "There has been a problem with the selected payment method from your Amazon account, please update the payment method or choose another one.",
                },
            },
        ],
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
        getExpressList: ({ url, clientId, country }) => console.log(""),
        createExpressPreset: ({ url, transaction, network, clientId }) => console.log(""),
        updateExpressPreset: ({ url, transaction, network }) => console.log(""),
        cancelExpressPreset: ({ url, transaction, network }) => console.log(""),
        getExpressPresetAccount: ({ url }) => console.log(""),
        confirmExpressPreset: ({ url, network }) => console.log(""),

        onProceed: ({ preset, step, dispatch }) => console.log(""),
        onAbort: ({ preset, step, dispatch }) => console.log(""),
        onReload: ({ preset, step, dispatch }) => console.log(""),
        onTryOtherNetwork: ({ preset, step, dispatch }) => console.log(""),
        onTryOtherAccount: ({ preset, step, dispatch }) => console.log(""),
        onRetry: ({ preset, step, dispatch }) => console.log(""),
        onCustomerAbort: ({ preset, step, dispatch }) => console.log(""),
        onClientException: ({ preset, step, dispatch }) => console.log(""),
        onError: ({ resultInfo, network, step, dispatch }) => console.log(""),
    },
};
const Demo = () => {
    return (
        <div>
            <h1>Merchant Demo</h1>
            <ExpressCheckout {...attributes} />
        </div>
    );
};

render(<Demo />, document.querySelector("#demo"));
```

<br/>
<br/>

### Umd implementation

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>UMD demo shop</title>
    </head>
    <body>
        <h1>Umd demo shop</h1>
        <div id="container"></div>
        <!-- Used to write needed polyfills for react in ie11 -->
        <script src="https://polyfill.io/v3/polyfill.min.js?features=Symbol%2CSymbol.asyncIterator%2CSymbol.for%2CSymbol.hasInstance%2CSymbol.isConcatSpreadable%2CSymbol.iterator%2CSymbol.keyFor%2CSymbol.match%2CSymbol.prototype.description%2CSymbol.replace%2CSymbol.search%2CSymbol.species%2CSymbol.split%2CSymbol.toPrimitive%2CSymbol.toStringTag%2CSymbol.unscopables%2CArray.from%2CObject.assign%2Cfetch%2CPromise%2CPromise.prototype.finally"></script>
        <script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
        <script src="./node_modules/express-checkout/express-checkout.js"></script>
        <script>
            var attributes = {
                configuration: {
                    baseURL: "....",
                    clientId: "....",
                    country: "DE",
                    language: "en_US",
                    translation: [
                        {
                            language: "en",
                            resource: {
                                confirm: "confirm",
                            },
                        },
                        {
                            language: "de",
                            resource: {
                                confirm: "bestätigen",
                            },
                        },
                    ],
                    paymentMethodsConfiguration: [
                        {
                            code: "PAYPAL",
                            style: {
                                size: "small",
                                color: "gold",
                                shape: "rect",
                                label: "checkout",
                            }
                        },
                    ],
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
                    getExpressList: ({ url, clientId, country }) => console.log(""),
                    createExpressPreset: ({ url, transaction, network, clientId }) => console.log(""),
                    updateExpressPreset: ({ url, transaction, network }) => console.log(""),
                    cancelExpressPreset: ({ url, transaction, network }) => console.log(""),
                    getExpressPresetAccount: ({ url }) => console.log(""),
                    confirmExpressPreset: ({ url, network }) => console.log(""),

                    onProceed: ({ preset, step, dispatch }) => console.log(""),
                    onAbort: ({ preset, step, dispatch }) => console.log(""),
                    onTryOtherNetwork: ({ preset, step, dispatch }) => console.log(""),
                    onTryOtherAccount: ({ preset, step, dispatch }) => console.log(""),
                    onReload: ({ preset, step, dispatch }) => console.log(""),
                    onRetry: ({ preset, step, dispatch }) => console.log(""),
                    onCustomerAbort: ({ preset, step, dispatch }) => console.log(""),
                    onClientException: ({ preset, step, dispatch }) => console.log(""),
                    onError: ({ resultInfo, network, step, dispatch }) => console.log(""),
                },
            };
            function showExpressCheckout(container) {
                var expressCheckout = optileExpressCheckout({
                    configuration: attributes.configuration,
                    createTransactionDetails: attributes.createTransactionDetails,
                    customFunctions: attributes.customFunctions,
                });

                ReactDOM.render(expressCheckout, container);
            }
            showExpressCheckout(document.getElementById("container"));
        </script>
    </body>
</html>
```

<br/>
<br/>

---
<br/>
<br/>

### Express component modes ###

The component currently has two modes:

* 'Initial mode' (`mode === null`) is used for the stage or page in your shop where the 3rd party express buttons (such as "Checkout with PayPal" and similar) are shown to your customers. This can be, for example, on your cart page or on a single item details page.

* 'Summary mode' (`mode === "Summary"`) is used when the end-customer has already authenticated with the 3rd party provider, and a summary page with their cart contents, and any other information regarding the purchase is displayed before they finalise the order.

### How to style Express Checkout

The following two classes are the ones you should consider styling:

 * `payments-summary-confirm-button`: The 'Confirm' button rendered on the summary "page" can be styled using this class in your page's CSS.

 * `global-error`: In case of error, Express Checkout will render a global error component, which displays a message. This component is hidden by default, but you can set it to visible and style it using CSS


<br/>
<br/>

---
<br/>
<br/>


### More information about how to use ExpressCheckout Component

It is the main component to render express checkout widget
 * @param {Object} params it contains
   * @param {Object} configuration like in the example, it contains (baseURL, clientId, country, language, translation and paymentMethodsConfiguration)
   * @param {Function} createTransactionDetails is a function that will generate a transaction object used in createExpressPreset
   * @param {Object} customFunctions are your implementations for certain scenarios such as when errors occur. For more information, see below.
   * @param {String} mode indicates the mode of the component, default is `null`. See 'Express component modes' above.
   * @param {String} longId required in `mode === "Summary"`. Is returned from a successful `updateExpressPreset` call.


<br/>
<br/>

---
<br/>
<br/>

### More information about how to use customFunctions


#### getExpressList

Called in order to get the list of applicable payment methods, and is first step in initial mode (`mode === null`)
 * @param {Object} params it contains
   * @param {String} url
   * @param {String} clientId
   * @param {String} country

<br/>
<br/>

#### createExpressPreset

Called to create payment session, for example in PAYPAL it is passed under payment for loading Paypal button in initial mode (`mode === null`)
 * @param {Object} params it contains
   * @param {String} url
   * @param {Object} transaction result of createTransactionDetails function, mandatory prop for ExpressCheckout
   * @param {String} network payment code, for example: "PAYPAL"
   * @param {String} clientId

<br/>
<br/>

#### updateExpressPreset

Called to update payment session, for example in PAYPAL it is passed under onAuthorize. Used in mode==null (first page)
 * @param {Object} params it contains
   * @param {String} url
   * @param {Object} transaction providerRequest
   * @param {String} network payment code, for example: "PAYPAL"

<br/>
<br/>

#### cancelExpressPreset

Called to cancel payment session, for example in PAYPAL, when the end customer click on cancel link.
It is passed under onCancel. Used in mode==null (first page)
 * @param {Object} params it contains
   * @param {String} url
   * @param {Object} transaction providerRequest
   * @param {String} network payment code, for example: "PAYPAL"

<br/>
<br/>

#### getExpressPresetAccount

Called to confirm preset account, for example in PAYPAL, when the end customer sees the information about the payment and click a button to confirm.
It is used in onClick of Confirm button in mode==Summary (second page)
 * @param {Object} params it contains
   * @param {String} url
   * @param {String} network payment code, for example: "PAYPAL"

<br/>
<br/>

#### onProceed

Called when the http request returns data.interaction.code === "PROCEED"
 * @param {Object} params it contains
   * @param {Object} preset
   * @param {String} step it indicates the current step for example Update, so the proceed function will know that we need to load confirm/summary mode
   * @param {Function} dispatch the dispatch function used in redux to modify the store, the actions structures should be known

<br/>
<br/>

#### onAbort

Called when the http request returns data.interaction.code === "ABORT".
For example when last payment method is used and failed
 * @param {Object} params it contains
   * @param {Object} preset
   * @param {String} step it indicates the current step for example Update
   * @param {Function} dispatch the dispatch function used in redux to modify the store, the actions structures should be known

<br/>
<br/>

#### onReload

Called when the http request returns data.interaction.code === "RELOAD"
 * @param {Object} params it contains
   * @param {Object} preset
   * @param {String} step it indicates the current step for example Update
   * @param {Function} dispatch the dispatch function used in redux to modify the store, the actions structures should be known

<br/>
<br/>

#### onRetry

Called when the http request returns data.interaction.code === "RETRY".
 * @param {Object} params it contains
   * @param {Object} preset
   * @param {String} step it indicates the current step for example Update
   * @param {Function} dispatch the dispatch function used in redux to modify the store, the actions structures should be known

<br/>
<br/>

#### onTryOtherNetwork

Called when the http request returns data.interaction.code === "TRY_OTHER_NETWORK".
 * @param {Object} params it contains
   * @param {Object} preset
   * @param {String} step it indicates the current step for example Update
   * @param {Function} dispatch the dispatch function used in redux to modify the store, the actions structures should be known

<br/>
<br/>

#### onTryOtherAccount

Called when the http request returns data.interaction.code === "TRY_OTHER_ACCOUNT".
 * @param {Object} params it contains
   * @param {Object} preset
   * @param {String} step it indicates the current step for example Update
   * @param {Function} dispatch the dispatch function used in redux to modify the store, the actions structures should be known

<br/>
<br/>

#### onCustomerAbort

Called when the end user click on cancel, for example in Paypal popup
 * @param {Object} params it contains
   * @param {Object} preset
   * @param {String} step it indicates the current step for example Update
   * @param {Function} dispatch the dispatch function used in redux to modify the store, the actions structures should be known

<br/>
<br/>

#### onClientException

Called when an exception or error happens. If set, onError function will be ignored
 * @param {Object} params it contains
   * @param {Object} preset
   * @param {String} step it indicates the current step for example Update
   * @param {Function} dispatch the dispatch function used in redux to modify the store, the actions structures should be known

<br/>
<br/>

#### onError

Called when an exception or error happens. It is only used if onClientException is not set
 * @param {Object} params it contains
   * @param {Object} resultInfo
   * @param {String} network payment code, for example: "PAYPAL"
   * @param {String} step it indicates the current step for example Update
   * @param {Function} dispatch the dispatch function used in redux to modify the store, the actions structures should be known

<br/>
<br/>

##### dispatch parameter passed in most of customFunctions

The 'dispatch' parameter that exists in most of the customFunctions is the store's reducing function in Redux,
please check [this link](https://redux.js.org/api/store/#dispatchaction) for more information.
It is not the most recommended way to make changes in the component, but it may be needed in some cases and the action keys and structure should be known.

<br/>
<br/>

When calling the dispatch function, pass an object that contains a type (the key or name of the action) and a payload that represents the changes.

```javascript
var action = {
    type: "STORECONFIGURATION",
    payload: {
        baseURL: "",
        clientId: "",
        country: "",
        language: "",
        translation: [],
        paymentMethodsConfiguration: []
    }
};
dispatch(action);
```

Available actions in usual order:

To store the configuration:
```javascript
{
    type: "STORECONFIGURATION",
    payload: {
        baseURL: "",
        clientId: "",
        country: "",
        language: "",
        translation: [],
        paymentMethodsConfiguration: []
    }
}
```

<br/>
<br/>

To store the mode:
```javascript
{
  type: "STOREMODE",
  payload: "Summary"
}
```

<br/>
<br/>

To store the longId:
```javascript
{
  type: "STORELONGID",
  payload: "12345678901234567890"
}
```

<br/>
<br/>

To set list loading to true or false, when you start the call and when you get the response:
```javascript
{
  type: "LISTLOADING",
  payload: true
}
```

<br/>
<br/>

To store the list of applicable networks from list response:
```javascript
{
  type: "STORELIST",
  payload: [
    {
      code: "PAYPAL",
      label: "PayPal",
      ...
    }
  ]
}
```

<br/>
<br/>

To set get preset account loading to true or false:
```javascript
{
  type: "PRESETACCOUNTLOADING",
  payload: true
}
```

<br/>
<br/>

To store the preset account, usually first step in Summary mode:
```javascript
{
  type: "PRESETACCOUNT",
  payload: {
    links: {
      confirm: "",
      self: ""
    },
    resultInfo: "Pending; waiting for customer review and approval of payment details",
    interaction: {
      code: "PROCEED",
      reason: "TAKE_ACTION"
    },
    redirect: {
      url: "",
      method: "GET",
      parameters: [
      ],
      type: "SUMMARY"
    },
    network: "PAYPAL"
  }
}
```

<br/>
<br/>

To set if global error should be displayed:
```javascript
{
  type: "STOREDISPLAYGLOBALERROR",
  payload: false
}
```

<br/>
<br/>

To set the value of global error message:
```javascript
{
  type: "STOREGLOBALERROR",
  payload: "An Error happens"
}
```

<br/>
<br/>

To set is the process of confirm started or finished:
```javascript
{
  type: "CONFIRMACCOUNTLOADING",
  payload: true
}
```

<br/>
<br/>

To set is the process of confirm started:
```javascript
{
  type: "CONFIRMACCOUNT",
  payload: {
    links: {
      self: ""
    },
    resultInfo: "Approved; The payment is pending because it is part of an order that has been authorized but not settled; Merchant protection: None",
    interaction: {
      code: "PROCEED",
      reason: "OK"
    },
    redirect: {
      url: "",
      method: "GET",
      parameters: [
      ],
      type: "RETURN"
    },
    network: "PAYPAL"
  }
}
```

<br/>
<br/>

Actions related to paypal:

```javascript
{
  type: "STOREPAYPALSTATUS",
  payload: "Payment Session Pending"
}

{
  type: "STOREPAYPALPRESET",
  payload: {
    links: {
      self: ""
    },
    resultInfo: "Pending, you have to check the status later",
    interaction: {
      code: "PROCEED",
      reason: "PENDING"
    },
    network: "PAYPAL",
    providerResponse: {
      providerCode: "PAYPAL",
      parameters: [
      ]
    }
  }
}

{
  type: "STOREPAYPALPAYMENTID",
  payload: "12345678901234567890"
}
```



<br/>
<br/>

---
<br/>
<br/>


## Steps to run demo that present the component usage

`npm install`

`npm start`

Open <http://localhost:3000/>

<br/>
<br/>

---
<br/>
<br/>

## Steps to build the component

`npm install`

`npm run onlybuild`


<br/>
<br/>

---
<br/>
<br/>


## Steps to run test cases

`npm test`

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
* node - for installation visit <https://nodejs.org/en/download/>

* npm - for installation visit <https://www.npmjs.com/get-npm>

* Have a merchant in Optile - visit <https://optile.net>

* Create Merchant Token - visit <https://optile.io>

* Create Merchant Application and make sure to pass correct URL for (returnUrl, cancelUrl, summaryUrl, notificationUrl) - visit <https://optile.io>


<br/>
<br/>

---
<br/>
<br/>

## How to use Express Checkout

Install the component using npm

`npm install --save express-checkout@latest --registry https://packagecloud.io/optile/javascript/npm/`


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
        onRetry: ({ preset, step, dispatch }) => console.log(""), 
        onCustomerAbort: ({ preset, step, dispatch }) => console.log(""), 
        onClientException: ({ preset, step, dispatch }) => console.log(""), 
        onError: ({ resultInfo, network, step, dispatch }) => console.log(""),
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

### How to style Express Checkout

Most important classes, that you may need to style using CSS

 * class "payments-summary-confirm-button":   In Summary page, a Confirm button will be rendered,
  This button can be styled by using the class "payments-summary-confirm-button"
  and styling it in CSS in your page.

 * class "global-error": In case of Error, Express Checkout will render only Global Error component, which contains a message but it is hidden by default, by using class "global-error", 
  it is possible to make it visible
  


<br/>
<br/>

---
<br/>
<br/>


### More information about how to use ExpressCheckout Component

It is the main component to render express checkout widget
 * @param {Object} params it contains
   * @param {Object} configuration like in the example, it contains (baseURL, clientId, country, language, translation and paymentMethodsConfiguration)
   * @param {Function} createTransactionDetails it is a function that will generate transaction object used in createExpressPreset
   * @param {Object} customFunctions your customized function, for more information, look below
   * @param {String} mode when it is not set, it is first page, for second page, it should be set to "Summary"
   * @param {String} longId in mode === "Summary", it is obligatory to be set, you can find it from the result of successful updateExpressPreset


<br/>
<br/>

---
<br/>
<br/>

### More information about how to use customFunctions


#### getExpressList

Called to get list of applicable payment methods, it is first step in mode === null (first page)
 * @param {Object} params it contains
   * @param {String} url
   * @param {String} clientId
   * @param {String} country

<br/>
<br/>

#### createExpressPreset

Called to create payment session, for example in PAYPAL it is passed under payment for loading Paypal button in mode === null (first page)
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

Called when the http request returns data.interaction.code === "TRY_OTHER_NETWORK" || data.interaction.code === "RELOAD"
 * @param {Object} params it contains
   * @param {Object} preset
   * @param {String} step it indicates the current step for example Update
   * @param {Function} dispatch the dispatch function used in redux to modify the store, the actions structures should be known

<br/>
<br/>

#### onRetry

Called when the http request returns data.interaction.code === "RETRY" || data.interaction.code === "TRY_OTHER_ACCOUNT".
The end customer can retry and will see all network and nothing should change
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

Called when an exception or error happen. If set, onError function will be ignored
 * @param {Object} params it contains
   * @param {Object} preset
   * @param {String} step it indicates the current step for example Update
   * @param {Function} dispatch the dispatch function used in redux to modify the store, the actions structures should be known

<br/>
<br/>

#### onError

Called when an exception or error happen. It is only used if onClientException is not set
 * @param {Object} params it contains
   * @param {Object} resultInfo
   * @param {String} network payment code, for example: "PAYPAL"
   * @param {String} step it indicates the current step for example Update
   * @param {Function} dispatch the dispatch function used in redux to modify the store, the actions structures should be known

<br/>
<br/>

##### dispatch parameter passed in most of customFunctions

The parameter dispatch that exists in most of customFunctions, is the store's reducing function in Redux,
please check this link for more information <https://redux.js.org/api/store/#dispatchaction>
It is not the most recommended way to make changes in the component, but it may be needed in some cases and the action keys should be known,
and the structure.

<br/>
<br/>

To use dispatch function, you should call the function by passing an object 
that contains type ( the key or name of the action ), and payload, that represent the changes

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

To store the configuration
```json
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

To store the mode
```json
{
  type: "STOREMODE",
  payload: "Summary
}
```

<br/>
<br/>

To store the longId
```json
{
  type: "STORELONGID",
  payload: "12345678901234567890"
}
```

<br/>
<br/>

To set list loading to true or false, when you start the call and when you get the response
```json
{
  type: "LISTLOADING",
  payload: true
}
```

<br/>
<br/>

To store the list of applicable networks from list response
```json
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

To set get preset account loading to true or false
```json
{
  type: "PRESETACCOUNTLOADING",
  payload: true
}
```

<br/>
<br/>

To store the preset account, usually first step in Summary mode
```json
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

To set if global error should be displayed
```json
{
  type: "STOREDISPLAYGLOBALERROR",
  payload: false
}
```

<br/>
<br/>

To set the value of global error message
```json
{
  type: "STOREGLOBALERROR",
  payload: "An Error happen"
}
```

<br/>
<br/>

To set is the process of confirm started or finished
```json
{
  type: "CONFIRMACCOUNTLOADING",
  payload: true
}
```

<br/>
<br/>

To set is the process of confirm started
```json
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

Actions related to paypal

```json
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

`npm run build`


<br/>
<br/>

---
<br/>
<br/>


## Steps to run test cases

`npm test`

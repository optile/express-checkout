/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

import React from "react";
import ReactDOM from "react-dom";

/**
 * This is to check whether the window object is present or not before accessing it
 * When ECO is rendered using SSR this check is necessary as there won't be window
 * object in SSR
 */
const isWindowDefined = typeof window !== "undefined";

// !window.paypal - To prevent multiple call for paypal-checkout, because it causes issues
if (isWindowDefined && !window.paypal) {
    const paypal = require("paypal-checkout");
    window.paypal = paypal;
}

const Loading = () => <div>Please wait...</div>;

const PaypalButton = isWindowDefined ? window?.paypal?.Button?.driver("react", { React, ReactDOM }) : Loading;

export default PaypalButton;

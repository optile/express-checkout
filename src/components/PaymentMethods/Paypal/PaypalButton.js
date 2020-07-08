import React from "react";
import ReactDOM from "react-dom";

// To prevent multiple call for paypal-checkout, because it causes issues
const isWindowDefined = typeof window !== "undefined";
if (isWindowDefined && !window.paypal) {
    const paypal = require("paypal-checkout");
    window.paypal = paypal;
}

const Loading = () => <div>Please wait...</div>;

const PaypalButton = isWindowDefined ? window?.paypal?.Button?.driver("react", { React, ReactDOM }) : Loading;

export default PaypalButton;

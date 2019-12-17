import React from 'react';
import ReactDOM from 'react-dom';
import paypal from 'paypal-checkout';

// To prevent multiple call for paypal-checkout, because it causes issues
if (!window.paypal) {
  window.paypal = paypal;
}

export default window.paypal.Button.driver('react', { React, ReactDOM });


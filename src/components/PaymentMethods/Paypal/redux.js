/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

import { createReducer, createAction } from "@reduxjs/toolkit";

const initialStringState = "";
const initialObjectState = {};

const storePaypalStatus = createAction("STOREPAYPALSTATUS");
const paypalStatus = createReducer(initialStringState, {
    [storePaypalStatus]: (state, action) => action.payload,
});
const storePaypalPaymentID = createAction("STOREPAYPALPAYMENTID");
const paymentID = createReducer(initialStringState, {
    [storePaypalPaymentID]: (state, action) => action.payload,
});
const storePaypalPreset = createAction("STOREPAYPALPRESET");
const preset = createReducer(initialObjectState, {
    [storePaypalPreset]: (state, action) => action.payload,
});
const storePaypalCancelData = createAction("STOREPAYPALCANCELDATA");
const cancelData = createReducer(initialObjectState, {
    [storePaypalCancelData]: (state, action) => action.payload,
});
const storePaypalError = createAction("STOREPAYPALERROR");
const error = createReducer(initialObjectState, {
    [storePaypalError]: (state, action) => action.payload,
});

export {
    paypalStatus,
    paymentID,
    preset,
    cancelData,
    error,
    storePaypalStatus,
    storePaypalPaymentID,
    storePaypalPreset,
    storePaypalCancelData,
    storePaypalError,
};

/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

import { createReducer, createAction } from "@reduxjs/toolkit";
/**
 * initial empty string
 */
const initialStringState = "";
const initialConfigurationState = {
    baseURL: "",
    clientId: "",
    country: "",
    paymentMethodsConfiguration: [],
    language: "",
    loaded: false
};

const storeMode = createAction("STOREMODE");
const mode = createReducer(initialStringState, {
    [storeMode]: (state, action) => action.payload,
});

const storeLongId = createAction("STORELONGID");
const longId = createReducer(initialStringState, {
    [storeLongId]: (state, action) => action.payload,
});

const storeConfiguration = createAction("STORECONFIGURATION");
const configuration = createReducer(initialConfigurationState, {
    [storeConfiguration]: (state, action) => action.payload,
});

export {
    mode,
    storeMode,
    longId,
    storeLongId,
    storeConfiguration,
    configuration,
};

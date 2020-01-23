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
};

const storeSuffix = createAction("STORESUFFIX", () => ({
    payload: new Date().getTime(),
}));
const suffix = createReducer(initialStringState, {
    [storeSuffix]: (state, action) => action.payload,
});

const storeMode = createAction("STOREMODE");
const mode = createReducer(initialStringState, {
    [storeMode]: (state, action) => action.payload,
});

const storeConfiguration = createAction("STORECONFIGURATION");
const configuration = createReducer(initialConfigurationState, {
    [storeConfiguration]: (state, action) => action.payload,
});

export {
    suffix,
    storeSuffix,
    mode,
    storeMode,
    storeConfiguration,
    configuration,
};

import { createReducer, createAction } from "@reduxjs/toolkit";
/**
 * initial empty string
 */
const initialStringState = "";
const initialBooleanState = false;
const initialObjectState = {};
const initialArrayState = [];
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

const setListLoading = createAction("LISTLOADING");
const listLoading = createReducer(initialBooleanState, {
    [setListLoading]: (state, action) => action.payload,
});

const setListError = createAction("LISTERROR");
const listError = createReducer(initialObjectState, {
    [setListError]: (state, action) => action.payload,
});

const storeList = createAction("STORELIST");
const list = createReducer(initialArrayState, {
    [storeList]: (state, action) => action.payload,
});

export {
    suffix,
    storeSuffix,
    mode,
    storeMode,
    storeConfiguration,
    configuration,
    setListLoading,
    listLoading,
    setListError,
    listError,
    storeList,
    list,
};

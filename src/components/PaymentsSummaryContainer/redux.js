import { createReducer, createAction } from "@reduxjs/toolkit";

const initialBooleanState = false;
const initialObjectState = {};

const setPresetAccountLoading = createAction("PRESETACCOUNTLOADING");
const presetAccountLoading = createReducer(initialBooleanState, {
    [setPresetAccountLoading]: (state, action) => action.payload,
});

const setPresetAccountError = createAction("PRESETACCOUNTERROR");
const presetAccountError = createReducer(initialObjectState, {
    [setPresetAccountError]: (state, action) => action.payload,
});

const storePresetAccount = createAction("PRESETACCOUNT");
const presetAccount = createReducer(initialObjectState, {
    [storePresetAccount]: (state, action) => action.payload,
});

export {
    setPresetAccountLoading,
    presetAccountLoading,
    setPresetAccountError,
    presetAccountError,
    storePresetAccount,
    presetAccount,
}

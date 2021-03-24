/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

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

const setConfirmAccountLoading = createAction("CONFIRMACCOUNTLOADING");
const confirmAccountLoading = createReducer(initialBooleanState, {
    [setConfirmAccountLoading]: (state, action) => action.payload,
});

const setConfirmAccountError = createAction("CONFIRMACCOUNTERROR");
const confirmAccountError = createReducer(initialObjectState, {
    [setConfirmAccountError]: (state, action) => action.payload,
});

const storeConfirmAccount = createAction("CONFIRMACCOUNT");
const confirmAccount = createReducer(initialObjectState, {
    [storeConfirmAccount]: (state, action) => action.payload,
});

export {
    setPresetAccountLoading,
    presetAccountLoading,
    setPresetAccountError,
    presetAccountError,
    storePresetAccount,
    presetAccount,
    setConfirmAccountLoading,
    confirmAccountLoading,
    setConfirmAccountError,
    confirmAccountError,
    storeConfirmAccount,
    confirmAccount,
};

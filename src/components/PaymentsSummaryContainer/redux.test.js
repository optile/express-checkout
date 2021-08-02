/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

import {
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
} from "./redux";

const initialBooleanState = false;
const initialObjectState = {};

/* -------------------------------------------------------------------------- */
/*                               Action creators                              */
/* -------------------------------------------------------------------------- */
describe("actions", () => {
    it("Set Preset Account Loading", () => {
        const payload = true;
        const expectedAction = {
            type: "PRESETACCOUNTLOADING",
            payload,
        };
        const action = setPresetAccountLoading(payload);
        expect(action).toEqual(expectedAction);
    });
    it("Set Confirm Account Loading", () => {
        const payload = true;
        const expectedAction = {
            type: "CONFIRMACCOUNTLOADING",
            payload,
        };
        const action = setConfirmAccountLoading(payload);
        expect(action).toEqual(expectedAction);
    });
    it("Set Preset Account Error", () => {
        const payload = { message: "whatever" };
        const expectedAction = {
            type: "PRESETACCOUNTERROR",
            payload,
        };
        const action = setPresetAccountError(payload);
        expect(action).toEqual(expectedAction);
    });
    it("Set Confirm Account Error", () => {
        const payload = { message: "whatever" };
        const expectedAction = {
            type: "CONFIRMACCOUNTERROR",
            payload,
        };
        const action = setConfirmAccountError(payload);
        expect(action).toEqual(expectedAction);
    });
    it("Store Preset Account", () => {
        const payload = { message: "whatever" };
        const expectedAction = {
            type: "PRESETACCOUNT",
            payload,
        };
        const action = storePresetAccount(payload);
        expect(action).toEqual(expectedAction);
    });
    it("Store Confirm Account", () => {
        const payload = { message: "whatever" };
        const expectedAction = {
            type: "CONFIRMACCOUNT",
            payload,
        };
        const action = storeConfirmAccount(payload);
        expect(action).toEqual(expectedAction);
    });
});

/* -------------------------------------------------------------------------- */
/*                                  Reducers                                  */
/* -------------------------------------------------------------------------- */

describe("reducers", () => {
    describe("presetAccountError", () => {
        it("should return the initial state", () => {
            expect(presetAccountError(undefined, {})).toEqual(initialObjectState);
        });
        it("should update value", () => {
            const payload = { message: "Error happens" };
            expect(
                presetAccountError([], {
                    type: "PRESETACCOUNTERROR",
                    payload,
                })
            ).toEqual(payload);
        });
    });
    describe("confirmAccountError", () => {
        it("should return the initial state", () => {
            expect(confirmAccountError(undefined, {})).toEqual(initialObjectState);
        });
        it("should update value", () => {
            const payload = { message: "Error happens" };
            expect(
                confirmAccountError([], {
                    type: "CONFIRMACCOUNTERROR",
                    payload,
                })
            ).toEqual(payload);
        });
    });
    describe("PresetAccountLoading", () => {
        it("should return the initial state", () => {
            expect(presetAccountLoading(undefined, {})).toEqual(initialBooleanState);
        });
        it("should update value", () => {
            const payload = true;
            expect(
                presetAccountLoading([], {
                    type: "PRESETACCOUNTLOADING",
                    payload,
                })
            ).toEqual(payload);
        });
    });
    describe("confirmAccountLoading", () => {
        it("should return the initial state", () => {
            expect(confirmAccountLoading(undefined, {})).toEqual(initialBooleanState);
        });
        it("should update value", () => {
            const payload = true;
            expect(
                confirmAccountLoading([], {
                    type: "CONFIRMACCOUNTLOADING",
                    payload,
                })
            ).toEqual(payload);
        });
    });
    describe("presetAccount", () => {
        it("should return the initial state", () => {
            expect(presetAccount(undefined, {})).toEqual(initialObjectState);
        });
        it("should update value", () => {
            const payload = { what: "whatever" };
            expect(
                presetAccount(
                    {},
                    {
                        type: "PRESETACCOUNT",
                        payload,
                    }
                )
            ).toEqual(payload);
        });
    });
    describe("confirmAccount", () => {
        it("should return the initial state", () => {
            expect(confirmAccount(undefined, {})).toEqual(initialObjectState);
        });
        it("should update value", () => {
            const payload = { what: "whatever" };
            expect(
                confirmAccount(
                    {},
                    {
                        type: "CONFIRMACCOUNT",
                        payload,
                    }
                )
            ).toEqual(payload);
        });
    });
});

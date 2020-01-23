import {
    setPresetAccountLoading,
    presetAccountLoading,
    setPresetAccountError,
    presetAccountError,
    storePresetAccount,
    presetAccount,
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
    it("Set Preset Account Error", () => {
        const payload = { message: "whatever" };
        const expectedAction = {
            type: "PRESETACCOUNTERROR",
            payload,
        };
        const action = setPresetAccountError(payload);
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
});

/* -------------------------------------------------------------------------- */
/*                                  Reducers                                  */
/* -------------------------------------------------------------------------- */

describe("reducers", () => {
    describe("PresetAccountError", () => {
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
    describe("presetAccount", () => {
        it("should return the initial state", () => {
            expect(presetAccount(undefined, {})).toEqual(initialObjectState);
        });
        it("should update value", () => {
            const payload = { what: "whatever" };
            expect(
                presetAccount({}, {
                    type: "PRESETACCOUNT",
                    payload,
                })
            ).toEqual(payload);
        });
    });
});

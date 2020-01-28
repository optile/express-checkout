import {
    globalError, storeGlobalError, displayGlobalError, storeDisplayGlobalError
} from "./redux";

/* -------------------------------------------------------------------------- */
/*                               Action creators                              */
/* -------------------------------------------------------------------------- */
describe("actions", () => {
    it("Store Global Error", () => {
        const payload = "Error is here";
        const action = storeGlobalError(payload);
        expect(action.type).toEqual("STOREGLOBALERROR");
        expect(action.payload).toEqual(payload);
    });
    it("Store Display Global Error", () => {
        const payload = true;
        const expectedAction = {
            type: "STOREDISPLAYGLOBALERROR",
            payload,
        };
        const action = storeDisplayGlobalError(payload);
        expect(action).toEqual(expectedAction);
    });
});

/* -------------------------------------------------------------------------- */
/*                                  Reducers                                  */
/* -------------------------------------------------------------------------- */
/**
 * initial empty string
 */
const initialStringState = "";
const initialBooleanState = false;


describe("reducers", () => {
    describe("Global Error", () => {
        it("should return the initial state", () => {
            expect(globalError(undefined, {})).toEqual(initialStringState);
        });
        it("should update value", () => {
            const payload = "confirm";
            expect(
                globalError([], {
                    type: "STOREGLOBALERROR",
                    payload,
                })
            ).toEqual(payload);
        });
    });
    describe("Display Global Error", () => {
        it("should return the initial state", () => {
            expect(displayGlobalError(undefined, {})).toEqual(initialBooleanState);
        });
        it("should update value", () => {
            const payload = true;
            expect(
                displayGlobalError([], {
                    type: "STOREDISPLAYGLOBALERROR",
                    payload,
                })
            ).toEqual(payload);
        });
    });
});

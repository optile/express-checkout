import {
    storeConfiguration,
    configuration,
    mode,
    storeMode,
    longId,
    storeLongId,
} from "./redux";

/* -------------------------------------------------------------------------- */
/*                               Action creators                              */
/* -------------------------------------------------------------------------- */
describe("actions", () => {
    it("Store Mode", () => {
        const payload = "Confirm";
        const action = storeMode(payload);
        expect(action.type).toEqual("STOREMODE");
        expect(action.payload).toEqual(payload);
    });
    it("Store LongId", () => {
        const payload = "12321";
        const action = storeLongId(payload);
        expect(action.type).toEqual("STORELONGID");
        expect(action.payload).toEqual(payload);
    });
    it("Store Configuration", () => {
        const payload = { what: "whatever" };
        const expectedAction = {
            type: "STORECONFIGURATION",
            payload,
        };
        const action = storeConfiguration(payload);
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
const initialConfigurationState = {
    baseURL: "",
    clientId: "",
    country: "",
    paymentMethodsConfiguration: [],
};

describe("reducers", () => {
    describe("mode", () => {
        it("should return the initial state", () => {
            expect(mode(undefined, {})).toEqual(initialStringState);
        });
        it("should update value", () => {
            const payload = "confirm";
            expect(
                mode([], {
                    type: "STOREMODE",
                    payload,
                })
            ).toEqual(payload);
        });
    });
    describe("longId", () => {
        it("should return the initial state", () => {
            expect(longId(undefined, {})).toEqual(initialStringState);
        });
        it("should update value", () => {
            const payload = "123123123";
            expect(
                longId([], {
                    type: "STORELONGID",
                    payload,
                })
            ).toEqual(payload);
        });
    });
    describe("configuration", () => {
        it("should return the initial state", () => {
            expect(configuration(undefined, {})).toEqual(initialConfigurationState);
        });
        it("should update value", () => {
            const payload = {
                baseURL: "http://baseurl.com",
                clientId: "100",
                country: "Germany",
                functions: {},
                paymentMethodsConfiguration: [],
            };
            expect(
                configuration([], {
                    type: "STORECONFIGURATION",
                    payload,
                })
            ).toEqual(payload);
        });
    });
});

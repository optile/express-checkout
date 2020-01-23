import {
    suffix,
    storeSuffix,
    storeConfiguration,
    configuration,
    setListLoading,
    listLoading,
    setListError,
    listError,
    storeList,
    list,
    mode,
    storeMode,
} from "./redux";

/* -------------------------------------------------------------------------- */
/*                               Action creators                              */
/* -------------------------------------------------------------------------- */
describe("actions", () => {
    it("Store Suffix", () => {
        const action = storeSuffix();
        expect(action.type).toEqual("STORESUFFIX");
        expect(action.payload).toBeDefined();
    });
    it("Store Mode", () => {
        const payload = "Confirm";
        const action = storeMode(payload);
        expect(action.type).toEqual("STOREMODE");
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
    it("Set List Loading", () => {
        const payload = true;
        const expectedAction = {
            type: "LISTLOADING",
            payload,
        };
        const action = setListLoading(payload);
        expect(action).toEqual(expectedAction);
    });
    it("Set List Error", () => {
        const payload = { message: "whatever" };
        const expectedAction = {
            type: "LISTERROR",
            payload,
        };
        const action = setListError(payload);
        expect(action).toEqual(expectedAction);
    });
    it("Store List", () => {
        const payload = [
            { code: "PAYPAL", what: "whatever" },
            { code: "AMAZONPAY", what: "whatever" },
        ];
        const expectedAction = {
            type: "STORELIST",
            payload,
        };
        const action = storeList(payload);
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
const initialObjectState = {};
const initialArrayState = [];
const initialConfigurationState = {
    baseURL: "",
    clientId: "",
    country: "",
    paymentMethodsConfiguration: [],
};

describe("reducers", () => {
    describe("suffix", () => {
        it("should return the initial state", () => {
            expect(suffix(undefined, {})).toEqual(initialStringState);
        });
        it("should update value", () => {
            const payload = 1000;
            expect(
                suffix([], {
                    type: "STORESUFFIX",
                    payload,
                })
            ).toEqual(payload);
        });
    });
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
    describe("listError", () => {
        it("should return the initial state", () => {
            expect(listError(undefined, {})).toEqual(initialObjectState);
        });
        it("should update value", () => {
            const payload = { message: "Error happens" };
            expect(
                listError([], {
                    type: "LISTERROR",
                    payload,
                })
            ).toEqual(payload);
        });
    });
    describe("listLoading", () => {
        it("should return the initial state", () => {
            expect(listLoading(undefined, {})).toEqual(initialBooleanState);
        });
        it("should update value", () => {
            const payload = true;
            expect(
                listLoading([], {
                    type: "LISTLOADING",
                    payload,
                })
            ).toEqual(payload);
        });
    });
    describe("listLoading", () => {
        it("should return the initial state", () => {
            expect(listLoading(undefined, {})).toEqual(initialBooleanState);
        });
        it("should update value", () => {
            const payload = true;
            expect(
                listLoading([], {
                    type: "LISTLOADING",
                    payload,
                })
            ).toEqual(payload);
        });
    });
    describe("list", () => {
        it("should return the initial state", () => {
            expect(list(undefined, {})).toEqual(initialArrayState);
        });
        it("should update value", () => {
            const payload = [
                { code: "PAYPAL", what: "whatever" },
                { code: "AMAZONPAY", what: "whatever" },
            ];
            expect(
                list([], {
                    type: "STORELIST",
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

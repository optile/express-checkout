import { setListLoading, listLoading, setListError, listError, storeList, list } from "./redux";

const initialBooleanState = false;
const initialObjectState = {};
const initialArrayState = [];

/* -------------------------------------------------------------------------- */
/*                               Action creators                              */
/* -------------------------------------------------------------------------- */
describe("actions", () => {
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

describe("reducers", () => {
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
});

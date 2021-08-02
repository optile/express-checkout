/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

import {
    storePaypalStatus,
    storePaypalPaymentID,
    storePaypalPreset,
    storePaypalCancelData,
    storePaypalError,
    paypalStatus,
    paymentID,
    preset,
    cancelData,
    error,
} from "./redux";

/* -------------------------------------------------------------------------- */
/*                               Action creators                              */
/* -------------------------------------------------------------------------- */
describe("actions", () => {
    it("Store Paypal Status", () => {
        const payload = "Doing something";
        const expectedAction = {
            type: "STOREPAYPALSTATUS",
            payload,
        };
        const action = storePaypalStatus(payload);
        expect(action).toEqual(expectedAction);
    });
    it("Store Paypal Payment Id", () => {
        const payload = "12345";
        const expectedAction = {
            type: "STOREPAYPALPAYMENTID",
            payload,
        };
        const action = storePaypalPaymentID(payload);
        expect(action).toEqual(expectedAction);
    });
    it("Store Paypal Preset", () => {
        const payload = {
            result: "Do something",
        };
        const expectedAction = {
            type: "STOREPAYPALPRESET",
            payload,
        };
        const action = storePaypalPreset(payload);
        expect(action).toEqual(expectedAction);
    });
    it("Store Paypal Cancel Data", () => {
        const payload = { message: "whatever" };
        const expectedAction = {
            type: "STOREPAYPALCANCELDATA",
            payload,
        };
        const action = storePaypalCancelData(payload);
        expect(action).toEqual(expectedAction);
    });
    it("Store Paypal Error", () => {
        const payload = { message: "whatever" };
        const expectedAction = {
            type: "STOREPAYPALERROR",
            payload,
        };
        const action = storePaypalError(payload);
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
const initialObjectState = {};

describe("reducers", () => {
    describe("paypalStatus", () => {
        it("should return the initial state", () => {
            expect(paypalStatus(undefined, {})).toEqual(initialStringState);
        });
        it("should update value", () => {
            const payload = 1000;
            expect(
                paypalStatus([], {
                    type: "STOREPAYPALSTATUS",
                    payload,
                })
            ).toEqual(payload);
        });
    });
    describe("paymentID", () => {
        it("should return the initial state", () => {
            expect(paymentID(undefined, {})).toEqual(initialStringState);
        });
        it("should update value", () => {
            const payload = "ABC132";
            expect(
                paymentID([], {
                    type: "STOREPAYPALPAYMENTID",
                    payload,
                })
            ).toEqual(payload);
        });
    });
    describe("preset", () => {
        it("should return the initial state", () => {
            expect(preset(undefined, {})).toEqual(initialObjectState);
        });
        it("should update value", () => {
            const payload = { what: "something" };
            expect(
                preset([], {
                    type: "STOREPAYPALPRESET",
                    payload,
                })
            ).toEqual(payload);
        });
    });
    describe("cancelData", () => {
        it("should return the initial state", () => {
            expect(cancelData(undefined, {})).toEqual(initialObjectState);
        });
        it("should update value", () => {
            const payload = "something";
            expect(
                cancelData([], {
                    type: "STOREPAYPALCANCELDATA",
                    payload,
                })
            ).toEqual(payload);
        });
    });
    describe("error", () => {
        it("should return the initial state", () => {
            expect(error(undefined, {})).toEqual(initialObjectState);
        });
        it("should update value", () => {
            const payload = { what: "something" };
            expect(
                error([], {
                    type: "STOREPAYPALERROR",
                    payload,
                })
            ).toEqual(payload);
        });
    });
});

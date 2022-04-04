/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

import { fetchList, onError } from "./hook";
import { sendDataWithParams } from "../../utils/network";

describe("fetchData", () => {
    let actions = [];
    const dispatch = action => actions.push(action);
    const functionAttrs = { dispatch, customFunctions: {}, baseURL: "http://baseUrl.com/", clientId: 1, country: "DE" };
    const dummyDataApplicable = [
        {
            code: "PAYPAL",
            label: "PayPal",
        },
        {
            code: "AMAZONPAY",
            label: "Amazon Payments",
        },
    ];
    const dummyData = {
        resultInfo: "2 applicable networks are found",
        interaction: { code: "PROCEED", reason: "OK" },
        networks: {
            applicable: dummyDataApplicable,
        },
    };
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify(dummyData), { headers: { "content-type": "application/json" } });
    fetchList(functionAttrs);

    it("adds a loading state", () => {
        expect(actions[0].type).toBe("LISTLOADING");
        expect(actions[0].payload).toBeTruthy();
    });

    it("has added the list", () => {
        expect(actions[1].type).toBe("STORELIST");
        expect(actions[1].payload).toEqual(dummyDataApplicable);
    });

    it("remove a loading state", () => {
        expect(actions[2].type).toBe("LISTLOADING");
        expect(actions[2].payload).toBeFalsy();
    });
});

describe("fetchData with custom functions without baseURL and clientId", () => {
    let actions = [];
    const dispatch = (action) => actions.push(action);
    const functionAttrs = {
        dispatch,
        customFunctions: {
            getExpressList: ({ country }) => {
                const baseURL = "http://baseUrl.com";
                const params = { clientId: 1, country };
                return sendDataWithParams({ baseURL, method: "GET", params });
            }
        },
        country: "DE",
    };
    const dummyDataApplicable = [
        {
            code: "PAYPAL",
            label: "PayPal",
        },
        {
            code: "AMAZONPAY",
            label: "Amazon Payments",
        },
    ];
    const dummyData = {
        resultInfo: "2 applicable networks are found",
        interaction: { code: "PROCEED", reason: "OK" },
        networks: {
            applicable: dummyDataApplicable,
        },
    };
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify(dummyData), { headers: { "content-type": "application/json" } });
    fetchList(functionAttrs);

    it("adds a loading state", () => {
        expect(actions[0].type).toBe("LISTLOADING");
        expect(actions[0].payload).toBeTruthy();
    });

    it("has added the list", () => {
        expect(actions[1].type).toBe("STORELIST");
        expect(actions[1].payload).toEqual(dummyDataApplicable);
    });

    it("remove a loading state", () => {
        expect(actions[2].type).toBe("LISTLOADING");
        expect(actions[2].payload).toBeFalsy();
    });
});

describe("onError", () => {
    
    let actions = [];
    const err = {message: "Error here"}
    const dispatch = action => actions.push(action);
    const functionAttrs = { err, dispatch, customFunctions: {}};
    onError(functionAttrs);

    it("put error", () => {
        expect(actions[0].type).toBe("LISTERROR");
    });

    it("remove a loading state", () => {
        expect(actions[1].type).toBe("LISTLOADING");
        expect(actions[1].payload).toBeFalsy();
    });
    
});

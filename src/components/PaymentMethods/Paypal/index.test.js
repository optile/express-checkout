/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

import { hasANetworkCode } from "./index";

describe("Test hasANetworkCode", () => {
    it("return false when props is {}", () => {
        const attrs = {};
        const expectedResult = false;
        const result = hasANetworkCode(attrs);
        expect(expectedResult).toEqual(result);
    });
    it("return false when props is null", () => {
        const attrs = null;
        const expectedResult = false;
        const result = hasANetworkCode(attrs);
        expect(expectedResult).toEqual(result);
    });
    it("return false when propshas no networks", () => {
        const attrs = { something: "else" };
        const expectedResult = false;
        const result = hasANetworkCode(attrs);
        expect(expectedResult).toEqual(result);
    });
    it("return false when props has networks but no code in any", () => {
        const attrs = { networks: [{ something: "else" }] };
        const expectedResult = false;
        const result = hasANetworkCode(attrs);
        expect(expectedResult).toEqual(result);
    });
    it("return false when props has networks but not array", () => {
        const attrs = { networks: "something-else" };
        const expectedResult = false;
        const result = hasANetworkCode(attrs);
        expect(expectedResult).toEqual(result);
    });
    it("return false when props has networks but with code", () => {
        const attrs = { networks: [{ id: 1, code: "Paypal" }] };
        const expectedResult = true;
        const result = hasANetworkCode(attrs);
        expect(expectedResult).toEqual(result);
    });
});

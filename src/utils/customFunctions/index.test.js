/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

import { getCorrectFunction } from "./index";

describe("Test getCorrectFunction", () => {
    const params = { preset: { resultInfo: "resultinfo" } };
    it("return false when props is {}", () => {
        const functionName = "onAbort";
        const customFunctions = { onAbort: () => 5 };
        const attrs = { params, functionName, customFunctions };
        const expectedResult = 5;
        const result = getCorrectFunction(attrs);
        expect(expectedResult).toEqual(result);
    });
    it("return false when props is {}", () => {
        const functionName = "onAbort";
        const customFunctions = {};
        const attrs = { params, functionName, customFunctions };
        const expectedResult = undefined;
        const result = getCorrectFunction(attrs);
        expect(expectedResult).toEqual(result);
    });
});

import { getClass, getIdentificationProps, getLongIdFromParameters } from "./index";
import set from "lodash/set";

describe("get Class", () => {
    it("return empty string if nothing is passed to", () => {
        const attrs = null;
        const expectedResult = "";
        const result = getClass(attrs);
        expect(expectedResult).toEqual(result);
    });
    it("return empty string if only className is missing", () => {
        const attrs = {suffix: "1"};
        const expectedResult = "";
        const result = getClass(attrs);
        expect(expectedResult).toEqual(result);
    });
    it("return same value if only className is passed", () => {
        const attrs = {className: "button-container"};
        const expectedResult = attrs.className;
        const result = getClass(attrs);
        expect(expectedResult).toEqual(result);
    });
    it("return correct value when className and suffix are passed", () => {
        const attrs = {className: "button-container", suffix: "5"};
        const expectedResult = "button-container-5";
        const result = getClass(attrs);
        expect(expectedResult).toEqual(result);
    });
});

describe("Get Identification Props", () => {
    const emptyResult = { className: "", "test-id": "" };
    it("return empty values for className and test-id if nothing is passed to", () => {
        const attrs = null;
        const expectedResult = emptyResult;
        const result = getIdentificationProps(attrs);
        expect(expectedResult).toEqual(result);
    });
    it("return empty values for className and test-id if only className is missing", () => {
        const attrs = {suffix: "1"};
        const expectedResult = emptyResult;
        const result = getIdentificationProps(attrs);
        expect(expectedResult).toEqual(result);
    });
    it("return same value when  className is passed", () => {
        const attrs = {className: "button-container"};
        const expectedResult = { className: "button-container", "test-id": "button-container" };
        const result = getIdentificationProps(attrs);
        expect(expectedResult).toEqual(result);
    });
    it("return correct value when className and suffix are passed", () => {
        const attrs = {className: "button-container", suffix: "5"};
        const expectedResult = { className: "button-container button-container-5", "test-id": "button-container-5" };
        const result = getIdentificationProps(attrs);
        expect(expectedResult).toEqual(result);
    });
});

describe("test util function getLongIdFromParameters", () => {
    it("should return longId from the parameters from paypal preset", () => {
        const parameters = [{ name: "longId", value: "123456789" }];
        const getState = () => set({}, "paypal.preset.redirect.parameters", parameters);
        expect(getLongIdFromParameters(getState, true)).toEqual("123456789");
    });
    it("should return longId from the parameters from preset account", () => {
        const parameters = [{ name: "longId", value: "123456789" }];
        const getState = () => set({}, "presetAccount.data.redirect.parameters", parameters);
        expect(getLongIdFromParameters(getState)).toEqual("123456789");
    });
});

import React from "react";
import { mount } from "enzyme";
import Component from "./index";

describe("ExpressCheckout", () => {
    it("renders without any issue", () => {
        const wrapper = mount(<Component configuration={{}} createTransactionDetails={() => console.log(0)} />);

        expect(wrapper.length).toBe(1);
    });
});

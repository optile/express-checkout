import React from "react";
import { mount } from "enzyme";
import Component from "../src/index";

describe("ExpressCheckout", () => {
    it("renders without any issue", () => {
        const wrapper = mount(<Component config={{}} />);

        expect(wrapper.length).toBe(1);
    });
});

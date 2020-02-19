import React from "react";
import { render } from "react-dom";
import { Products, Summary, Thankyou } from "./pages";

import "./style.css";

const getMode = () => {
    let params = new URLSearchParams(window.location.search);

    return params.get("mode");
};

const Demo = () => {
    const mode = getMode();
    switch (mode) {
        case "Summary":
            return <Summary></Summary>;
        case "Successful":
            return <Thankyou></Thankyou>;
        default:
            return <Products></Products>;
    }
};

render(<Demo />, document.querySelector("#demo"));

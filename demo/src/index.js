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
            return (
                <div>
                    <div className="forTestOnly"></div>
                    <Summary></Summary>
                </div>
            );
        case "Successful":
            return (
                <div>
                    <div className="forTestOnly"></div>
                    <Thankyou></Thankyou>
                </div>
            );
        default:
            return (
                <div>
                    <div className="forTestOnly"></div>
                    <Products></Products>
                </div>
            );
    }
};

render(<Demo />, document.querySelector("#demo"));

import React from "react";
import { render } from "react-dom";

import getAttributes from "./configuration";
import ExpressCheckout from "../../src";

const getMode = () => {
    let params = new URLSearchParams(window.location.search);

    return params.get("mode");
};
const getLongId = () => {
    let params = new URLSearchParams(window.location.search);

    return params.get("longId");
};
const Demo = () => {
    const attributes = getAttributes();
    const mode = getMode();
    const longId = getLongId();
    return (
        <div>
            <ul className="products">
                <li>
                    <strong>USB C cable: 2Euro</strong>
                </li>
            </ul>
            <ExpressCheckout {...attributes} mode={mode} longId={longId} />
        </div>
    );
};

render(<Demo />, document.querySelector("#demo"));

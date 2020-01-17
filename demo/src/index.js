import React from "react";
import { render } from "react-dom";

import getAttributes from "./configuration";
import ExpressCheckout from "../../src";

const Demo = () => {
    const attributes = getAttributes();

    return (
        <div>
            <ul className="products">
                <li><strong>USB C cable: 2Euro</strong></li>
            </ul>
            <ExpressCheckout {...attributes} />
        </div>
    );
};

render(<Demo />, document.querySelector("#demo"));

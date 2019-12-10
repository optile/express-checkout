import React from "react";
import { render } from "react-dom";

import getAttributes from "./configuration";
import ExpressCheckout from "../../src";

const Demo = () => {
    const attributes = getAttributes();

    return (
        <div>
            <h1>express-checkout Demo</h1>
            <ExpressCheckout {...attributes} />
        </div>
    );
};

render(<Demo />, document.querySelector("#demo"));

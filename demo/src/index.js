import React, { useState, useEffect } from "react";
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

    // to test that the single page app flow works
    // let [mode, setMode] = useState('');
    // let [longId, setLongId] = useState('');
    // useEffect(() => {
    //     setTimeout(() => {
    //         setLongId("5e299540cf5ace17876aeb1ee8j6fr04d5l6gbucsa5ft576vs");
    //         setMode("Summary");
    //     }, 3000);
    //   }, []);
    return (
        <div>
            {mode !== "Summary" && (
                <ul className="products">
                    <li>
                        <strong>USB C cable: 2Euro</strong>
                    </li>
                </ul>
            )}
            <ExpressCheckout {...attributes} mode={mode} longId={longId}     test-id="paypal-button"      
            />
             
        </div>
    );
};

render(<Demo />, document.querySelector("#demo"));

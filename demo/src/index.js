import React, { useState, useEffect } from "react";
import { render } from "react-dom";

import getAttributes from "./configuration";
import ExpressCheckout from "../../src";
import "./style.css";

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
    //         setLongId("5e32a9c4cf5ace6927ab0212ee1malpbp6clinu1tk4ghfiftb");
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
            <ExpressCheckout {...attributes} mode={mode} longId={longId} 
            />
             
        </div>
    );
};

render(<Demo />, document.querySelector("#demo"));

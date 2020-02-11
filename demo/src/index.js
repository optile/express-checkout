import React from "react";
import { render } from "react-dom";
import { Products, Summary, Thankyou } from "./pages";

import ExpressCheckout from "../../src";
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
    return mode === "Successful" ? (
        <div>Thank you for your payment!</div>
    ) : (
        <div>
            {mode === "Cancel" && <div>An Error happened</div>}
            {mode !== "Summary" && (
                <ul className="products">
                    <li>
                        <strong>USB C cable: 2Euro</strong>
                    </li>
                </ul>
            )}
            <ExpressCheckout {...attributes} mode={mode} longId={longId} />
            {mode !== "Summary" && (
                <div>
                    <ul className="products">
                        <li>
                            <strong>USB C cable fast: 10Euro</strong>
                        </li>
                    </ul>
                    <ExpressCheckout {...attributes2} mode={mode} longId={longId} />
                </div>
            )}
        </div>
    );
};

render(<Demo />, document.querySelector("#demo"));

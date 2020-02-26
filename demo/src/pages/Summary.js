import React from "react";

import getAttributes from "../configuration";
import ExpressCheckout from "../../../src";

const getLongId = () => {
    let params = new URLSearchParams(window.location.search);

    return params.get("longId");
};

const Summary = () => {
    const attributes = getAttributes();
    const longId = getLongId();

    return (
        <div>
            <ExpressCheckout {...attributes} mode="Summary" longId={longId} 
            />
        </div>
    );
};

export default Summary;

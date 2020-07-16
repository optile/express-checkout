import React from "react";

import getAttributes from "../configuration";
import ExpressCheckout from "../../../src";
import { getLongId } from "../utils";

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

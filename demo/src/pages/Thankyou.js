import React, { useState, useEffect } from "react";
import { getExpressPreset } from "../server/getExpressPreset";

const getTemplate = (status) => {
    switch (status) {
        case "CHARGED":
            return <div>Thank you for your order</div>;
        case "ERROR":
            return <div>Payment failed!</div>;
        default:
            return <div>Processing...</div>;
    }
};

const Thankyou = () => {
    const [status, setStatus] = useState("PROCESSING");
    useEffect(() => {
        getExpressPreset(setStatus);
    }, []);
    return (
        <div>
            {getTemplate(status)}
        </div>
    );
};

export default Thankyou;

import React, { useState, useEffect } from "react";
import { getExpressPreset } from "../server/getExpressPreset";
import { charge } from "../server/charge";

const getTemplate = (status) => {
    console.log("0000000000000000my status is: ", status)
    switch (status) {
        case "CHARGED":
            return <div>Thank you for your order</div>;
        case "PENDING":
            return <div>Your order is pending</div>;
        case "EXPIRED":
            return <div>The session is expired</div>;
        case "ERROR":
            return <div>Payment failed!</div>;
        default:
            return <div>Processing...</div>;
    }
};

const Thankyou = () => {
    const [status, setStatus] = useState("PROCESSING");
    const [link, setLink] = useState("");
    useEffect(() => {
        getExpressPreset(setLink);
    }, []);
    useEffect(() => {
        if (!link) return;
        if (link === "EXPIRED" || link === "ERROR") {
            console.log("0000000000000000we got error")
            setStatus(link);
        } else {
            console.log("0000000000000000we will execute charge", link)
            charge(link, setStatus);
        }
    }, [link]);
    return (
        <div>
            {getTemplate(status)}
        </div>
    );
};

export default Thankyou;

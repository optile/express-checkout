import React, { useEffect, useState } from "react";

import getAttributes from "../configuration";
import ExpressCheckout from "../../../src";
import { getLongId } from "../utils";
import { getExpressPreset } from "../server/getExpressPreset";
import "./Summary.css";

const Summary = () => {
    const attributes = getAttributes();
    const longId = getLongId();
    const [paymentData, setPaymentData] = useState({});
    useEffect(() => {
        getExpressPreset(setPaymentData, true);
    }, []);
    const address = paymentData?.address;
    const name = paymentData?.address?.name;
    const network = paymentData?.network;

    return (
        <div className="summaryContainer">
            <div className="detailsContainer">
                {!!address && (
                    <div className="details">
                        <div className="label">Shipping Address:</div>
                        <div>{`${name?.firstName} ${name?.lastName}`}</div>
                        <div>{address?.street}</div>
                        <div>{`${address?.city} ${address?.country}`}</div>
                        <div>{address?.zip}</div>
                    </div>
                )}
                {!!network && (
                    <div className="details">
                        <div className="label">Billing Information:</div>
                        {paymentData?.network}
                    </div>
                )}
            </div>
            <ExpressCheckout {...attributes} mode="Summary" longId={longId} />
        </div>
    );
};

export default Summary;

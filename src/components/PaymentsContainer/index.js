import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Paypal from "../Paypal";
import Amazon from "../Amazon";
import map from "lodash/map";

const PaymentsContainer = props => {
    const listOfPaymentMethods = useSelector(state => state.list);
    console.log(listOfPaymentMethods);
    return (
        <Fragment>
            {listOfPaymentMethods &&
                map(listOfPaymentMethods, (method, i) => (method.code === "PAYPAL" ? <Paypal key={i} /> : <Amazon key={i} />))}
        </Fragment>
    );
};

PaymentsContainer.propTypes = {};

export default PaymentsContainer;

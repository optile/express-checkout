import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Paypal from "../paymentMethods/Paypal";
import Amazon from "../paymentMethods/Amazon";
import map from "lodash/map";
/**
 * Payments Container
 * render the list of payment methods depends on value from state
 * @param {Object} props
 * @return {JSX.Element}
 */
const PaymentsContainer = props => {
    const listOfPaymentMethods = useSelector(state => state.list);
    return (
        <Fragment>
            {listOfPaymentMethods &&
                map(listOfPaymentMethods, (method, i) => (method.code === "PAYPAL" ? <Paypal key={i} {...props}/> : <Amazon key={i} />))}
        </Fragment>
    );
};

PaymentsContainer.propTypes = {};

export default PaymentsContainer;

import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useList } from "./hook";
import Paypal from "../paymentMethods/Paypal";
import Amazon from "../paymentMethods/Amazon";
import map from "lodash/map";
/**
 * Load Payment Method By Code
 * @param {String} code
 * @param {Object} bindingProps
 */
const loadPaymentMethodByCode = (code, bindingProps, index) => {
    switch (code) {
        case "PAYPAL":
            return <Paypal {...bindingProps} key={"PAYPAL_" + index}/>;
        case "AMAZONPAY":
            return <Amazon {...bindingProps} key={"AMAZONPAY_" + index} />;
        default:
            return null;
    }
};

/**
 * Payments Container
 * render the list of payment methods depends on value from state
 * @param {Object} props
 * @return {JSX.Element}
 */
const PaymentsContainer = props => {
    const listOfPaymentMethods = useSelector(state => state.list.data);
    useList(props.customFunctions);
    return (
        <Fragment>
            {listOfPaymentMethods &&
                map(listOfPaymentMethods, (method,i) => loadPaymentMethodByCode(method.code, props, i))}
        </Fragment>
    );
};

PaymentsContainer.propTypes = {};

export default PaymentsContainer;

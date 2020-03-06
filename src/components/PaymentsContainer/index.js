import React from "react";
import { useSelector } from "react-redux";
import map from "lodash/map";
import { useList } from "./hook";
import Paypal from "../PaymentMethods/Paypal";
import Amazon from "../PaymentMethods/Amazon";
import { getIdentificationProps } from "../../utils";
/**
 * Load Payment Method By Code
 * @param {String} code
 * @param {Object} bindingProps
 * @param {Number} index
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
    const idProps = getIdentificationProps({ suffix: props.suffix, className: "payments-container" });
    useList(props.customFunctions);
    return (
        <div {...idProps}>
            {listOfPaymentMethods &&
                map(listOfPaymentMethods, (method,i) => loadPaymentMethodByCode(method.code, props, i))}
        </div>
    );
};

PaymentsContainer.propTypes = {};

export default PaymentsContainer;

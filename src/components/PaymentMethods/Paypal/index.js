/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

import React from "react";
import { useSelector, connect } from "react-redux";
import find from "lodash/find";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { paymentAction, authorizeAction, cancelAction } from "./actions.redux";
import { getIdentificationProps } from "../../../utils";
/**
 * Prepare Paypal button needed props
 * @param {Object} params
 * @param {Object} params.initialPaymentConfiguration
 * @param {String} params.initialConfiguration
 * @param {Object} params.listConfiguration
 * @param {Object} params.props
 */
const prepareButtonProps = ({ initialPaymentConfiguration, initialConfiguration, listConfiguration, props }) => {
    const {
        contractData: { PAGE_ENVIRONMENT, PAGE_BUTTON_LOCALE },
    } = listConfiguration;
    return {
        style: initialPaymentConfiguration.style,
        locale: initialConfiguration.language || PAGE_BUTTON_LOCALE,
        commit: false,
        env: PAGE_ENVIRONMENT,
        clientId: initialPaymentConfiguration.clientId || "sb",
        currency: initialConfiguration.currency || "USD",
        intent: initialPaymentConfiguration.deferral === "DEFERRED" ? "authorize" : "capture",
        createOrder: () =>
            props.paymentAction({ customFunctions: props.customFunctions, createTransactionDetails: props.createTransactionDetails }),
        onApprove: (data) => props.authorizeAction({ customFunctions: props.customFunctions, data }),
        onCancel: (data) => props.cancelAction({ customFunctions: props.customFunctions, data }),
    };
};
/**
 * Paypal main component
 * @param {Object} props
 * @return {JSX.Element}
 */
const Paypal = (props) => {
    const initialPaymentConfiguration = useSelector((state) =>
        find(state.configuration.paymentMethodsConfiguration, (item) => item.code === "PAYPAL")
    );
    const initialConfiguration = useSelector((state) => state.configuration);
    const listConfiguration = useSelector((state) => find(state.list.data, (item) => item.code === "PAYPAL"));
    const idProps = getIdentificationProps({ suffix: props.suffix, className: "paypal-button-container" });
    const buttonProps = prepareButtonProps({ initialPaymentConfiguration, initialConfiguration, listConfiguration, props });
    console.log({ buttonProps });
    return (
        <div {...idProps}>
            <PayPalScriptProvider>
                <PayPalButtons {...buttonProps} />
            </PayPalScriptProvider>
        </div>
    );
};

Paypal.propTypes = {};

export default connect(null, { paymentAction, authorizeAction, cancelAction })(Paypal);

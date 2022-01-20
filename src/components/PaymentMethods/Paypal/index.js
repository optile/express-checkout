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
 * @param {Object} params.props
 */
const prepareButtonProps = ({ initialPaymentConfiguration, props }) => {
    return {
        style: initialPaymentConfiguration.style,
        createOrder: () =>
            props.paymentAction({ customFunctions: props.customFunctions, createTransactionDetails: props.createTransactionDetails }),
        onApprove: (data) => props.authorizeAction({ customFunctions: props.customFunctions, data }),
        onCancel: (data) => props.cancelAction({ customFunctions: props.customFunctions, data }),
    };
};
/**
 * Prepare Paypal Script provider options
 * @param {Object} params
 * @param {Object} params.initialPaymentConfiguration
 * @param {String} params.initialConfiguration
 * @param {Object} params.listConfiguration
 */
const prepareScriptOptions = ({ initialPaymentConfiguration, initialConfiguration, listConfiguration }) => {
    const {
        contractData: { PAGE_ENVIRONMENT, PAGE_BUTTON_LOCALE },
    } = listConfiguration;
    return {
        locale: initialConfiguration.language || PAGE_BUTTON_LOCALE,
        commit: false,
        debug: PAGE_ENVIRONMENT === "sandbox",
        "client-id": initialPaymentConfiguration.clientId || "sb",
        currency: initialConfiguration.currency || "USD",
        intent: "order",
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
    const buttonProps = prepareButtonProps({ initialPaymentConfiguration, props });
    const scriptsProps = prepareScriptOptions({ initialPaymentConfiguration, initialConfiguration, listConfiguration });
    console.log({ buttonProps });
    console.log({ scriptsProps });
    return (
        <div {...idProps}>
            <PayPalScriptProvider options={scriptsProps}>
                <PayPalButtons {...buttonProps} />
            </PayPalScriptProvider>
        </div>
    );
};

Paypal.propTypes = {};

export default connect(null, { paymentAction, authorizeAction, cancelAction })(Paypal);

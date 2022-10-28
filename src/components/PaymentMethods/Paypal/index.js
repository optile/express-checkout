/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

import React from "react";
import { useSelector, connect } from "react-redux";
import find from "lodash/find";
import map from "lodash/map";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { paymentAction, authorizeAction, cancelAction } from "./actions.redux";
import { getIdentificationProps } from "../../../utils";
function getFundingSource(networkCode) {
    return networkCode === "PAYPAL" ? "paypal" : "paylater";
}
/**
 * Prepare Paypal button needed props
 * @param {Object} params
 * @param {Object} params.initialPaymentConfiguration
 * @param {Object} params.props
 */
const prepareButtonProps = ({ initialPaymentConfiguration, props }) => {
    return {
        style: initialPaymentConfiguration.style,
        fundingSource: getFundingSource(initialPaymentConfiguration.code),
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
 * @param {Object} params.props
 */
const prepareScriptOptions = ({ initialPaymentConfiguration, initialConfiguration, listConfiguration, props }) => {
    const {
        contractData: { PAGE_ENVIRONMENT, PAGE_BUTTON_LOCALE, PAGE_SANDBOX_BUYER_COUNTRY, ENABLE_PAY_LATER },
    } = listConfiguration;
    return {
        locale: initialConfiguration.language || PAGE_BUTTON_LOCALE,
        commit: false,
        debug: PAGE_ENVIRONMENT === "sandbox",
        "client-id": initialPaymentConfiguration.clientId || "sb",
        currency: initialConfiguration.currency || "USD",
        intent: "order",
        "buyer-country": PAGE_ENVIRONMENT === "sandbox" ? PAGE_SANDBOX_BUYER_COUNTRY : undefined,
        "enable-funding": ENABLE_PAY_LATER ? "paylater" : undefined,
    };
};

const ButtonsList = (props) => {
    return (
        props.networks &&
        map(props.networks, (network, i) => {
            const initialPaymentConfiguration = useSelector((state) =>
                find(state.configuration.paymentMethodsConfiguration, (item) => item.code === network.code)
            );
            const buttonProps = prepareButtonProps({ initialPaymentConfiguration, props });
            const idProps = getIdentificationProps({ suffix: props.suffix, className: network.code + "-button-container" });

            return (
                <div {...idProps} key={network.code + "-" + i}>
                    <PayPalButtons {...buttonProps} key={network.code + "-" + i} />
                </div>
            );
        })
    );
};

/* Exported for testing only */
export const hasANetworkCode = function (props) {
    return !!(
        props &&
        props.networks &&
        props.networks instanceof Array &&
        props.networks.length &&
        typeof props.networks[0] === "object" &&
        props.networks[0].code
    );
};

/**
 * Paypal main component
 * @param {Object} props
 * @return {JSX.Element}
 */
const Paypal = (props) => {
    if (!hasANetworkCode(props)) {
        return;
    }

    const initialPaymentConfiguration = useSelector((state) =>
        find(state.configuration.paymentMethodsConfiguration, (item) => item.code === props.networks[0].code)
    );
    const initialConfiguration = useSelector((state) => state.configuration);
    const listConfiguration = useSelector((state) => find(state.list.data, (item) => item.code === props.networks[0].code));
    const idProps = getIdentificationProps({ suffix: props.suffix, className: "paypal-group-button-container" });
    const scriptsProps = prepareScriptOptions({
        initialPaymentConfiguration,
        initialConfiguration,
        listConfiguration,
        props,
    });

    return (
        <div {...idProps}>
            <PayPalScriptProvider options={scriptsProps}>
                <ButtonsList {...props} />
            </PayPalScriptProvider>
        </div>
    );
};

Paypal.propTypes = {};

export default connect(null, { paymentAction, authorizeAction, cancelAction })(Paypal);

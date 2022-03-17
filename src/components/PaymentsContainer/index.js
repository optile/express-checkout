/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

import React from "react";
import { useSelector } from "react-redux";
import groupBy from "lodash/groupBy";
import map from "lodash/map";
import { useList } from "./hook";
import Paypal from "../PaymentMethods/Paypal";
import Amazon from "../PaymentMethods/Amazon";
import { getIdentificationProps } from "../../utils";
/**
 * Load Payment Methods Group
 * @param {Object} group
 * @param {Object} bindingProps
 * @param {Number} index
 */
const loadPaymentMethodsGroup = (group, bindingProps, index) => {
    switch (group.name) {
        case "PAYPAL":
            return <Paypal {...bindingProps} key={"PAYPAL_" + index} networks={group.networks} />;
        case "AMAZONPAY":
            return <Amazon {...bindingProps} key={"AMAZONPAY_" + index} networks={group.networks} />;
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
const PaymentsContainer = (props) => {
    const listOfPaymentMethods = useSelector((state) => state.list.data);
    const idProps = getIdentificationProps({ suffix: props.suffix, className: "payments-container" });
    useList(props.customFunctions);

    let groupedPaymentsMethods = groupBy(listOfPaymentMethods, (e) => e.code.split("_")[0]);
    groupedPaymentsMethods = map(groupedPaymentsMethods, (val, key) => ({
        name: key,
        networks: val,
    }));

    return (
        <div {...idProps}>
            {groupedPaymentsMethods && map(groupedPaymentsMethods, (group, i) => loadPaymentMethodsGroup(group, props, i))}
        </div>
    );
};

PaymentsContainer.propTypes = {};

export default PaymentsContainer;

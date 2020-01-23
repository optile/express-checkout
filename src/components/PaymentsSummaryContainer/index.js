import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { usePresetAccount } from "./hook";
/**
 * Payments Summary Container
 * Render a button to allow the end user to Summary the payment by calling
 * Confirm express list that it can be rewritten using custom functions
 *
 * @param {Object} props
 * @return {JSX.Element}
 */
const PaymentsSummaryContainer = props => {
    //TODO: Create the action on button click and run confirm express checkout customized fct
    // write tests for usePresetAccount hook
    const presetAccount = useSelector(state => state.presetAccount.data);
    usePresetAccount(props.customFunctions);
    return (
        <Fragment>
            <div>{JSON.stringify(presetAccount)}</div>
            <button>Confirm</button>
        </Fragment>
    );
};

PaymentsSummaryContainer.propTypes = {};

export default PaymentsSummaryContainer;

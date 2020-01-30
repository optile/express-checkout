import React from "react";
import { useSelector, connect } from "react-redux";
import { usePresetAccount, useCheckPropsForSummary } from "./hook";
import { confirmAction } from "./actions.redux";
/**
 * Payments Summary Container
 * Render a button to allow the end user to Summary the payment by calling
 * Confirm express list that it can be rewritten using custom functions
 *
 * @param {Object} props
 * @return {JSX.Element}
 */
const PaymentsSummaryContainer = props => {
    usePresetAccount(props.customFunctions);
    useCheckPropsForSummary(props.customFunctions);

    return (
        <div test-id="payments-summary-container"  test-id="payments-summary-container">
            <button test-id="payments-summary-confirm-button" className="payments-summary-confirm-button" onClick={() => props.confirmAction({ customFunctions: props.customFunctions })}>Confirm</button>
        </div>
    );
};

PaymentsSummaryContainer.propTypes = {};

export default connect(null, { confirmAction })(PaymentsSummaryContainer);

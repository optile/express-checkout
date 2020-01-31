import React from "react";
import { connect } from "react-redux";
import { usePresetAccount, useCheckPropsForSummary } from "./hook";
import { confirmAction } from "./actions.redux";
import { useTranslation } from "react-i18next";
/**
 * Payments Summary Container
 * Render a button to allow the end user to Summary the payment by calling
 * Confirm express list that it can be rewritten using custom functions
 *
 * @param {Object} props
 * @return {JSX.Element}
 */
const PaymentsSummaryContainer = props => {
    const { t } = useTranslation();
    usePresetAccount(props.customFunctions);
    useCheckPropsForSummary(props.customFunctions);
    
    return (
        <div test-id="payments-summary-container" test-id="payments-summary-container">
            <button
                test-id="payments-summary-confirm-button"
                className="payments-summary-confirm-button"
                onClick={() => props.confirmAction({ customFunctions: props.customFunctions })}
            >
                {t("confirm")}
            </button>
        </div>
    );
};

PaymentsSummaryContainer.propTypes = {};

export default connect(null, { confirmAction })(PaymentsSummaryContainer);

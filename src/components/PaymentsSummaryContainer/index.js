import React from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { usePresetAccount, useCheckPropsForSummary } from "./hook";
import { confirmAction } from "./actions.redux";
import { getIdentificationProps } from "../../utils";
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
    const divIdProps = getIdentificationProps({ suffix: props.suffix, className: "payments-summary-container" });
    const buttonIdProps = getIdentificationProps({ suffix: props.suffix, className: "payments-summary-confirm-button" });
    usePresetAccount(props.customFunctions);
    useCheckPropsForSummary(props.customFunctions);

    return (
        <div {...divIdProps}>
            <button {...buttonIdProps} onClick={() => props.confirmAction({ customFunctions: props.customFunctions })}>
                {t("confirm")}
            </button>
        </div>
    );
};

PaymentsSummaryContainer.propTypes = {};

export default connect(null, { confirmAction })(PaymentsSummaryContainer);

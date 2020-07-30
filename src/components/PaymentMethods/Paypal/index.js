import React from "react";
import { useSelector, connect } from "react-redux";
import find from "lodash/find";
import PaypalButton from "./PaypalButton";
import { paymentAction, authorizeAction, cancelAction } from "./actions.redux";
import { getIdentificationProps } from "../../../utils";
/**
 * Prepare Paypal button needed props
 * @param {Object} params
 * @param {Object} params.initialConfigurationStyle
 * @param {String} params.initialConfigurationLanguage passed under configuration initially
 * @param {Object} params.listConfiguration
 * @param {Object} params.props
 */
const prepareButtonProps = ({ initialConfigurationStyle, initialConfigurationLanguage, listConfiguration, props }) => {
    const {
        contractData: { PAGE_ENVIRONMENT, PAGE_BUTTON_LOCALE },
    } = listConfiguration;
    return {
        style: initialConfigurationStyle,
        locale: initialConfigurationLanguage || PAGE_BUTTON_LOCALE,
        commit: false,
        env: PAGE_ENVIRONMENT,
        payment: () =>
            props.paymentAction({ customFunctions: props.customFunctions, createTransactionDetails: props.createTransactionDetails }),
        onAuthorize: (data) => props.authorizeAction({ customFunctions: props.customFunctions, data }),
        onCancel: (data) => props.cancelAction({ customFunctions: props.customFunctions, data }),
    };
};
/**
 * Paypal main component
 * @param {Object} props
 * @return {JSX.Element}
 */
const Paypal = (props) => {
    const initialConfiguration = useSelector((state) =>
        find(state.configuration.paymentMethodsConfiguration, (item) => item.code === "PAYPAL")
    );
    const initialConfigurationStyle = initialConfiguration.style;
    const initialConfigurationLanguage = useSelector((state) => state.configuration.language);
    const listConfiguration = useSelector((state) => find(state.list.data, (item) => item.code === "PAYPAL"));
    const idProps = getIdentificationProps({ suffix: props.suffix, className: "paypal-button-container" });
    const buttonProps = prepareButtonProps({ initialConfigurationStyle, initialConfigurationLanguage, listConfiguration, props });

    return (
        <div {...idProps}>
            <PaypalButton {...buttonProps} />
        </div>
    );
};

Paypal.propTypes = {};

export default connect(null, { paymentAction, authorizeAction, cancelAction })(Paypal);

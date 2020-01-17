import React from "react";
import { useSelector, connect } from "react-redux";
import find from "lodash/find";
import PaypalButton from "./PaypalButton";
import {paymentAction, authorizeAction, cancelAction} from './actions.redux'
/**
 * Prepare Paypal button needed props
 * @param {Object} params 
 * @param {Object} params.initialConfiguration 
 * @param {Object} params.listConfiguration 
 * @param {Object} params.props 
 */
const prepareButtonProps = ({ initialConfiguration, listConfiguration, props }) => {
    const { style, locale } = initialConfiguration;
    const {
        contractData: { PAGE_ENVIRONMENT, PAGE_BUTTON_LOCALE },
    } = listConfiguration;
    return {
        style,
        locale: PAGE_BUTTON_LOCALE || locale,
        commit: false,
        env: PAGE_ENVIRONMENT,
        payment: () => props.paymentAction(props.customFunctions, props.createTransactionDetails),
        onAuthorize: (data) => props.authorizeAction(props.customFunctions, data),
        onCancel: (cancelData) => props.cancelAction(props.customFunctions, cancelData),
    };
};
/**he 
 * Paypal main component
 * @param {Object} props
 * @return {JSX.Element}
 */
const Paypal = props => {
    const initialConfiguration = useSelector(state =>
        find(state.configuration.paymentMethodsConfiguration, item => item.code === "PAYPAL")
    );
    const listConfiguration = useSelector(state => find(state.list, item => item.code === "PAYPAL"));

    const buttonProps = prepareButtonProps({ initialConfiguration, listConfiguration, props });
    return <PaypalButton {...buttonProps} />;
};

Paypal.propTypes = {};

// const mapStateToProps = ({ config, list }) => ({
//     paypalConfig: config.paypalConfig,
//     configLoaded: config.configLoaded,
//     contractData: list.networks.PAYPAL.contractData,
// });

export default connect(null, { paymentAction, authorizeAction, cancelAction })(Paypal);

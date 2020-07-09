import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import store from "./store";
import ConfigurationManager from "./components/ConfigurationManager";

/**
 * The main component to render express checkout widget
 * @param {Object} props
 * @param {Object} props.configuration
 * @param {Function} props.createTransactionDetails only required when mode is not set ( checkout page )
 * @param {Object} props.customFunctions
 * @param {String} props.mode
 * @param {String} props.longId
 * @param {String} props.suffix used to add to class, test-id and id if needed to identify exact components when multiple
 * are in the same page
 * @return {JSX.Element}
 */
const ExpressCheckout = ({ configuration, createTransactionDetails, customFunctions, mode, longId, suffix }) => {
    return (
        <Provider store={store}>
            <ConfigurationManager
                configuration={configuration}
                createTransactionDetails={createTransactionDetails}
                customFunctions={customFunctions}
                mode={mode}
                longId={longId}
                suffix={suffix}
            />
        </Provider>
    );
};

ExpressCheckout.propTypes = {
    configuration: PropTypes.object.isRequired,
    createTransactionDetails: PropTypes.func,
    customFunctions: PropTypes.object,
    mode: PropTypes.string,
    longId: PropTypes.string,
    suffix: PropTypes.string,
};

ExpressCheckout.defaultProps = {
    createTransactionDetails: (f) => f,
    customFunctions: {},
    mode: "",
    longId: "",
    suffix: "",
};

export default ExpressCheckout;

import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import initStore from "./store";
import ConfigurationManager from "./components/ConfigurationManager";

/**
 * The main component to render express checkout widget
 * @param {Object} props
 * @param {Object} props.configuration
 * @param {Function} props.createTransactionDetails
 * @param {Object} props.customFunctions
 * @return {JSX.Element}
 */
const ExpressCheckout = ({ configuration, createTransactionDetails, customFunctions }) => {
    const store = initStore();

    return (
        <Provider store={store}>
            <ConfigurationManager
                configuration={configuration}
                createTransactionDetails={createTransactionDetails}
                customFunctions={customFunctions}
            />
        </Provider>
    );
};

ExpressCheckout.propTypes = {
    configuration: PropTypes.object.isRequired,
    createTransactionDetails: PropTypes.func.isRequired,
    customFunctions: PropTypes.object,
};

export default ExpressCheckout;

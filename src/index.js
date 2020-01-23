import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

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
 * @param {String} props.mode
 * @param {String} props.longId
 * @return {JSX.Element}
 */
const ExpressCheckout = ({ configuration, createTransactionDetails, customFunctions, mode, longId }) => {
    const store = initStore();
    return (
        <Provider store={store}>
            <ConfigurationManager
                configuration={configuration}
                createTransactionDetails={createTransactionDetails}
                customFunctions={customFunctions}
                mode={mode}
                longId={longId}
            />
        </Provider>
    );
};

ExpressCheckout.propTypes = {
    configuration: PropTypes.object.isRequired,
    createTransactionDetails: PropTypes.func.isRequired,
    customFunctions: PropTypes.object,
    mode: PropTypes.string,
    longId: PropTypes.string,
};

export default ExpressCheckout;

import React, { useEffect /*, useState*/ } from "react";
import PropTypes from "prop-types";
import { storeConfiguration, storeMode, storeLongId } from "./redux";
import { useDispatch, useSelector } from "react-redux";
import PaymentsContainer from "../PaymentsContainer";
import PaymentsSummaryContainer from "../PaymentsSummaryContainer";
import GlobalError from "../GlobalError";

/**
 * Configuration Manager
 * The main component to render express checkout widget
 * @param {Object} props
 * @param {Object} props.configuration
 * @param {Function} props.createTransactionDetails
 * @param {Object} props.customFunctions
 * @param {String} props.mode
 * @param {String} props.longId
 * @return {JSX.Element}
 */
const ConfigurationManager = props => {
    const dispatch = useDispatch();
    const mode = useSelector(state => state.mode);
    const globalError = useSelector(state => state.globalError);
    const displayGlobalError = useSelector(state => state.displayGlobalError);

    useEffect(() => {
        dispatch(storeConfiguration(props.configuration));
        dispatch(storeMode(props.mode));
        dispatch(storeLongId(props.longId));
    }, [props.longId, props.mode]);
    
    if (displayGlobalError) {
        return <GlobalError message={globalError} />;
    }

    return mode === "Summary" ? <PaymentsSummaryContainer {...props} /> : <PaymentsContainer {...props} />;
};

ConfigurationManager.propTypes = {
    configuration: PropTypes.object.isRequired,
    createTransactionDetails: PropTypes.func.isRequired,
    customFunctions: PropTypes.object,
    mode: PropTypes.string,
    longId: PropTypes.string,
};

export default ConfigurationManager;

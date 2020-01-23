import React, { useEffect /*, useState*/ } from "react";
import PropTypes from "prop-types";
import { storeConfiguration, storeSuffix, storeMode, storeLongId } from "./redux";
import { useDispatch, useSelector } from "react-redux";
import PaymentsContainer from "../PaymentsContainer";
import PaymentsSummaryContainer from "../PaymentsSummaryContainer";

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
    console.log("longId value is:", props.longId); //TODO: remove later just before last commit
    useEffect(() => {
        dispatch(storeConfiguration(props.configuration));
        dispatch(storeMode(props.mode));
        dispatch(storeLongId(props.longId));
        dispatch(storeSuffix());
    }, []); //Called only one time when this component is created and rendered

    console.log("here you are in this mode: ", mode); //TODO: remove later just before last commit
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

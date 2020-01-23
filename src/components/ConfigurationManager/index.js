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
    const longId = useSelector(state => state.longId);
    console.log("longId value is:", props.longId); //TODO: remove later just before last commit
    useEffect(() => {
        dispatch(storeConfiguration(props.configuration));
        dispatch(storeSuffix());
        dispatch(storeMode(props.mode));
        dispatch(storeLongId(props.longId));
    }, [props.longId, props.mode]); 

    console.log("here you are in this mode: ", mode); //TODO: remove later just before last commit
    console.log("here you have this longId saved: ", longId); //TODO: remove later just before last commit
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

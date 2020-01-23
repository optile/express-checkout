import React, { useEffect /*, useState*/ } from "react";
import PropTypes from "prop-types";
import { storeConfiguration, storeSuffix, storeMode } from "./redux";
import { useDispatch, useSelector } from "react-redux";
import PaymentsContainer from "../PaymentsContainer";
import PaymentsSummaryContainer from "../PaymentsSummaryContainer";
//TODO: for PCX-636:
// move ue list to paymentContainer, bcz it is not needed in all modes and remove the check of list Of payment methods too
// create another component to replace paymentContainer, in case mode is Confirm/summary or others
// implement the new component and the flow
// add inline comments as suggested by tal to make it easier to read

/**
 * The main component to render express checkout widget
 * @param {Object} props
 * @param {Object} props.configuration
 * @return {JSX.Element}
 */
const ConfigurationManager = props => {
    const dispatch = useDispatch();
    const mode = useSelector(state => state.mode);
    /**
     * Called only one time when this component is created and rendered
     */
    useEffect(() => {
        dispatch(storeConfiguration(props.configuration));
        dispatch(storeMode(props.mode));
        dispatch(storeSuffix());
    }, []);
    console.log("here you are in this mode: ", mode);//TODO: remove later when commit:
    return (mode === "Summary")? <PaymentsSummaryContainer {...props}/> : <PaymentsContainer {...props}/>;
};

ConfigurationManager.propTypes = {
    configuration: PropTypes.object.isRequired,
    createTransactionDetails: PropTypes.func.isRequired,
    customFunctions: PropTypes.object,
    mode: PropTypes.string,
};

export default ConfigurationManager;

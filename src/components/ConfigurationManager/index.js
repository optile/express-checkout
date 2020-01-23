import React, { useEffect /*, useState*/ } from "react";
import PropTypes from "prop-types";
import { storeConfiguration, storeSuffix } from "./redux";
import { useList } from "./hook";
import { useDispatch, useSelector } from "react-redux";
import PaymentsContainer from "../PaymentsContainer";

/**
 * The main component to render express checkout widget
 * @param {Object} props
 * @param {Object} props.configuration
 * @return {JSX.Element}
 */
const ConfigurationManager = props => {
    const dispatch = useDispatch();
    const listOfPaymentMethods = useSelector(state => state.list);
    /**
     * Called only one time when this component is created and rendered
     */
    useEffect(() => {
        dispatch(storeConfiguration(props.configuration));
        dispatch(storeSuffix());
    }, []);
    useList(props.customFunctions);
    console.log("here you are in this mode: ", props.mode);
    return <div>{listOfPaymentMethods && listOfPaymentMethods.length ? <PaymentsContainer {...props}/> : null}</div>;
};

ConfigurationManager.propTypes = {
    configuration: PropTypes.object.isRequired,
    createTransactionDetails: PropTypes.func.isRequired,
    customFunctions: PropTypes.object,
    mode: PropTypes.string,
};

export default ConfigurationManager;

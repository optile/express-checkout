import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { storeConfiguration, storeSuffix } from "./redux";
import { useList } from "./hook";
import { useDispatch } from "react-redux";

/**
 * The main component to render express checkout widget
 * @param {Object} props
 * @param {Object} props.configuration
 * @return {JSX.Element}
 */
const ConfigurationManager = props => {
    const dispatch = useDispatch();
    const [listBody, setListBody] = useState({});

    /**
     * Called only one time when this component is created and rendered
     */
    useEffect(() => {
        dispatch(storeConfiguration(props.configuration));
        dispatch(storeSuffix());
        setListBody(props.createTransactionDetails());
    }, []);
    useList(props.customFunctions);

    return <div> {listBody && JSON.stringify(listBody)} </div>;
};

ConfigurationManager.propTypes = {
    configuration: PropTypes.object.isRequired,
};

export default ConfigurationManager;

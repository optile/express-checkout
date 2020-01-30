import React from "react";
import PropTypes from "prop-types";

/**
 * Global error that display a message
 * Display Global error message
 * @param {Object} props
 * @param {String} props.message
 * @return {JSX.Element}
 */
const GlobalError = ({ message }) => {
    return <div test-id="global-error" className="global-error"></div>;
};

GlobalError.propTypes = {
    message: PropTypes.string,
};

export default GlobalError;

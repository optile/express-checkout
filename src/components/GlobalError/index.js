import React from "react";
import PropTypes from "prop-types";
// By default the global error component will be rendered,
// but will be hidden and the message will not be displayed,
// if needed, restyle .global-error by forcing display and changing colors and position
const errorStyle = { display: "none" };
/**
 * Global error that display a message
 * Display Global error message
 * @param {Object} props
 * @param {String} props.message
 * @return {JSX.Element}
 */
const GlobalError = ({ message }) => {
    return <div test-id="global-error" className="global-error" style={errorStyle}>{message}</div>;
};

GlobalError.propTypes = {
    message: PropTypes.string,
};

export default GlobalError;

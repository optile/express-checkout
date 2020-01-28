import React, { Fragment } from "react";
import PropTypes from "prop-types";

const redError = { color: "#c22d2d" };
/**
 * Global error that display a message
 * Display Global error message
 * @param {Object} props
 * @param {String} props.message
 * @return {JSX.Element}
 */
const GlobalError = ({ message }) => {
    return (
        <Fragment>
            <div style={redError}>{message}</div>
        </Fragment>
    );
};

GlobalError.propTypes = {
    message: PropTypes.string,
};

export default GlobalError;

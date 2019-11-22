import React from "react";
import PropTypes from 'prop-types';

/**
 * 
 * @param {Object} props 
 * @return {JSX.Element}
 */
const ExpressCheckout = props => (
    <div>
        <h2 data-test-id="test">Hello</h2>
    </div>
);

ExpressCheckout.propTypes = {
    config: PropTypes.object.isRequired
};

export default ExpressCheckout;

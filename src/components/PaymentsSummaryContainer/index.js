import React, { Fragment } from "react";
/**
 * Payments Summary Container
 * Render a button to allow the end user to Summary the payment by calling
 * Summary express list that it can be rewritten using custom functions
 * 
 * @param {Object} props
 * @return {JSX.Element}
 */
const PaymentsSummaryContainer = props => {
    return (
        <Fragment>
            <div>TODO: Implement Summary mode used in summary page but for now:<br />Welcome to Summary mode <br /> {JSON.stringify(props)}</div>
        </Fragment>
    );
};

PaymentsSummaryContainer.propTypes = {};

export default PaymentsSummaryContainer;

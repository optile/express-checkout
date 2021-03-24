/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

import React from "react";
import { getIdentificationProps } from "../../../utils";

const Amazon = props => {
    const idProps = getIdentificationProps({ className: "amazon-button-container" });

    return (
        <div {...idProps}>
            <input type="button" value="Amazon" />
        </div>
    );
};

Amazon.propTypes = {};

export default Amazon;

import React from "react";

import getAttributes from "../configuration";
import createTransactionDetails1 from "../configuration/product1";
import createTransactionDetails2 from "../configuration/product2";
import ExpressCheckout from "../../../src";

const getMode = () => {
    let params = new URLSearchParams(window.location.search);

    return params.get("mode");
};

const Products = () => {
    const attributes = getAttributes();
    const mode = getMode();
    return (
        <div>
            {mode === "Cancel" && <div>An Error happened, you can retry</div>}
            <table>
                <tbody>
                    <tr>
                        <td>USB C cable: 2Euro</td>
                        <td>
                            <ExpressCheckout {...attributes} createTransactionDetails={createTransactionDetails1} suffix="1"/>
                        </td>
                    </tr>
                    <tr>
                        <td>USB C cable fast: 10Euro</td>
                        <td>
                            <ExpressCheckout {...attributes} createTransactionDetails={createTransactionDetails2} suffix="2"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Products;

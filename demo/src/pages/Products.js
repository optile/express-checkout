import React from "react";

import getAttributes from "../configuration";
import createTransactionDetails1 from "../configuration/product1";
import createTransactionDetails2 from "../configuration/product2";
import ExpressCheckout from "../../../src";
import { useNumberInput, useStringInput } from "./useInput";

const getMode = () => {
    let params = new URLSearchParams(window.location.search);

    return params.get("mode");
};

const Products = () => {
    const attributes = getAttributes();
    const mode = getMode();
    const { value: clientId, inputProps: clientIdProps } = useStringInput(attributes.configuration.clientId);
    const { value: product1, inputProps: product1Props } = useNumberInput(2);
    const { value: product2, inputProps: product2Props } = useNumberInput(10);

    return (
        <div>
            {mode === "Cancel" && <div style={{ color: "red" }}>An Error happened, you can retry</div>}
            <table>
                <tbody>
                    <tr>
                        <td>Enter the client id:</td>
                        <td colSpan="3">
                            <input value={clientId} {...clientIdProps} />
                        </td>
                    </tr>
                    <tr>
                        <td>USB C cable:</td>
                        <td>
                            <input value={product1} {...product1Props} />
                        </td>
                        <td>Euros</td>
                        <td>
                            <ExpressCheckout
                                configuration={{ ...attributes.configuration, clientId }}
                                createTransactionDetails={(data) => createTransactionDetails1(data, product1)}
                                suffix="1"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>USB C cable fast:</td>
                        <td>
                            <input value={product2} {...product2Props} />
                        </td>
                        <td>Euros</td>
                        <td>
                            <ExpressCheckout
                                configuration={{ ...attributes.configuration, clientId }}
                                createTransactionDetails={(data) => createTransactionDetails2(data, product2)}
                                suffix="2"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Products;

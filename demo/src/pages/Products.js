import React, { useCallback } from "react";

import getAttributes from "../configuration";
import createTransactionDetails1 from "../configuration/product1";
import ExpressCheckout from "../../../src";
import { useNumberInput, useStringInput } from "./useInput";
import "./Product.css";

const getMode = () => {
    let params = new URLSearchParams(window.location.search);

    return params.get("mode");
};

const Products = () => {
    const attributes = getAttributes();
    const mode = getMode();
    const { value: clientId, inputProps: clientIdProps } = useStringInput(attributes.configuration.clientId);
    const { value: price1, inputProps: price1Props } = useNumberInput(47);
    const getPrice1 = useCallback(() => {
        const el = document.getElementById("price1");

        return Number(el?.value);
    }, [price1]);

    return (
        <div>
            {mode === "Cancel" && <div style={{ color: "red" }}>An Error happened, you can retry</div>}
            <table>
                <tbody>
                    <tr>
                        <td>Enter the client id:</td>
                        <td colSpan="3">
                            <input value={clientId} {...clientIdProps} test-id="clientId" />
                        </td>
                    </tr>
                    <tr>
                        <td>USB C cable:</td>
                        <td>
                            <input id="price1" value={price1} {...price1Props} test-id="price1" />
                        </td>
                        <td>GBP</td>
                        <td>
                            <ExpressCheckout
                                configuration={{ ...attributes.configuration, clientId }}
                                createTransactionDetails={(data) => createTransactionDetails1(data, getPrice1())}
                                customFunctions={attributes.customFunctions}
                                suffix="1"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Products;

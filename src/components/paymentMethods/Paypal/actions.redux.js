import { createExpressPreset, updateExpressPreset, onCustomerAbort, onClientException, onProceed } from "../../../utils/customFunctions";
import get from "lodash/get";
import find from "lodash/find";
import { toRequestData, interactionCodeHandler, errorPreset } from "../../../utils";
import {
    storePaypalStatus,
    storePaypalPaymentID,
    storePaypalPreset,
    storePaypalCancelData,
    storePaypalError
} from "./redux";

function getNetworkList(getState) {
    var state = getState();
    return get(state, "list", null);
}
function getPaypalList(getState) {
    const list = getNetworkList(getState);
    return find(list, function(element) {
        return element.code === "PAYPAL";
    });
}
function getOperationLink(getState) {
    var paypalList = getPaypalList(getState);
    if (!paypalList) {
        return "";
    }

    return get(paypalList, "links.operation", "");
}
function getUpdateLink(getState) {
    return get(getState(), "paypal.preset.links.self", "");
}
const paymentActionOk = (result, dispatch) => {
    var data = result.data;
    var code = data.interaction.code;
    if (code !== "PROCEED") {
        const err = { message: data.resultInfo };
        dispatch(storePaypalError(err));
        dispatch(storePaypalStatus("Error"));
        interactionCodeHandler({ code, preset: data, step: "create", dispatch, customFunctions });
        return null;
    }
    const providerResponse = get(data, ["providerResponse", "parameters"], false);
    if (providerResponse) {
        const { value: paymentIdVal } = find(providerResponse, ["name", "token"]);
        dispatch(storePaypalPreset(data));
        dispatch(storePaypalPaymentID(paymentIdVal));
        dispatch(storePaypalStatus("Payment Session created"));
        return paymentIdVal;
    }
    throw new Error("Server response does not contain proper data");
};
const paymentAction = (customFunctions, createTransactionDetails) => async (dispatch, getState) => {
    dispatch(storePaypalStatus("Payment Session Pending"));
    try {
        const operationURL = getOperationLink(getState);
        const clientId = get(getState(), "configuration.clientId", null);
        const result = await createExpressPreset({
            params: { url: operationURL, transaction: createTransactionDetails(null), network: "PAYPAL", clientId },
            customFunctions,
        });
        if (result.response.ok) {
            return paymentActionOk(result, dispatch);
        }
        const { error: err } = result;
        dispatch(storePaypalError(err));
        dispatch(storePaypalStatus("Error"));
        const data = errorPreset(err, "PAYPAL");
        onClientException({ preset: data, step: "create", dispatch, customFunctions });
    } catch (err) {
        const errorMessage = { message: err.message };
        const data = errorPreset(errorMessage, "PAYPAL");
        dispatch(storePaypalError(errorMessage));
        dispatch(storePaypalStatus("Error"));
        onClientException({ preset: data, step: "create", dispatch, customFunctions });
    }
};
const cancelAction = (customFunctions, data) => async (dispatch, getState) => {
    //TODO: sendData({ url, method: "PUT", body: transaction }) and use prest cancelUel
    const presetVal = get(getState(), "paypal.preset", {});
    dispatch(storePaypalCancelData(data));
    dispatch(storePaypalStatus("Payment Session Cancelled"));
    onCustomerAbort({ params: { preset: presetVal, dispatch }, customFunctions });
};
const authorizeAction = (customFunctions, data) => async (dispatch, getState) => {
    dispatch(storePaypalStatus("Authorization Pending"));
    try {
        const updateURL = getUpdateLink(getState);
        const providerRequest = toRequestData("PAYPAL", data);
        if (updateURL) {
            const result = await updateExpressPreset({
                params: { url: updateURL, transaction: { providerRequest }, network: "PAYPAL" },
                customFunctions,
            });
            if (result.response.ok) {
                const { data } = result;
                const { code, reason } = data.interaction;
                if (code !== "PROCEED") {
                    const errorMessage = { message: data.resultInfo };
                    dispatch(storePaypalError(errorMessage));
                    dispatch(storePaypalStatus("Error"));
                    interactionCodeHandler({ code, preset: data, step: "update", dispatch, customFunctions });
                    return;
                }
                const presetReady = reason === "TAKE_ACTION";
                if (presetReady) {
                    dispatch(storePaypalPreset(data));
                    dispatch(storePaypalStatus("Authorization Done"));
                    onProceed({ params: { preset: data }, customFunctions });
                }
            } else {
                const { error: err } = result;
                const data = errorPreset(err, "PAYPAL");
                dispatch(storePaypalError(err));
                dispatch(storePaypalStatus("Error"));
                onClientException({ preset: data, step: "update", dispatch, customFunctions });
            }
        } else {
            throw new Error("Update link is not found");
        }
    } catch (err) {
        const errorMessage = { message: err.message };
        const data = errorPreset(errorMessage, "PAYPAL");
        dispatch(storePaypalError(errorMessage));
        dispatch(storePaypalStatus("Error"));
        onClientException({ preset: data, step: "update" });
    }
};
export { paymentAction, cancelAction, authorizeAction };

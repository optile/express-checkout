import { createExpressPreset, updateExpressPreset, onCustomerAbort, onProceed, cancelExpressPreset } from "../../../utils/customFunctions";
import get from "lodash/get";
import find from "lodash/find";
import { toRequestData, interactionCodeHandler, handleError } from "../../../utils";
import { storePaypalStatus, storePaypalPaymentID, storePaypalPreset, storePaypalCancelData, storePaypalError } from "./redux";

function getNetworkList(getState) {
    var state = getState();
    return get(state, "list.data", null);
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
/**
 * On Error
 *
 * @param {Object} params
 * @param {Object} params.err
 * @param {Function} params.dispatch
 * @param {String} params.step
 * @param {Object} params.customFunctions
 */
const onError = ({ err, dispatch, step, customFunctions }) => {
    const network = "PAYPAL";
    const errorProps = {
        err,
        step,
        network,
        updateState: () => {
            dispatch(storePaypalError(err));
            dispatch(storePaypalStatus("Error"));
        },
        dispatch,
        customFunctions,
    };
    handleError(errorProps);
};
const handleNotOkResponse = ({ result, dispatch, step, customFunctions }) => {
    const { error: err } = result;
    return onError({ err, dispatch, step, customFunctions });
};
const handleCatch = ({ err, dispatch, step, customFunctions }) => {
    const errorMessage = { message: err.message };
    return onError({ err: errorMessage, dispatch, step, customFunctions });
};
const paymentActionOk = ({ result, dispatch, customFunctions }) => {
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
const paymentAction = ({ customFunctions, createTransactionDetails }) => async (dispatch, getState) => {
    dispatch(storePaypalStatus("Payment Session Pending"));
    try {
        const operationURL = getOperationLink(getState);
        const clientId = get(getState(), "configuration.clientId", null);
        const result = await createExpressPreset({
            params: { url: operationURL, transaction: createTransactionDetails(null), network: "PAYPAL", clientId },
            customFunctions,
        });
        if (result.response.ok) {
            return paymentActionOk({ result, dispatch, customFunctions });
        }
        return handleNotOkResponse({ result, dispatch, step: "create", customFunctions });
    } catch (err) {
        return handleCatch({ err, dispatch, step: "create", customFunctions });
    }
};
const authorizeActionOk = ({ result, dispatch, customFunctions }) => {
    const { data } = result;
    const { code, reason } = data.interaction;
    if (code !== "PROCEED") {
        const errorMessage = { message: data.resultInfo };
        dispatch(storePaypalError(errorMessage));
        dispatch(storePaypalStatus("Error"));
        return interactionCodeHandler({ code, preset: data, step: "update", dispatch, customFunctions });
    }
    const presetReady = reason === "TAKE_ACTION";
    if (presetReady) {
        dispatch(storePaypalPreset(data));
        dispatch(storePaypalStatus("Authorization Done"));
        return onProceed({ params: { preset: data, step: "update", dispatch }, customFunctions });
    }
};

const authorizeAction = ({ customFunctions, data }) => async (dispatch, getState) => {
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
                return authorizeActionOk({ result, dispatch, customFunctions });
            } else {
                return handleNotOkResponse({ result, dispatch, step: "update", customFunctions });
            }
        } else {
            throw new Error("Update link is not found");
        }
    } catch (err) {
        return handleCatch({ err, dispatch, step: "update", customFunctions });
    }
};
const cancelActionOk = ({ result, dispatch, customFunctions }) => {
    const { data } = result;
    const { code } = data.interaction;
    if (code !== "PROCEED") {
        dispatch(storePaypalStatus("Payment Session Cancel Error"));
        return interactionCodeHandler({ code, preset: data, step: "cancel", dispatch, customFunctions });
    }
    dispatch(storePaypalCancelData(data));
    dispatch(storePaypalStatus("Payment Session Cancelled"));
    return onCustomerAbort({ params: { preset: data, dispatch }, customFunctions });
};
const cancelAction = ({ customFunctions, data }) => async (dispatch, getState) => {
    dispatch(storePaypalStatus("Payment Session Cancel Pending"));
    try {
        const cancelUrl = data.cancelUrl;
        const providerRequest = toRequestData("PAYPAL", data);
        if (cancelUrl) {
            const result = await cancelExpressPreset({
                params: { url: cancelUrl, transaction: { providerRequest }, network: "PAYPAL" },
                customFunctions,
            });
            if (result.response.ok) {
                return cancelActionOk({ result, dispatch, customFunctions });
            } else {
                return handleNotOkResponse({ result, dispatch, step: "cancel", customFunctions });
            }
        } else {
            throw new Error("Cancel link is not found");
        }
    } catch (err) {
        return handleCatch({ err, dispatch, step: "cancel", customFunctions });
    }
};
export { paymentAction, cancelAction, authorizeAction };

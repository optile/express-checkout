import get from "lodash/get";
import find from "lodash/find";

import { sendData, sendDataWithParams } from "../network";
import { getRedirectUrl } from "../index";
/**
 * Object that contains all the initial definition
 * of the function that can be customized using customFunctions
 */
var internalFunctions = {
    getExpressList: ({ url, clientId, country }) => sendDataWithParams({ baseURL: url, method: "GET", params: { clientId, country } }), // Get the List of Networks
    createExpressPreset: ({ url, transaction, network, clientId }) =>
        sendDataWithParams({ baseURL: url, method: "POST", params: { clientId }, body: transaction }), // Creates Express Preset,
    updateExpressPreset: ({ url, transaction, network }) => sendData({ url, method: "PUT", body: transaction }), // Update Express Preset,
    confirmExpressPreset: ({ url, network }) => sendData({ url, method: "POST", body: {} }),
    onProceed: ({ preset }) => {
        if (!preset.redirect) {
            console.log("Redirect information is not found in Preset response");
            return;
        }
        const { url, method, parameters } = preset.redirect;
        if (method === "GET") {
            window.location.assign(getRedirectUrl(url, parameters));
        } else {
            console.log(`Redirect via ${method} is not supported`);
        }
    },
    onAbort: ({ preset, step, dispatch }) => {
        const { resultInfo } = preset;
        console.log("Error has occurred: ", resultInfo, ", ", "Step: ", step);
        if (!preset.redirect) {
            console.log("Redirect information is not found in Preset response");
            dispatch({ type: "AMAZON_AUTH_LOGOUT" });
            return;
        }
        const { url, method, parameters } = preset.redirect;
        if (method === "GET") {
            window.location.assign(getRedirectUrl(url, parameters));
        } else {
            console.log(`Redirect via ${method} is not supported`);
        }
    },
    onReload: ({ preset, step, dispatch }) => {
        const { resultInfo } = preset;
        console.log("Error has occurred: ", resultInfo, ", ", "Step: ", step);
        dispatch({ type: "AMAZON_AUTH_LOGOUT" });
    },
    onRetry: ({ preset, step, dispatch }) => {
        const { resultInfo } = preset;
        console.log("Error has occurred: ", resultInfo, ", ", "Step: ", step);
        dispatch({ type: "AMAZON_AUTH_LOGOUT" });
    },
    onCustomerAbort: ({ preset, dispatch }) => {
        console.log("Canceled by user");
    },
};
/**
 * Use Correct Function depending on if it is initialized in customFunctions or just use initialFunctions
 * @param {Object} params
 * @param {Object} params.params
 * @param {String} params.functionName the key name of the function to check is defined as customFunctions
 * @param {Object} params.customFunctions
 * @returns {Function} Correct function
 */
export const useCorrectFunction = ({ params, functionName, customFunctions }) => {
    const customFunction = get(customFunctions, functionName, false);
    const internalFunction = get(internalFunctions, functionName, false);
    return customFunction ? customFunction(params) : internalFunction(params);
};
/**
 * getExpressList 
 * @param {Object} params
 * @param {Object} params.params the parameters passed to getExpressList from custom Functions or initial functions 
 * @param {Object} params.customFunctions
 */
export const getExpressList = ({ params, customFunctions }) => useCorrectFunction({ params, functionName: "getExpressList", customFunctions });
/**
 * createExpressPreset 
 * @param {Object} params
 * @param {Object} params.params the parameters passed to createExpressPreset from custom Functions or initial functions 
 * @param {Object} params.customFunctions
 */
export const createExpressPreset = ({ params, customFunctions }) =>
    useCorrectFunction({ params, functionName: "createExpressPreset", customFunctions });
/**
 * updateExpressPreset 
 * @param {Object} params
 * @param {Object} params.params the parameters passed to updateExpressPreset from custom Functions or initial functions 
 * @param {Object} params.customFunctions
 */
export const updateExpressPreset = ({ params, customFunctions }) =>
    useCorrectFunction({ params, functionName: "updateExpressPreset", customFunctions });
/**
 * confirmExpressPreset 
 * @param {Object} params
 * @param {Object} params.params the parameters passed to confirmExpressPreset from custom Functions or initial functions 
 * @param {Object} params.customFunctions
 */
export const confirmExpressPreset = ({ params, customFunctions }) =>
    useCorrectFunction({ params, functionName: "confirmExpressPreset", customFunctions });
/**
 * onProceed 
 * @param {Object} params
 * @param {Object} params.params the parameters passed to onProceed from custom Functions or initial functions 
 * @param {Object} params.customFunctions
 */
export const onProceed = ({ params, customFunctions }) => {
    useCorrectFunction({ params, functionName: "onProceed", customFunctions });
};
/**
 * onAbort 
 * @param {Object} params
 * @param {Object} params.params the parameters passed to onAbort from custom Functions or initial functions 
 * @param {Object} params.customFunctions
 */
export const onAbort = ({ params, customFunctions }) => {
    useCorrectFunction({ params, functionName: "onAbort", customFunctions });
};
/**
 * onReload 
 * @param {Object} params
 * @param {Object} params.params the parameters passed to onReload from custom Functions or initial functions 
 * @param {Object} params.customFunctions
 */
export const onReload = ({ params, customFunctions }) => {
    useCorrectFunction({ params, functionName: "onReload", customFunctions });
};
/**
 * onRetry 
 * @param {Object} params
 * @param {Object} params.params the parameters passed to onRetry from custom Functions or initial functions 
 * @param {Object} params.customFunctions
 */
export const onRetry = ({ params, customFunctions }) => {
    useCorrectFunction({ params, functionName: "onRetry", customFunctions });
};
/**
 * onClientException 
 * @param {Object} params
 * @param {Object} params.params the parameters passed to onClientException from custom Functions or initial functions 
 * @param {Object} params.customFunctions
 */
export const onClientException = ({preset, step, dispatch, customFunctions}) => {
    // useCorrectFunction({ params, functionName: "onRetry", customFunctions });
    const onClientExceptionClient = get(customFunctions, "onClientExceptionClient", false);
    const onErrorClient = get(customFunctions, "onErrorClient", false);
    if (onClientExceptionClient) {
        onClientExceptionClient({preset, step});
        return;
    }
    if (onErrorClient) {
        onErrorClient({resultInfo: preset.resultInfo, network: preset.network, step});
        return;
    }
    const { resultInfo } = preset;
    console.log("Error has occurred: ", resultInfo, ", ", "Step: ", step);
    dispatch({ type: "AMAZON_AUTH_LOGOUT" });
};
/**
 * onCustomerAbort 
 * @param {Object} params
 * @param {Object} params.params the parameters passed to onCustomerAbort from custom Functions or initial functions 
 * @param {Object} params.customFunctions
 */
export const onCustomerAbort = ({ params, customFunctions }) => {
    useCorrectFunction({ params, functionName: "onCustomerAbort", customFunctions });
};

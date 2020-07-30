import get from "lodash/get";
import { sendData, sendDataWithParams } from "../network";
import { getRedirectUrl } from "../index";
import { storeGlobalError, storeDisplayGlobalError } from "../../components/GlobalError/redux";

/**
 * Internal implementation for getExpressList function
 * called to get list of applicable payment methods, it is first step in mode==null (first page)
 * That can be overwritten in customFunctions.getExpressList
 * @param {Object} params
 * @param {String} params.url
 * @param {String} params.clientId
 * @param {String} params.country
 * @param {String} params.longId identification for the session
 */
const getExpressListInternal = ({ url, clientId, country, longId }) =>
    sendDataWithParams({ baseURL: url, method: "GET", params: { clientId, country } });

/**
 * Internal implementation for createExpressPreset function
 * called to create payment session, for example in PAYPAL it is passed under payment for loading Paypal button in mode==null (first page)
 * That can be overwritten in customFunctions.createExpressPreset
 * @param {Object} params
 * @param {String} params.url
 * @param {Object} params.transaction result of createTransactionDetails function, mandatory prop for ExpressCheckout
 * @param {String} params.network payment code, for example: "PAYPAL"
 * @param {String} params.clientId
 */
const createExpressPresetInternal = ({ url, transaction, network, clientId }) =>
    sendDataWithParams({ baseURL: url, method: "POST", params: { clientId }, body: transaction });

/**
 * Internal implementation for updateExpressPreset function
 * called to update payment session, for example in PAYPAL it is passed under onAuthorize for loading Paypal button in mode==null (first page)
 * That can be overwritten in customFunctions.updateExpressPreset
 * @param {Object} params
 * @param {String} params.url
 * @param {Object} params.transaction providerRequest
 * @param {String} params.network payment code, for example: "PAYPAL"
 * @param {String} params.longId identification for the session
 */
const updateExpressPresetInternal = ({ url, transaction, network, longId }) => sendData({ url, method: "PUT", body: transaction });

/**
 * Internal implementation for cancelExpressPreset function
 * called to cancel payment session, for example in PAYPAL, when the end customer click on cancel link
 * it is passed under onCancel for loading Paypal button in mode==null (first page)
 * That can be overwritten in customFunctions.cancelExpressPreset
 * @param {Object} params
 * @param {String} params.url
 * @param {Object} params.transaction providerRequest
 * @param {String} params.network payment code, for example: "PAYPAL"
 * @param {String} params.longId identification for the session
 */
const cancelExpressPresetInternal = ({ url, transaction, network, longId }) => sendData({ url, method: "POST", body: { longId } });

/**
 * Internal implementation for getExpressPresetAccount function
 * called to get the preset account, first step in mode==Summary (second page)
 * That can be overwritten in customFunctions.getExpressPresetAccount
 * @param {Object} params
 * @param {String} params.url
 * @param {String} params.longId identification for the session
 */
const getExpressPresetAccountInternal = ({ url, longId }) => sendDataWithParams({ baseURL: url, method: "GET", params: {} });

/**
 * Internal implementation for confirmExpressPreset function
 * called to confirm preset account, for example in PAYPAL, when the end customer sees the information about the payment and click a button to confirm
 * it is used in onClick of Confirm button in mode==Summary (second page)
 * That can be overwritten in customFunctions.confirmExpressPreset
 * @param {Object} params
 * @param {String} params.url
 * @param {String} params.network payment code, for example: "PAYPAL"
 * @param {String} params.longId identification for the session
 */
const confirmExpressPresetInternal = ({ url, network, longId }) => sendData({ url, method: "POST", body: {} });

/**
 * Internal implementation for onProceed function
 * called when the http request returns data.interaction.code === "PROCEED"
 * That can be overwritten in customFunctions.onProceed
 * @param {Object} params
 * @param {Object} params.preset
 * @param {String} params.step it indicates the current step for example Update, so the proceed function will know that we need to load confirm/summary mode
 * @param {Function} params.dispatch the dispatch function used in redux to modify the store, the actions structures should be known
 * @param {String} params.longId identification for the session
 */
const onProceedInternal = ({ preset, step, dispatch, longId }) => {
    if (!preset.redirect) {
        console.log("Redirect information is not found in Preset response");
        return;
    }
    const { url, method, parameters } = preset.redirect;
    if (method === "GET") {
        window.location.assign(getRedirectUrl(url, parameters));
        return;
    }
    console.log(`Redirect via ${method} is not supported`);
    return;
};

/**
 * Internal implementation for onAbort function
 * called when the http request returns data.interaction.code === "ABORT"
 * for example when last payment method is used and failed
 * That can be overwritten in customFunctions.onAbort
 * @param {Object} params
 * @param {Object} params.preset
 * @param {String} params.step it indicates the current step for example Update
 * @param {Function} params.dispatch the dispatch function used in redux to modify the store, the actions structures should be known
 * @param {String} params.longId identification for the session
 */
const onAbortInternal = ({ preset, step, dispatch, longId }) => {
    const { resultInfo } = preset;
    console.log("Error has occurred: ", resultInfo, ", ", "Step: ", step);
    if (!preset.redirect) {
        console.log("Redirect information is not found in Preset response");
        // TODO Logout Amazon pay
        return;
    }
    const { url, method, parameters } = preset.redirect;
    if (method === "GET") {
        window.location.assign(getRedirectUrl(url, parameters));
    } else {
        console.log(`Redirect via ${method} is not supported`);
    }
};

/**
 * Internal implementation for onReload function
 * called when the http request returns data.interaction.code === "RELOAD"
 * That can be overwritten in customFunctions.onReload
 * @param {Object} params
 * @param {Object} params.preset
 * @param {String} params.step it indicates the current step for example Update
 * @param {Function} params.dispatch the dispatch function used in redux to modify the store, the actions structures should be known
 * @param {String} params.longId identification for the session
 */
const onReloadInternal = ({ preset, step, dispatch, longId }) => {
    const { resultInfo } = preset;
    console.log("Error has occurred: ", resultInfo, ", ", "Step: ", step);
    // TODO Logout Amazon pay
};

/**
 * Internal implementation for onTryOtherNetwork function
 * called when the http request returns data.interaction.code === "TRY_OTHER_NETWORK"
 * That can be overwritten in customFunctions.onTryOtherNetwork
 * @param {Object} params
 * @param {Object} params.preset
 * @param {String} params.step it indicates the current step for example Update
 * @param {Function} params.dispatch the dispatch function used in redux to modify the store, the actions structures should be known
 * @param {String} params.longId identification for the session
 */
const onTryOtherNetworkInternal = ({ preset, step, dispatch, longId }) => {
    const { resultInfo } = preset;
    console.log("Error has occurred: ", resultInfo, ", ", "Step: ", step);
    // TODO Logout Amazon pay
};

/**
 * Internal implementation for onRetry function
 * called when the http request returns data.interaction.code === "RETRY"
 * the end customer can retry and will see all network and nothing should change
 * That can be overwritten in customFunctions.onRetry
 * @param {Object} params
 * @param {Object} params.preset
 * @param {String} params.step it indicates the current step for example Update
 * @param {Function} params.dispatch the dispatch function used in redux to modify the store, the actions structures should be known
 * @param {String} params.longId identification for the session
 */
const onRetryInternal = ({ preset, step, dispatch, longId }) => {
    const { resultInfo } = preset;
    console.log("Error has occurred: ", resultInfo, ", ", "Step: ", step);
    // TODO Logout Amazon pay
};

/**
 * Internal implementation for onTryOtherAccount function
 * called when the http request returns data.interaction.code === "TRY_OTHER_ACCOUNT"
 * the end customer can retry and will see all network and nothing should change
 * That can be overwritten in customFunctions.onTryOtherAccount
 * @param {Object} params
 * @param {Object} params.preset
 * @param {String} params.step it indicates the current step for example Update
 * @param {Function} params.dispatch the dispatch function used in redux to modify the store, the actions structures should be known
 * @param {String} params.longId identification for the session
 */
const onTryOtherAccountInternal = ({ preset, step, dispatch, longId }) => {
    const { resultInfo } = preset;
    console.log("Error has occurred: ", resultInfo, ", ", "Step: ", step);
    // TODO Logout Amazon pay
};

/**
 * Internal implementation for onCustomerAbort function
 * It is called when the end user click on cancel, for example in Paypal popup
 * That can be overwritten in customFunctions.onCustomerAbort
 * @param {Object} params
 * @param {Object} params.preset
 * @param {String} params.step it indicates the current step for example Update
 * @param {Function} params.dispatch the dispatch function used in redux to modify the store, the actions structures should be known
 * @param {String} params.longId identification for the session
 */
const onCustomerAbortInternal = ({ preset, step, dispatch, longId }) => {
    if (!preset.redirect) {
        console.log("Redirect information is not found in Preset response");
        return;
    }
    const { url, method, parameters } = preset.redirect;
    if (method === "GET") {
        window.location.assign(getRedirectUrl(url, parameters));
        return;
    }
    console.log(`Redirect via ${method} is not supported`);
};

/**
 * Object that contains all the initial definition
 * of the function that can be customized using customFunctions
 */
var internalFunctions = {
    getExpressList: getExpressListInternal,
    createExpressPreset: createExpressPresetInternal,
    updateExpressPreset: updateExpressPresetInternal,
    cancelExpressPreset: cancelExpressPresetInternal,
    getExpressPresetAccount: getExpressPresetAccountInternal,
    confirmExpressPreset: confirmExpressPresetInternal,
    onProceed: onProceedInternal,
    onAbort: onAbortInternal,
    onReload: onReloadInternal,
    onRetry: onRetryInternal,
    onCustomerAbort: onCustomerAbortInternal,
    onTryOtherNetwork: onTryOtherNetworkInternal,
    onTryOtherAccount: onTryOtherAccountInternal,
};

/**
 * Get Correct Function depending on if it is initialized in customFunctions or just use initialFunctions
 * @param {Object} params
 * @param {Object} params.params
 * @param {String} params.functionName the key name of the function to check is defined as customFunctions
 * @param {Object} params.customFunctions
 * @returns {Function} Correct function
 */
export const getCorrectFunction = ({ params, functionName, customFunctions }) => {
    const customFunction = get(customFunctions, functionName, false);
    const internalFunction = get(internalFunctions, functionName, false);
    return customFunction ? customFunction(params) : internalFunction(params);
};

/**
 * Get Express List
 * @param {Object} params
 * @param {Object} params.params the parameters passed to getExpressList from custom Functions or initial functions
 * @param {Object} params.customFunctions
 */
export const getExpressList = ({ params, customFunctions }) =>
    getCorrectFunction({ params, functionName: "getExpressList", customFunctions });

/**
 * Create Express Preset
 * @param {Object} params
 * @param {Object} params.params the parameters passed to createExpressPreset from custom Functions or initial functions
 * @param {Object} params.customFunctions
 */
export const createExpressPreset = ({ params, customFunctions }) =>
    getCorrectFunction({ params, functionName: "createExpressPreset", customFunctions });

/**
 * Update Express Preset
 * @param {Object} params
 * @param {Object} params.params the parameters passed to updateExpressPreset from custom Functions or initial functions
 * @param {Object} params.customFunctions
 */
export const updateExpressPreset = ({ params, customFunctions }) =>
    getCorrectFunction({ params, functionName: "updateExpressPreset", customFunctions });

/**
 * Cancel Express Preset
 * @param {Object} params
 * @param {Object} params.params the parameters passed to updateExpressPreset from custom Functions or initial functions
 * @param {Object} params.customFunctions
 */
export const cancelExpressPreset = ({ params, customFunctions }) =>
    getCorrectFunction({ params, functionName: "cancelExpressPreset", customFunctions });

/**
 * Confirm Express Preset
 * @param {Object} params
 * @param {Object} params.params the parameters passed to confirmExpressPreset from custom Functions or initial functions
 * @param {Object} params.customFunctions
 */
export const confirmExpressPreset = ({ params, customFunctions }) =>
    getCorrectFunction({ params, functionName: "confirmExpressPreset", customFunctions });

/**
 * On Proceed
 * @param {Object} params
 * @param {Object} params.params the parameters passed to onProceed from custom Functions or initial functions
 * @param {Object} params.customFunctions
 */
export const onProceed = ({ params, customFunctions }) => getCorrectFunction({ params, functionName: "onProceed", customFunctions });

/**
 * On Abort
 * @param {Object} params
 * @param {Object} params.params the parameters passed to onAbort from custom Functions or initial functions
 * @param {Object} params.customFunctions
 */
export const onAbort = ({ params, customFunctions }) => getCorrectFunction({ params, functionName: "onAbort", customFunctions });

/**
 * On Try Other Account
 * @param {Object} params
 * @param {Object} params.params the parameters passed to onTryOtherAccount from custom Functions or initial functions
 * @param {Object} params.customFunctions
 */
export const onTryOtherAccount = ({ params, customFunctions }) =>
    getCorrectFunction({ params, functionName: "onTryOtherAccount", customFunctions });

/**
 * On Try Other Network
 * @param {Object} params
 * @param {Object} params.params the parameters passed to onTryOtherNetwork from custom Functions or initial functions
 * @param {Object} params.customFunctions
 */
export const onTryOtherNetwork = ({ params, customFunctions }) =>
    getCorrectFunction({ params, functionName: "onTryOtherNetwork", customFunctions });

/**
 * On Reload
 * @param {Object} params
 * @param {Object} params.params the parameters passed to onReload from custom Functions or initial functions
 * @param {Object} params.customFunctions
 */
export const onReload = ({ params, customFunctions }) => getCorrectFunction({ params, functionName: "onReload", customFunctions });

/**
 * On Retry
 * @param {Object} params
 * @param {Object} params.params the parameters passed to onRetry from custom Functions or initial functions
 * @param {Object} params.customFunctions
 */
export const onRetry = ({ params, customFunctions }) => getCorrectFunction({ params, functionName: "onRetry", customFunctions });

/**
 * Get Express Preset Account
 * @param {Object} params
 * @param {Object} params.params the parameters passed to onRetry from custom Functions or initial functions
 * @param {Object} params.customFunctions
 * @param {String} params.params.longId identification for the session
 */
export const getExpressPresetAccount = ({ params, customFunctions }) =>
    getCorrectFunction({ params, functionName: "getExpressPresetAccount", customFunctions });

/**
 * On Client Exception
 * @param {Object} params
 * @param {Object} params.params the parameters passed to onClientException from custom Functions or initial functions
 * @param {Object} params.customFunctions
 * @param {String} params.longId identification for the session
 */
export const onClientException = ({ preset, step, dispatch, customFunctions, longId }) => {
    const onClientExceptionClient = get(customFunctions, "onClientException", false);
    const onErrorClient = get(customFunctions, "onError", false);
    if (onClientExceptionClient) {
        onClientExceptionClient({ preset, step, dispatch });
        return;
    }
    if (onErrorClient) {
        onErrorClient({ resultInfo: preset.resultInfo, network: preset.network, step, dispatch });
        return;
    }
    const { resultInfo } = preset;
    const message = "Error has occurred: " + resultInfo + ",  Step: " + step;
    dispatch(storeGlobalError(message));
    dispatch(storeDisplayGlobalError(true));
    console.log(message);
    // TODO Logout Amazon pay using dispatch if needed
};

/**
 * On Customer Abort
 * @param {Object} params
 * @param {Object} params.params the parameters passed to onCustomerAbort from custom Functions or initial functions
 * @param {Object} params.customFunctions
 */
export const onCustomerAbort = ({ params, customFunctions }) =>
    getCorrectFunction({ params, functionName: "onCustomerAbort", customFunctions });

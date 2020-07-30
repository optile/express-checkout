import { onAbort, onReload, onRetry, onClientException, onTryOtherAccount, onTryOtherNetwork } from "./customFunctions";
import get from "lodash/get";
/**
 * Create a map from params
 * @param {Object} data
 * @returns {Object} data
 */
const objectToParams = (data) => Object.entries(data).map(([name, value]) => ({ name, value }));

export const toRequestData = (providerCode, data) => ({ providerCode, parameters: objectToParams(data) });
/**
 * Get Redirect Url
 * @param {String} url
 * @param {Object} parameters
 * @return {String} redirect url link
 */
export const getRedirectUrl = (url, parameters) => {
    let queryString = "";
    if (parameters) {
        queryString = parameters.reduce(
            (acc, current) => `${acc}${encodeURIComponent(current.name)}=${encodeURIComponent(current.value)}&`,
            ""
        );
    }
    return `${url}${url.includes("?") ? "&" : "?"}${queryString.slice(0, -1)}`;
};
/**
 * Handle the response
 *
 * @param {Object} params
 * @param {Object} params.code
 * @param {Object} params.preset
 * @param {Object} params.step
 * @param {Object} params.dispatch
 * @param {Object} params.customFunctions
 */
export const interactionCodeHandler = ({ code, preset, step, dispatch, customFunctions }) => {
    switch (code) {
        case "ABORT": // last payment method used and failed
            onAbort({ params: { preset, step, dispatch }, customFunctions });
            break;

        case "TRY_OTHER_NETWORK":
            onTryOtherNetwork({ params: { preset, step, dispatch }, customFunctions });
            break;

        case "TRY_OTHER_ACCOUNT":
            onTryOtherAccount({ params: { preset, step, dispatch }, customFunctions });
            break;

        case "RETRY":
            onRetry({ params: { preset, step, dispatch }, customFunctions });
            break;

        case "RELOAD":
            onReload({ params: { preset, step, dispatch }, customFunctions });
            break;

        default:
            throw new Error(`Unknown interaction code: ${code}`);
    }
};
/**
 * Prepare error object to return
 *
 * @param {Object} err
 * @param {Object} network
 *
 * @return {Object} preset error object in specific structure
 */
export const errorPreset = (err, network) => {
    const message = err.message ? err.message : "Payment canceled";
    const preset = {
        resultInfo: message,
        interaction: {
            reason: "CLIENTSIDE_EXCEPTION",
        },
        error: err,
        network: network,
    };
    return preset;
};
/**
 * Handle Error
 * Can handle all errors in unified form and gives power to handle the state outside of this scope
 * dispatch is needed for onClientException function customizable by initial props of main component
 *
 * @param {Object} params
 * @param {Object} params.err
 * @param {String} params.step
 * @param {String} params.network could be empty string in case of list request
 * @param {Function} params.dispatch
 * @param {Function} params.updateState
 * @param {Object} params.customFunctions
 */
export const handleError = ({ err, step, network, dispatch, updateState, customFunctions }) => {
    const data = errorPreset(err, network); // create object structure for error
    updateState(); // run some updates for the store in redux
    onClientException({ preset: data, step, dispatch, customFunctions }); // run customized function to handle the error
};
/**
 * Get Class
 *
 * @param {Object} params
 * @param {String} params.className
 * @param {String} params.suffix
 * @return {String} new class name by adding "-suffix" to the end of the class if needed
 */
export const getClass = (props) => {
    if (!props) {
        return "";
    }
    const { className, suffix } = props;
    if (!className) {
        return "";
    }
    return suffix ? `${className}-${suffix}` : className;
};

/**
 * get object used to pass to components as test-id and className
 *
 * @param {Object} params
 * @param {String} params.className
 * @param {String} params.suffix
 * @return {Object} contains test-id and className
 */
export const getIdentificationProps = (props) => {
    const emptyResult = { className: "", "test-id": "" };
    if (!props) {
        return emptyResult;
    }
    const { className, suffix } = props;
    if (!className) {
        return emptyResult;
    }
    if (!suffix) {
        return { className, "test-id": className };
    }
    const withSuffix = suffix ? `${className}-${suffix}` : className;
    return { "test-id": withSuffix, className: `${className} ${withSuffix}` };
};

/**
 *
 * @param {Function} getState invoke getState to get the current redux state
 * @param {Boolean} isPaypalPreset to select which path to fetch longId
 * @returns {String} longId
 */
export const getLongIdFromParameters = (getState, isPaypalPreset) => {
    const path = isPaypalPreset ? "paypal.preset.redirect.parameters" : "presetAccount.data.redirect.parameters";
    const parameters = get(getState(), path, []);
    const longIdJson = parameters.find((item) => item.name === "longId");
    return longIdJson ? longIdJson.value : "";
};

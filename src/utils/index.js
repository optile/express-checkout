import {onAbort, onReload, onRetry} from "./customFunctions";
/**
 * Create a map from params
 * @param {Object} data
 * @returns {Object} data 
 */
const objectToParams = data => Object.entries(data).map(([name, value]) => ({ name, value }));

export const toRequestData = (providerCode, data) => ({ providerCode, parameters: objectToParams(data) });
/**
 * Get Redirect Url
 * @param {String} url 
 * @param {Object} parameters 
 * @return {String} redirect url link
 */
export const getRedirectUrl = (url, parameters) => {
    const queryString = parameters.reduce(
        (acc, current) => `${acc}${encodeURIComponent(current.name)}=${encodeURIComponent(current.value)}&`,
        ""
    );
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
export const interactionCodeHandler = ({code, preset, step, dispatch, customFunctions}) => {
    switch (code) {
        case "ABORT":
            onAbort({params:{preset, step, dispatch}, customFunctions});
            break;

        case "TRY_OTHER_NETWORK":
            onReload({params:{preset, step, dispatch}, customFunctions});
            break;

        case "TRY_OTHER_ACCOUNT":
            onRetry({params:{preset, step, dispatch}, customFunctions});
            break;

        case "RETRY":
            onRetry({params:{preset, step, dispatch}, customFunctions});
            break;

        case "RELOAD":
            onReload({params:{preset, step, dispatch}, customFunctions});
            break;

        default:
            throw new Error(`Unknown interaction code: ${code}`);
    }
};
/**
 * Prepare error object to return 
 * @param {Object} err 
 * @param {Object} network 
 * @return {Object} preset
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

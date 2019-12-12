import get from "lodash/get";
import find from "lodash/find";

import { sendData, sendDataWithParams } from "../network";
import { getRedirectUrl } from "../index";

// import { AMAZON_AUTH_LOGOUT } from '../modules/amazon';
var internalFunctions = {
    getExpressList: ({ url, clientId, country }) => sendDataWithParams({ baseURL: url, method: "GET", params: { clientId, country } }), // Get the List of Networks
    createExpressPreset: ({ url, transaction, network, clientId }) =>
        sendDataWithParams({ baseURL: url, method: "POST", params: { clientId }, body: transaction }), // Creates Express Preset,
    updateExpressPreset: ({ url, transaction, network }) => sendData({ url, method: "PUT", body: transaction }), // Update Express Preset,
    confirmExpressPreset: ({ url, network }) => sendData({ url, method: "POST", body: {} }),
};

export const canBeRewritten = ({ params, functionName, customFunctions }) => {
    const customFunction = get(customFunctions, functionName, false);
    const internalFunction = get(internalFunctions, functionName, false);
    return customFunction ? customFunction(params) : internalFunction(params);
};

export const getExpressList = ({ params, customFunctions }) => canBeRewritten({ params, functionName: "getExpressList", customFunctions });

export const createExpressPreset = ({ params, customFunctions }) =>
    canBeRewritten({ params, functionName: "createExpressPreset", customFunctions });

export const updateExpressPreset = ({ params, customFunctions }) =>
    canBeRewritten({ params, functionName: "updateExpressPreset", customFunctions });

export const confirmExpressPreset = ({ params, customFunctions }) =>
    canBeRewritten({ params, functionName: "confirmExpressPreset", customFunctions });

// export const onProceed = (preset) => {
//   // do redirect to summary page
//   if (onProceedClient) {
//     window.optile.functions.onProceed(preset);
//     return;
//   }
//   if (!preset.redirect) {
//     console.log('Redirect information is not found in Preset response');
//     return;
//   }
//   const { url, method, parameters } = preset.redirect;
//   if (method === 'GET') {
//     window.location.assign(getRedirectUrl(url, parameters));
//   } else {
//     console.log(`Redirect via ${method} is not supported`);
//   }
// };

// export const checkConstraints = (preset) => {
//   const parameters = get(preset, ['providerResponse', 'parameters'], false);
//   const { value: constraintsString } = find(parameters, ['name', 'constraints']);
//   return constraintsString.split(',');
// };

// export const onAbort = (preset, step, dispatch) => {
//   if (onAbortClient) {
//     onAbortClient(preset, step);
//     return;
//   }
//   const { resultInfo } = preset;
//   console.log('Error has occurred: ', resultInfo, ', ', 'Step: ', step);
//   if (!preset.redirect) {
//     console.log('Redirect information is not found in Preset response');
//     dispatch({ type: AMAZON_AUTH_LOGOUT });
//     return;
//   }
//   const { url, method, parameters } = preset.redirect;
//   if (method === 'GET') {
//     window.location.assign(getRedirectUrl(url, parameters));
//   } else {
//     console.log(`Redirect via ${method} is not supported`);
//   }
// };

// export const onReload = (preset, step, dispatch) => {
//   if (onReloadClient) {
//     onReloadClient(preset, step);
//     return;
//   }
//   const { resultInfo } = preset;
//   console.log('Error has occurred: ', resultInfo, ', ', 'Step: ', step);
//   dispatch({ type: AMAZON_AUTH_LOGOUT });
// };

// export const onRetry = (preset, step, dispatch) => {
//   if (onRetryClient) {
//     onRetryClient(preset, step);
//     return;
//   }
//   const { resultInfo } = preset;
//   console.log('Error has occurred: ', resultInfo, ', ', 'Step: ', step);
//   dispatch({ type: AMAZON_AUTH_LOGOUT });
// };

export const onClientException = (preset, step, dispatch, customFunctions) => {
    const onClientExceptionClient = get(customFunctions, "onClientExceptionClient", false);
    const onErrorClient = get(customFunctions, "onErrorClient", false);
    if (onClientExceptionClient) {
        onClientExceptionClient(preset, step);
        return;
    }
    if (onErrorClient) {
        onErrorClient(preset.resultInfo, preset.network, step);
        return;
    }
    const { resultInfo } = preset;
    // console.log("Error has occurred: ", resultInfo, ", ", "Step: ", step);
    // dispatch({ type: AMAZON_AUTH_LOGOUT });
};

// export const onCustomerAbort = (preset, dispatch) => {
//   if (onCancelClient) {
//     onCancelClient(preset);
//     return;
//   }
//   if (onCustomerAbortClient) {
//     onCustomerAbortClient(preset);
//     return;
//   }
//   console.log('Canceled by user');
//   dispatch({ type: AMAZON_AUTH_LOGOUT });
// };

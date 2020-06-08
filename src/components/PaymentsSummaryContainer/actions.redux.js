import { onProceed } from "../../utils/customFunctions";
import get from "lodash/get";
import { interactionCodeHandler, handleError } from "../../utils";
import { setConfirmAccountLoading, setConfirmAccountError, storeConfirmAccount } from "./redux";
import { confirmExpressPreset } from "../../utils/customFunctions";

/**
 *
 * @param {Function} getState invoke getState to get the current redux state
 * @returns {String} longId
 */
const getLongIdFromParameters = (getState) => {
    const parameters = get(getState(), "presetAccount.data.redirect.parameters", []);
    const longIdJson = parameters.find((item) => item.name === "longId");
    return longIdJson ? longIdJson.value : "";
};
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
            dispatch(setConfirmAccountError(err));
            dispatch(setConfirmAccountLoading(false));
        },
        dispatch,
        customFunctions,
    };
    handleError(errorProps);
};
const handleNotOkResponse = ({ result, dispatch, step, customFunctions }) => {
    const err = { message: result.error.message.resultInfo };
    return onError({ err, dispatch, step, customFunctions });
};
const handleCatch = ({ err, dispatch, step, customFunctions }) => {
    const errorMessage = { message: err.message };
    return onError({ err: errorMessage, dispatch, step, customFunctions });
};
const confirmActionOk = ({ result, dispatch, customFunctions }) => {
    const { data } = result;
    // checking interaction codes
    const { code } = data.interaction;
    if (code !== "PROCEED") {
        const err = { message: data.resultInfo };
        dispatch(setConfirmAccountError(err));
        dispatch(setConfirmAccountLoading(false));
        interactionCodeHandler({ code, preset: data, step: "confirm", dispatch, customFunctions });
        return;
    }
    dispatch(storeConfirmAccount(data));
    return onProceed({ params: { preset: data, step: "confirm", dispatch }, customFunctions });
};
const confirmAction = ({ customFunctions }) => async (dispatch, getState) => {
    dispatch(setConfirmAccountLoading(true));
    try {
        const confirmURL = get(getState(), "presetAccount.data.links.confirm", "");
        const network = get(getState(), "presetAccount.data.network", null);
        const longId = getLongIdFromParameters(getState);
        const result = await confirmExpressPreset({
            params: { url: confirmURL, network, longId },
            customFunctions,
        });
        if (result.response.ok) {
            return confirmActionOk({ result, dispatch, customFunctions });
        }
        return handleNotOkResponse({ result, dispatch, step: "confirm", customFunctions });
    } catch (err) {
        return handleCatch({ err, dispatch, step: "confirm", customFunctions });
    }
};
export { confirmAction };

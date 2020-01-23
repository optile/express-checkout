import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpressPresetAccount } from "../../utils/customFunctions";
import { handleError } from "../../utils";
import { setPresetAccountLoading, setPresetAccountError, storePresetAccount } from "./redux";

const getPresetLink = (baseURL, longId) => {
    return `${baseURL.replace("/pci/v1/express", "/pci/v1/presets")}/${longId}`;
};

/**
 * On Error
 *
 * @param {Object} params
 * @param {Object} params.err
 * @param {Function} params.dispatch
 * @param {Object} params.customFunctions
 */
const onError = ({ err, dispatch, customFunctions }) => {
    const step = "Get Preset Account";
    const network = "";
    const errorProps = {
        err,
        step,
        network,
        updateState: () => {
            dispatch(setPresetAccountError(err));
            dispatch(setPresetAccountLoading(false));
        },
        dispatch,
        customFunctions,
    };
    handleError(errorProps);
};
/**
 * Handle Fetch Prest Account when response is ok
 *
 * @param {Object} params
 * @param {Object} params.result
 * @param {Object} params.dispatch
 * @param {Object} params.customFunctions
 */
const fetchPresetAccountOk = ({ result, dispatch }) => {
    console.log("result data of get preset account", result.data);
    dispatch(storePresetAccount(result.data));
    dispatch(setPresetAccountLoading(false));
};
/**
 * Fetch Preset Account
 *
 * @param {Object} params
 * @param {Object} params.dispatch
 * @param {Object} params.customFunctions
 * @param {String} params.baseURL
 * @param {String} params.clientId
 * @param {String} params.country
 * @param {String} params.longId
 */
const fetchPresetAccount = async ({ dispatch, customFunctions, baseURL, longId }) => {
    dispatch(setPresetAccountLoading(true));
    try {
        const url = getPresetLink(baseURL, longId);
        const result = await getExpressPresetAccount({ params: { url } }, customFunctions);
        if (result.response.ok) {
            fetchPresetAccountOk({ result, dispatch });
        } else {
            const { err } = result;
            onError({ err, dispatch, customFunctions });
        }
    } catch (error) {
        const err = { message: error.message };
        onError({ err, dispatch, customFunctions });
    }
};
/**
 * Custom hook that run get Preset Account async and store the response
 * @param {Object} customFunctions
 */
const usePresetAccount = customFunctions => {
    const dispatch = useDispatch();
    const baseURL = useSelector(state => state.configuration.baseURL);
    const longId = useSelector(state => state.longId);
    useEffect(() => {
        if (baseURL && longId) {
            fetchPresetAccount({ dispatch, customFunctions, baseURL, longId });
        }
    }, [baseURL, longId]);
};

export { usePresetAccount, fetchPresetAccount, onError };

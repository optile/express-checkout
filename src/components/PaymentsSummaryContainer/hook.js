import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpressPresetAccount, onClientException } from "../../utils/customFunctions";
import { handleError } from "../../utils";
import { setPresetAccountLoading, setPresetAccountError, storePresetAccount } from "./redux";
import { removeGlobalError } from "../GlobalError/redux";

const getPresetLink = (baseURL = "", longId) => {
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
 * @param {String} params.longId
 */
const fetchPresetAccount = async ({ dispatch, customFunctions, baseURL, longId }) => {
    dispatch(setPresetAccountLoading(true));
    try {
        const url = getPresetLink(baseURL, longId);
        const result = await getExpressPresetAccount({ params: { url }, customFunctions });
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
    const configuration = useSelector((state) => state.configuration);
    const baseURL = useSelector(state => state.configuration.baseURL);
    const longId = useSelector(state => state.longId);
    useEffect(() => {
        if (longId) {
            fetchPresetAccount({ dispatch, customFunctions, baseURL, longId });
        }
    }, [configuration, longId]);
};
/**
 * Custom hook to display or hide global error depending of params
 * @param {Object} customFunctions
 */
const useCheckPropsForSummary = customFunctions => {
    const dispatch = useDispatch();
    const mode = useSelector(state => state.mode);
    const longId = useSelector(state => state.longId);
    useEffect(() => {
        if (mode === "Summary" && !longId) {
            onClientException({ preset: { resultInfo: "No longId" }, step: "Init Summary", dispatch, customFunctions });
        } else {
            removeGlobalError(dispatch);
        }
    }, [mode, longId]);
};

export { usePresetAccount, fetchPresetAccount, onError, useCheckPropsForSummary };

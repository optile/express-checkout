import get from "lodash/get";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpressList } from "../../utils/customFunctions";
import { handleError } from "../../utils";
import { setListLoading, setListError, storeList } from "./redux";

/**
 * On Error
 *
 * @param {Object} params
 * @param {Object} params.err
 * @param {Function} params.dispatch
 * @param {Object} params.customFunctions
 */
const onError = ({ err, dispatch, customFunctions }) => {
    const step = "LIST";
    const network = "";
    const errorProps = {
        err,
        step,
        network,
        updateState: () => {
            dispatch(setListError(err));
            dispatch(setListLoading(false));
        },
        dispatch,
        customFunctions,
    };
    handleError(errorProps);
};
/**
 * Handle Fetch List when response is ok
 *
 * @param {Object} params
 * @param {Object} params.result
 * @param {Object} params.dispatch
 * @param {Object} params.customFunctions
 */
const fetchListOk = ({ result, dispatch, customFunctions }) => {
    const { data } = result;
    const networksArray = get(data, ["networks", "applicable"], false);
    if (networksArray && networksArray.length) {
        dispatch(storeList(networksArray));
        dispatch(setListLoading(false));
    } else {
        const err = {
            message: "Server response does not contain proper network data",
        };
        onError({ err, dispatch, customFunctions });
    }
};
/**
 * Fetch List
 *
 * @param {Object} params
 * @param {Object} params.dispatch
 * @param {Object} params.customFunctions
 * @param {String} params.baseURL
 * @param {String} params.clientId
 * @param {String} params.country
 */
const fetchList = async ({ dispatch, customFunctions, baseURL, clientId, country }) => {
    dispatch(setListLoading(true));
    try {
        // baseUrl and clientId are mandatory when this function is not customized
        const result = await getExpressList({ params: { url: baseURL, clientId, country }, customFunctions });
        if (result.response.ok) {
            fetchListOk({ result, dispatch, customFunctions });
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
 * Custom hook that run list async and store list response
 * @param {Object} customFunctions
 */
const useList = (customFunctions) => {
    const dispatch = useDispatch();
    const configuration = useSelector((state) => state.configuration);
    const loaded = useSelector((state) => state.configuration.loaded);
    const baseURL = useSelector((state) => state.configuration.baseURL);
    const clientId = useSelector((state) => state.configuration.clientId);
    const country = useSelector((state) => state.configuration.country);
    useEffect(() => {
        // baseUrl, clientId and country are needed unless getExpressList is customized
        if (loaded && (customFunctions?.getExpressList || (baseURL && clientId && country))) {
            fetchList({ dispatch, customFunctions, baseURL, clientId, country });
        }
    }, [configuration]);
};

export { useList, fetchList, onError };

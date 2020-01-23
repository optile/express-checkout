import get from "lodash/get";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpressList, onClientException } from "../../utils/customFunctions";
import { errorPreset } from "../../utils";
import { setListLoading, setListError, storeList } from "./redux";
/**
 * Handle Error
 * @param {Object} params
 * @param {Object} params.error
 * @param {Object} params.dispatch
 * @param {Object} params.customFunctions
 */
const handleError = ({ error, dispatch, customFunctions }) => {
    const preset = errorPreset(error, "LIST");
    dispatch(setListError(error));
    onClientException({preset, step:"list", dispatch, customFunctions});
    dispatch(setListLoading(false));
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
        const result = await getExpressList({ params: { url: baseURL, clientId, country } }, customFunctions);
        if (result.response.ok) {
            const { data } = result;
            const networksArray = get(data, ["networks", "applicable"], false);
            if (networksArray) {
                dispatch(storeList(networksArray));
                dispatch(setListLoading(false));
            } else {
                const error = {
                    message: "Server response does not contain proper network data",
                };
                handleError({ error, dispatch, customFunctions });
            }
        } else {
            const { error } = result;
            handleError({ error, dispatch, customFunctions });
        }
    } catch (err) {
        const error = { message: err.message };
        handleError({ error, dispatch, customFunctions });
    }
};
/**
 * Custom hook that run list async and store list response
 * @param {Object} customFunctions 
 */
const useList = customFunctions => {
    const dispatch = useDispatch();
    const baseURL = useSelector(state => state.configuration.baseURL);
    const clientId = useSelector(state => state.configuration.clientId);
    const country = useSelector(state => state.configuration.country);
    useEffect(() => {
        if (baseURL && clientId && country) {
            fetchList({ dispatch, customFunctions, baseURL, clientId, country });
        }
    }, [baseURL, clientId, country]);
};

export { useList, fetchList, handleError };

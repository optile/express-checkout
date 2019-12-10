import get from "lodash/get";
import keyBy from "lodash/keyBy";
import { useDispatch, useSelector } from "react-redux";
import { getExpressList, onClientException } from "../../utils/customFunctions";
import { errorPreset } from "../../utils";
import { setListLoading, setListError, storeList } from "./redux";

const handleError = ({ error, dispatch, customFunctions }) => {
    const preset = errorPreset(error, "LIST");
    dispatch(setListError(error));
    onClientException(preset, "list", dispatch, customFunctions);
    dispatch(setListLoading(false));
};
const useList = async customFunctions => {
    const dispatch = useDispatch();
    const baseURL = useSelector(state => state.configuration.baseURL);
    const clientId = useSelector(state => state.configuration.clientId);
    const country = useSelector(state => state.configuration.country);
    if (!(baseURL && clientId && country)) {
        return;
    }
    dispatch(setListLoading(true));
    try {
        const result = await getExpressList({ params: { url: baseURL, clientId, country } }, customFunctions);
        console.log(result);
        if (result.response.ok) {
            const { data } = result;
            const networksArray = get(data, ["networks", "applicable"], false);
            if (networksArray) {
                const networks = keyBy(networksArray, "code");
                dispatch(storeList(networks));
                dispatch(setListLoading(false));
            } else {
                const error = {
                    message: "Server response does not contain proper network data",
                };
                handleError ({ error, dispatch, customFunctions });
            }
        } else {
            const { error } = result;
            handleError ({ error, dispatch, customFunctions });
        }
    } catch (err) {
        const error = { message: err.message };
        handleError ({ error, dispatch, customFunctions });
    }
};
export { useList };

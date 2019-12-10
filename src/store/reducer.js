import { combineReducers } from "redux";

import { suffix, configuration, list, listError, listLoading } from "../components/ConfigurationManager/redux";
const rootReducer = combineReducers({
    suffix,
    configuration,
    list,
    listError,
    listLoading,
});

export default rootReducer;

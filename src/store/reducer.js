import { combineReducers } from "redux";

import { suffix, configuration, list, listError, listLoading, mode } from "../components/ConfigurationManager/redux";
import { paypalStatus, paymentID, preset, cancelData, error } from "../components/paymentMethods/Paypal/redux";

const rootReducer = combineReducers({
    suffix,
    mode,
    configuration,
    list,
    listError,
    listLoading,
    paypal: combineReducers({
        paypalStatus,
        paymentID,
        preset,
        cancelData,
        error,
    }),
});

export default rootReducer;

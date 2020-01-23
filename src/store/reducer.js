import { combineReducers } from "redux";

import { suffix, configuration, mode } from "../components/ConfigurationManager/redux";
import { list, listError, listLoading } from "../components/PaymentsContainer/redux";
import { presetAccount, presetAccountError, presetAccountLoading } from "../components/PaymentsSummaryContainer/redux";
import { paypalStatus, paymentID, preset, cancelData, error } from "../components/paymentMethods/Paypal/redux";

const rootReducer = combineReducers({
    suffix,
    mode,
    configuration,
    list: combineReducers({
        data: list,
        listError,
        listLoading,
    }),
    paypal: combineReducers({
        paypalStatus,
        paymentID,
        preset,
        cancelData,
        error,
    }),
    presetAccount: combineReducers({
        data: presetAccount, 
        presetAccountError, 
        presetAccountLoading
    })
});

export default rootReducer;

/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

import { combineReducers } from "redux";

import { configuration, mode, longId } from "../components/ConfigurationManager/redux";
import { list, listError, listLoading } from "../components/PaymentsContainer/redux";
import { globalError, displayGlobalError } from "../components/GlobalError/redux";
import {
    presetAccount,
    presetAccountError,
    presetAccountLoading,
    confirmAccountLoading,
    confirmAccountError,
    confirmAccount,
} from "../components/PaymentsSummaryContainer/redux";
import { paypalStatus, paymentID, preset, cancelData, error } from "../components/PaymentMethods/Paypal/redux";

const rootReducer = combineReducers({
    mode,
    longId,
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
        presetAccountLoading,
    }),
    confirmAccount: combineReducers({
        data: confirmAccount,
        confirmAccountError,
        confirmAccountLoading,
    }),
    globalError,
    displayGlobalError,
});

export default rootReducer;

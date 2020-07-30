import { createReducer, createAction } from "@reduxjs/toolkit";
const initialStringState = "";
const initialBooleanState = false;

const storeGlobalError = createAction("STOREGLOBALERROR");
const globalError = createReducer(initialStringState, {
    [storeGlobalError]: (state, action) => action.payload,
});

const storeDisplayGlobalError = createAction("STOREDISPLAYGLOBALERROR");
const displayGlobalError = createReducer(initialBooleanState, {
    [storeDisplayGlobalError]: (state, action) => action.payload,
});
const removeGlobalError = (dispatch) => {
    dispatch(storeDisplayGlobalError(false));
    dispatch(storeGlobalError(""));
};
export { globalError, storeGlobalError, displayGlobalError, storeDisplayGlobalError, removeGlobalError };

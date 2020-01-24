import { createReducer, createAction } from "@reduxjs/toolkit";

const initialBooleanState = false;
const initialObjectState = {};
const initialArrayState = [];

const setListLoading = createAction("LISTLOADING");
const listLoading = createReducer(initialBooleanState, {
    [setListLoading]: (state, action) => action.payload,
});

const setListError = createAction("LISTERROR");
const listError = createReducer(initialObjectState, {
    [setListError]: (state, action) => action.payload,
});

const storeList = createAction("STORELIST");
const list = createReducer(initialArrayState, {
    [storeList]: (state, action) => action.payload,
});

export {
    setListLoading,
    listLoading,
    setListError,
    listError,
    storeList,
    list,
}

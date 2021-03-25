/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */


import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducer";

const enhancer = process.env.NODE_ENV === "development" ? composeWithDevTools(applyMiddleware(thunk)) : compose(applyMiddleware(thunk));
/**
 * Create an instance of the store
 * it is used to create a separate store for this component, 
 * which allow the component to be used multiple times in the application
 * @return {Object} redux store
 */
const initStore = () => createStore(rootReducer, enhancer);
const store = initStore();

export default store;

import { applyMiddleware, compose, createStore } from "redux";
//import thunk from "redux-thunk";
//import {rootReducer} from "./reducers/rootReducer";
import taskListReducer from "./reducers/TaskListSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import TaskListSlice from "./reducers/TaskListSlice";
export const rootReducer = combineReducers({
    taskListReducer
})

// eslint-disable-next-line no-undef
const DEV = false;

export const setupStore =
    configureStore({
      reducer: rootReducer,
    }
    );

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = typeof setupStore
export type AppDispatch = typeof setupStore.dispatch
//export type AppDispatch =  //AppStore['distpatch']
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

const initialState = {};
const middleware = [thunk];
// eslint-disable-next-line no-undef
const DEV = false;

export const setupStore = () =>{
   
    return configureStore(
      rootReducer,
    );
  
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['distpatch']
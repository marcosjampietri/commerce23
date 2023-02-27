import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

import users from "./usersSlicer";
import stepper from "./stepperSlicer";
import products from "./productsSlicer";
import mod from "./modSlicer";
import toggle from "./toggleSlicer";
import subscription from "./subscriptionSlicer";
import load from "./loadSlicer";

const combinedReducer = combineReducers({
  users,
  products,
  stepper,
  mod,
  toggle,
  subscription,
  load,
});

const masterReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload,
      // counter: {
      // count: state.counter.count + action.payload.counter.count,
      // },
      // users: {
      //     // users: [...action.payload.users.users, ...state.users.users]
      // },
      // products: {
      //     // products: [...action.payload.products.products, ...state.products.products]
      // }
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const persistedReducer = persistReducer(
  { key: "root", storage },
  masterReducer
);

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    // devTools: true,
    middleware: [thunk],
  });

export const store = makeStore();

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof masterReducer>;

export type AppDispatch = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

export const wrapper = createWrapper(makeStore, { debug: false });

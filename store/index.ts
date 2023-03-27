import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import thunk from "redux-thunk";

import users from "./usersSlicer";
import stepper from "./stepperSlicer";
import products from "./productsSlicer";
import toggle from "./toggleSlicer";
import subscription from "./subscriptionSlicer";
import load from "./loadSlicer";
import cart from "./cartSlicer";
import address from "./addressSlicer";
import { productsApi } from "./useGetProductQuery";

const combinedReducer = combineReducers({
  users,
  toggle,
  stepper,
  load,
  products,
  address,
  cart,
  subscription,
  [productsApi.reducerPath]: productsApi.reducer,
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

// const store = configureStore({
//   reducer: {
//     [productsApi.reducerPath]: productsApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(productsApi.middleware),

// });

const makeStore = () => {
  if (typeof window === "undefined") {
    //If it's on server side, create a store
    return configureStore({
      reducer: masterReducer,
      devTools: process.env.NODE_ENV !== "production",
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }).concat(productsApi.middleware),
    });
  } else {
    //If it's on client side, create a store which will persist
    const persistedReducer = persistReducer(
      {
        key: "root",
        storage: AsyncStorage,
        blacklist: ["toggle", "load"],
      },
      masterReducer
    ); // Create a new reducer with our existing reducer

    const store: any = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== "production",
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }).concat(productsApi.middleware),
    }); // Creating the store again

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
  }
};

export const store = makeStore();

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof masterReducer>;

export type AppDispatch = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

export const wrapper = createWrapper(makeStore, { debug: false });

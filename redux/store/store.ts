import { configureStore } from "@reduxjs/toolkit";
import AuthenticationReducer from "../features/auth/authentication-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: AuthenticationReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;

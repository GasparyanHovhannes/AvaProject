import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userSlice from "../features/userSlice.ts";
import patientSlice from "../features/patientSlice.ts";
import doctorSlice from "../features/doctorSlice.ts";

const rootReducer = combineSlices(
  doctorSlice,
  userSlice,
  patientSlice,
);

export type RootState = ReturnType<typeof rootReducer>;
export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
  });
  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

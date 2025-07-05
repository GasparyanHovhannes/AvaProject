import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userSlice } from "../features/userSlice";
import { patientSlice } from "../features/patientSlice";
import { doctorSlice } from "../features/doctorSlice";
import { productsSlice } from "../store/productsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    patient: patientSlice.reducer,
    doctor: doctorSlice.reducer,
    products: productsSlice.reducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
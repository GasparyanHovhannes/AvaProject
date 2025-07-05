import { createAppSlice } from '../app/createAppSlice';
import { type Patient } from './patientSlice';
import { type Doctor } from './doctorSlice';

type UserRole = 'patient' | 'doctor';

interface UserState {
  email: any;
  data: Patient | Doctor | null;
  role: UserRole | null;
  token: string | null;
  isEmailVerified: boolean;
  type: string;
}

const initialState: UserState = {
  data: null,
  role: null,
  token: null,
  isEmailVerified: false,
  type: "null",
  email: undefined
};

const userSlice = createAppSlice({
  name: 'user',
  initialState,
  reducers: create => ({
    setUser: create.reducer(
      (
        state,
        action: {
          payload: {
            data: Patient | Doctor;
            role: UserRole;
            token: string;
          };
        }
      ) => {
        state.data = action.payload.data;
        state.role = action.payload.role;
        state.token = action.payload.token;
        state.type = action.payload.data.type || "undefined"; // <-- добавьте это
      }
    ),
    clearUser: create.reducer(state => {
      state.data = null;
      state.role = null;
      state.token = null;
      state.isEmailVerified = false;
      state.type = "null"; // <-- добавьте это
      state.email = undefined; // Сброс email при выходе
    }),
    setEmailVerified: create.reducer((state, action: { payload: boolean }) => {
      state.isEmailVerified = action.payload;
    }),
  }),
  selectors: {
    selectUserData: (state) => state.data,
    selectUserRole: (state) => state.role,
    selectUserToken: (state) => state.token,
    selectUserEmailStatus: (state) => state.isEmailVerified,
    selectUserHairType: (state) => state.data?.type ?? "undefined",
    selectUserEmail: (state) => state.email, // Добавляем селектор для email
    selectUserType: (state) => state.type, // Добавляем селектор для type
  },
});

export const { setUser, clearUser, setEmailVerified } = userSlice.actions;

export const {
  selectUserData,
  selectUserRole,
  selectUserToken,
  selectUserEmailStatus,
} = userSlice.selectors;

export { userSlice };

export default userSlice;

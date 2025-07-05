import { createAppSlice } from '../app/createAppSlice';
import { type Patient } from './patientSlice';
import { type Doctor } from './doctorSlice';

type UserRole = 'patient' | 'doctor';

interface UserState {
  data: Patient | Doctor | null;
  role: UserRole | null;
  token: string | null;
  isEmailVerified: boolean;
}

const initialState: UserState = {
  data: null,
  role: null,
  token: null,
  isEmailVerified: false,
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
      }
    ),
    clearUser: create.reducer(state => {
      state.data = null;
      state.role = null;
      state.token = null;
      state.isEmailVerified = false;
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

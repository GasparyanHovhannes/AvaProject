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
  subscribed: boolean
  type: string;
}

const initialState: UserState = {
  data: null,
  role: null,
  token: null,
  isEmailVerified: false,
  subscribed: false
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
        const userSubscribed = action.payload.data?.sub;
        state.subscribed = typeof userSubscribed === 'boolean' ? userSubscribed : false;
        state.type = action.payload.data.type || "undefined"; 
      }
    ),
    clearUser: create.reducer(state => {
      state.data = null;
      state.role = null;
      state.token = null;
      state.isEmailVerified = false;
      state.subscribed = false;
      state.type = "null"; 
      state.email = undefined; 
    }),
    setEmailVerified: create.reducer((state, action: { payload: boolean }) => {
      state.isEmailVerified = action.payload;
    }),
    setUserSubscriptionStatus: create.reducer((state, action: { payload: boolean }) => {
      state.subscribed = action.payload;
    }),
  }),
  selectors: {
    selectUserData: state => state.data,
    selectUserRole: state => state.role,
    selectUserToken: state => state.token,
    selectUserEmailStatus: state => state.isEmailVerified,
    selectUserSubscriptionStatus: state => state.subscribed,
    selectUserData: (state) => state.data,
    selectUserRole: (state) => state.role,
    selectUserToken: (state) => state.token,
    selectUserEmailStatus: (state) => state.isEmailVerified,
    selectUserHairType: (state) => state.data?.type ?? "undefined",
    selectUserEmail: (state) => state.email, 
    selectUserType: (state) => state.type, 
  },
});

export const { setUser, clearUser, setEmailVerified, setUserSubscriptionStatus } = userSlice.actions;

export const {
  selectUserData,
  selectUserRole,
  selectUserToken,
  selectUserEmailStatus,
  selectUserSubscriptionStatus,
} = userSlice.selectors;

export { userSlice };

export default userSlice;

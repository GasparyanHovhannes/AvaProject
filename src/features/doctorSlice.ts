import { setData, updateData } from '../services/apiService.ts';
import { createAppSlice } from '../app/createAppSlice.ts';
import { arrayUnion, Timestamp } from 'firebase/firestore';


export interface Doctor {
  id?: string;
  name: string;
  email: string;
  image?: string;
  gender?: string;
  sub?: boolean
  yearsOfExperience?: number;
  unavailable?: Timestamp | Timestamp[];
  type?: string;
}

interface InitialState {
  data: Doctor[];
  status: string;
  error: string | null;
}

const initialState: InitialState = {
  data: [],
  status: '',
  error: null,
};

const doctorSlice = createAppSlice({
  name: 'doctor',
  initialState,
  reducers: create => ({
    addDoctor: create.asyncThunk(
      async (doctor: Omit<Doctor, 'id'>) => {
        const docID = await setData('doctor', doctor);
        return { ...doctor, id: docID };
      },
      {
        pending: state => {
          state.status = 'loading';
        },
        fulfilled: (state, action) => {
          state.status = 'succeeded';
          state.data.push(action.payload);
        },
        rejected: (state, action) => {
          state.status = 'failed';
          state.error = action.error.message ?? 'Something went wrong';
        },
      }
    ),
    addMedication: create.asyncThunk(
      async (args: {
        newMedication: { medication: string; description: string };
        patient_doc_id: string;
      }) => {
        const { newMedication, patient_doc_id } = args;

        await updateData(patient_doc_id, "users", {
          currentMedications: arrayUnion(newMedication),
        });

        return newMedication;
      },
      {
        pending: state => {
          state.status = "loading";
        },
        fulfilled: state => {
          state.status = "succeeded";
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error.message || "Something went wrong";
        },
      }
    ),
  }),
  selectors: {
    selectDoctorStatus: state => state.status,
    selectDoctorError: state => state.error,
    selectDoctors: state => state.data,
  },
});

export const { selectDoctorStatus, selectDoctorError, selectDoctors } = doctorSlice.selectors;
export const { addDoctor, addMedication } = doctorSlice.actions;
export { doctorSlice };
export default doctorSlice;


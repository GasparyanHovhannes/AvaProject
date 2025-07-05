import { setData, updateData } from '../services/apiService.ts';
import { createAppSlice } from '../app/createAppSlice.ts';

export interface Patient {
    unavailable: any;
    id?: string;
    email: string;
    name: string;
    image?: string;
    sub?: boolean;
    type?: string;
}

interface InitialState {
    patient: Patient | null;
    status: string;
    error: string | null;
}

const initialState: InitialState = {
    patient: null,
    status: '',
    error: null,
};

const patientSlice = createAppSlice({
    name: 'patient',
    initialState,
    reducers: create => ({
        setPatient: create.reducer((state, action: { payload: Patient | null }) => {
            state.patient = action.payload;
        }),
        addPatient: create.asyncThunk(
            async (patient: Omit<Patient, 'id'>) => {
                const docID = await setData('users', patient);
                return { ...patient, id: docID };
            },
            {
                pending: state => {
                    state.status = 'loading';
                },
                fulfilled: (state, action) => {
                    state.status = 'succeeded';
                    state.patient = action.payload;
                },
                rejected: (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message ?? 'Something went wrong';
                },
            }
        ),
        editPatient: create.asyncThunk(
            async (args: { user_doc_id: string; data: Partial<Patient> }) => {
                const { user_doc_id, data } = args;
                await updateData(user_doc_id, 'users', data);
                return data;
            },
            {
                pending: state => {
                    state.status = 'loading';
                },
                fulfilled: (state, action) => {
                    state.status = 'succeeded';
                    state.patient = {
                        ...(state.patient as Patient),
                        ...action.payload,
                    };
                },
                rejected: (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message ?? 'Something went wrong';
                },
            }
        ),
    }),
    selectors: {
        selectPatientStatus: state => state.status,
        selectPatientError: state => state.error,
        selectPatient: state => state.patient,
    },
});

export const {
    selectPatientStatus,
    selectPatientError,
    selectPatient,
} = patientSlice.selectors;

export const { setPatient, addPatient, editPatient } = patientSlice.actions;

export { patientSlice };

export default patientSlice;

import { getData, setData, updateData } from "../services/apiService";
import { createAppSlice } from "../app/createAppSlice";
import { arrayUnion, Timestamp } from "firebase/firestore";

export interface Appointment {
  client: string;
  doctor: string;
  date: Timestamp;
  doc_id?: string;
  status?: string;
}

interface User_Appointment {
  appointmentId: string;
}

interface InitialState {
  appointments: Appointment[];
  status: string;
  error: string | null;
}

const initialState: InitialState = {
  appointments: [],
  status: "",
  error: null,
};

const appointmentsSlice = createAppSlice({
  name: "appointmentsSlice",
  initialState,
  reducers: (create) => ({
    resetStatus: create.reducer((state) => {
      state.status = "";
      state.error = null;
    }),

    setAppointments: create.reducer((state, action: { payload: Appointment[] }) => {
      state.appointments = action.payload;
    }),

    fetchAppointments: create.asyncThunk(
      async (args: { appointments: User_Appointment[] | undefined }) => {
        const results = await Promise.all(
          (args.appointments ?? [])
            .filter((a) => !!a?.appointmentId)
            .map((a) => getData<Appointment>(a.appointmentId, "appointments"))
        );

        return results.filter((r): r is Appointment => !!r);
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "succeeded";
          state.appointments = action.payload;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error.message || null;
        },
      }
    ),

    addAppointment: create.asyncThunk(
      async (args: {
        appointment: Appointment;
        doctor_doc_id: string;
        user_doc_id: string;
      }) => {
        const { appointment, doctor_doc_id, user_doc_id } = args;

        const appointmentId: string = await setData("appointments", appointment);

        await updateData(doctor_doc_id, "doctor", {
          appointments: arrayUnion({ appointmentId }),
        });

        await updateData(user_doc_id, "users", {
          appointments: arrayUnion({ appointmentId }),
        });

        return { ...appointment, doc_id: appointmentId };
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "succeeded";
          state.appointments.push(action.payload);
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error.message || null;
        },
      }
    ),

    updateAppointmentStatus: create.asyncThunk(
      async ({ id, status }: { id: string; status: string }) => {
        await updateData(id, "appointments", { status });
        return { id, status };
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          const { id, status } = action.payload;
          const appt = state.appointments.find((a) => a.doc_id === id);
          if (appt) appt.status = status;
          state.status = "succeeded";
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error.message || null;
        },
      }
    ),
  }),
  selectors: {
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
    selectAppointments: (state) => state.appointments,
    selectClientEmails: (state) =>
      state.appointments.map((a) => a.client).filter((e): e is string => !!e),
    selectAppointmentDates: (state) =>
      state.appointments.map((a) => a.date).filter((d): d is Timestamp => !!d),
  },
});

export const {
  selectStatus,
  selectError,
  selectAppointments,
  selectClientEmails,
  selectAppointmentDates,
} = appointmentsSlice.selectors;

export const {
  addAppointment,
  resetStatus,
  setAppointments,
  fetchAppointments,
  updateAppointmentStatus,
} = appointmentsSlice.actions;

export default appointmentsSlice;

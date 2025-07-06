import { type ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, fetchData } from "../../services/apiService.ts";
import { useAppDispatch } from "../../app/hooks.ts";
import { setUser, clearUser, setEmailVerified } from "../../features/userSlice.ts";
import { setPatient, type Patient } from "../../features/patientSlice.ts";
import { type Doctor } from "../../features/doctorSlice.ts";
import { Spin } from "antd";

type Props = {
  children: ReactNode;
};

const AuthLoader = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {

    if (!user) {
      localStorage.removeItem("authToken");
      dispatch(clearUser());
      dispatch(setEmailVerified(false));
      setLoading(false);
      return;
    }


      try {
        const token = await user.getIdToken(true); 
        localStorage.setItem("authToken", token);
        dispatch(setEmailVerified(user.emailVerified));

        const [patients, doctors] = await Promise.all([
          fetchData<Patient>("users"),
          fetchData<Doctor>("doctor"),
        ]);

        const matchedPatient = patients.find((p) => p.id === user.uid);
        const matchedDoctor = doctors.find((d) => d.id === user.uid);

        if (matchedDoctor) {
          dispatch(setUser({ data: matchedDoctor, role: "doctor", token}));
        } else if (matchedPatient) {
          dispatch(setUser({ data: matchedPatient, role: "patient", token }));
          dispatch(setPatient(matchedPatient));
        } else {
          localStorage.removeItem("authToken");
          dispatch(clearUser());
        }
      } catch (error) {
        console.error("Auth error:", error);
        localStorage.removeItem("authToken");
        dispatch(clearUser());
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) return <Spin fullscreen tip="Loading..." />;

  return <>{children}</>;
};

export default AuthLoader;
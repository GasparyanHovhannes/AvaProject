import "./Login.css";
import React, { useRef, useEffect, useState } from "react";
import { Button, Input, Form, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { SIGNUP, PROFILE, MASTER_PROFILE } from "../../routes/paths";
import { fetchData } from "../../services/apiService";
import { setPatient, type Patient } from "../../features/patientSlice";
import { type Doctor } from "../../features/doctorSlice";
import { setEmailVerified, setUser } from "../../features/userSlice";
import { useAppDispatch } from "../../app/hooks.ts";
import { auth } from "../../services/apiService";
import { signInWithEmailAndPassword } from "firebase/auth";
import loginImage from "../../assets/login-image.jpg"; // 

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const hasNavigated = useRef(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const signupSuccess = location.state?.signupSuccess;

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const firebaseUser = userCredential.user;

      if (!firebaseUser.emailVerified) {
        setError("Please verify your email before logging in.");
        return;
      }

      const token = await firebaseUser.getIdToken();

      localStorage.setItem("authToken", token);

      const [allPatients, allDoctors] = await Promise.all([
        fetchData("users") as Promise<Patient[]>,
        fetchData("doctor") as Promise<Doctor[]>,
      ]);

      const matchedPatient = allPatients.find((p) => p.id === firebaseUser.uid);
      const matchedDoctor = allDoctors.find((d) => d.id === firebaseUser.uid);

      if (matchedDoctor) {
        dispatch(setUser({ data: matchedDoctor, role: "doctor", token }));
        dispatch(setEmailVerified(true));
        navigate(MASTER_PROFILE);
      } else if (matchedPatient) {
        dispatch(setUser({ data: matchedPatient, role: "patient", token }));
        dispatch(setPatient(matchedPatient));
        dispatch(setEmailVerified(true));
        navigate(PROFILE);
      } else {
        setError("User found in Firebase but not in database.");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="login-root">
        <div className="login-wrapper">
          <div className="login-visual">
            <img
              src={loginImage}  
              alt="Digital illustration"
              className="login-image"
            />
          </div>
          <div className="login-container">
            <Form
              name="login"
              onFinish={onFinish}
              layout="vertical"
              form={form}
              className="login-form"
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input size="middle" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true }]}
              >
                <Input.Password size="middle" />
              </Form.Item>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <Form.Item>
                <Button  htmlType="submit" block className="login-button">
                  Login
                </Button>
              </Form.Item>
              <Form.Item>
                <Button onClick={() => navigate(SIGNUP)} block className="signup-button">
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

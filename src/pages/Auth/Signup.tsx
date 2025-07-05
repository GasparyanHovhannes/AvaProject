import "./SignUp.css";
import type { FormProps } from "antd";
import { Button, Form, Input, Select, Card, Space } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { LOGIN } from "../../routes/paths";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState, useEffect } from "react";
import { fetchData } from "../../services/apiService";
import { selectPatientStatus, addPatient } from "../../features/patientSlice";
import { selectDoctorStatus, addDoctor } from "../../features/doctorSlice";
import { type Patient } from "../../features/patientSlice";
import { type Doctor } from "../../features/doctorSlice";
import { auth } from "../../services/apiService";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { setEmailVerified } from "../../features/userSlice";
import loginImage from "../../assets/login-image.jpg"


const { Option } = Select;

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const patientStatus = useAppSelector(selectPatientStatus);
  const doctorStatus = useAppSelector(selectDoctorStatus);
  const [form] = Form.useForm();
  const [selectedRole, setSelectedRole] = useState<"patient" | "doctor" | null>(null);

  useEffect(() => {
    console.log("Patient status:", patientStatus, "Doctor status:", doctorStatus);
    if (patientStatus === "succeeded" || doctorStatus === "succeeded") {
      navigate(LOGIN, { state: { signupSuccess: true } });
      form.resetFields();  // reset form on success
    }
  }, [patientStatus, doctorStatus, navigate, form]);

  const onFinish: FormProps["onFinish"] = async (values) => {
    console.log("Form submitted", values);
    try {
      const [allPatients, allDoctors] = await Promise.all([
        fetchData<Patient>("users"),
        fetchData<Doctor>("doctor"),
      ]);

      const emailExists = [...allPatients, ...allDoctors].some(
        (user) => user.email === values.email
      );
      if (emailExists) {
        alert("Email already exists. Please login.");
        navigate(LOGIN);
        return;
      }

      const { email, password } = values;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      const uid = firebaseUser.uid;

      await sendEmailVerification(firebaseUser);
      dispatch(setEmailVerified(false));

      if (selectedRole === "patient") {
        const newPatient = {
          id: uid,
          name: values.name,
          email: values.email,
          sub: true,
        };

        await dispatch(addPatient(newPatient));
      }

      if (selectedRole === "doctor") {
        const newDoctor: Doctor = {
          id: uid,
          name: values.name,
          email: values.email,
          gender: values.gender,
          yearsOfExperience: parseInt(values.yearsOfExperience),
        };

        await dispatch(addDoctor(newDoctor));
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Signup failed: " + (err as Error).message);
    }
  };

  return (
    <div className="signup-root">
      <div className="signup-wrapper">
        <div className="signup-visual">
            <img
                src={loginImage}
                alt="Signup illustration"
                className="signup-image"
            />
          <h2>Create Your Account</h2>
        </div>
        <div className="signup-container">
          {!selectedRole ? (
            <Space direction="horizontal" size="large">
              <Card
                title="Sign up as Patient"
                hoverable
                onClick={() => setSelectedRole("patient")}
                style={{ width: 250, cursor: "pointer", textAlign: "center"  }}
              >
                Click here if you're a new patient.
              </Card>
              <Card
                title="Sign up as Master"
                hoverable
                onClick={() => setSelectedRole("doctor")}
                style={{ width: 250, cursor: "pointer", textAlign: "center" }}
              >
                Click here if you're a professional.
              </Card>
            </Space>
          ) : (
            <Form name="signup" onFinish={onFinish} form={form} layout="vertical" className="signup-form">
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              {selectedRole === "doctor" && (
                <Form.Item name="yearsOfExperience" label="Years of Experience" rules={[{ required: true }]}>
                  <Input type="number" />
                </Form.Item>
              )}

              <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                <Select placeholder="Select gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                <Input />
              </Form.Item>

              <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button htmlType="submit" className="submit-button">
                    Submit
                  </Button>
                  <Button onClick={() => setSelectedRole(null)} className="back-button">
                    Back
                  </Button>
                </Space>
              </Form.Item>

              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;

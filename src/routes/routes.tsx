import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "../components/Layout";
import { HOME_PAGE, ABOUT, PROFILE, LOGIN, SIGNUP } from "./paths";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Profile from "../pages/Profile/Patientprofile";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";

export const router = createBrowserRouter([
    {
        path: HOME_PAGE,
        element: (
            <Layout>
                <Home />
            </Layout>
        )
    },
    {
        path: ABOUT,
        element: (
            <Layout>
                <About />
            </Layout>
        )
    },
    {
        path: PROFILE,
        element: (
            <Layout>
                <Profile />
            </Layout>
        )
    },
    {
        path: LOGIN,
        element: (
        <Layout>
            <Login />
        </Layout>
        ),
    },
    {
    path: SIGNUP,
    element: (
      <Layout>
        <Signup />
      </Layout>
    ),
    },
])
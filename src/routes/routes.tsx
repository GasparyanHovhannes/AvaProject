import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "../components/Layout";
import { HOME_PAGE, ABOUT, PROFILE, LOGIN, SIGNUP, MASTER_PROFILE,PARTNERS, SUBSCRIPTION } from "./paths";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Profile from "../pages/Profile/Patientprofile";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import MasterProfileSection from "../pages/MasterProfile/MasterProfile";
import Partners from "../pages/Partners/Partners";
import Subscription from "../pages/SubscriptionSave/Subscription";


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
        path: MASTER_PROFILE,
        element: (
            <Layout>
                <MasterProfileSection />
            </Layout>
        )
    },
    {
        path: PARTNERS,
        element: (
            <Layout>
                <Partners />
            </Layout>
        )
    },
    {
        path: SUBSCRIPTION,
        element: (
            <Layout>
                <Subscription />
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
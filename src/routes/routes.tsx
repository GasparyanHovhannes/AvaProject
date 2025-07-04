import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "../components/Layout";
import { HOME_PAGE, ABOUT, MASTER_PROFILE,PARTNERS, SUBSCRIPTION } from "./paths";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
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
    }
])
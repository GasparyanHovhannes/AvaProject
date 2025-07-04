import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "../components/Layout";
import { HOME_PAGE, ABOUT, PROFILE, PARTNERS, SHOP } from "./paths";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import About from "../pages/About/About";
import Profile from "../pages/Profile/Profile";
import Partners from "../pages/Partners/Partners";

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
        path: PARTNERS,
        element: (
            <Layout>
                <Partners />
            </Layout>
        )
    },
    {
        path: SHOP,
        element: (
            <Layout>
                <Shop />
            </Layout>
        )
    }
])
import { lazy } from "react";

import { RouteObject } from "react-router-dom";

import Loadable from "../components/third-patry/Loadable";

import FullLayout from "../layout/FullLayout";


const MainPages = Loadable(lazy(() => import("../pages/authentication/Login")));

const Dashboard = Loadable(lazy(() => import("../pages/dashboard")));

const Customer = Loadable(lazy(() => import("../pages/customer")));

const Report = Loadable(lazy(() => import("../pages/report")));

const Agree = Loadable(lazy(() => import("../pages/Agree")));

const UI = Loadable(lazy(() => import("../pages/UI")));

const AdminUI = Loadable(lazy(() => import("../pages/adminui")));

const CreateCustomer = Loadable(lazy(() => import("../pages/customer/create")));

const CreateAdmin = Loadable(lazy(() => import("../pages/Agree/create")));

const EditCustomer = Loadable(lazy(() => import("../pages/customer/edit")));


const AdminRoutes = (isLoggedIn : boolean): RouteObject => {

  return {

    path: "/",

    element: isLoggedIn ? <FullLayout /> : <MainPages />,

    children: [

      {

        path: "/",

        element: <Dashboard />,

      },

      {

        path: "/customer",

        children: [

          {

            path: "/customer",

            element: <Customer />,

          },

          {

            path: "/customer/create",

            element: <CreateCustomer />,

          },

          {

            path: "/customer/edit/:id",

            element: <EditCustomer />,

          },

        ],

      },

      {

        path: "/report",

        children: [

          {

            path: "/report",

            element: <Report />,

          },

        ],

      },

      {

        path: "/agree",

        children: [

          {

            path: "/agree",

            element: <Agree />,

          },

          {

            path: "/agree/create",

            element: <CreateAdmin />,

          },

        ],

      },

      {

        path: "/ui",

        children: [

          {

            path: "/ui",

            element: <UI />,

          },

        ],

      },

      {

        path: "/adminui",

        children: [

          {

            path: "/adminui",

            element: <AdminUI />,

          },

        ],

      },

    ],

  };

};


export default AdminRoutes;
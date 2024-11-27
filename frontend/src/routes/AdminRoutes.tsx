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

const Payment = Loadable(lazy(() => import("../pages/payment")));

const AdminUI = Loadable(lazy(() => import("../pages/adminui")));

const CreateCustomer = Loadable(lazy(() => import("../pages/customer/create")));

const CreateAdmin = Loadable(lazy(() => import("../pages/Agree/create")));

const EditCustomer = Loadable(lazy(() => import("../pages/customer/edit")));

const QRcode = Loadable(lazy(() => import("../pages/payment/QRcode")));

const Dormitory = Loadable(lazy(() => import("../pages/dormitory")));

const CreateDormitory = Loadable(lazy(() => import("../pages/dormitory/create")));

const Room = Loadable(lazy(() => import("../pages/room")));

const CreateRoom = Loadable(lazy(() => import("../pages/room/create")));

const Books = Loadable(lazy(() => import("../pages/books")));

const CreateBooks = Loadable(lazy(() => import("../pages/books/create")));



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

        path: "/payment",

        children: [

          {

            path: "/payment",

            element: <Payment />,

          },

          {

            path: "/payment/QRcode",

            element: <QRcode />,

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

      {

        path: "/dormitory",

        children: [

          {

            path: "/dormitory",

            element: <Dormitory />,

          },

          {

            path: "/dormitory/create",

            element: <CreateDormitory />,

          },

        ],

      },

      {

        path: "/room",

        children: [

          {

            path: "/room",

            element: <Room />,

          },

          {

            path: "/room/create",

            element: <CreateRoom />,

          },

        ],

      },

      {

        path: "/books",

        children: [

          {

            path: "/books",

            element: <Books />,

          },

          {

            path: "/books/create",

            element: <CreateBooks />,

          },

        ],

      },

    ],

  };

};


export default AdminRoutes;
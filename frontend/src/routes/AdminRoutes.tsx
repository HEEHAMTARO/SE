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

const Course = Loadable(lazy(() => import("../pages/course")));

const CreateCourse = Loadable(lazy(() => import("../pages/course/create")));

const Enrollment = Loadable(lazy(() => import("../pages/enrollment")));

const CreateEnrollment = Loadable(lazy(() => import("../pages/enrollment/create")));

const CreateBooks = Loadable(lazy(() => import("../pages/books/create")));

const PaymentUI = Loadable(lazy(() => import("../pages/paymentui")));

const PayUI = Loadable(lazy(() => import("../pages/PayUI")));

const QR = Loadable(lazy(() => import("../pages/PayUI/QR")));

const QRwages = Loadable(lazy(() => import("../pages/PayUI/QRwages")));

const Dorqrcode = Loadable(lazy(() => import("../pages/payment/Dorqrcode")));

const Receipt = Loadable(lazy(() => import("../pages/PayUI/Receipt")));

const DorRe = Loadable(lazy(() => import("../pages/PayUI/DorRe")));

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

          {

            path: "/payment/Dorqrcode",

            element: <Dorqrcode />,

          },

        ],

      },

      {

        path: "/paymentui",

        children: [

          {

            path: "/paymentui",

            element: <PaymentUI />,

          },

          {

            path: "/paymentui/QRcode",

            element: <QRcode />,

          },

          {

            path: "/paymentui/Dorqrcode",

            element: <Dorqrcode />,

          },

        ],

      },

      {

        path: "/PayUI",

        children: [

          {

            path: "/PayUI",

            element: <PayUI />,

          },

          {

            path: "/PayUI/QR",

            element: <QR />,

          },

          {

            path: "/PayUI/QRwages",

            element: <QRwages />,

          },

          {

            path: "/PayUI/Receipt/:id",

            element: <Receipt />,

          },
          {

            path: "/PayUI/DorRe/:id",

            element: <DorRe />,

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

        path: "/course",

        children: [

          {

            path: "/course",

            element: <Course />,

          },

          {

            path: "/course/create",

            element: <CreateCourse />,

          },

        ],

      },

      {

        path: "/enrollment",

        children: [

          {

            path: "/enrollment",

            element: <Enrollment />,

          },

          {

            path: "/enrollment/create",

            element: <CreateEnrollment />,

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
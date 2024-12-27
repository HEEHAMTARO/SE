import { UsersInterface } from "../../interfaces/IUser";

import { SignInInterface } from "../../interfaces/SignIn";

import { ReportInterface } from "../../interfaces/Report";

import { AdminInterface } from "../../interfaces/Admin";

import { PaymentInterface } from "../../interfaces/Payment";

import { DormitoryInterface } from "../../interfaces/Dormitory";

import { RoomInterface } from "../../interfaces/Room";

import { BooksInterface } from "../../interfaces/Books";

import { EnrollmentInterface } from "../../interfaces/Enrollment";

import { CourseInterface } from "../../interfaces/Course";

import axios from "axios";

const apiUrl = "http://localhost:8000";

const Authorization = localStorage.getItem("token");

const Bearer = localStorage.getItem("token_type");


const requestOptions = {

  headers: {

    "Content-Type": "application/json",

    Authorization: `${Bearer} ${Authorization}`,

  },

};


async function SignIn(data: SignInInterface) {

  return await axios

    .post(`${apiUrl}/signin`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function GetGender() {

  return await axios

    .get(`${apiUrl}/genders`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function GetUsers() {

  return await axios

    .get(`${apiUrl}/users`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetDormitory() {

  return await axios

    .get(`${apiUrl}/dormitorys`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetEnrollment() {

  return await axios

    .get(`${apiUrl}/enrollments`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetCourse() {

  return await axios

    .get(`${apiUrl}/courses`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetRoom() {

  return await axios

    .get(`${apiUrl}/rooms`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetBooks() {

  return await axios

    .get(`${apiUrl}/books`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetReport() {

  return await axios

    .get(`${apiUrl}/reports`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetAdmin() {

  return await axios

    .get(`${apiUrl}/admins`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetPayment() {

  return await axios

    .get(`${apiUrl}/payments`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function GetUsersById(id: string) {

  return await axios

    .get(`${apiUrl}/user/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetPaymentById(id: string) {

  return await axios

    .get(`${apiUrl}/payment/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetReportById(id: string) {

  return await axios

    .get(`${apiUrl}/report/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function UpdateUsersById(id: string, data: UsersInterface) {

  return await axios

    .put(`${apiUrl}/user/${id}`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function UpdatePaymentById(id: string, data: PaymentInterface) {

  return await axios

    .put(`${apiUrl}/payment/${id}`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function DeleteUsersById(id: string) {

  return await axios

    .delete(`${apiUrl}/user/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function DeleteReportById(id: string) {

  return await axios

    .delete(`${apiUrl}/report/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function DeleteBooksById(id: string) {

  return await axios

    .delete(`${apiUrl}/book/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function CreateUser(data: UsersInterface) {

  return await axios

    .post(`${apiUrl}/signup`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function CreateAdmin(data: AdminInterface) {

  return await axios

    .post(`${apiUrl}/admin`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function CreateReport(data: ReportInterface) {

  return await axios

    .post(`${apiUrl}/report`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function CreateEnrollment(data: EnrollmentInterface) {

  return await axios

    .post(`${apiUrl}/enrollment`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function CreateCourse(data: CourseInterface) {

  return await axios

    .post(`${apiUrl}/course`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function CreatePayment(data: PaymentInterface) {

  return await axios

    .post(`${apiUrl}/payment`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function CreateDormitory(data: DormitoryInterface) {

  return await axios

    .post(`${apiUrl}/dormitory`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function CreateRoom(data: RoomInterface) {

  return await axios

    .post(`${apiUrl}/room`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function CreateBooks(data: BooksInterface) {

  return await axios

    .post(`${apiUrl}/book`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function UpdateReportById(id: string, data: ReportInterface) {

  return await axios

    .put(`${apiUrl}/report/${id}`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}




export {

  SignIn,

  GetGender,

  GetUsers,

  GetUsersById,

  UpdateUsersById,

  DeleteUsersById,

  CreateUser,

  GetReport,

  DeleteReportById,

  GetReportById,

  GetAdmin,

  CreateAdmin,

  CreateReport,

  UpdateReportById,

  GetPayment,

  CreatePayment,

  GetDormitory,

  GetRoom,

  GetBooks,

  CreateDormitory,

  CreateRoom,

  CreateBooks,

  UpdatePaymentById,

  GetEnrollment,

  GetCourse,

  CreateCourse,

  CreateEnrollment,

  DeleteBooksById,

  GetPaymentById,

};
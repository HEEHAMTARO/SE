import { UsersInterface } from "../../interfaces/IUser";

import { SignInInterface } from "../../interfaces/SignIn";

import { ReportInterface } from "../../interfaces/Report";

import { AdminInterface } from "../../interfaces/Admin";

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


async function GetUsersById(id: string) {

  return await axios

    .get(`${apiUrl}/user/${id}`, requestOptions)

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

};
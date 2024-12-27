import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  PoweroffOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import "../../App.css";

import Dashboard from "../../pages/dashboard";
import Customer from "../../pages/customer";
import Report from "../../pages/report";
import Agree from "../../pages/Agree";
import UI from "../../pages/UI";
import Payment from "../../pages/payment";
import PaymentUI from "../../pages/paymentui";
import PayUI from "../../pages/PayUI";
import QR from "../../pages/PayUI/QR";
import QRwages from "../../pages/PayUI/QRwages";
import AdminUI from "../../pages/adminui";
import CustomerCreate from "../../pages/customer/create";
import AdminCreate from "../../pages/Agree/create";
import CustomerEdit from "../../pages/customer/edit";
import QRcode from "../../pages/payment/QRcode";
import Dormitory from "../../pages/dormitory";
import DormitoryCreate from "../../pages/dormitory/create";
import Room from "../../pages/room";
import RoomCreate from "../../pages/room/create";
import Books from "../../pages/books";
import Course from "../../pages/course";
import RoomCourse from "../../pages/course/create";
import Enrollment from "../../pages/enrollment";
import RoomEnrollment from "../../pages/enrollment/create";
import BooksCreate from "../../pages/books/create";
import Dorqrcode from "../../pages/payment/Dorqrcode";
import Receipt from "../../pages/PayUI/Receipt";
import DorRe from "../../pages/PayUI/DorRe";

const { Header, Content, Footer } = Layout;

const FullLayout: React.FC = () => {
  const Logout = () => {
    localStorage.clear();
    alert("Logout successful");
    setTimeout(() => {
      location.href = "/";
    }, 2000);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#002766" }}>
        <div style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>
          REG <span style={{ color: "#FFC107" }}>SUT</span>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ flex: 1, justifyContent: "center", background: "#002766" }}
          defaultSelectedKeys={["students"]}
        >
          <Menu.Item key="home">
            <Link to="/" style={{ color: "white" }}>หน้าหลัก</Link>
          </Menu.Item>
          <Menu.Item key="students">
            <Link to="/customer" style={{ color: "white" }}>นักศึกษา</Link>
          </Menu.Item>
          <Menu.Item key="staff">
            <Link to="/report" style={{ color: "white" }}>อาจารย์/บุคลากร</Link>
          </Menu.Item>
          <Menu.Item key="graduates">
            <Link to="/agree" style={{ color: "white" }}>ผู้สำเร็จการศึกษา</Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/ui" style={{ color: "white" }}>About</Link>
          </Menu.Item>
          <Menu.Item key="adminui">
            <Link to="/adminui" style={{ color: "white" }}>Adminui</Link>
          </Menu.Item>
          <Menu.Item key="Payment">
            <Link to="/payment" style={{ color: "white" }}>Payment</Link>
          </Menu.Item>
          <Menu.Item key="Dormitory">
            <Link to="/dormitory" style={{ color: "white" }}>Dormitory</Link>
          </Menu.Item>
          <Menu.Item key="Room">
            <Link to="/room" style={{ color: "white" }}>Room</Link>
          </Menu.Item>
          <Menu.Item key="Books">
            <Link to="/books" style={{ color: "white" }}>Books</Link>
          </Menu.Item>
          <Menu.Item key="PaymentUI">
            <Link to="/paymentui" style={{ color: "white" }}>PaymentUI</Link>
          </Menu.Item>
          <Menu.Item key="PayUI">
            <Link to="/PayUI" style={{ color: "white" }}>PayUI</Link>
          </Menu.Item>
          <Menu.Item key="Course">
            <Link to="/course" style={{ color: "white" }}>course</Link>
          </Menu.Item>
          <Menu.Item key="Enrollment">
            <Link to="/enrollment" style={{ color: "white" }}>enrollment</Link>
          </Menu.Item>
        </Menu>
        <div>
          <Button
            type="text"
            shape="circle"
            icon={<PoweroffOutlined />}
            onClick={Logout}
            style={{ color: "white", fontSize: "18px" }}
          />
        </div>
      </Header>
      <Content style={{ margin: "0 16px", padding: 24, background: "#fff" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/customer/create" element={<CustomerCreate />} />
          <Route path="/customer/edit/:id" element={<CustomerEdit />} />
          <Route path="/report" element={<Report />} />
          <Route path="/agree" element={<Agree />} />
          <Route path="/agree/create" element={<AdminCreate />} />
          <Route path="/ui" element={<UI />} />
          <Route path="/adminui" element={<AdminUI />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/QRcode" element={<QRcode />} />
          <Route path="/payment/Dorqrcode" element={<Dorqrcode />} />
          <Route path="/dormitory" element={<Dormitory />} />
          <Route path="/dormitory/create" element={<DormitoryCreate />} />
          <Route path="/room" element={<Room />} />
          <Route path="/room/create" element={<RoomCreate />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/create" element={<BooksCreate />} />
          <Route path="/paymentui" element={<PaymentUI />} />
          <Route path="/PayUI" element={<PayUI />} />
          <Route path="/PayUI/QR" element={<QR />} />
          <Route path="/PayUI/QRwages" element={<QRwages />} />
          <Route path="/PayUI/Receipt/:id" element={<Receipt />} />
          <Route path="/PayUI/DorRe/:id" element={<DorRe />} />
          <Route path="/course" element={<Course />} />
          <Route path="/course/create" element={<RoomCourse />} />
          <Route path="/enrollment" element={<Enrollment />} />
          <Route path="/enrollment/create" element={<RoomEnrollment />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default FullLayout;

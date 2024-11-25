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
import AdminUI from "../../pages/adminui";
import CustomerCreate from "../../pages/customer/create";
import AdminCreate from "../../pages/Agree/create";
import CustomerEdit from "../../pages/customer/edit";

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
          <Route path="//agree/create" element={<AdminCreate />} />
          <Route path="/ui" element={<UI />} />
          <Route path="/adminui" element={<AdminUI />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default FullLayout;

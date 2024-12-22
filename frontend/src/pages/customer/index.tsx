import { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetUsers, DeleteUsersById } from "../../services/https/index";
import { UsersInterface } from "../../interfaces/IUser";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

function Customers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UsersInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const myId = localStorage.getItem("id");

  const columns: ColumnsType<UsersInterface> = [
    {
      title: "",
      render: (record) => (
        <>
          <Button
            type="dashed"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteUserById(record.ID)}
          ></Button>
        </>
      ),
    },
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "รูปประจำตัว",
      dataIndex: "Profile",
      key: "Profile",
      width: "15%",
      render: (text, record, index) => (
        <img src={record.Profile} className="w3-left w3-circle w3-margin-right" width="100%" />
      )
    },
    {
      title: "ชื่อ",
      dataIndex: "FirstName",
      key: "FirstName",
    },
    {
      title: "นามสกุล",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "semester_id",
      dataIndex: "semester_id",
      key: "semester_id",
    },
    {
      title: "YearOfStudy",
      dataIndex: "YearOfStudy",
      key: "YearOfStudy",
    },
    {
      title: "Wages",
      dataIndex: "wages",
      key: "wages",
      render: (value) => value.toFixed(2),
    },
    {
      title: "อีเมล",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "วัน/เดือน/ปี เกิด",
      key: "birthday",
      render: (record) => <>{dayjs(record.birthday).format("DD/MM/YYYY")}</>,
    },
    {
      title: "อายุ",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "เพศ",
      key: "gender",
      render: (record) => <>{record?.gender?.gender}</>,
    },
    {
      title: "",
      render: (record) => (
        <>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            onClick={() => navigate(`/customer/edit/${record.ID}`)}
          >
            แก้ไขข้อมูล
          </Button>
        </>
      ),
    },
  ];

  const deleteUserById = async (id: string) => {
    let res = await DeleteUsersById(id);
    if (res.status == 200) {
      messageApi.open({
        type: "success",
        content: res.data.message,
      });
      await getUsers();
    } else {
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  const getUsers = async () => {
    let res = await GetUsers();
    const myId = localStorage.getItem("id");
  
    if (res.status === 200) {
      // แปลง myId ให้เป็น string และกรองข้อมูลเพื่อแสดงเฉพาะข้อมูลที่ ID ตรงกับ myId
      const filteredUsers = res.data.filter((user) => String(user.ID) === myId);
      setUsers(filteredUsers);
    } else {
      setUsers([]);
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={12}>
          <h2>จัดการข้อมูลสมาชิก</h2>
        </Col>
        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
          <Space>
            <Link to="/customer/create">
              <Button type="primary" icon={<PlusOutlined />}>
                สร้างข้อมูล
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>
      <Divider />
      <div style={{ marginTop: 20 }}>
        <Table
          rowKey="ID"
          columns={columns}
          dataSource={users}
          style={{ width: "100%", overflow: "scroll" }}
        />
      </div>
    </>
  );
}

export default Customers;

import { useState, useEffect } from "react";

import { Space, Table, Button, Col, Row, Divider, message } from "antd";

import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";

import { GetUsers, DeleteUsersById, GetReport, GetAdmin } from "../../services/https/index";

import { UsersInterface } from "../../interfaces/IUser";

import { ReportInterface } from "../../interfaces/Report";

import { AdminInterface } from "../../interfaces/Admin";

import { Link, useNavigate } from "react-router-dom";

import dayjs from "dayjs";


function Agree() {

  const navigate = useNavigate();

  const [users, setUsers] = useState<UsersInterface[]>([]);

  const [report, setReport] = useState<ReportInterface[]>([]);

  const [admin, setAdmin] = useState<AdminInterface[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const myId = localStorage.getItem("id");


  const columns: ColumnsType<AdminInterface> = [

    {

      title: "",

      render: (record) => (

        <>

          {myId == record?.ID ? (

            <></>

          ) : (

            <Button

              type="dashed"

              danger

              icon={<DeleteOutlined />}

              onClick={() => deleteUserById(record.ID)}

            ></Button>

          )}

        </>

      ),

    },

    {
      title: "รูปประจำตัว",
      dataIndex: "Profile",
      key: "profile",
      width: "15%",
      render: (text, record, index) => (
        <img src={record.Profile} className="w3-left w3-circle w3-margin-right" width="100%" />
      )
    },

    {

      title: "ลำดับ",

      dataIndex: "ID",

      key: "id",

    },

    {

      title: "First",

      dataIndex: "first_name",

      key: "first_name",

    },

    {

      title: "Last",

      dataIndex: "last_name",

      key: "last_name",

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

   

    if (res.status == 200) {

      setUsers(res.data);

    } else {

      setUsers([]);

      messageApi.open({

        type: "error",

        content: res.data.error,

      });

    }

  };

  const getReport = async () => {

    let res = await GetReport();

   

    if (res.status == 200) {

      setReport(res.data);

    } else {

      setReport([]);

      messageApi.open({

        type: "error",

        content: res.data.error,

      });

    }

  };

  const getAdmin = async () => {

    let res = await GetAdmin();

   

    if (res.status == 200) {

      setAdmin(res.data);

    } else {

      setAdmin([]);

      messageApi.open({

        type: "error",

        content: res.data.error,

      });

    }

  };


  useEffect(() => {

    getUsers();
    
    getReport();

    getAdmin();

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

            <Link to="/agree/create">

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

          dataSource={admin}

          style={{ width: "100%", overflow: "scroll" }}

        />

      </div>

    </>

  );

}


export default Agree;
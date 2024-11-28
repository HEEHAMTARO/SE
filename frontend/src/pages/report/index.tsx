import { useState, useEffect } from "react";

import { Space, Table, Button, Col, Row, Divider, message } from "antd";

import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";

import { GetUsers, DeleteUsersById, GetReport } from "../../services/https/index";

import { UsersInterface } from "../../interfaces/IUser";

import { ReportInterface } from "../../interfaces/Report";

import { Link, useNavigate } from "react-router-dom";

import dayjs from "dayjs";


function Report() {

  const navigate = useNavigate();

  const [users, setUsers] = useState<UsersInterface[]>([]);

  const [report, setReport] = useState<ReportInterface[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const myId = localStorage.getItem("id");


  const columns: ColumnsType<ReportInterface> = [

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

      title: "ลำดับ",

      dataIndex: "ID",

      key: "id",

    },

    {
      title: "รูปประจำตัว",
      dataIndex: "photo",
      key: "photo",
      width: "15%",
      render: (text, record, index) => (
        <img src={record.Photo} className="w3-left w3-circle w3-margin-right" width="100%" />
      )
    },
  

    {

      title: "Note",

      dataIndex: "note",

      key: "Note",

    },

    {

      title: "Contact",

      dataIndex: "contact",

      key: "contact",

    },

    {

      title: "AdminID",

      dataIndex: "admin_id",

      key: "admin_id",

    },

    {

      title: "DateReport",

      key: "dreport",

      render: (record) => <>{dayjs(record.dreport).format("DD/MM/YYYY")}</>,

    },

    {

      title: "DateApprove",

      key: "dapprove",

      render: (record) => <>{dayjs(record.dapprove).format("DD/MM/YYYY")}</>,

    },

    {

      title: "Admin",

      key: "admin",

      render: (record) => <>{record?.admin?.first_name}</>,

    },

    {

      title: "Users",

      key: "users",

      render: (record) => <>{record?.users?.first_name}</>,

    },

    {

      title: "UsersID",

      key: "id",

      render: (record) => <>{record?.users?.ID}</>,

    },

    {

      title: "DormitoryID",

      key: "ID",

      render: (record) => <>{record?.dormitory_id}</>,

    },

    {

      title: "DormitoryName",

      key: "DormName",

      render: (record) => <>{record?.dorm?.DormName}</>,

    },

    {

      title: "BooksID",

      key: "ID",

      render: (record) => <>{record?.books_id}</>,

    },

    // {

    //   title: "BookstudentID",

    //   key: "ID",

    //   render: (record) => <>{record?.book?.student_id}</>,

    // },

    {

      title: "RoomID",

      key: "ID",

      render: (record) => <>{record?.room_id}</>,

    },

    {

      title: "RoomstudentID",

      key: "Number",

      render: (record) => <>{record?.room?.RoomNumber}</>,

    },

    {

      title: "Status",

      dataIndex: "status",

      key: "status",

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


  useEffect(() => {

    getUsers();
    
    getReport();

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

          dataSource={report}

          style={{ width: "100%", overflow: "scroll" }}

        />

      </div>

    </>

  );

}


export default Report;
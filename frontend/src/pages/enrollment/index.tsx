import { useState, useEffect } from "react";

import { Space, Table, Button, Col, Row, Divider, message } from "antd";

import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";

import { GetUsers, DeleteUsersById, GetReport, GetCourse, GetEnrollment } from "../../services/https/index";

import { UsersInterface } from "../../interfaces/IUser";

import { ReportInterface } from "../../interfaces/Report";

import { CourseInterface } from "../../interfaces/Course";

import { EnrollmentInterface } from "../../interfaces/Enrollment";

import { Link, useNavigate } from "react-router-dom";

import dayjs from "dayjs";


function Enrollment() {

  const navigate = useNavigate();

  const [users, setUsers] = useState<UsersInterface[]>([]);

  const [report, setReport] = useState<ReportInterface[]>([]);

  const [course, setCourse] = useState<CourseInterface[]>([]);

  const [enrollment, setEnrollment] = useState<EnrollmentInterface[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const myId = localStorage.getItem("id");


  const columns: ColumnsType<EnrollmentInterface> = [

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

      title: "Status",

      dataIndex: "Status",

      key: "Status",

    },

    {

      title: "semester_id",

      dataIndex: "semester_id",

      key: "semester_id",

    },

    {

      title: "CourseID",

      dataIndex: "CourseID",

      key: "CourseID",

    },

    {

      title: "StudentID",

      dataIndex: "StudentID",

      key: "StudentID",

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

  const getCourse = async () => {

    let res = await GetCourse();

   

    if (res.status == 200) {

      setCourse(res.data);

    } else {

      setCourse([]);

      messageApi.open({

        type: "error",

        content: res.data.error,

      });

    }

  };

  const getEnrollment = async () => {

    let res = await GetEnrollment();

   

    if (res.status == 200) {

      setEnrollment(res.data);

    } else {

      setEnrollment([]);

      messageApi.open({

        type: "error",

        content: res.data.error,

      });

    }

  };


  useEffect(() => {

    getUsers();
    
    getReport();

    getCourse();

    getEnrollment();

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

            <Link to="/enrollment/create">

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

          dataSource={enrollment}

          style={{ width: "100%", overflow: "scroll" }}

        />

      </div>

    </>

  );

}


export default Enrollment;
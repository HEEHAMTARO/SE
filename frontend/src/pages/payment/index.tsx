import { useState, useEffect } from "react"; 
import { Space, Table, Button, Col, Row, Divider, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { GetUsers, DeleteUsersById, GetReport, CreatePayment, GetPayment, GetDormitory, UpdatePaymentById} from "../../services/https/index";
import { UsersInterface } from "../../interfaces/IUser";
import { DormitoryInterface } from "../../interfaces/Dormitory";
import { ReportInterface } from "../../interfaces/Report";
import { PaymentInterface } from "../../interfaces/Payment";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

function Payment() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UsersInterface[]>([]);
  const [dormitory, setDormitory] = useState<DormitoryInterface[]>([]);
  const [payment, setPayment] = useState<PaymentInterface[]>([]);
  const [report, setReport] = useState<ReportInterface[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // Track selected user ID
  const [messageApi, contextHolder] = message.useMessage();
  const myId = localStorage.getItem("id");

  const columns: ColumnsType<PaymentInterface> = [
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
    title: "statusdor",
    dataIndex: "statusdor",
    key: "statusdor",
  },
  {
    title: "statusstudent",
    dataIndex: "statusstudent",
    key: "statusstudent",
  },
  {
    title: "WagesPayment",
    dataIndex: "wages",
    key: "wages",
    render: (value) => value.toFixed(2),
  },
  {
    title: "UserID",
    key: "UserID",
    render: (record) => <>{record?.users?.ID}</>,
  },
  {
    title: "First Name",
    key: "FirstName",
    render: (record) => <>{record?.users?.FirstName}</>,
  },
  {
    title: "Last Name",
    key: "last_name",
    render: (record) => <>{record?.users?.last_name}</>,
  },
  {
    title: "Wages",
    key: "wages",
    render: (record) => (
      <>{record?.users?.wages ? record.users.wages.toFixed(2) : "0.00"}</>
    ),
  },
  {
    title: "User ID",
    key: "user_id",
    render: (record) => <>{record?.users?.ID}</>,
  },
  {

    title: "DormitoryID",

    key: "ID",

    render: (record) => <>{record?.dormitory_id}</>,

  },
  {

    title: "Price",

    key: "Price",

    render: (record) => (
      <>{record?.dorm?.Price ? record.dorm.Price.toFixed(2) : "0.00"}</>
    ),

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
      // Filter users by the logged-in user's ID (myId)
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

  const getDormitory = async () => {
    let res = await GetDormitory();
    const myId = localStorage.getItem("id");
  
    if (res.status === 200) {
      // Filter users by the logged-in user's ID (myId)
      const filteredDormitory = res.data.filter((dormitory) => String(dormitory.ID) === myId);
      setDormitory(filteredDormitory);
    } else {
      setDormitory([]);
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  

  const getPayment = async () => {

    let res = await GetPayment();

   

    if (res.status == 200) {

      setPayment(res.data);

    } else {

      setPayment([]);

      messageApi.open({

        type: "error",

        content: res.data.error,

      });

    }

  };

  // Function to create payment using the wages of the logged-in user
  const handleCreatePayment = async () => {
    if (!myId) {
      messageApi.open({
        type: "error",
        content: "ไม่พบข้อมูลผู้ใช้งาน",
      });
      return;
    }

    const user = users.find((user) => String(user.ID) === myId);
    if (!user) {
      messageApi.open({
        type: "error",
        content: "ไม่พบข้อมูลผู้ใช้ที่ถูกต้อง",
      });
      return;
    }

    

    const paymentData = {
      users_id: user.ID,
      wages: user.wages, // Using the logged-in user's wages
    };

    

    let res = await CreatePayment(paymentData);
    if (res.status == 200) {
      messageApi.open({
        type: "success",
        content: "การชำระเงินถูกสร้างสำเร็จ",
      });
      setPayment([...payment, res.data]); // Optionally update the payment list
    } else {
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  const handleCreateDorPayment = async () => {
    if (!myId) {
      messageApi.open({
        type: "error",
        content: "ไม่พบข้อมูลผู้ใช้งาน",
      });
      return;
    }
  
    // Find dormitory by ID
    const dorm = dormitory.find((dorm) => String(dorm.ID) === myId);
    if (!dorm) {
      messageApi.open({
        type: "error",
        content: "ไม่พบข้อมูลหอพักที่ถูกต้อง",
      });
      return;
    }
  
    // Prepare payment data
    const paymentDormData = {
      dormitory_id: dorm.ID,
      wages: dorm.Price, // Include the user's ID if needed
    };
  
    try {
      let res = await CreatePayment(paymentDormData);
      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: "การชำระเงินถูกสร้างสำเร็จ",
        });
        setPayment([...payment, res.data]); // Update the payment list
      } else {
        throw new Error(res.data.error);
      }
    } catch (err) {
      messageApi.open({
        type: "error",
        content: err.message || "เกิดข้อผิดพลาด",
      });
    }
  };

  useEffect(() => {
    getPayment();
    getUsers();
    getDormitory();
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
          <Link to="/payment/QRcode">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreatePayment} // Call handleCreatePayment when the button is clicked
            >
              ไปยังหน้า QRcode
            </Button>
            </Link>
            <Link to="/payment/Dorqrcode">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreateDorPayment} // Call handleCreatePayment when the button is clicked
            >
              ไปยังหน้า Dorqrcode
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
          dataSource={payment}
          style={{ width: "100%", overflow: "scroll" }}
        />
      </div>
    </>
  );
}

export default Payment;

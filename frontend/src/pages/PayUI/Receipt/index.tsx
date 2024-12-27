import React, { useState, useEffect } from 'react';
import { Layout, Table, Typography, Row, Col, message, Form } from 'antd';
import { GetPaymentById, GetUsers, GetDormitory, GetPayment, GetEnrollment, GetCourse } from '../../../services/https/index';
import { PaymentInterface } from '../../../interfaces/Payment';
import { UsersInterface } from '../../../interfaces/IUser';
import { DormitoryInterface } from '../../../interfaces/Dormitory';
import { useNavigate, useParams } from 'react-router-dom';
import { EnrollmentInterface } from "../../../interfaces/Enrollment";
import { CourseInterface } from "../../../interfaces/Course";
import logo from "../../../assets/SUT_LOGO.png";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const Receipt: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [payment, setPayment] = useState<PaymentInterface | null>(null);
  const [users, setUsers] = useState<UsersInterface[]>([]);
  const [payments, setPayments] = useState<PaymentInterface[]>([]);
  const [dorm, setDorm] = useState<DormitoryInterface[]>([]);
  const [enrollment, setEnrollment] = useState<EnrollmentInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [course, setCourse] = useState<CourseInterface[]>([]);
  const [form] = Form.useForm();
  const myId = localStorage.getItem("id");

  // Fetch Payment data by ID
  const getPaymentById = async (id: string) => {
    const res = await GetPaymentById(id);
    if (res.status === 200) {
      setPayment(res.data); // Store the payment data in state
    } else {
      setPayment(null);
      messageApi.open({
        type: 'error',
        content: res.data.error,
      });
    }
  };

  // Fetch Users
  const getUsers = async () => {
    const res = await GetUsers();
    if (res.status === 200) {
      setUsers(res.data);
    } else {
      setUsers([]);
      messageApi.open({
        type: 'error',
        content: res.data.error,
      });
    }
  };

  // Fetch Dormitory data
  const getDormitory = async () => {
    const res = await GetDormitory();
    if (res.status === 200) {
      setDorm(res.data);
    } else {
      setDorm([]);
      messageApi.open({
        type: 'error',
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

  useEffect(() => {
    if (id) {
      getPaymentById(id); // Fetch payment data based on ID
    }
    getUsers();
    getDormitory();
    getCourse();
    getEnrollment();
  }, [id]);

  // Generate data for the table
  const getCourseDetails = () => {
    if (payment && enrollment.length > 0 && course.length > 0) {
      const userEnrollments = enrollment.filter(
        (e) => e.StudentID === payment?.users?.ID && e.semester_id === payment?.termstudent
      );
  
      const courseDetails = userEnrollments
        .map((enrollmentItem, index) => {
          const courseDetail = course.find((c) => c.ID === enrollmentItem.CourseID);
          if (courseDetail && courseDetail.Credit !== undefined) {
            const credit = courseDetail.Credit;
            const cost = 600; // Example cost for each course
            return {
              key: index.toString(),
              no: (index + 1).toString(),
              description: `${courseDetail.CourseName} sec${courseDetail.Group}`, // Adjust description as needed
              amount: `${credit} (${credit * cost})`,
            };
          }
          return null;
        })
        .filter((item) => item !== null); // Filter out any null values
  
      return courseDetails;
    }
  
    return [];
  };

  const columns = [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      width: 50,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Amount (Baht)',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right' as const,
    },
  ];

  const data = getCourseDetails();

  return (
    <Layout style={{ background: '#fff', padding: '24px', border: '1px solid #ddd' }}>
      {contextHolder}
      <Row justify="center" align="middle">
    <Col>
      <img src={logo} alt="SUT Logo" style={{ width: '200px', marginBottom: '15px' }} />
    </Col>
  </Row>
      <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>
        <Title level={4} style={{ margin: 0 }}>
          มหาวิทยาลัยเทคโนโลยีสุรนารี
        </Title>
        <Text>Statement of Student Account</Text>
      </Header>
      <Content>
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col span={12}>
            <Text>
              ชื่อ-สกุล: {payment?.users?.FirstName || 'N/A'} {payment?.users?.last_name || 'N/A'} <br />
              รหัสประจำตัว: {payment?.ID || 'N/A'}
            </Text>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Text>
              วันที่: <br />
            </Text>
          </Col>
        </Row>

        {/* Payment Table */}
        <Table
  columns={columns}
  dataSource={data}
  pagination={false}
  bordered
  style={{ marginTop: 16 }}
  summary={() => (
    <Table.Summary.Row>
      <Table.Summary.Cell index={0} colSpan={2} align="right">
        <Text strong>Total</Text>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={1} align="right">
        <Text strong>
          {payment?.credit || 'N/A'} ({payment?.wagesstudent || 'N/A'})
        </Text>
      </Table.Summary.Cell>
    </Table.Summary.Row>
  )}
/>

        {/* Remarks */}
        <Row style={{ marginTop: 16 }}>
          <Col span={24}>
            <Text>
              หมายเหตุ: กรุณาชำระเงินภายในวันที่ 24 ก.ย. 2567
            </Text>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Receipt;

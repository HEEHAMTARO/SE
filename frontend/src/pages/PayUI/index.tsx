import React, { useState, useEffect } from "react";
import { Card, Button, message } from "antd";
import { UsersInterface } from "../../interfaces/IUser";
import { DormitoryInterface } from "../../interfaces/Dormitory";
import { GetUsers, GetDormitory, GetRoom, GetBooks, GetPayment, CreatePayment, UpdatePaymentById, GetCourse, GetEnrollment } from "../../services/https/index";
import { RoomInterface } from "../../interfaces/Room";
import { BooksInterface } from "../../interfaces/Books";
import { PaymentInterface } from "../../interfaces/Payment";
import { CourseInterface } from "../../interfaces/Course";
import { EnrollmentInterface } from "../../interfaces/Enrollment";
import { Link, useNavigate } from "react-router-dom";

const PayUI: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UsersInterface[]>([]);
  const [dormitory, setDormitory] = useState<DormitoryInterface[]>([]);
  const [room, setRoom] = useState<RoomInterface[]>([]);
  const [books, setBooks] = useState<BooksInterface[]>([]);
  const [payment, setPayment] = useState<PaymentInterface[]>([]);
  const [course, setCourse] = useState<CourseInterface[]>([]);
  const [enrollment, setEnrollment] = useState<EnrollmentInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const myId = localStorage.getItem("id");

  // Fetch users and filter by logged-in user ID
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

  // Fetch dormitory information
  const getDormitory = async () => {
    let res = await GetDormitory();
    if (res.status == 200) {
      setDormitory(res.data);
    } else {
      setDormitory([]);
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  const getRoom = async () => {
    let res = await GetRoom();
    if (res.status == 200) {
      setRoom(res.data);
    } else {
      setRoom([]);
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  const getBooks = async () => {
    let res = await GetBooks();
    if (res.status == 200) {
      setBooks(res.data);
    } else {
      setBooks([]);
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
    getUsers();
    getDormitory();
    getRoom();
    getBooks();
    getPayment();
    getCourse();
    getEnrollment();
  }, []);

  

  const getDormName = (studentId: number) => {
    if (studentId.toString() !== myId) return null;
    const book = books.find((b) => b.student_id === studentId);
    if (!book) return null;
    const roomInfo = room.find((r) => r.ID === book.RoomID);
    if (!roomInfo) return null;
    const dormInfo = dormitory.find((d) => d.ID === roomInfo.DormitoryID);
    return dormInfo ? dormInfo.DormName : null;
  };

  const getDormID = (studentId: number) => {
    if (studentId.toString() !== myId) return null;
    const book = books.find((b) => b.student_id === studentId);
    if (!book) return null;
    const roomInfo = room.find((r) => r.ID === book.RoomID);
    if (!roomInfo) return null;
    const dormInfo = dormitory.find((d) => d.ID === roomInfo.DormitoryID);
    return dormInfo ? dormInfo.ID : null;
  };

  const getDormPrice = (studentId: number) => {
    if (studentId.toString() !== myId) return null;
    const book = books.find((b) => b.student_id === studentId);
    if (!book) return null;
    const roomInfo = room.find((r) => r.ID === book.RoomID);
    if (!roomInfo) return null;
    const dormInfo = dormitory.find((d) => d.ID === roomInfo.DormitoryID);
    return dormInfo ? dormInfo.Price : null;
  };

  const getPaymentDorStatus = (studentId: number) => {
    if (studentId.toString() !== myId) return null;
    const paymentInfo = payment.find((p) => p.users_id === studentId);
    return paymentInfo ? paymentInfo.statusdor : null;
  };

  const getPaymentStudentStatus = (studentId: number) => {
    if (studentId.toString() !== myId) return null;
    const paymentInfo = payment.find((p) => p.users_id === studentId);
    return paymentInfo ? paymentInfo.statusstudent : null;
  };
  

  const handleDormitoryPayment = async (user: UsersInterface) => {
    const dormID = getDormID(user.ID);
    const dormPrice = getDormPrice(user.ID);

    if (!dormID || !dormPrice) {
      messageApi.open({
        type: "error",
        content: "ข้อมูลหอพักไม่ครบถ้วน",
      });
      return;
    }

    const existingPayment = payment.find((p) => p.users_id === user.ID);
    if (existingPayment) {
      // Update payment if it already exists
      const updatedPayment = {
        ...existingPayment,
        wages: dormPrice,
      };
      const res = await UpdatePaymentById(existingPayment.ID, updatedPayment);
      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: "อัปเดตการชำระเงินหอพักเรียบร้อย",
        });
      } else {
        messageApi.open({
          type: "error",
          content: res.data.error,
        });
      }
    } else {
      // Create new payment if it doesn't exist
      const paymentData = {
        users_id: user.ID,
        dormitory_id: dormID,
        wages: dormPrice,
      };
      const res = await CreatePayment(paymentData);
      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: "สร้างการชำระเงินหอพักเรียบร้อย",
        });
      } else {
        messageApi.open({
          type: "error",
          content: res.data.error,
        });
      }
    }
  };

  const handleCoursePayment = async (user: UsersInterface) => {
    const courseID = getCoursePrice(user.ID);
    const dormID = getDormID(user.ID);

    if (!courseID) {
      messageApi.open({
        type: "error",
        content: "ข้อมูลหอพักไม่ครบถ้วน",
      });
      return;
    }

    const existingPayment = payment.find((p) => p.users_id === user.ID);
    if (existingPayment) {
      // Update payment if it already exists
      const updatedPayment = {
        ...existingPayment,
        wages: courseID,
      };
      const res = await UpdatePaymentById(existingPayment.ID, updatedPayment);
      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: "อัปเดตการชำระเงินหอพักเรียบร้อย",
        });
      } else {
        messageApi.open({
          type: "error",
          content: res.data.error,
        });
      }
    } else {
      // Create new payment if it doesn't exist
      const paymentData = {
        users_id: user.ID,
        wages: courseID,
        dormitory_id: dormID,
      };
      const res = await CreatePayment(paymentData);
      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: "สร้างการชำระเงินค่าเทอมเรียบร้อย",
        });
      } else {
        messageApi.open({
          type: "error",
          content: res.data.error,
        });
      }
    }
  };

  const getCourseDetails = (myId: number) => {
    // หาทุก enrollment ที่มี student_id ตรงกับ myId
    const userEnrollments = enrollment.filter((e) => e.StudentID === myId);
  
    // ถ้ามีการลงทะเบียน
    if (userEnrollments.length > 0) {
      // หา Credit ของ Course ที่ตรงกับ course_id ของแต่ละ enrollment
      const courseCredits = userEnrollments.map((enrollmentItem) => {
        const courseDetails = course.find((c) => c.ID === enrollmentItem.CourseID);
        return courseDetails ? courseDetails.Credit : null; // ถ้าไม่พบ course จะได้ null
      }).filter(credit => credit !== null); // กรองค่า null ออก
  
      // ถ้ามี Credit ของ Course ให้รวมทั้งหมด
      if (courseCredits.length > 0) {
        const totalCredits = courseCredits.reduce((acc, credit) => acc + credit, 0);
        return totalCredits; // ส่งผลรวมของ Credit
      } else {
        return "ไม่พบข้อมูล";
      }
    }
  
    return "ไม่พบข้อมูล";
  };

  const getCoursePrice = (myId: number) => {
    // หาทุก enrollment ที่มี student_id ตรงกับ myId
    const userEnrollments = enrollment.filter((e) => e.StudentID === myId);
  
    // ถ้ามีการลงทะเบียน
    if (userEnrollments.length > 0) {
      // หา Credit ของ Course ที่ตรงกับ course_id ของแต่ละ enrollment
      const courseCredits = userEnrollments.map((enrollmentItem) => {
        const courseDetails = course.find((c) => c.ID === enrollmentItem.CourseID);
        return courseDetails ? courseDetails.Credit : null; // ถ้าไม่พบ course จะได้ null
      }).filter(credit => credit !== null); // กรองค่า null ออก
  
      // ถ้ามี Credit ของ Course ให้รวมทั้งหมด
      if (courseCredits.length > 0) {
        const totalCredits = courseCredits.reduce((acc, credit) => acc + credit, 0);
        return totalCredits * 600; // คูณผลรวมของ Credit ด้วย 400
      } else {
        return "ไม่พบข้อมูล";
      }
    }
  
    return "ไม่พบข้อมูล";
};

  

  // Filter users to show only the ones that match the logged-in user's ID
  const filteredUsers = users.filter((user) => user.ID.toString() === myId);
  

  return (
    <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
      {contextHolder}
      <div
        style={{
          backgroundColor: "#002766",
          color: "#fff",
          padding: "20px 50px",
          fontSize: "25px",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        📄 ชำระเงิน
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "500px",
          flexWrap: "wrap",
        }}
      >
        {/* Left column: Dormitory Payment */}
        {filteredUsers.map((user, index) => (
          <Card
            key={`user-${index}`}
            style={{
              width: 300,
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
            cover={
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#d9d9d9",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {user?.Profile ? (
                  <img
                    src={user.Profile}
                    alt="Profile"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{ color: "white" }}>No Profile Image</div>
                )}
              </div>
            }
          >
            <div style={{ padding: "10px" }}>
              <p>
                <h3>
                  <center>ชำระเงินค่าหอพัก</center>
                </h3>
              </p>
              <p>
                <strong>Name:</strong> {user?.FirstName} {user?.last_name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>ID:</strong> {getDormID(user.ID) || "ไม่พบข้อมูล"}
              </p>
              <p>
                <strong>หอพัก:</strong> {getDormName(user.ID) || "ไม่พบข้อมูล"}
              </p>
              <p>
                <strong>ยอดชำระ:</strong> {getDormPrice(user.ID) || "ไม่พบข้อมูล"} บาท
              </p>
              <p>
                <strong>สถานะการชำระ:</strong> {getPaymentDorStatus(user.ID) || "-"}
              </p>
              <Link to="/PayUI/QR">
              <Button
                type="primary"
                block
                onClick={() => handleDormitoryPayment(user)}
              >
                ชำระเงินหอพัก
              </Button>
              </Link>
            </div>
          </Card>
        ))}

        {/* Right column: Tuition Payment */}
        {filteredUsers.map((user, index) => (
          <Card
            key={`user-${index}`}
            style={{
              width: 300,
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
            cover={
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#d9d9d9",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {user?.Profile ? (
                  <img
                    src={user.Profile}
                    alt="Profile"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{ color: "white" }}>No Profile Image</div>
                )}
              </div>
            }
          >
            <div style={{ padding: "10px" }}>
              <p>
                <h3>
                  <center>ชำระเงินค่าเทอม</center>
                </h3>
              </p>
              <p>
                <strong>Name:</strong> {user?.FirstName} {user?.last_name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>หน่วยกิต:</strong> {getCourseDetails(user.ID)}
              </p>
              <p>
                <strong>ยอดชำระ:</strong> {getCoursePrice(user.ID)} บาท
              </p>
              <p>
                <strong>สถานะการชำระ:</strong> {getPaymentStudentStatus(user.ID) || "-"}
              </p>
              <Link to="/PayUI/QR">
              <Button
                type="primary"
                block
                onClick={() => handleCoursePayment(user)}
              >
                ชำระเงินค่าเทอม
              </Button>
</Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PayUI;

import React, { useState, useEffect } from "react";
import { Card, Button, message } from "antd";
import { UsersInterface } from "../../interfaces/IUser";
import { DormitoryInterface } from "../../interfaces/Dormitory";
import { GetUsers, GetDormitory, GetRoom, GetBooks, GetPayment, CreatePayment, UpdatePaymentById, GetCourse, GetEnrollment, GetReport } from "../../services/https/index";
import { RoomInterface } from "../../interfaces/Room";
import { BooksInterface } from "../../interfaces/Books";
import { PaymentInterface } from "../../interfaces/Payment";
import { CourseInterface } from "../../interfaces/Course";
import { ReportInterface } from "../../interfaces/Report";
import { EnrollmentInterface } from "../../interfaces/Enrollment";
import { Link, useNavigate } from "react-router-dom";

const PayUI: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UsersInterface[]>([]);
  const [dormitory, setDormitory] = useState<DormitoryInterface[]>([]);
  const [room, setRoom] = useState<RoomInterface[]>([]);
  const [books, setBooks] = useState<BooksInterface[]>([]);
  const [report, setReport] = useState<ReportInterface[]>([]);
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
    getReport();
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

  const getReportStatus = (studentId: number) => {
    if (studentId.toString() !== myId) return null;
    const re = report.find((r) => r.users_id === studentId && r.status === "approve");
    return re ? "approve" : null;
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

  const getDormDetails = async (dormID: number | undefined): Promise<DormitoryInterface | undefined> => {
    if (!dormID) {
      console.error("Dorm ID is undefined.");
      return undefined;
    }
  
    try {
      // Replace the URL with the actual endpoint to fetch dormitory details
      const response = await fetch(`/api/dormitories/${dormID}`);
      if (response.ok) {
        const dorm: DormitoryInterface = await response.json();
        return dorm;
      } else {
        console.error(`Failed to fetch dormitory details for ID: ${dormID}`);
        return undefined;
      }
    } catch (error) {
      console.error("Error fetching dormitory details:", error);
      return undefined;
    }
  };


  const getPaymentDorStatus = (studentId: number, semesterId: number, yearOfStudy: number) => {
    if (studentId.toString() !== myId) return null;
  
    const paymentInfo = payment.find(
      (p) =>
        p.users_id === studentId &&
        p.termstudent === semesterId &&
        p.yearstudent === yearOfStudy
    );
  
    return paymentInfo ? paymentInfo.statusdor : null;
  };

  const getPaymentID = (studentId: number, semesterId: number, yearOfStudy: number) => {
    if (studentId.toString() !== myId) return null;
  
    const paymentInfo = payment.find(
      (p) =>
        p.users_id === studentId &&
        p.termstudent === semesterId &&
        p.yearstudent === yearOfStudy
    );
  
    return paymentInfo ? paymentInfo.ID : null;
  };

  const getPaymentStudentStatus = (studentId: number, semesterId: number, yearOfStudy: number) => {
    if (studentId.toString() !== myId) return null;
  
    const paymentInfo = payment.find(
      (p) =>
        p.users_id === studentId &&
        p.termstudent === semesterId &&
        p.yearstudent === yearOfStudy
    );
  
    return paymentInfo ? paymentInfo.statusstudent : null;
  };
  

  const handleDormitoryPayment = async (user: UsersInterface) => {
    const dormID = getDormID(user.ID);
    const dormPrice = getDormPrice(user.ID);
    const dorm = getDormDetails(dormID);
  
    if (!dormID || !dormPrice || !user.ID || user.YearOfStudy === undefined) {
      messageApi.open({
        type: "error",
        content: "ข้อมูลหอพักไม่ครบถ้วน",
      });
      return;
    }
  
    const existingPayment = payment.find(
      (p) =>
        p.users_id === user.ID &&
        p.yearstudent === user.YearOfStudy &&
        p.termstudent === user.semester_id
    );
  
    if (existingPayment) {
      if (!existingPayment.ID) {
        messageApi.open({
          type: "error",
          content: "ไม่พบ ID ของการชำระเงินที่ต้องการอัปเดต",
        });
        return;
      }
  
      const updatedPayment: PaymentInterface = {
        ...existingPayment,
        wages: dormPrice, // Ensure this matches the interface
      };
  
      const res = await UpdatePaymentById(existingPayment.ID.toString(), updatedPayment);
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
      const paymentData: PaymentInterface = {
        users_id: user.ID,
        dormitory_id: dormID, // Convert to string
        wages: Number(dormPrice), // Ensure this matches the interface
        termstudent: user.semester_id || "",
        yearstudent: user.YearOfStudy,
        users: user,
        dorm: dorm,
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
    const courseID = getCoursePrice(user.ID, user.semester_id);
    const dormID = getDormID(user.ID);
    const creditID = getCourseDetails(user.ID, user.semester_id);
    const dorm = getDormDetails(dormID);
  
    if (courseID === undefined || dormID === undefined || creditID === undefined) {
      messageApi.open({
        type: "error",
        content: "ข้อมูลหอค่าเทอมไม่ครบถ้วน",
      });
      return;
    }
  
    const existingPayment = payment.find(
      (p) =>
        p.users_id === user.ID &&
        p.yearstudent === user.YearOfStudy &&
        p.termstudent === user.semester_id
    );
  
    if (existingPayment) {
      if (existingPayment.ID === undefined) {
        messageApi.open({
          type: "error",
          content: "ไม่พบ ID ของการชำระเงินที่ต้องการอัปเดต",
        });
        return;
      }
  
      const updatedPaymentstudent: PaymentInterface = {
        ...existingPayment,
        wagesstudent: Number(courseID),
        credit: Number(creditID),
      };
  
      const res = await UpdatePaymentById(existingPayment.ID.toString(), updatedPaymentstudent);
      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: "อัปเดตการชำระเงินค่าเทอมเรียบร้อย",
        });
      } else {
        messageApi.open({
          type: "error",
          content: res.data.error,
        });
      }
    } else {
      const paymentData: PaymentInterface = {
        users_id: user.ID,
        wagesstudent: Number(courseID),
        dormitory_id: dormID,
        credit: Number(creditID),
        termstudent: user.semester_id,
        yearstudent: user.YearOfStudy,
        users: user, // Add user data
        dorm: dorm,
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


  

  const getCourseDetails = (myId: number, semesterId: number) => {
    // หาทุก enrollment ที่มี student_id ตรงกับ myId และ semester_id ตรงกับ semesterId
    const userEnrollments = enrollment.filter(
      (e) => e.StudentID === myId && e.semester_id === semesterId
    );
  
    // ถ้ามีการลงทะเบียน
    if (userEnrollments.length > 0) {
      // หา Credit ของ Course ที่ตรงกับ course_id ของแต่ละ enrollment
      const courseCredits = userEnrollments
        .map((enrollmentItem) => {
          const courseDetails = course.find((c) => c.ID === enrollmentItem.CourseID);
          return courseDetails ? courseDetails.Credit : null; // ถ้าไม่พบ course จะได้ null
        })
        .filter((credit): credit is number => credit !== null); // กรองค่า null ออก
  
      // ถ้ามี Credit ของ Course ให้รวมทั้งหมด
      if (courseCredits.length > 0) {
        const totalCredits = courseCredits.reduce((acc, credit) => acc + credit, 0); // กำหนดค่าเริ่มต้นเป็น 0
        return totalCredits; // ส่งผลรวมของ Credit
      } else {
        return "ไม่พบข้อมูล";
      }
    }
  
    return "ไม่พบข้อมูล";
  };

  const getCoursePrice = (myId: number, semesterId: number) => {
    // Find all enrollments where StudentID matches myId and semester_id matches
    const userEnrollments = enrollment.filter(
      (e) => e.StudentID === myId && e.semester_id === semesterId
    );
  
    // If there are enrollments
    if (userEnrollments.length > 0) {
      // Get the Credit of the Course matching each enrollment's CourseID
      const courseCredits = userEnrollments
        .map((enrollmentItem) => {
          const courseDetails = course.find((c) => c.ID === enrollmentItem.CourseID);
          return courseDetails ? courseDetails.Credit : null; // Return Credit or null if not found
        })
        .filter((credit): credit is number => credit !== null); // Filter out null values and ensure type is number
  
      // If there are Credits
      if (courseCredits.length > 0) {
        const totalCredits = courseCredits.reduce((acc, credit) => acc + credit, 0); // Initialize acc as 0
        return totalCredits * 600; // Multiply total credits by 600
      } else {
        return "ไม่พบข้อมูล"; // No course credits found
      }
    }
  
    return "ไม่พบข้อมูล"; // No enrollments found
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
      <h3>
        <center>ชำระเงินค่าหอพัก</center>
      </h3>
      <p>
        <strong>Name:</strong> {user?.FirstName} {user?.last_name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Status:</strong> {getReportStatus(user.ID ?? -1)}
      </p>
      <p>
        <strong>Term:</strong> {user.semester_id}
      </p>
      <p>
        <strong>DormID:</strong> {getDormID(user.ID ?? -1) || "ไม่พบข้อมูล"}
      </p>
      <p>
        <strong>หอพัก:</strong> {getDormName(user.ID ?? -1) || "ไม่พบข้อมูล"}
      </p>
      <p>
        <strong>ยอดชำระ:</strong> {getDormPrice(user.ID ?? -1) || "ไม่พบข้อมูล"} บาท
      </p>
      <p>
        <strong>สถานะการชำระ:</strong> {getPaymentDorStatus(user.ID ?? -1, user.semester_id, user.YearOfStudy) || "-"}
      </p>
      <p>
        <strong>PaymentID:</strong> {getPaymentID(user.ID ?? -1, user.semester_id, user.YearOfStudy) || "-"}
      </p>
      <Link to="/PayUI/QR">
        <Button
          type="primary"
          block
          onClick={getReportStatus(user.ID ?? -1) !== "approve" ? () => handleDormitoryPayment(user) : undefined}
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
      <h3>
        <center>ชำระเงินค่าเทอม</center>
      </h3>
      <p>
        <strong>Name:</strong> {user?.FirstName} {user?.last_name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Term:</strong> {user.semester_id}
      </p>
      <p>
        <strong>หน่วยกิต:</strong> {getCourseDetails(user.ID ?? -1, user.semester_id)}
      </p>
      <p>
        <strong>ยอดชำระ:</strong> {getCoursePrice(user.ID ?? -1, user.semester_id)} บาท
      </p>
      <p>
        <strong>สถานะการชำระ:</strong> {getPaymentStudentStatus(user.ID ?? -1, user.semester_id, user.YearOfStudy) || "-"}
      </p>
      <Link to="/PayUI/QRwages">
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

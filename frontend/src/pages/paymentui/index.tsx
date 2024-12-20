import React, { useState, useEffect } from "react"; 
import { Card, Button, message } from "antd";
import { UsersInterface } from "../../interfaces/IUser";
import { DormitoryInterface } from "../../interfaces/Dormitory";
import { GetUsers, GetDormitory, GetRoom, GetBooks, GetPayment } from "../../services/https/index";
import { RoomInterface } from "../../interfaces/Room";
import { BooksInterface } from "../../interfaces/Books";
import { PaymentInterface } from "../../interfaces/Payment";

const PayUI: React.FC = () => {
  const [users, setUsers] = useState<UsersInterface[]>([]);
  const [dormitory, setDormitory] = useState<DormitoryInterface[]>([]);
  const [payment, setPayment] = useState<PaymentInterface[]>([]);
  const [room, setRoom] = useState<RoomInterface[]>([]);
  const [books, setBooks] = useState<BooksInterface[]>([]);
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


  useEffect(() => {
    getUsers();
    getDormitory();
    getRoom();
    getBooks();
    getPayment();
  }, []);

  

  const getDormName = (studentId: number) => {
    // Check if the studentId matches the current user's ID (myId)
    if (studentId.toString() !== myId) return null;
  
    // Find the book related to the current student
    const book = books.find((b) => b.student_id === studentId);
    if (!book) return null;
  
    // Find the room related to the book
    const roomInfo = room.find((r) => r.ID === book.RoomID);
    if (!roomInfo) return null;
  
    // Find the dormitory related to the room
    const dormInfo = dormitory.find((d) => d.ID === roomInfo.DormitoryID);
    return dormInfo ? dormInfo.DormName : null;
  };

  const getDormPrice = (studentId: number) => {
    // Check if the studentId matches the current user's ID (myId)
    if (studentId.toString() !== myId) return null;
  
    // Find the book related to the current student
    const book = books.find((b) => b.student_id === studentId);
    if (!book) return null;
  
    // Find the room related to the book
    const roomInfo = room.find((r) => r.ID === book.RoomID);
    if (!roomInfo) return null;
  
    // Find the dormitory related to the room
    const dormInfo = dormitory.find((d) => d.ID === roomInfo.DormitoryID);
    return dormInfo ? dormInfo.Price : null; // Return the Price instead of DormName
  };
  

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
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* Left column: Users */}
        {users.map((user, index) => (
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
                  height: "150px",
                  backgroundColor: "#d9d9d9",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="https://via.placeholder.com/100"
                  alt="User"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            }
          >
            <div style={{ padding: "10px" }}>
              <p>
                <strong>Name:</strong> {user?.FirstName} {user?.last_name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
              <strong>หอพัก:</strong> {getDormName(user.ID) || "ไม่พบข้อมูล"}
              </p>
              <p>
                <strong>ยอดชำระ:</strong> {getDormPrice(user.ID) || "ไม่พบข้อมูล"} บาท
              </p>
              <p>
                <strong>สถานะการชำระ:</strong> ยังไม่ชำระ
              </p>
              <Button type="primary" block>
                ชำระเงิน
              </Button>
            </div>
          </Card>
        ))}

        {/* Right column: Dormitory */}
        {users.map((user, index) => (
          <Card
            key={`dorm-${index}`}
            style={{
              width: 300,
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
            cover={
              <div
                style={{
                  width: "100%",
                  height: "150px",
                  backgroundColor: "#d9d9d9",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="https://via.placeholder.com/100"
                  alt="Dormitory"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            }
          >
            <div style={{ padding: "10px" }}>
              <p>
                <strong>Name:</strong> {user?.FirstName} {user?.last_name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>หน่วยกิต:</strong> 23 หน่วย
              </p>
              <p>
                <strong>ยอดชำระ:</strong> {user.wages} บาท
              </p>
              
              <p>
                <strong>สถานะการชำระ:</strong> ค้างชำระ
              </p>
              <Button type="primary" block>
                ชำระเงิน
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PayUI;
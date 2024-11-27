import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, message, Upload, DatePicker, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { 
  GetUsers, 
  GetReport, 
  CreateReport, 
  GetAdmin, 
  GetRoom, 
  GetBooks, 
  GetDormitory 
} from "../../services/https/index"; // ปรับเส้นทางให้ถูกต้อง
import { UsersInterface } from "../../interfaces/IUser";
import { ReportInterface } from "../../interfaces/Report";
import { AdminInterface } from "../../interfaces/Admin"; 
import { PlusOutlined } from "@ant-design/icons";
import { RoomInterface } from "../../interfaces/Room";
import { DormitoryInterface } from "../../interfaces/Dormitory";
import { BooksInterface } from "../../interfaces/Books";
import type { UploadProps } from 'antd';
import dayjs from "dayjs";
import ImgCrop from "antd-img-crop";

const { Option } = Select;

const ReportUI = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UsersInterface | null>(null);
  const [reports, setReports] = useState<ReportInterface[]>([]);
  const [dormitory, setDormitory] = useState<DormitoryInterface[]>([]);
  const [room, setRoom] = useState<RoomInterface[]>([]);
  const [books, setBooks] = useState<BooksInterface[]>([]);
  const [admins, setAdmins] = useState<AdminInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [fileList, setFileList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [selectedDormitory, setSelectedDormitory] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myId = localStorage.getItem("id");
        if (!myId) throw new Error("User ID not found in localStorage");

        const userResponse = await GetUsers();
        const userData = userResponse.data.find((u: UsersInterface) => String(u.ID) === myId);
        setUser(userData || null);

        const reportsResponse = await GetReport();
        setReports(reportsResponse.data.filter((r: ReportInterface) => String(r.users_id) === myId));

        setRoom((await GetRoom()).data);
        setDormitory((await GetDormitory()).data);
        setBooks((await GetBooks()).data);
        setAdmins((await GetAdmin()).data);
      } catch (error: any) {
        messageApi.open({ type: "error", content: error.message || "Failed to fetch data" });
      }
    };
    fetchData();
  }, [messageApi]);

  const onChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const imgWindow = window.open(src);
    imgWindow.document.write(`<img src="${src}" />`);
  };

  const onFinish = async (values: ReportInterface) => {
    try {
      const myId = localStorage.getItem("id");
      if (!myId) throw new Error("User ID not found in localStorage");

      const payload: ReportInterface = {
        users_id: Number(myId),
        note: values.note,
        contact: values.contact,
        Photo: fileList[0]?.thumbUrl || null,
        dreport: values.dreport,
        room_id: selectedRoom,
        dormitory_id: selectedDormitory,
        books_id: selectedBook,
      };

      const response = await CreateReport(payload);
      if (response.status === 201) {
        throw new Error("Failed to create report");
      } else {
        messageApi.open({ type: "success", content: "Report created successfully" });
        navigate("/report");
      }
    } catch (error: any) {
      messageApi.open({ type: "error", content: error.message || "An error occurred" });
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        height: "150vh",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#d3d3d3",
      }}
    >
      {contextHolder}

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            width: 150,
            height: 150,
            backgroundColor: "#888",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            marginBottom: 15,
            overflow: "hidden",
          }}
        >
          {user?.Profile ? (
            <img src={user.Profile} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ color: "white" }}>No Profile Image</div>
          )}
        </div>

        <Card style={{ width: 500, textAlign: "left", borderRadius: 8, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name">
              <div>{`${user?.FirstName || ""} ${user?.last_name || ""}`}</div>
            </Form.Item>
            <Form.Item label="Email">
              <div>{user?.email}</div>
            </Form.Item>
            <Form.Item label="Note" name="note" rules={[{ required: true, message: "Please enter a note" }]}>
              <Input.TextArea placeholder="Enter your notes" />
            </Form.Item>
            <Form.Item label="Contact" name="contact" rules={[{ required: true, message: "Please enter contact info" }]}>
              <Input placeholder="Enter your contact" />
            </Form.Item>
            <Form.Item
              label="Report Date"
              name="dreport"
              rules={[{ required: true, message: "Please select a date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Room">
              <Select onChange={(value) => setSelectedRoom(value)} placeholder="Select a room">
                {room
                  .filter((r) => books.some((b) => b.RoomID === r.ID && b.student_id === user?.ID)) // Filter rooms based on RoomID in Books and student_id
                  .map((r) => (
                    <Option key={r.ID} value={r.ID}>
                      {r.RoomNumber}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item label="Dormitory">
  <Select
    onChange={(value) => setSelectedDormitory(value)}
    placeholder="Select a dormitory"
  >
    {room
      .filter((r) => books.some((b) => b.RoomID === r.ID && b.student_id === user?.ID)) // กรองเฉพาะ Room ที่เกี่ยวข้องกับ Books
      .flatMap((r) => r.Dormitory) // ดึง Dormitory จาก Room
      .map((dorm) => (
        <Option key={dorm.ID} value={dorm.ID}>
          {dorm.DormName}
        </Option>
      ))}
  </Select>
</Form.Item>
            <Form.Item label="Books">
              <Select onChange={(value) => setSelectedBook(value)} placeholder="Select a book">
                {books
                  .filter((b) => b.student_id === user?.ID) // Show books where student_id matches the user ID
                  .map((b) => (
                    <Option key={b.ID} value={b.ID}>
                      {b.student_id}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item label="Photo" name="Photo">
              <ImgCrop rotationSlider>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                  beforeUpload={() => false}
                  maxCount={1}
                >
                  {fileList.length < 1 && <div><PlusOutlined /><div style={{ marginTop: 8 }}>Upload</div></div>}
                </Upload>
              </ImgCrop>
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={reports.some((report) => report.status === "approve")}>
      Submit
    </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
      {/* Right Side: Report Data */}
      <div
        style={{
          overflowY: "auto",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: 8,
          backgroundColor: "white",
        }}
      >
        <h2>Reports</h2>
        {reports.length > 0 ? (
          reports.map((report) => {
            const admin = admins.find((admin) => admin.ID === report.admin_id); // Find the admin by ID
            return (
              <div
                key={report.id}
                style={{
                  borderBottom: "1px solid #eee",
                  padding: "10px 0",
                }}
              >
                <p><strong>Name:</strong> {user?.FirstName} {user?.last_name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Age:</strong> {user?.age}</p>
                <p><strong>BirthDay:</strong> {dayjs(report?.users?.birthday).format("DD/MM/YYYY")}</p>
                <p><strong>Status:</strong> {report.status || "รออนุมัติ"}</p>
                <p><strong>Notes:</strong> {report.note}</p>
                <p><strong>Contact:</strong> {report.contact}</p>
                <p><strong>DateReport:</strong> {dayjs(report.dreport).format("DD/MM/YYYY")}</p>
                <p><strong>Admin:</strong> {admin?.first_name} {admin?.last_name}</p>
                <p><strong>DateApprove:</strong> {dayjs(report.dapprove).format("DD/MM/YYYY")}</p>
                <p><strong>DormitoryName:</strong> {report?.dorm?.DormName}</p>
                <p><strong>RoomNumber:</strong> {report?.room?.RoomNumber}</p>
              </div>
            );
          })
        ) : (
          <p>No reports available.</p>
        )}
      </div>
    </div>
  );
};

export default ReportUI;

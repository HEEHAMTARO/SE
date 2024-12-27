import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, message, Upload, DatePicker, Select, Divider, UploadFile } from "antd";
import { useNavigate } from "react-router-dom";
import { 
  GetUsers, 
  GetReport, 
  CreateReport, 
  GetAdmin, 
  GetRoom, 
  GetBooks, 
  GetDormitory 
} from "../../services/https/index"; // Update the path as needed
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
  const [fileList, setFileList] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [selectedDormitory, setSelectedDormitory] = useState<number | null>(null);

  // Calculate books_id automatically
  const calculateBooksId = () => {
    const matchingBook = books.find((b) => b.student_id === user?.ID);
    return matchingBook ? matchingBook.ID : null;
  };

  interface CustomUploadFile extends UploadFile {
    base64?: string;
  }

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

  // const onChange = ({ fileList: newFileList }) => setFileList(newFileList);

  // const handleBeforeUpload = (file: any) => {
  //   const isImage = file.type.startsWith('image/');
  //   // Ensure the file is an image
  //   if (!isImage) {
  //     message.error('You can only upload image files!');
  //   }
  //   return isImage;
  // };

  const onPreview = async (file: UploadFile) => {
    let src = file.url;
  
    if (!src && file.originFileObj) {
      src = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as Blob);
        reader.onload = () => resolve(reader.result as string);
      });
    }
  
    if (src) {
      const imgWindow = window.open(src);
      if (imgWindow) {
        imgWindow.document.write(`<img src="${src}" style="max-width: 100%;" />`);
      } else {
        console.error("Failed to open a new window.");
      }
    } else {
      console.error("No source available for preview.");
    }
  };

  const onFinish = async (values: ReportInterface) => {
    try {
      const myId = localStorage.getItem("id");
      if (!myId) throw new Error("User ID not found in localStorage");
  
      const payload: ReportInterface = {
        users_id: Number(myId),
        note: values.note,
        contact: values.contact,
        Photo: fileList[0]?.base64 || "", // Save the base64 string of the image
        dreport: values.dreport,
        room_id: Number(selectedRoom),
        dormitory_id: Number(selectedDormitory),
        books_id: calculateBooksId() ?? 0, // Automatically calculate books_id
        // Providing values for missing fields
        dapprove: values.dapprove ?? null, // Assuming null if not provided
        users: values.users ?? null,       // Assuming null if not provided
        room: values.room ?? null,         // Assuming null if not provided
        dorm: values.dorm ?? null,         // Assuming null if not provided
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
  

  const handleImageChange = async ({ fileList: newFileList }: { fileList: CustomUploadFile[] }) => {
    setFileList(newFileList);
    
    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj as File; // Ensure the file is of type File
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const base64String = reader.result as string;
        newFileList[0].base64 = base64String; // Save the base64 string in the fileList
        setFileList([...newFileList]); // Use a new array reference to trigger React state updates
      };
      
      reader.readAsDataURL(file);
    } else {
      setFileList([]); // Clear the fileList if the user deletes the uploaded file
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
            <Form.Item label="Contact" name="contact" rules={[{ required: true, message: "Please enter contact info" }, {
      pattern: /^0\d{9}$/,
      message: "Contact must be 10 digits and start with 0 (e.g., 0967211316)",
    },]}>
              <Input placeholder="Enter your contact" maxLength={10}/>
            </Form.Item>
            <Form.Item
              label="Report Date"
              name="dreport"
              rules={[{ required: true, message: "Please select a date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Room" name="room" rules={[{ required: true, message: "Please select a room" }]}>
              <Select onChange={(value) => setSelectedRoom(value)} placeholder="Select a room">
                {room
                  .filter((r) => books.some((b) => b.RoomID === r.ID && b.student_id === user?.ID))
                  .map((r) => (
                    <Option key={r.ID} value={r.ID}>
                      {r.RoomNumber}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item label="Dormitory" name="dormitory" rules={[{ required: true, message: "Please select a Dormitory" }]}>
              <Select onChange={(value) => setSelectedDormitory(value)} placeholder="Select a dormitory">
                {room
                  .filter((r) => books.some((b) => b.RoomID === r.ID && b.student_id === user?.ID))
                  .flatMap((r) => r.Dormitory)
                  .map((dorm) => (
                    <Option key={dorm.ID} value={dorm.ID}>
                      {dorm.DormName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
  label="Photo (ควรถ่ายจากหน้าห้องเข้ามาให้เห็นในห้อง)"
  name="Photo"
  rules={[
    {
      validator: (_, value) =>
        fileList.length > 0
          ? Promise.resolve()
          : Promise.reject(new Error("โปรดอัพโหลดรูปภาพ")),
    },
  ]}
>
  <Upload
    listType="picture-card"
    fileList={fileList}
    onChange={handleImageChange}
    onPreview={onPreview}
    beforeUpload={() => false} // Prevent auto upload
    maxCount={1} // Restrict to one file upload
    accept="image/*" // Ensure only images can be uploaded
  >
    {fileList.length < 1 && (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>อัพโหลด</div>
      </div>
    )}
  </Upload>
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
  reports.some(report => report.status === "approve") ? (
    reports
      .filter(report => report.status === "approve")
      .map((report) => {
        const admin = admins.find((admin) => admin.ID === report.admin_id); // Find the admin by ID
        return (
          <div
            key={report.ID}
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
            <p>
  <strong>DateApprove:</strong>{" "}
  {report.dapprove && dayjs(report.dapprove).format("YYYY-MM-DD") !== "0001-01-01"
    ? dayjs(report.dapprove).format("DD/MM/YYYY")
    : ""}
</p>
            <p><strong>DormitoryName:</strong> {report?.dorm?.DormName}</p>
            <p><strong>RoomNumber:</strong> {report?.room?.RoomNumber}</p>
          </div>
        );
      })
  ) : (
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
          <p>
  <strong>DateApprove:</strong>{" "}
  {report.dapprove && dayjs(report.dapprove).format("YYYY-MM-DD") !== "0001-01-01"
    ? dayjs(report.dapprove).format("DD/MM/YYYY")
    : ""}
</p>
          <p><strong>DormitoryName:</strong> {report?.dorm?.DormName}</p>
          <p><strong>RoomNumber:</strong> {report?.room?.RoomNumber}</p>
        </div>
      );
    })
  )
) : (
  <p>No reports available.</p>
)}
      </div>
    </div>
  );
};

export default ReportUI;

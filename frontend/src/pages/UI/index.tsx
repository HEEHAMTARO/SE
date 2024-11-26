import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, message, Upload, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { GetUsers, GetReport, CreateReport, GetAdmin } from "../../services/https/index"; // Adjust paths as needed
import { UsersInterface } from "../../interfaces/IUser";
import { ReportInterface } from "../../interfaces/Report";
import { AdminInterface } from "../../interfaces/Admin"; // Assuming you have an AdminInterface
import { PlusOutlined } from "@ant-design/icons";
import type { UploadProps } from 'antd';
import dayjs from "dayjs";
import { UploadOutlined } from '@ant-design/icons';
import ImgCrop from "antd-img-crop";

const ReportUI = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UsersInterface | null>(null);
  const [reports, setReports] = useState<ReportInterface[]>([]); // State for report data
  const [admins, setAdmins] = useState<AdminInterface[]>([]); // Assuming admins are fetched as well
  const [messageApi, contextHolder] = message.useMessage();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const myId = localStorage.getItem("id");
        if (!myId) {
          throw new Error("User ID not found in localStorage");
        }

        const response = await GetUsers();
        if (response.status === 200) {
          const userData = response.data.find((user: UsersInterface) => String(user.ID) === myId);
          if (userData) {
            setUser(userData);
          } else {
            messageApi.open({
              type: "error",
              content: "User data not found",
            });
          }
        }
      } catch (error: any) {
        messageApi.open({
          type: "error",
          content: error.message || "Failed to fetch user data",
        });
      }
    };

    const fetchReports = async () => {
      try {
        const response = await GetReport(); // Fetch report data
        if (response.status === 200) {
          // Filter reports by user ID
          const myId = localStorage.getItem("id");
          const filteredReports = response.data.filter((report: ReportInterface) => String(report.users_id) === myId);
          setReports(filteredReports); // Update report state with filtered reports
        } else {
          throw new Error("Failed to fetch reports");
        }
      } catch (error: any) {
        messageApi.open({
          type: "error",
          content: error.message || "Failed to fetch reports",
        });
      }
    };

    const fetchAdmins = async () => {
      try {
        const response = await GetAdmin(); // Fetch admin data
        if (response.status === 200) {
          setAdmins(response.data); // Assuming admins are fetched in this response
        } else {
          throw new Error("Failed to fetch admin data");
        }
      } catch (error: any) {
        messageApi.open({
          type: "error",
          content: error.message || "Failed to fetch admin data",
        });
      }
    };

    fetchUser();
    fetchReports();
    fetchAdmins();
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
      if (fileList.length > 0) {
        values.Photo = fileList[0].thumbUrl;
      }
      if (!myId) {
        throw new Error("User ID not found in localStorage");
      }

      const userId = user?.ID || Number(myId);
      const payload: ReportInterface = {
        users_id: userId,
        note: values.note,
        contact: values.contact,
        Photo: values.Photo,
        dreport: values.dreport, // Convert to the required format
      };

      const response = await CreateReport(payload);

      if (response.status === 201) {
        throw new Error("Failed to create report");
      } else {
        messageApi.open({
          type: "success",
          content: "Report created successfully",
        });
        navigate("/report");
      }
    } catch (error: any) {
      messageApi.open({
        type: "error",
        content: error.message || "An error occurred",
      });
    }
  };
  
  const handleDateChange = (date: any) => {
    setReportDate(date);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr", // Split layout into two columns
        height: "100vh",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#d3d3d3", // พื้นหลังสีพื้น
        backgroundSize: "cover", // ให้ภาพพื้นหลังครอบคลุมทั้งพื้นที่
        backgroundPosition: "center", // ให้ภาพอยู่กึ่งกลาง
      }}
    >
      {contextHolder}
      {/* Left Side: User Info and Form */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
            <img
              src={user.Profile}
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div style={{ color: "white" }}>No Profile Image</div>
          )}
        </div>
        <Card
          style={{
            width: 500,
            textAlign: "left",
            borderRadius: 8,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name">
              <div>{`${user?.FirstName || ""} ${user?.last_name || ""}`}</div>
            </Form.Item>
            <Form.Item label="Email">
              <div>{user?.email}</div>
            </Form.Item>
            <Form.Item
              label="Note"
              name="note"
              rules={[{ required: true, message: "Please enter a note" }]} 
            >
              <Input.TextArea placeholder="Value" />
            </Form.Item>
            <Form.Item
              label="Contact"
              name="contact"
              rules={[ 
                { required: true, message: "Please enter a contact number" },
                {
                  pattern: /^0\d{2}-\d{3}-\d{4}$/, // Regex pattern for the format 096-721-1316
                  message: "Please enter a valid contact number (format: 096-721-1316)",
                }
              ]}
            >
              <Input placeholder="Value" />
            </Form.Item>
            <Form.Item
  
                  label="วัน/เดือน/ปี เกิด"
                  name="dreport"
                  rules={[
                    {
                      required: true,
                      message: "กรุณาเลือกวัน/เดือน/ปี",
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />

                </Form.Item>
            <Form.Item label="รูปประจำตัว" name="Photo">
                <ImgCrop rotationSlider>
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    beforeUpload={() => false} // Prevent immediate upload
                    maxCount={1}
                  >
                    {fileList.length < 1 && (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>อัพโหลด</div>
                      </div>
                    )}
                  </Upload>
                </ImgCrop>
              </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                block
                disabled={reports.some((report) => report.status === "approve")}
              >
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
                <p><strong>DormitoryID:</strong> {report?.dormitory_id}</p>
                <p><strong>DormitoryName:</strong> {report?.dorm?.DormName}</p>
                <p><strong>DormitoryName:</strong> {report?.book?.student_id}</p>
                <p><strong>DormitoryName:</strong> {report?.room?.RoomNumber}</p>
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

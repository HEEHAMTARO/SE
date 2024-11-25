import React, { useState, useEffect } from "react";
import { Input, Button, Card, message } from "antd";
import { GetAdmin, GetReport, UpdateReportById } from "../../services/https/index";
import { AdminInterface } from "../../interfaces/Admin";
import { ReportInterface } from "../../interfaces/Report";
import dayjs from "dayjs";

const Adminui = () => {
  const [admin, setAdmin] = useState<AdminInterface | null>(null);
  const [report, setReport] = useState<ReportInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  // ฟังก์ชันดึงข้อมูลรายงาน
  const fetchReport = async () => {
    try {
      const res = await GetReport();
      if (res.status === 200) {
        setReport(res.data.filter((rep) => rep.status !== "not approve")); // กรองข้อมูลที่ status ไม่ใช่ "not approve"
      } else {
        messageApi.open({
          type: "error",
          content: res.data.error,
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการดึงข้อมูลรายงาน",
      });
    }
  };

  // ฟังก์ชันดึงข้อมูล admin
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const myId = localStorage.getItem("id");
        const response = await GetAdmin();
        if (response.status === 200) {
          const adminData = response.data.find((admin) => String(admin.ID) === myId);
          if (adminData) {
            setAdmin(adminData);
          } else {
            messageApi.open({
              type: "error",
              content: "ไม่พบข้อมูลผู้ใช้",
            });
          }
        }
      } catch (error) {
        messageApi.open({
          type: "error",
          content: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้",
        });
      }
    };

    fetchAdmin();
    fetchReport();
  }, []);

  // ฟังก์ชันจัดการการยืนยันรายงาน (approve)
  const handleApprove = async (reportId: number) => {
    try {
      const res = await UpdateReportById(reportId, {
        status: "approve",
        admin_id: admin?.ID,
        dapprove: dayjs().toISOString(),
      });

      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: "อัปเดตสถานะสำเร็จ",
        });
        fetchReport();
      } else {
        messageApi.open({
          type: "error",
          content: res.data.error || "เกิดข้อผิดพลาดในการอัปเดต",
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการอัปเดตสถานะ",
      });
    }
  };

  // ฟังก์ชันจัดการการปฏิเสธรายงาน (reject)
  const handleReject = async (reportId: number) => {
    try {
      const res = await UpdateReportById(reportId, {
        status: "not approve",
        admin_id: admin?.ID,
        dapprove: dayjs().toISOString(),
      });

      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: "ปฏิเสธรายงานสำเร็จ",
        });
        fetchReport(); // โหลดข้อมูลใหม่หลังจากอัปเดต
      } else {
        messageApi.open({
          type: "error",
          content: res.data.error || "เกิดข้อผิดพลาดในการปฏิเสธรายงาน",
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการปฏิเสธรายงาน",
      });
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#d3d3d3",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      {contextHolder}
      <div
        style={{
          width: "150px",
          height: "150px",
          backgroundColor: "#555",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          marginBottom: "20px",
          overflow: "hidden",
        }}
      >
        <img
          src={admin?.Profile || "https://via.placeholder.com/100"}
          alt="Admin Profile"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div>{admin && `${admin.first_name} ${admin.last_name} (ID: ${admin.ID})`}</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // แสดง 4 คอลัมน์ต่อแถว
          gap: "20px",
          marginTop: "60px",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1200px",
          margin: "60px",
        }}
      >
        {report.filter((rep) => !["approve", "not approve"].includes(rep.status)).length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gridColumn: "span 4", // ทำให้ div นี้ขยายเต็ม 4 คอลัมน์
              height: "100%", // ทำให้มีความสูงเต็มที่ของ grid
              textAlign: "center", // จัดข้อความให้กลาง
            }}
          >
            <p>ไม่มีรายงานที่รอการตรวจสอบ</p>
          </div>
        ) : (
          report
            .filter((rep) => !["approve", "not approve"].includes(rep.status))
            .map((rep) => (
              <Card
                key={rep.ID}
                style={{
                  textAlign: "center",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "#888",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    margin: "0 auto 10px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={rep.users.Profile || "https://via.placeholder.com/100"}
                    alt={rep.users.Profile}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                <h3>
                  {rep.users
                    ? `${rep.users.first_name} ${rep.users.last_name}`
                    : "ไม่พบข้อมูล"}
                </h3>
                <p>{rep.users?.email}</p>
                <p><strong>Photo:</strong></p>
                <img
                    src={rep.Photo || "https://via.placeholder.com/100"}
                    alt={rep.Photo}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                
                <p><strong>Note:</strong></p>
                <Input.TextArea
                  value={rep.note || "ไม่มีหมายเหตุ"}
                  rows={2}
                  style={{
                    marginBottom: "10px",
                  }}
                  disabled
                />

                {/* เพิ่มข้อมูล Contact และ dReport */}
                <p><strong>Contact:</strong> {rep.contact || "ไม่มีข้อมูล"}</p>
                <p><strong>DateReport:</strong> {dayjs(rep.dreport).format("DD/MM/YYYY")}</p>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Button danger onClick={() => handleReject(rep.ID)}>
                    ปฏิเสธ
                  </Button>
                  <Button type="primary" onClick={() => handleApprove(rep.ID)}>
                    ยอมรับ
                  </Button>
                </div>
              </Card>
            ))
        )}
      </div>
    </div>
  );
};

export default Adminui;

import React, { useState, useEffect } from "react";
import { Input, Button, Card, message, Image, Pagination } from "antd";
import { GetAdmin, GetReport, UpdateReportById, DeleteBooksById, GetBooks } from "../../services/https/index";
import { AdminInterface } from "../../interfaces/Admin";
import { ReportInterface } from "../../interfaces/Report";
import dayjs from "dayjs";

const Adminui = () => {
  const [admin, setAdmin] = useState<AdminInterface | null>(null);
  const [report, setReport] = useState<ReportInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();
  const pageSize = 3; // Reports per page

  // Fetch admin details
  const fetchAdmin = async () => {
    try {
      const myId = localStorage.getItem("id");
      const response = await GetAdmin();
      if (response.status === 200) {
        const adminData = response.data.find((admin) => String(admin.ID) === myId);
        setAdmin(adminData || null);
      }
    } catch {
      messageApi.open({ type: "error", content: "Error fetching admin details" });
    }
  };

  // Fetch reports
  const fetchReport = async () => {
    try {
      const res = await GetReport();
      if (res.status === 200) {
        // Filter out reports with status "not approve"
        const filteredReports = res.data.filter((rep) => rep.status !== "not approve");
        setReport(filteredReports);
      } else {
        messageApi.open({ type: "error", content: res.data.error });
      }
    } catch {
      messageApi.open({ type: "error", content: "Error fetching reports" });
    }
  };

  useEffect(() => {
    fetchAdmin();
    fetchReport();
  }, []);

  // Approve a report
  // Approve a report and delete books associated with the user
const handleApprove = async (reportId: number) => {
  try {
    // Call the function to update report status
    await updateReportStatus(reportId, "approve");

    // Find the report by ID
    const reportToApprove = report.find((rep) => rep.ID === reportId);
    if (!reportToApprove || !reportToApprove.users_id) {
      throw new Error("Report or user ID not found");
    }

    // Fetch books and filter by user ID
    const booksResponse = await GetBooks();
    if (booksResponse.status === 200) {
      const booksToDelete = booksResponse.data.filter(
        (books) => books.student_id === reportToApprove.users_id
      );

      // Delete each book that matches
      for (const book of booksToDelete) {
        await DeleteBooksById(book.ID);
      }
    } else {
      throw new Error("Failed to fetch books");
    }

    messageApi.open({ type: "success", content: "Books deleted successfully" });
  } catch (error) {
    messageApi.open({ type: "error", content: error.message });
  }
};


  // Reject a report
  const handleReject = async (reportId: number) => {
    await updateReportStatus(reportId, "not approve");
  };

  const updateReportStatus = async (reportId: number, status: string) => {
    try {
      const res = await UpdateReportById(reportId, {
        status,
        admin_id: admin?.ID,
        dapprove: dayjs().toISOString(),
      });

      if (res.status === 200) {
        messageApi.open({ type: "success", content: `Report ${status}d successfully` });
        fetchReport(); // Refresh report list
      } else {
        throw new Error(res.data.error || "Failed to update report");
      }
    } catch (error) {
      messageApi.open({ type: "error", content: error.message });
    }
  };

  // Filter out reports if any previous report for the same user was approved
  const filteredReports = report.filter((rep) => {
    const hasApprovedReport = report.some(
      (r) => r.users_id === rep.users_id && r.status === "approve"
    );
    return !hasApprovedReport && !["approve", "not approve"].includes(rep.status);
  });

  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div style={styles.container}>
      {contextHolder}
      {/* Admin Profile */}
      <div style={styles.profileContainer}>
        <img
          src={admin?.Profile || "https://via.placeholder.com/150"}
          alt="Admin Profile"
          style={styles.profileImage}
        />
      </div>
      <div style={styles.NameContainer}>{admin && `${admin.first_name} ${admin.last_name} (ID: ${admin.ID})`}</div>


      {/* Reports List */}
      <div style={styles.gridContainer}>
        {paginatedReports.length === 0 ? (
          <p style={styles.noReportsText}>ไม่มีรายงานที่รอการตรวจสอบ</p>
        ) : (
          paginatedReports.map((rep) => (
            <Card key={rep.ID} style={styles.card}>
              {/* User Image */}
              <div style={styles.userImageContainer}>
                <img
                  src={rep.users?.Profile || "https://via.placeholder.com/100"}
                  alt="User Profile"
                  style={styles.userImage}
                />
              </div>

              {/* User Details */}
              <h3>{rep.users ? `${rep.users.FirstName} ${rep.users.last_name}` : "ไม่พบข้อมูล"}</h3>
              <p>{rep.users?.email}</p>

              {/* Report Details */}
              <Image src={rep.Photo} alt="Report" style={styles.reportImage} />
              <Input.TextArea
                value={rep.note || "ไม่มีหมายเหตุ"}
                rows={2}
                disabled
                style={{ marginBottom: "10px" }}
              />
              <p>Contact: {rep.contact || "ไม่มีข้อมูล"}</p>
              <p>Date Report: {dayjs(rep.dreport).format("DD/MM/YYYY")}</p>
              <p>Dorm: {rep.dorm?.DormName || "ไม่มีข้อมูล"}</p>
              <p>Room: {rep.room?.RoomNumber || "ไม่มีข้อมูล"}</p>

              {/* Action Buttons */}
              <div style={styles.buttonContainer}>
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

      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredReports.length}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: "20px" }}
      />
    </div>
  );
};

export default Adminui;

// Styles
const styles = {
  container: {
    backgroundColor: "#d3d3d3",
    padding: "20px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  profileContainer: {
    width: "150px",
    height: "150px",
    overflow: "hidden",
    borderRadius: "50%",
    marginBottom: "20px",
  },
  NameContainer: {
    marginBottom: "50px",
  },
  profileImage: { width: "100%", height: "100%", objectFit: "cover" },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    width: "100%",
    maxWidth: "1200px",
  },
  card: {
    textAlign: "center",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    padding: "15px",
  },
  userImageContainer: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    overflow: "hidden",
    margin: "0 auto 10px",
  },
  userImage: { width: "100%", height: "100%", objectFit: "cover" },
  reportImage: { width: "100%", height: "150px", objectFit: "cover", margin: "10px 0" },
  buttonContainer: { display: "flex", justifyContent: "space-between" },
  noReportsText: { gridColumn: "span 3", textAlign: "center" },
};

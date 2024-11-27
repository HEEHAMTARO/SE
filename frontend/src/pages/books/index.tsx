import { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetDormitory, GetBooks } from "../../services/https/index"; // ตรวจสอบว่า endpoint นี้ถูกต้อง
import { DormitoryInterface } from "../../interfaces/Dormitory";
import { BooksInterface } from "../../interfaces/Books";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

function Books() {
  const navigate = useNavigate();
  const [dormitory, setDormitory] = useState<DormitoryInterface[]>([]);
  const [books, setBooks] = useState<BooksInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const myId = localStorage.getItem("id");

  // ตั้งค่าคอลัมน์ของตาราง
  const columns: ColumnsType<BooksInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "BooksTime",
      key: "BooksTime",
      render: (record) => <>{dayjs(record.BooksTime).format("DD/MM/YYYY")}</>,
    },
    {
      title: "StudentID",
      dataIndex: "student_id",
      key: "student_id",
    },
    
    {
      title: "RoomID",
      dataIndex: "RoomID",
      key: "RoomID",
    },
    {
      title: "การจัดการ",
      render: (record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/dormitory/edit/${record.ID}`)}
          >
            แก้ไขข้อมูล
          </Button>
          <Button
            type="dashed"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteDormitoryById(record.ID)}
          >
            ลบข้อมูล
          </Button>
        </Space>
      ),
    },
  ];

  // ฟังก์ชันลบ Dormitory
  const deleteDormitoryById = async (id: string) => {
    // จำเป็นต้องสร้าง endpoint สำหรับลบหอพัก
    let res = await DeleteUsersById(id); // ปรับให้ตรงกับ API ลบหอพัก
    if (res.status === 200) {
      messageApi.open({ type: "success", content: "ลบข้อมูลสำเร็จ" });
      await fetchDormitory();
    } else {
      messageApi.open({ type: "error", content: "เกิดข้อผิดพลาด" });
    }
  };

  // ดึงข้อมูล Dormitory
  const fetchBooks = async () => {
    let res = await GetBooks();
    if (res.status === 200) {
      setBooks(res.data);
    } else {
      setBooks([]);
      messageApi.open({ type: "error", content: "ไม่สามารถดึงข้อมูลได้" });
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={12}>
          <h2>จัดการข้อมูลBooks</h2>
        </Col>
        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
          <Link to="/books/create">
            <Button type="primary" icon={<PlusOutlined />}>
              เพิ่มหอพัก
            </Button>
          </Link>
        </Col>
      </Row>
      <Divider />
      <div style={{ marginTop: 20 }}>
        <Table
          rowKey="ID"
          columns={columns}
          dataSource={books}
          pagination={{ pageSize: 5 }} // เพิ่มการแบ่งหน้า
        />
      </div>
    </>
  );
}

export default Books;

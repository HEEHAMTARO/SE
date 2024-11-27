import { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetDormitory } from "../../services/https/index"; // ตรวจสอบว่า endpoint นี้ถูกต้อง
import { DormitoryInterface } from "../../interfaces/Dormitory";
import { Link, useNavigate } from "react-router-dom";

function Dormitory() {
  const navigate = useNavigate();
  const [dormitory, setDormitory] = useState<DormitoryInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const myId = localStorage.getItem("id");

  // ตั้งค่าคอลัมน์ของตาราง
  const columns: ColumnsType<DormitoryInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "ชื่อหอพัก",
      dataIndex: "DormName",
      key: "DormName",
    },
    {
      title: "รายละเอียด",
      dataIndex: "DormDescription",
      key: "DormDescription",
    },
    {
      title: "สิ่งอำนวยความสะดวก",
      dataIndex: "DormEquipment",
      key: "DormEquipment",
    },
    {
      title: "ราคา",
      dataIndex: "Price",
      key: "Price",
      render: (price) => `${price} บาท`, // เพิ่มการแสดงผลราคา
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
  const fetchDormitory = async () => {
    let res = await GetDormitory();
    if (res.status === 200) {
      setDormitory(res.data);
    } else {
      setDormitory([]);
      messageApi.open({ type: "error", content: "ไม่สามารถดึงข้อมูลได้" });
    }
  };

  useEffect(() => {
    fetchDormitory();
  }, []);

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={12}>
          <h2>จัดการข้อมูลหอพัก</h2>
        </Col>
        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
          <Link to="/dormitory/create">
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
          dataSource={dormitory}
          pagination={{ pageSize: 5 }} // เพิ่มการแบ่งหน้า
        />
      </div>
    </>
  );
}

export default Dormitory;

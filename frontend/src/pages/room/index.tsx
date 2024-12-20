import { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetRoom } from "../../services/https/index"; // ตรวจสอบว่า endpoint นี้ถูกต้อง
import { RoomInterface } from "../../interfaces/Room";
import { Link, useNavigate } from "react-router-dom";

function Room() {
  const navigate = useNavigate();
  const [room, setRoom] = useState<RoomInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  // ตั้งค่าคอลัมน์ของตาราง
  const columns: ColumnsType<RoomInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "RoomNumber",
      dataIndex: "RoomNumber",
      key: "RoomNumber",
    },
    {
      title: "Score",
      dataIndex: "Score",
      key: "Score",
    },
    {
      title: "DormitoryID",
      dataIndex: "DormitoryID",
      key: "DormitoryID",
    },
    {
      title: "การจัดการ",
      render: (record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/room/edit/${record.ID}`)}
          >
            แก้ไขข้อมูล
          </Button>
          <Button
            type="dashed"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteRoomById(record.ID)}
          >
            ลบข้อมูล
          </Button>
        </Space>
      ),
    },
  ];

  // ฟังก์ชันลบ Room
  const deleteRoomById = async (id: string) => {
    // จำเป็นต้องสร้าง endpoint สำหรับลบ Room
    let res = await DeleteRoomById(id); // ปรับให้ตรงกับ API ลบ Room
    if (res.status === 200) {
      messageApi.open({ type: "success", content: "ลบข้อมูลสำเร็จ" });
      await fetchRoom();
    } else {
      messageApi.open({ type: "error", content: "เกิดข้อผิดพลาด" });
    }
  };

  // ดึงข้อมูล Room พร้อม Dormitory
  const fetchRoom = async () => {
    let res = await GetRoom();
    if (res.status === 200) {
    console.log(res.data);
      setRoom(res.data); // ตรวจสอบข้อมูลที่ได้รับจาก API
    } else {
      setRoom([]);
      messageApi.open({ type: "error", content: "ไม่สามารถดึงข้อมูลได้" });
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={12}>
          <h2>จัดการข้อมูลห้องพัก</h2>
        </Col>
        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
          <Link to="/room/create">
            <Button type="primary" icon={<PlusOutlined />}>
              เพิ่มห้องพัก
            </Button>
          </Link>
        </Col>
      </Row>
      <Divider />
      <div style={{ marginTop: 20 }}>
        <Table
          rowKey="ID"
          columns={columns}
          dataSource={room}
          pagination={{ pageSize: 5 }} // เพิ่มการแบ่งหน้า
        />
      </div>
    </>
  );
}

export default Room;

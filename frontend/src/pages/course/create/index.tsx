import {
    Space,
    Button,
    Col,
    Row,
    Divider,
    Form,
    Input,
    Card,
    message,
    InputNumber,
  } from "antd";
  import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { RoomInterface } from "../../../interfaces/Room";
  import { CourseInterface } from "../../../interfaces/Course";
  import { CreateRoom, CreateCourse } from "../../../services/https";
  
  function CourseCreate() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
  
    const onFinish = async (values: CourseInterface) => {
      let res = await CreateCourse(values);
  
      if (res.status === 201) {
        messageApi.open({
          type: "error",
          content: res.data.error,
        });
      } else {
        messageApi.open({
          type: "success",
          content: res.data.message,
        });
  
        setTimeout(() => {
          navigate("/course");
        }, 2000);
      }
    };
  
    return (
      <div>
        {contextHolder}
  
        <Card>
          <h2>เพิ่มข้อมูล Course</h2>
          <Divider />
          <Form name="basic" layout="vertical" onFinish={onFinish} autoComplete="off">
            <Row gutter={[16, 0]}>
              <Col span={12}>
                <Form.Item
                  label="CourseName"
                  name="CourseName"
                  rules={[{ required: true, message: "กรุณากรอก CourseName!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Credit"
                  name="Credit"
                  rules={[{ required: true, message: "กรุณากรอก Credit!" }]}
                >
                  <InputNumber min={0} max={99} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
  
            {/* <Form.List name="Dormitory">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space key={key} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, "DormName"]}
                        fieldKey={[fieldKey, "DormName"]}
                        rules={[{ required: true, message: "กรุณากรอกชื่อหอพัก!" }]}
                      >
                        <Input placeholder="ชื่อหอพัก" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "DormDescription"]}
                        fieldKey={[fieldKey, "DormDescription"]}
                        rules={[{ required: true, message: "กรุณากรอกรายละเอียด!" }]}
                      >
                        <Input placeholder="รายละเอียดหอพัก" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "Price"]}
                        fieldKey={[fieldKey, "Price"]}
                        rules={[{ required: true, message: "กรุณากรอกราคา!" }]}
                      >
                        <InputNumber placeholder="ราคา" min={0} style={{ width: "100%" }} />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                      เพิ่มหอพัก
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List> */}
  
            <Row justify="end">
              <Col style={{ marginTop: "40px" }}>
                <Form.Item>
                  <Space>
                    <Button htmlType="button" style={{ marginRight: "10px" }}>
                      ยกเลิก
                    </Button>
                    <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                      ยืนยัน
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    );
  }
  
  export default CourseCreate;
  
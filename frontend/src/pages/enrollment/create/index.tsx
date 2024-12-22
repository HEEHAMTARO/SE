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
  import { EnrollmentInterface } from "../../../interfaces/Enrollment";
  import { CreateRoom, CreateCourse, CreateEnrollment } from "../../../services/https";
  
  function EnrollmentCreate() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
  
    const onFinish = async (values: EnrollmentInterface) => {
      let res = await CreateEnrollment(values);
  
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
          navigate("/enrollment");
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
            <Row gutter={[16, 0]}>\
              <Col span={12}>
                <Form.Item
                  label="StudentID"
                  name="StudentID"
                  rules={[{ required: true, message: "กรุณากรอก StudentID!" }]}
                >
                  <InputNumber min={0} max={99} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="CourseID"
                  name="CourseID"
                  rules={[{ required: true, message: "กรุณากรอก CourseID!" }]}
                >
                  <InputNumber min={0} max={99} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="semester_id"
                  name="semester_id"
                  rules={[{ required: true, message: "กรุณากรอก semester_id!" }]}
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
  
  export default EnrollmentCreate;
  
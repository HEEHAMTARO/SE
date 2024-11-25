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
  
    DatePicker,
  
    InputNumber,
  
    Select,
  
  } from "antd";
  
  import { useState, useEffect } from "react";
  
  import { PlusOutlined } from "@ant-design/icons";
  
  import { UsersInterface } from "../../../interfaces/IUser";
  
  import { GenderInterface } from "../../../interfaces/Gender";

  import { AdminInterface } from "../../../interfaces/Admin";
  
  import { GetGender, CreateUser, CreateAdmin } from "../../../services/https";
  
  import { useNavigate, Link } from "react-router-dom";
  
  
  function AdminCreate() {
  
    const navigate = useNavigate();
  
  
    const [messageApi, contextHolder] = message.useMessage();
  
  
    const onFinish = async (values: AdminInterface) => {
  
  
      let res = await CreateAdmin(values);

  
      if (res.status == 201) {
  
        messageApi.open({
  
            type: "error",
  
            content: res.data.error,
  
        });
  
  
      } else {
  
        messageApi.open({
  
          type: "success",
  
          content: res.data.message,
  
        });

        setTimeout(function () {
  
            navigate("/agree");
    
          }, 2000);
  
      }
  
    };
  
  
    useEffect(() => {
  
      return () => {};
  
    }, []);
  
  
    return (
  
      <div>
  
        {contextHolder}
  
        <Card>
  
          <h2>เพิ่มข้อมูล ผู้ดูแลระบบ</h2>
  
          <Divider />
  
  
          <Form
  
            name="basic"
  
            layout="vertical"
  
            onFinish={onFinish}
  
            autoComplete="off"
  
          >
  
            <Row gutter={[16, 0]}>
  
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
  
                <Form.Item
  
                  label="ชื่อจริง"
  
                  name="first_name"
  
                  rules={[
  
                    {
  
                      required: true,
  
                      message: "กรุณากรอกชื่อ !",
  
                    },
  
                  ]}
  
                >
  
                  <Input />
  
                </Form.Item>
  
              </Col>
  
  
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
  
                <Form.Item
  
                  label="นามกสุล"
  
                  name="last_name"
  
                  rules={[
  
                    {
  
                      required: true,
  
                      message: "กรุณากรอกนามสกุล !",
  
                    },
  
                  ]}
  
                >
  
                  <Input />
  
                </Form.Item>
  
              </Col>

  
            </Row>
  
  
            <Row justify="end">
  
              <Col style={{ marginTop: "40px" }}>
  
                <Form.Item>
  
                  <Space>
  
                    <Link to="/agree">
  
                      <Button htmlType="button" style={{ marginRight: "10px" }}>
  
                        ยกเลิก
  
                      </Button>
  
                    </Link>
  
  
                    <Button
  
                      type="primary"
  
                      htmlType="submit"
  
                      icon={<PlusOutlined />}
  
                    >
  
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
  
  
  export default AdminCreate;
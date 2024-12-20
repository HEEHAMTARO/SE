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

  import { DormitoryInterface } from "../../../interfaces/Dormitory";
  
  import { GetGender, CreateUser, CreateAdmin, CreateDormitory } from "../../../services/https";
  
  import { useNavigate, Link } from "react-router-dom";
  
  
  function DormitoryCreate() {
  
    const navigate = useNavigate();
  
  
    const [messageApi, contextHolder] = message.useMessage();
  
  
    const onFinish = async (values: DormitoryInterface) => {
  
  
      let res = await CreateDormitory(values);

  
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
  
            navigate("/dormitory");
    
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
  
          <h2>เพิ่มข้อมูล Dormitory</h2>
  
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
  
                  label="DormName"
  
                  name="DormName"
  
                  rules={[
  
                    {
  
                      required: true,
  
                      message: "กรุณากรอก DormName !",
  
                    },
  
                  ]}
  
                >
  
                  <Input />
  
                </Form.Item>
  
              </Col>
  
  
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
  
                <Form.Item
  
                  label="DormDescription"
  
                  name="DormDescription"
  
                  rules={[
  
                    {
  
                      required: true,
  
                      message: "กรุณากรอก DormDescription !",
  
                    },
  
                  ]}
  
                >
  
                  <Input />
  
                </Form.Item>
  
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
  
                <Form.Item
  
                  label="DormType"
  
                  name="DormType"
  
                  rules={[
  
                    {
  
                      required: true,
  
                      message: "กรุณากรอก DormType  !",
  
                    },
  
                  ]}
  
                >
  
                  <Input />
  
                </Form.Item>
  
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
  
                <Form.Item
  
                  label="Price"
  
                  name="Price"
  
                  rules={[
  
                    {
  
                      required: true,
  
                      message: "กรุณากรอก Price !",
  
                    },
  
                  ]}
  
                >
  
                  <InputNumber
  
                    min={0}
  
                    max={99999}
  
                    defaultValue={0}
  
                    style={{ width: "100%" }}
  
                  />
  
                </Form.Item>
  
              </Col>

  
            </Row>
  
  
            <Row justify="end">
  
              <Col style={{ marginTop: "40px" }}>
  
                <Form.Item>
  
                  <Space>
  
                    <Link to="/dormitory">
  
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
  
  
  export default DormitoryCreate;
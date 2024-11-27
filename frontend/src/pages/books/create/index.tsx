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

  import { BooksInterface } from "../../../interfaces/Books";
  
  import { GetGender, CreateUser, CreateAdmin, CreateDormitory, CreateBooks } from "../../../services/https";
  
  import { useNavigate, Link } from "react-router-dom";
  
  
  function BooksCreate() {
  
    const navigate = useNavigate();
  
  
    const [messageApi, contextHolder] = message.useMessage();
  
  
    const onFinish = async (values: BooksInterface) => {
  
  
      let res = await CreateBooks(values);

  
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
  
            navigate("/books");
    
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

    label="BooksTime"

    name="BooksTime"

    rules={[

      {

        required: true,

        message: "กรุณาเลือก BooksTime !",

      },

    ]}

  >

    <DatePicker style={{ width: "100%" }} />

  </Form.Item>

</Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
  
                <Form.Item
  
                  label="RoomID"
  
                  name="RoomID"
  
                  rules={[
  
                    {
  
                      required: true,
  
                      message: "กรุณากรอก RoomID !",
  
                    },
  
                  ]}
  
                >
  
                  <InputNumber
  
                    min={0}
  
                    max={99}
  
                    defaultValue={0}
  
                    style={{ width: "100%" }}
  
                  />
  
                </Form.Item>
  
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
  
                <Form.Item
  
                  label="student_id"
  
                  name="student_id"
  
                  rules={[
  
                    {
  
                      required: true,
  
                      message: "กรุณากรอก student_id !",
  
                    },
  
                  ]}
  
                >
  
                  <InputNumber
  
                    min={0}
  
                    max={99}
  
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
  
                    <Link to="/books">
  
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
  
  
  export default BooksCreate;
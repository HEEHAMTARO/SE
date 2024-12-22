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
  Upload,
} from "antd";
  
  import { useState, useEffect } from "react";
  
  import { PlusOutlined } from "@ant-design/icons";
  
  import { UsersInterface } from "../../../interfaces/IUser";
  
  import { GenderInterface } from "../../../interfaces/Gender";
  
  import { GetGender, CreateUser } from "../../../services/https";
  
  import { useNavigate, Link } from "react-router-dom";
  
  import ImgCrop from "antd-img-crop";
  
  function CustomerCreate() {
  
    const navigate = useNavigate();
  
  
    const [messageApi, contextHolder] = message.useMessage();
  
    const [gender, setGender] = useState<GenderInterface[]>([]);

    const [fileList, setFileList] = useState([]);

    const onChange = ({ fileList: newFileList }) => setFileList(newFileList);
  
    const onPreview = async (file) => {
      let src = file.url;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const imgWindow = window.open(src);
      imgWindow.document.write(`<img src="${src}" />`);
    };
  
  
    const onGetGender = async () => {
  
      let res = await GetGender();
  
      if (res.status == 200) {
  
        setGender(res.data);
  
      } else {
  
        messageApi.open({
  
          type: "error",
  
          content: "ไม่พบข้อมูลเพศ",
  
        });
  
        setTimeout(() => {
  
          navigate("/customer");
  
        }, 2000);
  
      }
  
    };
  
  
    const onFinish = async (values: UsersInterface) => {
  
      if (fileList.length > 0) {
        values.Profile = fileList[0].thumbUrl;
      }
      let res = await CreateUser(values);
  
      if (res.status === 201) {
        messageApi.open({
          type: "success",
          content: res.data.message,
        });
        setTimeout(function () {
          navigate("/customer");
        }, 2000);
      } else {
        messageApi.open({
          type: "error",
          content: res.data.error,
        });
      }
  
    };
  
  
    useEffect(() => {
  
      onGetGender();
  
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
  
  
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
  
                <Form.Item
  
                  label="อีเมล"
  
                  name="email"
  
                  rules={[
  
                    {
  
                      type: "email",
  
                      message: "รูปแบบอีเมลไม่ถูกต้อง !",
  
                    },
  
                    {
  
                      required: true,
  
                      message: "กรุณากรอกอีเมล !",
  
                    },
  
                  ]}
  
                >
  
                  <Input />
  
                </Form.Item>
  
              </Col>
  
  
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
  
                <Form.Item
  
                  label="รหัสผ่าน"
  
                  name="password"
  
                  rules={[
  
                    {
  
                      required: true,
  
                      message: "กรุณากรอกรหัสผ่าน !",
  
                    },
  
                  ]}
  
                >
  
                  <Input.Password />
  
                </Form.Item>
  
              </Col>
  
  
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
  
                <Form.Item
  
                  label="วัน/เดือน/ปี เกิด"
  
                  name="birthday"
  
                  rules={[
  
                    {
  
                      required: true,
  
                      message: "กรุณาเลือกวัน/เดือน/ปี เกิด !",
  
                    },
  
                  ]}
  
                >
  
                  <DatePicker style={{ width: "100%" }} />
  
                </Form.Item>
  
              </Col>
  
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
  
                <Form.Item
  
                  label="อายุ"
  
                  name="age"
  
                  rules={[
  
                    {
  
                      required: true,
  
                      message: "กรุณากรอกอายุ !",
  
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
  
                  label="semester_id"
  
                  name="semester_id"
  
                  rules={[
  
                    {
  
                      required: true,
  
                      message: "กรุณากรอกsemester_id !",
  
                    },
  
                  ]}
  
                >
  
                  <InputNumber
  
                    min={1}
  
                    max={2}
  
                    defaultValue={0}
  
                    style={{ width: "100%" }}
  
                  />
  
                </Form.Item>
  
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
  
                <Form.Item
  
                  label="YearOfStudy"
  
                  name="YearOfStudy"
  
                  rules={[
  
                    {
  
                      required: true,
  
                      message: "กรุณากรอกYearOfStudy !",
  
                    },
  
                  ]}
  
                >
  
                  <InputNumber
  
                    min={1}
  
                    max={9999}
  
                    defaultValue={0}
  
                    style={{ width: "100%" }}
  
                  />
  
                </Form.Item>
  
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
  
              <Form.Item
  label="Wages"
  name="wages"
  rules={[
    {
      required: true,
      message: "กรุณากรอก Wages!",
    },
    {
      type: 'number',
      transform: (value) => parseFloat(value), // Ensures that the value is treated as a float
      message: "Please enter a valid number",
    },
  ]}
>
  <InputNumber
    min={0}
    step={0.01} // Allows decimal places with two decimal precision
    style={{ width: "100%" }}
    defaultValue={0}
    precision={2} // Optional: defines the number of decimal places
  />
</Form.Item>
  
              </Col>
  
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
  
                <Form.Item
  
                  label="เพศ"
  
                  name="gender_id"
  
                  rules={[
  
                    {
  
                      required: true,
  
                      message: "กรุณาเลือกเพศ !",
  
                    },
  
                  ]}
  
                >
  
                   <Select defaultValue="" style={{ width: "100%" }}>
  
                    {gender?.map((item) => (
  
                      <Select.Option
  
                        value={item?.ID}
  
                      >
  
                        {item?.gender}
  
                      </Select.Option>
  
                    ))}
  
                  </Select>
  
                </Form.Item>
  
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item label="รูปประจำตัว" name="Profile">
                <ImgCrop rotationSlider>
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    beforeUpload={() => false} // Prevent immediate upload
                    maxCount={1}
                  >
                    {fileList.length < 1 && (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>อัพโหลด</div>
                      </div>
                    )}
                  </Upload>
                </ImgCrop>
              </Form.Item>
            </Col>
  
            </Row>
  
  
            <Row justify="end">
  
              <Col style={{ marginTop: "40px" }}>
  
                <Form.Item>
  
                  <Space>
  
                    <Link to="/customer">
  
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
  
  
  export default CustomerCreate;
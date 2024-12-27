import React, { useEffect, useState } from 'react';
import { CreatePayment, GetPayment, UpdatePaymentById } from '../../../services/https/index';
import axios from 'axios';
import { Button, Card, message, Row, Col } from 'antd';
import { PaymentInterface } from "../../../interfaces/Payment";
import { Link, useNavigate } from "react-router-dom";

function QR() {
  const navigate = useNavigate();
  const [qrCodeUrls, setQrCodeUrls] = useState<{ [key: number]: string }>({});
  const [payment, setPayment] = useState<PaymentInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const myId = localStorage.getItem("id");

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await GetPayment();
        if (response.status === 200) {
          const filteredPayment = response.data.filter((payment: PaymentInterface) => String(payment.users_id) === myId);
          setPayment(filteredPayment);
        } else {
          throw new Error("Failed to fetch payments");
        }
      } catch (error: any) {
        messageApi.open({
          type: "error",
          content: error.message || "Failed to fetch payments",
        });
      }
    };

    fetchPayment();
  }, []);

  useEffect(() => {
    const generateQR = async (wages: number, paymentId: number) => {
      try {
        const response = await axios.post('http://localhost:3000/generateQR', { amount: wages });
        if (response.data && response.data.Result) {
          setQrCodeUrls(prevState => ({
            ...prevState,
            [paymentId]: response.data.Result,
          }));
        }
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    payment.forEach(pay => {
      if (pay.wages && !qrCodeUrls[pay.ID] && pay.statusdor !== "ชำระเสร็จสิ้น") {
        generateQR(pay.wages, pay.ID);
      }
    });
  }, [payment, qrCodeUrls]);

  const handleCompletePayment = async (paymentId: number) => {
    try {
      const updatedPayment = { statusdor: "ชำระเสร็จสิ้น" };
      const response = await UpdatePaymentById(paymentId, updatedPayment);
      if (response.status === 200) {
        messageApi.open({
          type: 'success',
          content: `การชำระเงินเสร็จสิ้น สำหรับการชำระเงิน ID: ${paymentId}`,
        });

        setPayment(prevPayments =>
          prevPayments.map(payment =>
            payment.ID === paymentId
              ? { ...payment, statusdor: "ชำระเสร็จสิ้น" }
              : payment
          )
        );
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: `เกิดข้อผิดพลาดในการอัปเดตสถานะการชำระเงิน`,
      });
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#f0f2f5",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Card
        style={{
          width: '90%',
          maxWidth: "500px",
          borderRadius: "20px",
          padding: "30px",
          backgroundColor: "#ffffff",
          textAlign: 'center',
        }}
      >
        {payment.length > 0 ? (
          payment.some(pay => pay.statusdor !== "ชำระเสร็จสิ้น") ? (
            payment.map((pay) =>
              pay.statusdor !== "ชำระเสร็จสิ้น" ? (
                <div key={pay.ID} style={{ marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    เทอม {pay.termstudent} / {pay.yearstudent}
                  </h2>
                  {qrCodeUrls[pay.ID] ? (
                    <>
                      <img
                        src={qrCodeUrls[pay.ID]}
                        alt="QR Code"
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: '500px',
                          objectFit: 'contain',
                          marginBottom: '20px',
                        }}
                      />
                      <p>กำลังสร้าง QR Code...{pay.ID}</p>
                      <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>PromptPay QR Code</h2>
                      <Row gutter={16}>
                <Col span={12}>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => handleCompletePayment(pay.ID)}
                    disabled={pay.statusdor === "ชำระเสร็จสิ้น"}
                    block
                  >
                    {pay.statusdor === "ชำระเสร็จสิ้น" ? "ชำระเสร็จสิ้นแล้ว" : "เสร็จสิ้น"}
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    type="primary"
                    size="large"
                    block
                    onClick={() => navigate(`/PayUI/DorRe/${pay.ID}`)}
                    disabled={pay.statusdor === "ชำระเสร็จสิ้น"}
                  >
                    Receiptหอพัก
                  </Button>
                </Col>
              </Row>
                    </>
                  ) : (
                    <p>กำลังสร้าง QR Code...</p>
                  )}
                </div>
              ) : null
            )
          ) : (
            <p>ไม่มีการค้างชำระ</p>
          )
        ) : (
          <p>ไม่พบข้อมูลการชำระเงิน</p>
        )}
      </Card>
      {contextHolder}
    </div>
  );
  
}

export default QR;

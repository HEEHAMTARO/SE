import React, { useEffect, useState } from 'react';
import { CreatePayment, GetPayment } from '../../../services/https/index';  // Adjust according to your actual services
import axios from 'axios';
import { Button, Card, message } from 'antd';
import { PaymentInterface } from "../../../interfaces/Payment";  // Adjust according to your actual interfaces

function QRcode() {
  const [qrCodeUrls, setQrCodeUrls] = useState<{ [key: number]: string }>({});  // Store QR codes based on Payment ID
  const [payment, setPayment] = useState<PaymentInterface[]>([]);  // State for payment data
  const [messageApi, contextHolder] = message.useMessage();

  const myId = localStorage.getItem("id");

  // Fetch payment data based on the user ID
  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await GetPayment();  // Fetch payment data
        if (response.status === 200) {
          // Filter reports by user ID
          const filteredPayment = response.data.filter((payment: PaymentInterface) => String(payment.users_id) === myId);
          setPayment(filteredPayment);  // Update state with filtered payments
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
  }, []);  // Dependency on component mount

  // Function to generate QR code based on wages
  useEffect(() => {
    const generateQR = async (wages: number, paymentId: number) => {
      try {
        const response = await axios.post('http://localhost:3000/generateQR', { amount: wages });
        console.log('QR Response:', response.data);  // Log response for debugging
        if (response.data && response.data.Result) {
          setQrCodeUrls(prevState => ({
            ...prevState,
            [paymentId]: response.data.Result,  // Store QR code URL by Payment ID
          }));
        }
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    // Generate QR codes for all payments based on wages
    payment.forEach(payment => {
      if (payment.wages) {
        generateQR(payment.wages, payment.ID);  // Generate QR for each payment based on wages
      }
    });
  }, [payment]);  // Dependency on `payment` state to regenerate QR codes when payment data changes

  // Handle completion of payment
  const handleNext = async (paymentId: number) => {
    const selectedPayment = payment.find(p => p.ID === paymentId);
    if (!selectedPayment) return;

    const paymentData = {
      users_id: selectedPayment.users_id,
      wages: selectedPayment.wages,
    };

    try {
      await CreatePayment(paymentData);  // Create payment record
      console.log("Payment created successfully");
      messageApi.open({
        type: "success",
        content: "Payment completed successfully!",
      });
    } catch (error) {
      console.error('Error creating payment:', error);
      messageApi.open({
        type: "error",
        content: "Failed to create payment.",
      });
    }
  };

  return (
    <div style={{
      padding: "40px",
      backgroundColor: "#f0f2f5",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <Card style={{
        width: '90%',
        maxWidth: "500px",
        borderRadius: "20px",
        padding: "30px",
        backgroundColor: "#ffffff",
        textAlign: 'center'
      }}>
        {payment.length > 0 ? (
          payment.map((pay) => (
            <div key={pay.ID} style={{ marginBottom: '20px' }}>
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
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>PromptPay QR Code</h2>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => handleNext(pay.ID)}
                  >
                    เสร็จสิ้น
                  </Button>
                </>
              ) : (
                <p>กำลังสร้าง QR Code...</p>
              )}
            </div>
          ))
        ) : (
          <p>ไม่พบข้อมูลการชำระเงิน</p>
        )}
      </Card>
      {contextHolder}  {/* Add Antd message holder */}
    </div>
  );
}

export default QRcode;

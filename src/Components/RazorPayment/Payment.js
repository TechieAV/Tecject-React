// RazorpayPayment.js
import React from "react";
import axiosInstance from "../../Services/axiosInstance"; // adjust path

const RazorpayPayment = ({ amount, onSuccess }) => {
  // ✅ Load Razorpay SDK
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ✅ Create Order API
  const createOrder = async (amountInRupees) => {
    try {
      const res = await axiosInstance.post("/api/Payment/create-order", {
        amount: amountInRupees,
      });
      return res.data; // axios automatically parses JSON
    } catch (err) {
      console.error("❌ Failed to create Razorpay order:", err.response || err);
      throw new Error("Failed to create Razorpay order");
    }
  };

  // ✅ Payment Handler
  const handlePayment = async () => {
    try {
      const loaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      if (!loaded) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const orderData = await createOrder(amount);

      const options = {
        key: "rzp_test_PqGlxVqblKhpFs", // 🔑 Replace with your Razorpay key
        amount: orderData.amount,
        currency: "INR",
        name: "Tecject Project Center",
        description: "Project Payment",
        order_id: orderData.id,
        handler: function (response) {
          alert(`✅ Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          if (onSuccess) onSuccess(response); // 👉 callback to parent
        },
        prefill: {
          name: "John Doe",
          email: "student@example.com",
          contact: "9345202170",
        },
        theme: { color: "#007bff" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("❌ Payment failed:", error);
      alert("Payment could not be processed. Please try again.");
    }
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        padding: "10px 20px",
        background: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Pay ₹{amount}
    </button>
  );
};

export default RazorpayPayment;

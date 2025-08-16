// RazorpayPayment.js
import React from 'react';

const RazorpayPayment = () => {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createOrder = async (amount) => {
    const res = await fetch("http://localhost:5202/api/Payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    if (!res.ok) throw new Error("Failed to create Razorpay order");
    return await res.json();
  };

  const handlePayment = async () => {
    const loaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!loaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const orderData = await createOrder(500); // amount in INR (₹500)

    const options = {
      key: "rzp_test_PqGlxVqblKhpFs ", // replace with your actual Key ID from Razorpay Dashboard
      amount: orderData.amount,
      currency: "INR",
      name: "Tecject Project Center",
      description: "Project Payment",
      order_id: orderData.id,
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        // optionally send `response` to backend for verification
      },
      prefill: {
        name: "John Doe",
        email: "student@example.com",
        contact: "9876543210",
      },
      theme: {
        color: "#007bff",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <h2>Make Payment</h2>
      <button onClick={handlePayment} style={{ padding: "10px 20px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px" }}>
        Pay ₹500
      </button>
    </div>
  );
};

export default RazorpayPayment;

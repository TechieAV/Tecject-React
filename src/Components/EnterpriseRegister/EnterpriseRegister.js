import React, { useState } from "react";
import "../EnterpriseRegister/EnterpriseRegister.css";
import { registerEnterprise } from "../../Services/EnterpriseService";

const EnterpriseRegisterForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    companyName: "",
    companyType: "",
    registrationNumber: "",
    contactPersonName: "",
    contactEmail: "",
    contactPhone: "",
    designation: "",
    companyAddress: "",
    billingAddress: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    gstin: "",
    pan: "",
    Industry: "",
    WebsiteUrl: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userName || !formData.password || !formData.contactEmail) {
      setStatus("❌ Username, Password, and Email are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.contactEmail)) {
      setStatus("❌ Invalid email format.");
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (formData.contactPhone && !phoneRegex.test(formData.contactPhone)) {
      setStatus("❌ Invalid phone number.");
      return;
    }

    try {
      await registerEnterprise(formData);
      setStatus("✅ Enterprise account registered successfully!");
      setFormData({
        userName: "",
        password: "",
        companyName: "",
        companyType: "",
        registrationNumber: "",
        contactPersonName: "",
        contactEmail: "",
        contactPhone: "",
        designation: "",
        companyAddress: "",
        billingAddress: "",
        country: "",
        state: "",
        city: "",
        zipCode: "",
        gstin: "",
        pan: "",
         Industry: "",
         WebsiteUrl: "",
      });
    } catch (err) {
      setStatus(`❌ ${err?.message || "Registration failed"}`);
    }

    setTimeout(() => setStatus(""), 5000);
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2>Enterprise Registration</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          {Object.entries(formData).map(([key, value]) => (
            <div className="form-group" key={key}>
              <label htmlFor={key}>
                {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
              </label>
              <input
                name={key}
                id={key}
                type={key === "password" ? "password" : "text"}
                value={value}
                placeholder={`Enter ${key}`}
                onChange={handleChange}
              />
            </div>
          ))}

          <button type="submit" className="register-btn">Register Enterprise</button>
          {status && <div className="status-msg">{status}</div>}
        </form>
      </div>
    </div>
  );
};

export default EnterpriseRegisterForm;

import React, { useState } from "react";
import "./register.css";
import { registerUser } from "../../Services/authService";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });

  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");
  const [activeField, setActiveField] = useState("");
  const [validationStatus, setValidationStatus] = useState({
    password: null,
    phone: null,
    email: null,
  });

  const validatePasswordRules = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      symbol: /[@#$%^&+=!]/.test(password),
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    switch (name) {
      case "password":
        setValidationStatus((prev) => ({
          ...prev,
          password: validatePasswordRules(value),
        }));
        break;
      case "phoneNumber":
        setValidationStatus((prev) => ({
          ...prev,
          phone: /^[6-9]\d{9}$/.test(value) ? "valid" : "invalid",
        }));
        break;
      case "email":
        setValidationStatus((prev) => ({
          ...prev,
          email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "valid" : "invalid",
        }));
        break;
      default:
        break;
    }
  };

  const handleFocus = (field) => setActiveField(field);
  const handleBlur = () => setActiveField("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setStatus("Passwords do not match.");
      return;
    }

    const { confirmPassword, ...dataToSend } = formData;
    console.log("Sending to backend:", dataToSend);

    try {
      await registerUser(dataToSend);
      setStatus("✅ Account created successfully!");
      setStatusType("success");
      setFormData({
        name: "",
        username: "",
        email: "",
        phoneNumber: "",
        address: "",
        password: "",
        confirmPassword: "",
        role: "User",
      });
      setValidationStatus({ password: null, phone: null, email: null });

      // Clear status after 3 seconds
      setTimeout(() => {
        setStatus("");
      }, 3000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errorData = err.response.data.errors;
        const messages = Object.values(errorData).flat();
        setStatus(messages.join(" | "));
        setStatusType("error");
      } else if (err.response?.data?.message)
        {
          setStatus(err.response.data.message);
          setStatusType("error");
        }else {
        setStatus("Something went wrong. Please try again.");

      }
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="register-left">
          <h2>Welcome to Tec-Ject</h2>
          <p>
            Build your profile, explore features, and join the tech community.
          </p>
          <button className="about-btn">Explore Features</button>
        </div>
        <div className="register-right">
          <h2>Create Your Account</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => handleFocus("")}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              onFocus={() => handleFocus("")}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => handleFocus("password")}
              onBlur={handleBlur}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onFocus={() => handleFocus("")}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
              required
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              onFocus={() => handleFocus("phone")}
              onBlur={handleBlur}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              onFocus={() => handleFocus("")}
            />
            <button type="submit" className="register-btn">
              Sign Up
            </button>
          </form>

          {/* Password Validation */}
          {activeField === "password" && validationStatus.password && (
            <div className="password-rules">
              <div className={`snackbar ${validationStatus.password.length ? "valid" : "invalid"}`}>
                {validationStatus.password.length ? "✅" : "❌"} At least 8 characters
              </div>
              <div className={`snackbar ${validationStatus.password.uppercase ? "valid" : "invalid"}`}>
                {validationStatus.password.uppercase ? "✅" : "❌"} At least one uppercase letter
              </div>
              <div className={`snackbar ${validationStatus.password.lowercase ? "valid" : "invalid"}`}>
                {validationStatus.password.lowercase ? "✅" : "❌"} At least one lowercase letter
              </div>
              <div className={`snackbar ${validationStatus.password.number ? "valid" : "invalid"}`}>
                {validationStatus.password.number ? "✅" : "❌"} At least one number
              </div>
              <div className={`snackbar ${validationStatus.password.symbol ? "valid" : "invalid"}`}>
                {validationStatus.password.symbol ? "✅" : "❌"} At least one special character
              </div>
            </div>
          )}

          {/* Email & Phone Snackbar */}
          {activeField === "email" && validationStatus.email && (
            <div className={`snackbar ${validationStatus.email}`}>
              {validationStatus.email === "valid"
                ? "✅ Valid email"
                : "❌ Invalid email format"}
            </div>
          )}
          {activeField === "phone" && validationStatus.phone && (
            <div className={`snackbar ${validationStatus.phone}`}>
              {validationStatus.phone === "valid"
                ? "✅ Valid phone number"
                : "❌ Invalid Indian phone number"}
            </div>
          )}

          {/* Submission status */}
          {status && <div className={`snackbar status-msg ${statusType}`}>{status}</div>}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

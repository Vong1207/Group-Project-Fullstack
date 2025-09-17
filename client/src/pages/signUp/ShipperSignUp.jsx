/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Nguyen Minh Nguyen Khoa, Nguyen Trong Nhan
// # ID: 4033604, 3975356 */
// Username: 8-15 characters, letters and numbers only
const validateUsername = (username) => {
  return /^[A-Za-z0-9]{8,15}$/.test(username);
};
import React, { useState, useEffect } from "react";
import "./SignUp.css";

export default function ShipperSignUp() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    // displayName: '',
    distributionHub: "",
    profilePicture: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(
    "/customerProfile/defaultProfile.png"
  );

  // Distribution hubs
  const distributionHubs = [
    { value: "", label: "Select Distribution Hub" },
    { value: "ho-chi-minh", label: "Ho Chi Minh" },
    { value: "ha-noi", label: "Ha Noi" },
    { value: "da-nang", label: "Da Nang" },
  ];

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (avatarPreview && avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const formatHub = (hub) => {
    if (hub === "ho-chi-minh") return "Ho Chi Minh";
    if (hub === "ha-noi") return "Ha Noi";
    if (hub === "da-nang") return "Da Nang";
    return hub;
  };

  const removeAvatar = () => {
    if (avatarPreview && avatarPreview.startsWith("blob:")) {
      URL.revokeObjectURL(avatarPreview);
    }
    setFormData({
      ...formData,
      profilePicture: null,
    });
    setAvatarPreview("/customerProfile/defaultProfile.png");
    const fileInput = document.getElementById("profilePicture");
    if (fileInput) fileInput.value = "";
  };

  const validatePassword = (password) => {
    const validation =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    return validation.test(password);
  };

  const validateFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: "Only JPEG, PNG, GIF, and WebP images are allowed",
      };
    }
    if (file.size > maxSize) {
      return { valid: false, error: "File size must be less than 5MB" };
    }
    return { valid: true };
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "username":
        if (!validateUsername(value)) {
          error = "Username must be 8-15 characters, letters and numbers only";
        }
        break;
      case "password":
        if (!validatePassword(value)) {
          error =
            "Password must be 8-20 chars and must be include uppercase, lowercase, digit, and special char";
        }
        break;
      // case 'displayName':
      //     if (!value || value.length < 5) {
      //         error = 'Display name must be at least 5 characters';
      //     }
      //     break;
      case "distributionHub":
        if (!value) {
          error = "Please select a distribution hub";
        }
        break;
    }
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
    return error === "";
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePicture") {
      const file = files[0];

      if (file) {
        const validation = validateFile(file);

        if (!validation.valid) {
          setErrors((prev) => ({
            ...prev,
            profilePicture: validation.error,
          }));
          return;
        }

        if (avatarPreview && avatarPreview.startsWith("blob:")) {
          URL.revokeObjectURL(avatarPreview);
        }

        setFormData({
          ...formData,
          [name]: file,
        });

        setAvatarPreview(URL.createObjectURL(file));

        setErrors((prev) => ({
          ...prev,
          profilePicture: "",
        }));
      } else {
        setFormData({
          ...formData,
          [name]: null,
        });
        setAvatarPreview("/customerProfile/defaultProfile.png");
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      if (value.trim()) {
        validateField(name, value);
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidUsername = validateField("username", formData.username);
    const isValidPassword = validateField("password", formData.password);

    const isValidDistributionHub = validateField(
      "distributionHub",
      formData.distributionHub
    );

    if (!(isValidUsername && isValidPassword && isValidDistributionHub)) return;

    let avatarBase64 = "";
    if (formData.profilePicture) {
      avatarBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(formData.profilePicture);
      });
    } else {
      avatarBase64 = "/customerProfile/defaultProfile.png";
    }

    // Ensure displayName is at least 5 characters for backend validation
    let displayName = formData.username;
    if (!displayName || displayName.length < 5) {
      displayName = "ShipperUser";
    }
    const payload = {
      username: formData.username,
      password: formData.password,
      role: "Shipper",
      displayName,
      distributionHub: formatHub(formData.distributionHub),
      avatar: avatarBase64,
    };

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Sign up successful! You can now sign in.");
        window.location.href = "/signin";
      } else {
        console.error("Sign up error:", data);
        alert(data.message || "Sign up failed!");
      }
    } catch (err) {
      console.error("Sign up failed!", err);
    }
  };

  // JSX return block
  return (
    <div className="container-fluid signup-container d-flex align-items-center justify-content-center">
      <div className="signup-card w-100">
        <div className="signup-header text-center mb-4">
          <div className="logo mb-3">
            <i className="bi bi-truck"></i>
          </div>
          <h1>Create Shipper Account</h1>
          <p className="signup-subtitle">Deliver with us</p>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Display Name đã bị xóa, dùng username làm displayName */}
          {/* Avatar Preview */}
          <div className="text-center mb-4">
            <div className="avatar-preview-container">
              <img
                src={avatarPreview}
                alt="Profile Preview"
                className="avatar-preview"
                onError={(e) => {
                  e.target.src = "/customerProfile/defaultProfile.png";
                }}
              />
              {formData.profilePicture && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger avatar-remove"
                  onClick={removeAvatar}
                  title="Remove avatar"
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
            <div className="mt-2">
              <small className="text-muted">
                {formData.profilePicture ? "Custom avatar" : "Default avatar"}
              </small>
            </div>
          </div>
          {/* Username */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username*
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              placeholder="Enter username (8-15 chars, letters and numbers)"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password*
            </label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <i className="bi bi-eye"></i>
                ) : (
                  <i className="bi bi-eye-slash"></i>
                )}
              </button>
            </div>
            {errors.password && (
              <div className="invalid-feedback d-block">{errors.password}</div>
            )}
          </div>
          {/* Distribution Hub */}
          <div className="mb-3">
            <label htmlFor="distributionHub" className="form-label">
              Assigned Distribution Hub*
            </label>
            <select
              id="distributionHub"
              name="distributionHub"
              className={`form-select ${
                errors.distributionHub ? "is-invalid" : ""
              }`}
              value={formData.distributionHub}
              onChange={handleChange}
              required
            >
              {distributionHubs.map((hub) => (
                <option key={hub.value} value={hub.value} disabled={!hub.value}>
                  {hub.label}
                </option>
              ))}
            </select>
            {errors.distributionHub && (
              <div className="invalid-feedback">{errors.distributionHub}</div>
            )}
            <div className="form-text ">
              Select the distribution hub you'll be delivering from 
            </div>
          </div>
          {/* Profile Picture Upload */}
          <div className="mb-4">
            <label htmlFor="profilePicture" className="form-label">
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              className={`form-control ${
                errors.profilePicture ? "is-invalid" : ""
              }`}
              accept="image/*"
              onChange={handleChange}
            />
            {errors.profilePicture && (
              <div className="invalid-feedback">{errors.profilePicture}</div>
            )}
            <div className="form-text">
              Upload your profile picture (optional) • Max 5MB • JPEG, PNG, GIF,
              WebP
            </div>
          </div>
          <div className="d-grid mb-4">
            <button type="submit" className="btn signup-btn">
              Create Shipper Account
            </button>
          </div>
        </form>
        <div className="divider my-4">
          <span>OR</span>
        </div>
        <div className="text-center">
          <div className="login-text mb-2">
            Already have an account? <a href="/signin">Sign In</a>
          </div>
          <div className="text-muted small">
            Want to buy?{" "}
            <a href="/signup/customer" className="text-decoration-none">
              Register as Customer
            </a>{" "}
            |
            <a href="/signup/vendor" className="text-decoration-none ms-1">
              Register as Vendor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

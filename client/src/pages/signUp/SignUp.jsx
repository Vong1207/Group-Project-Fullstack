import React, { useState } from 'react';
import './SignUp.css';

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', userType: 'customer' // customer, vendor, shipper
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Sign up attempt', formData);
        // Handle sign-up logic after week 8
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="signin-container">
            <div className="signin-card">
                <div className="signin-header">
                    <div className="logo"><i className="bi bi-person-plus"></i></div>
                    <h1>Create an Account</h1>
                </div>
                <form className="signin-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                            </button>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userType">User Type</label>
                        <select
                            id="userType"
                            name="userType"
                            className="user-type-select"
                            value={formData.userType}
                            onChange={handleChange}
                            required
                        >
                            <option value="customer">Customer</option>
                            <option value="vendor">Vendor</option>
                            <option value="shipper">Shipper</option>
                        </select>
                    </div>
                    <button type="submit" className="signin-btn">
                        Sign Up
                    </button>
                </form>
                <div className="divider">
                    <span>OR</span>
                </div>
                <div className="login-link">
                    Already have an account? <a href="/signin">Sign In</a>
                </div>
            </div>
        </div>
    );
}
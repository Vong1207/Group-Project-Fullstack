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
        <div className="container-fluid signup-container d-flex align-items-center justify-content-center p-2 p-sm-3 p-md-4 p-lg-5">
            <div className="signup-card p-3 p-sm-4 p-md-5 w-100" style={{maxWidth: '420px'}}>
                <div className="signup-header text-center mb-4">
                    <div className="logo mb-3"><i className="bi bi-person-plus"></i></div>
                    <h1 className="h3 h2-md h1-lg mb-3">Create an Account</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="fw-semibold">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control py-2 py-sm-3"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className='fw-semibold'>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control py-2 py-sm-3"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className='fw-semibold'>Password</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="form-control py-2 py-sm-3"
                                style={{paddingRight:'50px'}}
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
                    <div className="mb-3">
                        <label htmlFor="userType" className='fw-semibold'>User Type</label>
                        <select
                            id="userType"
                            name="userType"
                            className='form-select py-2 py-sm-3'
                            value={formData.userType}
                            onChange={handleChange}
                            required
                        >
                            <option value="customer">Customer</option>
                            <option value="vendor">Vendor</option>
                            <option value="shipper">Shipper</option>
                        </select>
                    </div>

                    <div className='d-grid mb-4 mt-3'>
                        <button type="submit" className="btn signup-btn py-2 py-sm-3">
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="divider my-4">
                    <span>OR</span>
                </div>
                <div className="login-link text-center">
                    Already have an account? <a href="/signin">Sign In</a>
                </div>
            </div>
        </div>
    );
}
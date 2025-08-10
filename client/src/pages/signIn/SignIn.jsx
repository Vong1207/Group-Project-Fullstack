import React, { useState } from 'react';
import './SignIn.css'

export default function SignIn() {
    const [formData, setFormData] = useState({
        username:'', password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Sign in attempt', formData);
        // do later after week 8
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="signin-container">
            <div className="signin-card">
                <div className="signin-header">
                    <div className="logo"><i className="bi bi-bag"></i></div>
                    <h1>Welcome back</h1>
                </div>

                <form className="signin-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} required/>
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
                                aria-label="Toggle password visibity"
                            >
                                {showPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                            </button>
                        </div>
                    </div>

                    <div className="form-options">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                            Remember me
                        </label>
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </div>

                    <button type="submit" className="signin-btn">
                        Sign in
                    </button>
                </form>

                <div className="divider">
                    <span>OR</span>
                </div>

                <div className="signup-link">
                    Don't have an account? <a href="/signup">Create Account</a>

                </div>
            </div>
        </div>
    )
};
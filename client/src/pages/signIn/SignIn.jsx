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
        <div className="container-fluid signin-container d-flex align-items-center justify-content-center p-2 p-sm-3 p-md-4 p-lg-5">
            <div className="signin-card p-3 p-sm-4 p-md-5 w-100" style={{maxWidth: '420px'}}>
                <div className="signin-header text-center mb-4">
                    <div className="logo mb-3"><i className="bi bi-bag"></i></div>
                    <h1 className="h2 h1-sm h1-md">Welcome back</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className='fw-semibold'>Username</label>
                        <input type="text" id="username" name="username" className="form-control py-2 py-sm-3" placeholder="Enter your username" value={formData.username} onChange={handleChange} required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="fw-semibold">Password</label>
                        <div className="password-input">
                            <input 
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="form-control py-2 py-sm-3"
                                style={{paddingRight: '50px'}}
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

                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
                        <div className="form-check d-flex align-items-center gap-2">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="rememberMe"
                            />
                            <label className="form-check-label remember-me" htmlFor="rememberMe">
                                Remember me
                            </label>
                        </div>
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </div>

                <div className="d-grid mb-4"> 
                    <button type="submit" className="signin-btn">
                        Sign in
                    </button>
                </div>
                </form>

                <div className="divider my-4">
                    <span>OR</span>
                </div>

                <div className="signup-link text-center">
                    Don't have an account? <a href="/signup">Create Account</a>

                </div>
            </div>
        </div>
    )
};
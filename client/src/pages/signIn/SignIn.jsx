/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Your Names (e.g. Nguyen Van Minh)
// # ID: Your Student ID (e.g. 1234567) */
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import './SignIn.css'

export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username:'', password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');

    // Client-side validation
    const validateUsername = (username) => {
        const regex = /^[a-zA-Z0-9]{8,15}$/;
        return regex.test(username);
    };

    const validatePassword = (password) => {
        // Basic length check for login (detailed validation is for registration)
        return password.length >= 8;
    };

    const validateField = (name, value) => {
        let error = '';
        
        switch(name) {
            case 'username':
                if (!validateUsername(value)) {
                    error = 'Username must be 8-15 characters, letters and numbers only';
                }
                break;
            case 'password':
                if (!validatePassword(value)) {
                    error = 'Password must be at least 8 characters';
                }
                break;
        }
        
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
        
        return error === '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, 
            [name]: value
        });
        
        // Real-time validation
        if (value.trim()) {
            validateField(name, value);
        } else {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');
        // Validate all fields before submission
        const isValidUsername = validateField('username', formData.username);
        const isValidPassword = validateField('password', formData.password);
        if (isValidUsername && isValidPassword) {
            try {
                const res = await axios.post('http://localhost:3000/api/auth/signin', formData, { withCredentials: true });
                if (res.data && res.data.user) {
                    dispatch(setUser(res.data.user));
                    // Redirect all roles to home after sign in
                    navigate('/');
                }
            } catch (err) {
                if (err.response && err.response.data && err.response.data.message) {
                    setServerError(err.response.data.message);
                } else {
                    setServerError('Login failed. Please try again.');
                }
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container-fluid signin-container d-flex align-items-center justify-content-center">
            <div className="signin-card w-100">
                <div className="signin-header text-center mb-4">
                    <div className="logo mb-3"><i className="bi bi-bag"></i></div>
                    <h1>Welcome back</h1>
                    <p className="signin-subtitle">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mb-3">
                        <label htmlFor="username" className='form-label'>Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            placeholder="Enter your username" 
                            value={formData.username} 
                            onChange={handleChange} 
                            required
                        />
                        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="password-input">
                            <input 
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
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
                        {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                    </div>

                    {/* Server error message */}
                    {serverError && (
                        <div className="alert alert-danger text-center" role="alert">
                            {serverError}
                        </div>
                    )}

                    {/* Remember Me & Forgot Password */}
                    <div className="signin-options mb-3">
                        <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="rememberMe"
                            />
                            <label className="form-check-label" htmlFor="rememberMe">
                                Remember me
                            </label>
                        </div>
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </div>

                    {/* Submit Button */}
                    <div className="d-grid mb-4"> 
                        <button type="submit" className="btn signin-btn">
                            Sign in
                        </button>
                    </div>
                </form>

                {/* Divider */}
                <div className="divider my-4">
                    <span>OR</span>
                </div>

                {/* Registration Links */}
                <div className="text-center">
                    <div className="signup-text mb-3">
                        Don't have an account?
                    </div>
                    
                    <div className="signup-buttons">
                        <a href="/signup" className="btn btn-outline-primary w-100">
                            <i className="bi bi-person-plus me-2"></i>Create Account
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
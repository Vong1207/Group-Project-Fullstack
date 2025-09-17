/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Nguyen Minh Nguyen Khoa, Nguyen Trong Nhan
// # ID: 4033604, 3975356 */
import React, { useState, useEffect } from 'react';
import './SignUp.css';

export default function CustomerSignUp() {
    const [showSizeModal, setShowSizeModal] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        address: '',
        profilePicture: null
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [avatarPreview, setAvatarPreview] = useState('/customerProfile/defaultProfile.png');

    // Cleanup preview URL on unmount
    useEffect(() => {
        return () => {
            if (avatarPreview && avatarPreview.startsWith('blob:')) {
                URL.revokeObjectURL(avatarPreview);
            }
        };
    }, []);

    // Validation functions
    const validateUsername = (username) => {
        const validation = /^[a-zA-Z0-9]{8,15}$/;
        return validation.test(username);
    };

    const validatePassword = (password) => {
        const validation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
        return validation.test(password);
    };

    const validateFile = (file) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        const minSize = 50 * 1024; // 50 KB
        const maxSize = 200 * 1024; // 200 KB
        if (!allowedTypes.includes(file.type)) {
            return { valid: false, error: 'Only JPEG, PNG, GIF, and WebP images are allowed' };
        }
        if (file.size < minSize || file.size > maxSize) {
            return { valid: false, error: 'size-modal' };
        }
        return { valid: true };
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
                    error = 'Password must be 8-20 chars and must be include uppercase, lowercase, digit, and special char';
                }
                break;
            case 'name':
            case 'address':
                if (value.length < 5) {
                    error = `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least 5 characters`;
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
        const { name, value, files } = e.target;
        
        if (name === 'profilePicture') {
            const file = files[0];
            
            if (file) {
                // Validate file
                const validation = validateFile(file);
                if (!validation.valid) {
                    if (validation.error === 'size-modal') {
                        setShowSizeModal(true);
                        setErrors(prev => ({
                            ...prev,
                            profilePicture: ''
                        }));
                    } else {
                        setErrors(prev => ({
                            ...prev,
                            profilePicture: validation.error
                        }));
                    }
                    return;
                }
                // Clear previous preview
                if (avatarPreview && avatarPreview.startsWith('blob:')) {
                    URL.revokeObjectURL(avatarPreview);
                }
                // Set new file and preview
                setFormData({
                    ...formData,
                    [name]: file
                });
                setAvatarPreview(URL.createObjectURL(file));
                // Clear error
                setErrors(prev => ({
                    ...prev,
                    profilePicture: ''
                }));
            } else {
                // Reset to default if no file selected
                setFormData({
                    ...formData,
                    [name]: null
                });
                setAvatarPreview('/customerProfile/defaultProfile.png');
            }
        } else {
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
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        const isValidUsername = validateField('username', formData.username);
        const isValidPassword = validateField('password', formData.password);
        const isValidName = validateField('name', formData.name);
        const isValidAddress = validateField('address', formData.address);

        if (!(isValidUsername && isValidPassword && isValidName && isValidAddress)) return;


        let avatarBase64 = '';
        if (formData.profilePicture) {
            // Convert image file to base64
            avatarBase64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(formData.profilePicture);
            });
        } else {
            // Gửi avatar mặc định nếu không upload
            avatarBase64 = '/customerProfile/defaultProfile.png';
        }

        const payload = {
            username: formData.username,
            password: formData.password,
            role: 'Customer',
            displayName: formData.name,
            customerAddress: formData.address,
            avatar: avatarBase64,
        };

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (res.ok) {
                alert('Sign up successful! You can now sign in.');
                window.location.href = '/signin';
            } else {
                console.error('Sign up error:', data);
                alert(data.message || 'Sign up failed!');
            }
        } catch (err) {
            console.error('Sign up failed!', err);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const removeAvatar = () => {
        // Cleanup current preview
        if (avatarPreview && avatarPreview.startsWith('blob:')) {
            URL.revokeObjectURL(avatarPreview);
        }
        
        // Reset to default
        setFormData({
            ...formData,
            profilePicture: null
        });
        setAvatarPreview('/customerProfile/defaultProfile.png');
        
        // Clear file input
        const fileInput = document.getElementById('profilePicture');
        if (fileInput) fileInput.value = '';
    };

    return (
        <div className="container-fluid signup-container d-flex align-items-center justify-content-center">
            {/* Modal for image size error */}
            {showSizeModal && (
                <div className="modal show" style={{display:'block', background:'rgba(0,0,0,0.3)'}} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <p className="text-danger mb-2">
                                    Your profile image should be between <b>50 KB</b> and <b>200 KB</b>.<br />
                                    Please choose a picture that fits this size range for best quality and upload performance.
                                </p>
                                <button type="button" className="btn btn-outline-secondary" onClick={()=>setShowSizeModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="signup-card w-100">
                <div className="signup-header text-center mb-4">
                    <div className="logo mb-3">
                        <i className="bi bi-person-plus"></i>
                    </div>
                    <h1>Create Customer Account</h1>
                    <p className="signup-subtitle">Join us to start shopping</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Avatar Preview */}
                    <div className="text-center mb-4">
                        <div className="avatar-preview-container">
                            <img 
                                src={avatarPreview} 
                                alt="Profile Preview" 
                                className="avatar-preview"
                                onError={(e) => {
                                    e.target.src = '/customerProfile/defaultProfile.png';
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
                                {formData.profilePicture ? 'Custom avatar' : 'Default avatar'}
                            </small>
                        </div>
                    </div>

                    {/* Username */}
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username*</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            placeholder="Enter username (8-15 chars, letters and numbers)"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password*</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                placeholder="Enter password"
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

                    {/* Name */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name*</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            placeholder="Enter your full name (min 5 chars)"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    {/* Address */}
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address*</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                            placeholder="Enter your address (min 5 chars)"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>

                    {/* Profile Picture Upload */}
                    <div className="mb-4">
                        <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
                        <input
                            type="file"
                            id="profilePicture"
                            name="profilePicture"
                            className={`form-control ${errors.profilePicture ? 'is-invalid' : ''}`}
                            accept="image/*"
                            onChange={handleChange}
                        />
                        {errors.profilePicture && <div className="invalid-feedback">{errors.profilePicture}</div>}
                        <div className="form-text">
                            Upload your profile picture (optional) • Max 5MB • JPEG, PNG, GIF, WebP
                        </div>
                    </div>

                    <div className='d-grid mb-4'>
                        <button type="submit" className="btn signup-btn">
                            Create Customer Account
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
                        Want to sell? <a href="/signup/vendor" className="text-decoration-none">Register as Vendor</a> | 
                        <a href="/signup/shipper" className="text-decoration-none ms-1">Register as Shipper</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
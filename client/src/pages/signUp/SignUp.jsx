/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Nguyen Minh Nguyen Khoa, Nguyen Trong Nhan
// # ID: 4033604, 3975356 */
import React from 'react';
import './SignUp.css';

export default function SignUp() {
    const roles = [
        {
            type: 'customer',
            title: 'Customer',
            description: 'Browse and purchase products from vendors',
            icon: 'bi-person-circle',
            color: '#007bff',
            link: '/signup/customer'
        },
        {
            type: 'vendor',
            title: 'Vendor',
            description: 'Sell your products to customers',
            icon: 'bi-shop',
            color: '#28a745',
            link: '/signup/vendor'
        },
        {
            type: 'shipper',
            title: 'Shipper',
            description: 'Deliver products from distribution hubs',
            icon: 'bi-truck',
            color: '#ffc107',
            link: '/signup/shipper'
        }
    ];

    return (
        <div className="container-fluid signup-container d-flex align-items-center justify-content-center">
            <div className="signup-card w-100">
                <div className="signup-header text-center mb-4">
                    <div className="logo mb-3">
                        <i className="bi bi-person-plus"></i>
                    </div>
                    <h1>Join Our Platform</h1>
                    <p className="signup-subtitle">Choose your role to sign up</p>
                </div>

                <div className="role-selection">
                    {roles.map((role) => (
                        <a 
                            key={role.type}
                            href={role.link}
                            className="role-card"
                            style={{'--role-color': role.color}}
                        >
                            <div className="role-icon">
                                <i className={role.icon}></i>
                            </div>
                            <div className="role-content">
                                <h3 className="role-title">{role.title}</h3>
                                <p className="role-description">{role.description}</p>
                            </div>
                            <div className="role-arrow">
                                <i className="bi bi-arrow-right"></i>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="divider my-4">
                    <span>OR</span>
                </div>

                <div className="text-center">
                    <div className="login-text mb-3">
                        Already have an account?
                    </div>
                    <a href="/signin" className="btn btn-outline-secondary w-100">
                        <i className="bi bi-box-arrow-in-right me-2"></i>Sign In
                    </a>
                </div>
            </div>
        </div>
    );
}
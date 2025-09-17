/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Your Names (e.g. Nguyen Van Minh)
// # ID: Your Student ID (e.g. 1234567) */
import './MyAccount.css';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function MyAccount() {
    const user = useSelector((state) => state.user.user) || {};

    return (
        <div className='container-fluid px-0'>
            <div className='row mx-0'>
                {/* Sidebar on -lg breakpoint */}
                <div className="col-lg-2 d-lg-flex d-none flex-column px-0" id="sidebar">
                    <div className='my-5 text-center'>
                        {user.role === 'Customer' && (
                            <i className='fi fi-ts-circle-user fs-1'></i>
                        )}
                        {user.role === 'Vendor' && (
                            <i className='fi fi-ts-marketplace-store fs-1'></i>
                        )}
                        {user.role === 'Shipper' && (
                            <i className='fi fi-ts-shipping-fast fs-1'></i>
                        )}
                    </div>
                    
                    {user.role === 'Customer' && (
                        <>
                            <NavLink to='account' className={({ isActive }) => isActive ? 'active' : ''}>
                                <div className='ps-4 py-3 fs-5 tabName'>
                                    <i className='bi bi-person me-2'></i> Account
                                </div>
                            </NavLink>
                            <NavLink to='wallet' className={({ isActive }) => isActive ? 'active' : ''}>
                                <div className='ps-4 py-3 fs-5 tabName'>
                                    <i className='fi fi-ts-wallet me-2'></i> Wallet
                                </div>
                            </NavLink>
                            <NavLink to='cart' className={({ isActive }) => isActive ? 'active' : ''}>
                                <div className='ps-4 py-3 fs-5 tabName'>
                                    <i className='fi fi-ts-shopping-cart me-2'></i> Cart
                                </div>
                            </NavLink>
                            <NavLink to='purchased' className={({ isActive }) => isActive ? 'active' : ''}>
                                <div className='ps-4 py-3 fs-5 tabName'>
                                    <i className='fi fi-ts-checklist-task-budget me-2'></i> Purchased
                                </div>
                            </NavLink>
                        </>
                    )}

                    {user.role === 'Vendor' && (
                        <>
                            <NavLink to='account' className={({ isActive }) => isActive ? 'active' : ''}>
                                <div className='ps-4 py-3 fs-5 tabName'>
                                    <i className='bi bi-person me-2'></i> Account
                                </div>
                            </NavLink>
                            <NavLink to='myProducts' className={({ isActive }) => isActive ? 'active' : ''}>
                                <div className='ps-4 py-3 fs-5 tabName'>
                                    <i className='bi bi-box-seam me-2'></i> Products
                                </div>
                            </NavLink>
                            <NavLink to='addNewProduct' className={({ isActive }) => isActive ? 'active' : ''}>
                                <div className='ps-4 py-3 fs-5 tabName'>
                                    <i className='bi bi-plus-circle me-2'></i> Create
                                </div>
                            </NavLink>
                        </>
                    )}

                    {user.role === 'Shipper' && (
                        <>
                            <NavLink to='account' className={({ isActive }) => isActive ? 'active' : ''}>
                                <div className='ps-4 py-3 fs-5 tabName'>
                                    <i className='bi bi-person me-2'></i> Account
                                </div>
                            </NavLink>
                            <NavLink to='orders' className={({ isActive }) => isActive ? 'active' : ''}>
                                <div className='ps-4 py-3 fs-5 tabName'>
                                    <i className='fi fi-ts-box-open me-2'></i> Orders
                                </div>
                            </NavLink>
                        </>
                    )}

                    <div className='d-flex flex-column justify-content-center align-items-center mt-3' id='homeBtnContainer'>
                        <Link to='/'>
                            <button type='button' id='homeBtn' className='px-3 py-2'>Back to Home</button>
                        </Link>
                    </div>            
                </div>

                <main className='col-lg-10 col-12 px-0'>
                    <div className='d-lg-none d-flex align-items-center position-relative py-2' id='backToHomeContainer'>
                        <Link to='/' className='position-absolute'>
                            {`<-- Back to Homepage`}
                        </Link>
                    </div>

                    <Outlet />
                </main>

                {/* Sidebar on -md or lower breakpoints */}
                <div className='row mx-0 px-0 d-lg-none d-flex fixed-bottom' id='sidebarSm'>
                    {user.role === 'Customer' && (
                        <>
                            <NavLink to='account' className={({ isActive }) => `d-flex flex-column justify-content-center align-items-center col-3 py-3 ${isActive ? 'active' : ''}`}>
                                <i className='bi bi-person'></i>
                                <p className='mb-0'>Account</p>
                            </NavLink>
                            <NavLink to='wallet' className={({ isActive }) => `d-flex flex-column justify-content-center align-items-center col-3 py-3 ${isActive ? 'active' : ''}`}>
                                <i className='fi fi-ts-wallet'></i>
                                <p className='mb-0'>Wallet</p>
                            </NavLink>
                            <NavLink to='cart' className={({ isActive }) => `d-flex flex-column justify-content-center align-items-center col-3 py-3 ${isActive ? 'active' : ''}`}>
                                <i className='fi fi-ts-shopping-cart'></i>
                                <p className='mb-0'>Cart</p>
                            </NavLink>
                            <NavLink to='purchased' className={({ isActive }) => `d-flex flex-column justify-content-center align-items-center col-3 py-3 ${isActive ? 'active' : ''}`}>
                                <i className='fi fi-ts-checklist-task-budget'></i>
                                <p className='mb-0'>Purchased</p>
                            </NavLink>
                        </>
                    )}
                    {user.role === 'Vendor' && (
                        <>
                            <NavLink to='account' className={({ isActive }) => `d-flex flex-column justify-content-center align-items-center col-4 py-3 ${isActive ? 'active' : ''}`}>
                                <i className='bi bi-person'></i>
                                <p className='mb-0'>Account</p>
                            </NavLink>
                            <NavLink to='myProducts' className={({ isActive }) => `d-flex flex-column justify-content-center align-items-center col-4 py-3 ${isActive ? 'active' : ''}`}>
                                <i className='bi bi-box-seam'></i>
                                <p className='mb-0'>Products</p>
                            </NavLink>
                            <NavLink to='addNewProduct' className={({ isActive }) => `d-flex flex-column justify-content-center align-items-center col-4 py-3 ${isActive ? 'active' : ''}`}>
                                <i className='bi bi-plus-circle'></i>
                                <p className='mb-0'>Create</p>
                            </NavLink>
                        </>
                    )}
                    {user.role === 'Shipper' && (
                        <>
                            <NavLink to='account' className={({ isActive }) => `d-flex flex-column justify-content-center align-items-center col-6 py-3 ${isActive ? 'active' : ''}`}>
                                <i className='bi bi-person'></i>
                                <p className='mb-0'>Account</p>
                            </NavLink>
                            <NavLink to='orders' className={({ isActive }) => `d-flex flex-column justify-content-center align-items-center col-6 py-3 ${isActive ? 'active' : ''}`}>
                                <i className='fi fi-ts-box-open'></i>
                                <p className='mb-0'>Orders</p>
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
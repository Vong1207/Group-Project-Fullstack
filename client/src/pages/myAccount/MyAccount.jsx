import './MyAccount.css'
import { NavLink, Link, Outlet } from 'react-router-dom'

const user = {
    role: 'Customer'
}

export default function MyAccount() {
    return (
        <div className='container-fluid px-0'>
            <div className='row mx-0'>
                {/* Sidebar on -lg breakpoint */}
                <div className="col-lg-2 d-lg-flex d-none flex-column px-0" id="sidebar">
                    <div className='my-5 text-center'>
                        <i className='fi fi-ts-circle-user fs-1'></i>
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

                    <div className='d-flex justify-content-center align-items-center mt-3' id='homeBtnContainer'>
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
                </div>
            </div>
        </div>
    )
}
import { Outlet, NavLink, Link } from 'react-router-dom'
import './Customer.css'
import { useRef, useState } from 'react'

const user = {
    imageUrl: '/customerProfile/defaultMale.jpg',
    userName: 'Tran Vong',
    walletBalance: 150000
}

export default function Customer() {
    const avatarInputRef = useRef(null);
    const [avatarUrl, setAvatarUrl] = useState(user.imageUrl);

    function handleAvatarChange() {
        avatarInputRef.current.click();
    }

    function handleAvatarSelected(e) {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                setAvatarUrl(event.target.result)
            }
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="container-fluid px-0">
            <div className="row mx-0" id='content'>
                {/* Sidebar on -md breakpoint */}
                <div className="col-lg-2 col-md-3 col d-md-flex d-none flex-column justify-content-between px-0" id="sidebar">
                    <div>
                        <div className='my-5 text-center'>
                            <i className='fi fi-ts-circle-user fs-1'></i>
                        </div>

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
                        <NavLink to='settings' className={({ isActive }) => isActive ? 'active' : ''}>
                            <div className='ps-4 py-3 fs-5 tabName'>
                                <i className='bi bi-gear me-2'></i> Settings
                            </div>
                        </NavLink>
                    </div>

                    <div className='d-flex justify-content-center align-items-center' id='homeBtnContainer'>
                        <Link to='/'>
                            <button type='button' id='homeBtn' className='px-3 py-2'>Back to Home</button>
                        </Link>
                    </div>
                </div>

                <div className="col-lg-10 col d-flex flex-column px-0">
                    {/* User Info -md breakpoint */}
                    <div className='px-5 py-5 d-md-block d-none' id='userDisplay'>
                        {/* Avatar Display */}
                        <div className='position-relative' id='avatarDisplay'>
                            <img src={avatarUrl} alt="Customer Avatar" id='customerAvatar' className='me-4 position-absolute' />
                            <button type='button' className='position-absolute' onClick={handleAvatarChange} id='changeAvatarBtn'>
                                <i className='bi bi-camera'></i>
                            </button>
                            {/* Hidden Input */}
                            <input 
                                type="file"
                                accept='image/*'
                                ref={avatarInputRef}
                                className='d-none'
                                onChange={handleAvatarSelected} 
                            />
                            {/* Username Display */}
                            <h1 className='mb-0 position-absolute' id='usernameDisplay'>{user.userName}</h1>
                        </div>
                    </div>

                    {/* User Info on -sm breakpoint */}
                    <div className='py-5 d-md-none d-block' id='userDisplaySm'>
                        {/* Avatar Display */}
                        <div className='position-relative d-flex justify-content-center' id='avatarDisplaySm'>
                            <img src={avatarUrl} alt="Customer Avatar" id='customerAvatarSm' className='position-absolute' />
                            <button type='button' className='position-absolute' onClick={handleAvatarChange} id='changeAvatarBtnSm'>
                                <i className='bi bi-camera'></i>
                            </button>
                        </div>
                        {/* Username Display */}
                        <h1 className='text-center mt-4' id='usernameDisplaySm'>{user.userName}</h1>
                    </div>

                    <Outlet context={{ user }} />
                </div>
            </div>

            {/* Sticky Footer Navigation on -sm breakpoint */}
            <div className='row mx-0 d-md-none d-flex fixed-bottom' id='sidebarSm'>
                <NavLink to='wallet' className={({ isActive }) => `d-flex justify-content-center align-items-center col-3 py-3 ${isActive ? 'active' : ''}`}>
                    <i className='fi fi-ts-wallet'></i>
                </NavLink>
                <NavLink to='cart' className={({ isActive }) => `d-flex justify-content-center align-items-center col-3 py-3 ${isActive ? 'active' : ''}`}>
                    <i className='fi fi-ts-shopping-cart'></i>
                </NavLink>
                <NavLink to='purchased' className={({ isActive }) => `d-flex justify-content-center align-items-center col-3 py-3 ${isActive ? 'active' : ''}`}>
                    <i className='fi fi-ts-checklist-task-budget'></i>
                </NavLink>
                <NavLink to='settings' className={({ isActive }) => `d-flex justify-content-center align-items-center col-3 py-3 ${isActive ? 'active' : ''}`}>
                    <i className='bi bi-gear'></i>
                </NavLink>
            </div>
        </div>
    )
}
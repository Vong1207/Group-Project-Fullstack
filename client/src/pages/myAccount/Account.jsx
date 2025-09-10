import './Account.css'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearUser } from '../../redux/userSlice.js';
import { useRef, useState } from 'react';

export default function Account() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileInputRef = useRef();

    const user = useSelector((state) => state.user.user || {});
    const [avatarImage, setAvatarImage] = useState(user.avatar);
    const [base64Avatar, setBase64Avatar] = useState(user.avatar);

    const handleSignOut = async () => {
        try {
            await axios.get('http://localhost:3000/logout', { withCredentials: true });
        } catch (err) {
            // ignore error
        }
        dispatch(clearUser());
        navigate('/');
    };

    const handleAvatarBtnClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarImage(reader.result);
                setBase64Avatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const saveChangesToDB = async () => {
        try {
            if (base64Avatar && base64Avatar !== user.avatar) {
                await axios.put('http://localhost:3000/api/user/updateAccount', { avatar: base64Avatar }, { withCredentials: true });
            } else {
                return;
            }
            
            alert('Changes saved successfully!');
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    }

    return (
        <div className='accountPageContainer mt-4 px-3'>
            <div className='accountPageContentContainer px-md-5 px-3 py-4'>
                <div className='my-3 position-relative accountAvatarContainer d-md-block d-none'>
                    <img className='accountAvatar' src={avatarImage} alt="User Profile Picture" />
                    <input className='d-none' onChange={handleAvatarChange} ref={fileInputRef} type="file" accept='images/*' />
                    <button className='position-absolute accountAvatarBtn' type='button' onClick={handleAvatarBtnClick}>
                        <i className='fi fi-ts-camera'></i>
                    </button>
                    {user.role !== 'Vendor' && (
                        <h1 className='position-absolute accountDisplayName mb-0 fst-italic'>{user.displayName}</h1>
                    )}
                    {user.role === 'Vendor' && (
                        <h1 className='position-absolute accountDisplayName mb-0 fst-italic'>{user.businessName}</h1>
                    )}
                </div>

                <div className='my-3 d-md-none d-flex flex-column align-items-center accountAvatarContainer'>
                    <div className='mb-3 avatarContainer d-flex align-items-center justify-content-center w-100 position-relative'>
                        <img className='accountAvatarSm' src={avatarImage} alt="User Profile Picture" />
                        <button className='position-absolute accountAvatarBtnSm' type='button' onClick={handleAvatarBtnClick}>
                            <i className='fi fi-ts-camera'></i>
                        </button>
                    </div>

                    {user.role !== 'Vendor' && (
                        <h1 className='accountDisplayNameSm mb-0 fst-italic'>{user.displayName}</h1>
                    )}
                    {user.role === 'Vendor' && (
                        <h1 className='accountDisplayNameSm mb-0 fst-italic'>{user.businessName}</h1>
                    )}
                </div>

                <div className='accountInfoContainer my-5'>
                    <p className='accountInfo mb-0'><span className='fw-bold accountInfoLabel'>Username: </span>{user.username}</p>
                    <p className='accountInfo mb-0'><span className='fw-bold accountInfoLabel'>Role: </span>{user.role}</p>
                    <p className='accountInfo mb-0'><span className='fw-bold accountInfoLabel'>Number: </span>{user.number || ''}</p>
                    {user.role === 'Customer' && (
                        <>
                            <p className='accountInfo mb-0'><span className='fw-bold accountInfoLabel'>Address: </span>{user.customerAddress}</p>
                            <p className='accountInfo mb-0'><span className='fw-bold accountInfoLabel'>Wallet Balance: </span>{(user.walletBalance ?? 0).toLocaleString()}₫</p>
                        </>
                    )}
                    {user.role === 'Vendor' && (
                        <>
                            <p className='accountInfo mb-0'><span className='fw-bold accountInfoLabel'>Address: </span>{user.businessAddress}</p>
                            <p className='accountInfo mb-0'><span className='fw-bold accountInfoLabel'>Wallet Balance: </span>{(user.walletBalance ?? 0).toLocaleString()}₫</p>
                        </>
                    )}
                    {user.role === 'Shipper' && (
                        <p className='accountInfo mb-0'><span className='fw-bold accountInfoLabel'>Distribution Hub: </span>{user.distributionHub}</p>
                    )}
                </div>

                <div>
                    <button id='saveChangesBtn' className='py-2 px-4 fw-bold me-4' type='button' onClick={saveChangesToDB}>Save Changes</button>
                    <button id='logoutBtn' className='py-2 px-4 fw-bold' type='button' onClick={handleSignOut}>Logout</button>
                </div>
            </div>
        </div>
    )
}
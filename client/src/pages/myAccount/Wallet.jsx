import './Wallet.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser, updateWalletBalance } from '../../redux/userSlice.js';

export default function Wallet() {
    const dispatch = useDispatch();

    // Fetch User Session
    const fetchSession = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/session", { withCredentials: true });
            if (response.data && response.data.loggedIn && response.data.user) {
                dispatch(setUser(response.data.user));
            }
        } catch (error) {
            console.error("Error fetching session:", error);
        }
    }

    useEffect(() => {
        fetchSession();
    }, []);

    // Redux state
    const walletBalance = useSelector(state => state.user.user?.walletBalance) || 0;

    // Local states
    const [walletBalanceVisibility, setVisibility] = useState(false);
    const [toggleIcon, setIcon] = useState('bi bi-eye-slash');
    const [amount, setAmount] = useState('');

    // Save changes to DB
    const userId = useSelector(state => state.user.user?._id);

    async function saveWalletToDB(newBalance) {
        if (!userId) return;
        try {
            await axios.post("http://localhost:3000/api/wallet/update", { userId, walletBalance: newBalance }, { withCredentials: true });
        } catch (error) {
            console.error("Error saving wallet to DB:", error);
        }
    }

    // Wallet functions
    function toggleVisibility() {
        setVisibility(!walletBalanceVisibility);
    }

    function handleAmountChange(event) {
        const value = event.target.value;
        if (value === '' || /^\d+$/.test(value)) {
            setAmount(value);
        }
    }

    function addMoneyToWallet(amount) {
        const amountNumber = parseInt(amount);

        if (amount === '' || amountNumber < 50000) {
            return;
        } else {
            dispatch(updateWalletBalance(walletBalance + amountNumber));
            setAmount('');
        }
    }

    useEffect(() => {
        setIcon(walletBalanceVisibility ? 'bi bi-eye' : 'bi bi-eye-slash');
    }, [walletBalanceVisibility]);

    useEffect(() => {
        if (!isNaN(walletBalance)) {
            saveWalletToDB(walletBalance);
        }
    }, [addMoneyToWallet]);

    return (
        <>
            <h1 className='mb-0 mt-4 text-center'>My Wallet</h1>

            <div className='mt-4 mx-lg-5 row mx-0' id='walletContainer'>
                <div className='col-md-5 d-md-flex d-none flex-column justify-content-center align-items-center py-5 cartelloContainer'>
                    <h2 className='text-center mb-3'>Cartello Wallet</h2>
                    <img id='walletImage' src="/wallet.png" alt="Wallet Image" />
                </div>

                <div className='col-md-7 col-12 p-3 d-flex flex-column justify-content-between' id='walletInfo'>
                    <div className='mb-md-0 mb-4'>
                        <h2>Wallet Balance:</h2>
                        <p className='fs-4' id='walletBalance'>{walletBalanceVisibility ? `${walletBalance.toLocaleString()}₫` : '••••••••'} <span className={`${toggleIcon} ms-2`} onClick={toggleVisibility}></span></p>
                    </div>

                    <div id='addMoneySection'>
                        <div className='mb-3 d-flex align-items-center'>
                            <input className='ps-2' type='text' value={amount} onChange={handleAmountChange} placeholder='At least 50,000₫' />
                            <p className='mb-0 flex-fill text-end pe-2'>₫</p>
                        </div>
                        <button className='d-flex justify-content-center align-items-center py-2' type='button' onClick={() => addMoneyToWallet(amount)}>Add Money To Wallet</button>
                    </div>
                </div>
            </div>
        </>
    )
}
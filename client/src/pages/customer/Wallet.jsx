import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import './Wallet.css';

export default function Wallet() {
    const { user } = useOutletContext();
    const [balance, setBalance] = useState('******');
    const [eyeState, setEyeState] = useState('bi bi-eye-slash');

    function handleToggleBalance() {
        if (eyeState === 'bi bi-eye') {
            setEyeState('bi bi-eye-slash');
            setBalance('******');
        } else {
            setEyeState('bi bi-eye');
            setBalance(`${user.walletBalance.toLocaleString()}₫`);
        }
    }

    return (
        <div className="mx-md-5 mx-sm-3 mt-md-0 mt-3 py-5 walletContainer">
            <h2 className='ps-sm-5 ps-2 mb-0'>My wallet: {balance} <i className={eyeState} onClick={handleToggleBalance}></i></h2>
            
            <div className='breakContainer d-flex justify-content-center my-3'>
                <hr />
            </div>

            <div>
                Add money to wallet (add later)
            </div>
        </div>
    )
}
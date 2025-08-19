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
        <div>
            
        </div>
    )
}
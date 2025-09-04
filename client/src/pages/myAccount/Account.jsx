import './Account.css'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearUser } from '../../redux/userSlice.js';

export default function Account() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await axios.get('http://localhost:3000/logout', { withCredentials: true });
        } catch (err) {
            // ignore error
        }
        dispatch(clearUser());
        navigate('/');
    };

    return (
        <>
        </>
    )
}
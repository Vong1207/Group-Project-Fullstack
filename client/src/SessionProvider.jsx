/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Tran Gia Vong
// # ID: 4012094 */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser, clearUser } from "./redux/userSlice.js";

export default function SessionProvider({ children }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/session", { withCredentials: true });
                if (res.data && res.data.loggedIn && res.data.user) {
                    dispatch(setUser(res.data.user));
                } else {
                    dispatch(clearUser());
                }
            } catch {
                dispatch(clearUser());
            } finally {
                setLoading(false);
            }
        };
        fetchSession();
    }, [dispatch]);

    if (loading) return (
        <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
            <img src="/loading.gif" alt="Loading" style={{ width: '10rem', height: '10rem' }} />
        </div>
    );
    return children;
}
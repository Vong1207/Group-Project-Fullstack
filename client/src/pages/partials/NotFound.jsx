// # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Nguyen Trong Nhan
// # ID: s3975356
import './NotFound.css'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center vh-100 vw-100 position-relative'>
            <img className='notfoundImage' src="/brandProfile/notfound.png" alt="Not Found image" />
            <h1 className='fw-bold text-center mt-3'>The page you are looking for is from another dimension</h1>
            <Link to={'/'} className='position-absolute top-0 start-0 ms-3 mt-3'>{`<-- Escape this dimension`}</Link>
        </div>
    )
}
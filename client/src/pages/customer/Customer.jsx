import { Outlet, Link } from 'react-router-dom'
import './Customer.css'

export default function Customer() {
    return (
        <div className="container-fluid px-0">
            <div className="row mx-0">
                {/* Sidebar on -md breakpoint */}
                <div className="col-lg-2 col d-md-flex d-none flex-column justify-content-between px-0" id="sidebar">
                    <div>
                        <div className='my-5 text-center'>
                            <i className='fi fi-ts-circle-user fs-1'></i>
                        </div>

                        <div className='ps-4 py-2 fs-5 tabNameContainer'>
                            <Link to='wallet' className='tabName'>
                                <i className='fi fi-ts-wallet me-2'></i> Wallet
                            </Link>
                        </div>
                        <div className='ps-4 py-2 fs-5 tabNameContainer'>
                            <Link to='cart' className='tabName'>
                                <i className='fi fi-ts-shopping-cart me-2'></i> Cart
                            </Link>
                        </div>
                        <div className='ps-4 py-2 fs-5 tabNameContainer'>
                            <Link to='purchased' className='tabName'>
                                <i className='fi fi-ts-checklist-task-budget me-2'></i> Purchased
                            </Link>
                        </div>
                    </div>

                    <div className='d-flex justify-content-center align-items-center' id='homeBtnContainer'>
                        <button type='button' id='homeBtn' className='px-3 py-2'>Back to Home</button>
                    </div>
                </div>

                <div className="col-lg-10 col" id="userInfo">
                    
                </div>
            </div>
        </div>
    )
}
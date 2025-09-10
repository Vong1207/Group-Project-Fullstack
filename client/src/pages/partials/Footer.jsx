import './Footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer>
            <div className='container px-sm-0'>
                <div className='row mx-0 py-5'>
                    <div className='col-md-7 col-12'>
                        <h1 className='brandName fs-3 mb-4'>CARTELLO</h1>
                        <p><small><span className='bi bi-geo-alt-fill me-1'></span> 702 Nguyen Van Linh boulevard, Tan Hung ward, Ho Chi Minh city, Vietnam</small></p>
                        <p><small><span className='bi bi-telephone-fill me-1'></span> (+84) 28 3776 1369</small></p>
                        <p><small><span className='bi bi-envelope-fill me-1'></span> example@gmail.com</small></p>
                    </div>

                    <div className='col-md-5 col-12 mt-md-0 mt-5'>
                        <h2 className='fs-4 mb-4'>Follow us</h2>
                        <div className='d-flex gap-3 socialsContainer'>
                            <Link to='https://www.facebook.com/' target='blank'>
                                <button type='button'>
                                    <i className='bi bi-facebook'></i>
                                </button>
                            </Link>
                            <Link to='https://www.instagram.com' target='blank'>
                                <button type='button'>
                                    <i className='bi bi-instagram'></i>
                                </button>
                            </Link>
                            <Link to='https://www.tiktok.com' target='blank'>
                                <button type='button'>
                                    <i className='bi bi-tiktok'></i>
                                </button>
                            </Link>
                            <Link to='https://www.youtube.com' target='blank'>
                                <button type='button'>
                                    <i className='bi bi-youtube'></i>
                                </button>
                            </Link>
                            <Link to='https://www.linkedin.com' target='blank'>
                                <button type='button'>
                                    <i className='bi bi-linkedin'></i>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <hr />

                <div className='row text-center'>
                    <p>© 2025 by Cartello</p>
                </div>
            </div>
        </footer>
    )
}
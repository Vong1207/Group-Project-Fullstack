import './Footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="footer" >
            <div className='container px-sm-0'>
                <div className='row mx-0 py-5'>
                    <div className='col-md-7 col-12'>
                        <h1 className='brandName fs-3 mb-4'>CARTELLO</h1>
                        <p><small><span className='bi bi-geo-alt-fill me-1'></span> 702 Nguyen Van Linh boulevard, Tan Hung ward, Ho Chi Minh city, Vietnam</small></p>
                        <p><small><span className='bi bi-telephone-fill me-1'></span> (+84) 28 3776 1369</small></p>
                        <p><small><span className='bi bi-envelope-fill me-1'></span> CartelloGroup2025@gmail.com</small></p>
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
                    <p style={{ fontSize: '0.9rem', color: '#888' }}>
                        &copy; {new Date().getFullYear()} Cartello Group. All rights reserved.
                    </p>
                </div>
                <nav style={{ margin: '0.5rem 0 0 0', textAlign: 'center' }}>
                    <Link to="/about" style={{ margin: '0 12px', fontSize: '0.95em', color: '#aaa', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseOver={e => e.target.style.textDecoration = 'underline'}
                        onMouseOut={e => e.target.style.textDecoration = 'none'}
                    >About</Link>
                    <Link to="/privacy" style={{ margin: '0 12px', fontSize: '0.95em', color: '#aaa', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseOver={e => e.target.style.textDecoration = 'underline'}
                        onMouseOut={e => e.target.style.textDecoration = 'none'}
                    >Privacy</Link>
                    <Link to="/help" style={{ margin: '0 12px', fontSize: '0.95em', color: '#aaa', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseOver={e => e.target.style.textDecoration = 'underline'}
                        onMouseOut={e => e.target.style.textDecoration = 'none'}
                    >Help</Link>
                </nav>
            </div>
        </footer>
    )
}
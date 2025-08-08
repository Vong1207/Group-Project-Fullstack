import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer bg-dark text-light pt-5 pb-3" style={{boxShadow: '0 2px 16px rgba(0,0,0,0.15)', marginTop: '40px'}}>
            <div className="container">
                <div className="row gy-4">
                    <div className="col-md-3">
                        <h5 className="mb-3 footer-title-main">Ecommerce Shop</h5>
                        <p className="mb-1">RMIT University School, Nguyen Van Linh Street, District 7, Ho Chi Minh.</p>
                        <br />
                        <div className="mb-1">123456780</div>
                        <div>1234567890</div>
                    </div>
                    <div className="col-md-2 footer-col-sub">
                        <h5 className="mb-3 footer-title-sub">Menu</h5>
                        <ul className="list-unstyled">
                        <li><a href="#" className="text-decoration-none">Home</a></li>
                        <li><a href="#" className="text-decoration-none">About</a></li>
                        <li><a href="#" className="text-decoration-none">Contact</a></li>
                        </ul>
                    </div>
                    <div className="col-md-2 footer-col-sub">
                        <h5 className="mb-3 footer-title-sub">More</h5>
                        <ul className="list-unstyled">
                        <li><a href="#" className="text-decoration-none">Landing Pages</a></li>
                        <li><a href="#" className="text-decoration-none">FAQs</a></li>
                        </ul>
                    </div>
                    <div className="col-md-2 footer-col-sub">
                        <h5 className="mb-3 footer-title-sub">Categories</h5>
                        <ul className="list-unstyled">
                        <li><a href="#" className="text-decoration-none">SmartPhone</a></li>
                        <li><a href="#" className="text-decoration-none">Shoes</a></li>
                        <li><a href="#" className="text-decoration-none">Clothes</a></li>
                        <li><a href="#" className="text-decoration-none">Carousels</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3 footer-col-sub">
                        <h5 className="mb-3 footer-title-sub">Social Media Links</h5>
                        <div className="d-flex gap-3">
                            <a href="#"><i className="fab fa-facebook"></i></a>
                            <a href="#"><i className="fab fa-pinterest"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>
                <hr className="border-secondary my-4" />
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div className="mb-2 mb-md-0">2025 © Group 7</div>
                    {/* <div>
                        <a href="#" className="text-light text-decoration-none me-3">Terms of use</a>
                        <a href="#" className="text-light text-decoration-none">Privacy policy</a>
                    </div> */}
                </div>
            </div>
        </footer>
    )
}
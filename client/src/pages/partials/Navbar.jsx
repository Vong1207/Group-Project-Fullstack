import { Link, Form } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className='position-sticky sticky-top mb-3'>
      <nav className='navbar container px-0' id='mainNavbar'>
        <div className='row m-0 w-100 align-items-center py-2'>
          {/* Brand Name */}
          <div className='col-lg-2 col pe-0'>
            <Link to='/' className='brandName'>
              Brand Name
            </Link>
          </div>

          {/* Search Bar */}
          <div className='col-lg-8 col px-0'>
            <form action="/search" method='GET'>
              <div className='d-flex justify-content-start searchBarContainer'>
                <input className='ps-3 py-2' id='searchedName' name='searchedName' type="text" placeholder='Search for products and vendors' />
                <button type='submit' className='px-4 my-1 me-1'>
                  <i className='bi bi-search'></i>
                </button>
              </div>
            </form>
          </div>

          {/* Login/SignUp/Profile */}
          <div className='col-lg-2 col px-3 d-flex justify-content-around profileContainer'>
            <Link to='/login'>Login</Link>
            <p className='mb-0'>|</p>
            <Link to='/signUp'>Sign Up</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

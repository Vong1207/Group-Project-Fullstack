import { Link } from 'react-router-dom';
import './Navbar.css';
import { useEffect, useState } from 'react';
import axios from 'axios'

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/api/session', { withCredentials: true })
    .then(res => {
      if (res.data.loggedIn) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    })
    .catch(() => setUser(null))
  }, []);

  const profilePath = user ? '/customer' : '/signIn';

  return (
    <header className='position-sticky sticky-top mb-3'>
      <nav className='navbar container px-0' id='mainNavbar'>
        <div className='row m-0 w-100 align-items-center py-2'>
          {/* Brand Name */}
          <div className='col-lg-2 d-lg-block d-none pe-0'>
            <Link to='/' className='brandName'>
              Brand Name
            </Link>
          </div>

          {/* Search Bar */}
          <div className='col-lg-8 col-sm-10 col-9 ps-sm-0 pe-0'>
            <form action="/search" method='GET'>
              <div className='d-flex justify-content-start searchBarContainer'>
                <input className='ps-3 py-2' id='searchedName' name='searchedName' type="text" placeholder='Vendor/Product' />
                <button type='submit' className='px-4 my-1 me-1'>
                  <i className='bi bi-search'></i>
                </button>
              </div>
            </form>
          </div>

          {/* Login/SignUp/Profile */}
          <div className='col-sm-2 col-3 px-3 d-flex justify-content-end profileContainer'>
            <Link to={profilePath}>
              <button type='button' className='profileBtn d-flex justify-content-center align-items-center p-0'>
                <i className='bi bi-person-fill'></i>
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

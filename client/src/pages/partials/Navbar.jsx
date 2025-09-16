/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Nguyen Vu Linh
// # ID: 3999487 */
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const user = useSelector(state => state.user.user);
  const profilePath = user ? '/myAccount' : '/signIn';
  const defaultAvatar = '/customerProfile/defaultProfile.png';
  // Always show avatar if user exists, fallback to default if missing
  const avatarSrc = user ? (user.avatar || defaultAvatar) : defaultAvatar;

  return (
    <header className='position-sticky sticky-top mb-3'>
      <nav className='navbar container px-0' id='mainNavbar'>
        <div className='row m-0 w-100 align-items-center py-2'>
          {/* Brand Name */}
          <div className='col-lg-2 d-lg-block d-none pe-0'>
            <Link to='/' className='brandName'>
              <img src="/brandProfile/logo.png" id="logo"  />
            </Link>
          </div>

          {/* Search Bar */}
          <div className='col-lg-8 col-sm-10 col-9 ps-sm-0 pe-0'>
            <form action="/search" method='GET'>
              <div className='d-flex justify-content-start searchBarContainer'>
                <input className='ps-3 py-2' id='searchedName' name='searchedName' type="text" placeholder='Product Name' />
                <button type='submit' className='px-4 my-1 me-1'>
                  <i className='bi bi-search'></i>
                </button>
              </div>
            </form>
          </div>

          {/* Login/SignUp/Profile */}
          <div className='col-sm-2 col-3 px-3 d-flex justify-content-end profileContainer'>
            <Link to={profilePath}>
              {/* If user not exist then display button */}
              {!user && (
                <button type='button' className='d-flex justify-content-center align-items-center'>
                  <i className='bi bi-person-fill'></i>
                </button>
              )}

              {/* If user logged in then display avatar (fallback to default if missing) */}
              {user && (
                <img src={avatarSrc} alt="Profile" />
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

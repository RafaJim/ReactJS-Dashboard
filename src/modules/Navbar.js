import '../styles/navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    const logOut = () => {
        localStorage.clear();
    }

    return (
        <nav className="navbar">
            <h1 className="navbar-header">
                Micro Ruta
            </h1>
            <ul className="nav-menu">
                <li><NavLink to='/createReview' className="navLinks">Create new review</NavLink></li>
                <li><NavLink to='/showReviews' className='navLinks'>Show Reviews</NavLink></li>
            </ul>
            <NavLink to="/" className="btnLogin" onClick={ logOut }>Log out</NavLink>
        </nav>
    );
}

export default Navbar;





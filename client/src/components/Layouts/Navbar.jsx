import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../store/Auth';
import { ShoppingCart, User } from 'lucide-react';
import SearchInput from '../Form/SearchInput';

const Navbar = () => {
  const { isLoggedIn, user, LogoutUser } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-lg">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          Rahul Shop
        </NavLink>
        <SearchInput/>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" activeclassname="active">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/categorydemo" className="nav-link" activeclassname="active">
                Category
              </NavLink>
            </li>
            {isLoggedIn ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user && user.photo ? (
                    <img
                      src={`http://localhost:7000/api/v1/auth/user/photo/${user._id}`}
                      alt="User"
                      className="user-avatar"
                      style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: '50%' }}
                    />
                  ) : (
                    <User size={32} className="text-primary" />
                  )}
                </a>
                <ul className="dropdown-menu dropdown-menu-end animate slideIn">
                  <li><NavLink to="/admin" className="dropdown-item">Dashboard</NavLink></li>
                  <li><NavLink to="/profile" className="dropdown-item">Profile</NavLink></li>
                  <li><NavLink to="/reports" className="dropdown-item">Reports</NavLink></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><NavLink to="/logout" className="dropdown-item" onClick={LogoutUser}>Logout</NavLink></li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link" activeclassname="active">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link" activeclassname="active">
                    Login
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link position-relative" activeclassname="active">
                <ShoppingCart size={24} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  0
                  <span className="visually-hidden">items in cart</span>
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
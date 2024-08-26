import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../store/Auth';
import { ShoppingCart, User } from 'lucide-react';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';

const Navbar = () => {
  const { isLoggedIn, user, LogoutUser } = useAuth();
  const { categories, error } = useCategory();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-lg">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          Rahul Shop
        </NavLink>
        <SearchInput />
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
              <NavLink to="/" className="nav-link" activeClassName="active">
                Home
              </NavLink>
            </li>

            {/* Categories dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="categoriesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu" aria-labelledby="categoriesDropdown">
                {error ? (
                  <li>
                    <span className="dropdown-item">Error loading categories</span>
                  </li>
                ) : categories.length > 0 ? (
                  categories.map((c) => (
                    <li key={c._id}>
                      <NavLink to={`/category/${c.slug}`} className="dropdown-item">
                        {c.name}
                      </NavLink>
                    </li>
                  ))
                ) : (
                  <li>
                    <span className="dropdown-item">No Categories Found</span>
                  </li>
                )}
              </ul>
            </li>

            {isLoggedIn ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  id="userDropdown"
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
                <ul className="dropdown-menu dropdown-menu-end animate slideIn" aria-labelledby="userDropdown">
                  {user && user.isAdmin ? (
                    <li>
                      <NavLink to="/admin/homedash" className="dropdown-item">
                        Admin Dashboard
                      </NavLink>
                    </li>
                  ) : (
                    <li>
                      <NavLink to="/userdash/profile" className="dropdown-item">
                        User Dashboard
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <NavLink to="/profile" className="dropdown-item">
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/reports" className="dropdown-item">
                      Reports
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <NavLink to="/" className="dropdown-item" onClick={LogoutUser}>
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link" activeClassName="active">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link" activeClassName="active">
                    Login
                  </NavLink>
                </li>
              </>
            )}

            <li className="nav-item">
              <NavLink to="/cart" className="nav-link position-relative" activeClassName="active">
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

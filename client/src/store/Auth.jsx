import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const AuthorizationToken = `Bearer ${token}`;

  // Function to store the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  // Function to authenticate user
  const userAuthentication = async () => {
    if (!token) return;

    try {
      const response = await fetch("http://localhost:7000/api/v1/auth/user-auth", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      } else {
        console.error("Error fetching user data", await response.text());
        LogoutUser();
        // Optional: Redirect to login page
      }
    } catch (error) {
      console.error(error);
      LogoutUser();
    }
  };

  // Function to fetch all users data
  const getAllUsersData = async () => {
    if (!token) return;

    try {
      console.log('Authorization Token:', AuthorizationToken); // Debugging log
      const response = await fetch('http://localhost:7000/api/v1/admin/users', {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Fetched data:', data); // Log the fetched data for debugging

      // Assuming the API response is an array of users
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.warn('Unexpected data format:', data);
      }

    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getAllUsersData();
    }
  }, [isLoggedIn, AuthorizationToken]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, AuthorizationToken, users }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};

import React from 'react';
import { useAuth } from '../../store/Auth';

const Users = () => {
  const { users } = useAuth();

  console.log('Users:', users); // Debugging log

  return (
    <div className="container">
      {users && users.length > 0 ? (
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>
                  <img 
                    src={`http://localhost:7000/api/v1/auth/user/photo/${user._id}`} 
                    alt="User Avatar" 
                    className="user-avatar" 
                    onError={(e) => e.target.src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"} // Fallback image
                  />
                  {user.name}
                </td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default Users;

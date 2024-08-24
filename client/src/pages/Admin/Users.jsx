import React from 'react';
import { useAuth } from '../../store/Auth';
import { styled } from '@stitches/react';

const Container = styled('div', {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '2rem',
  fontFamily: 'Arial, sans-serif',
});

const Table = styled('table', {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0 1rem',
});

const TableHeader = styled('th', {
  textAlign: 'left',
  padding: '1rem',
  background: '#f0f0f0',
  color: '#333',
  fontWeight: 'bold',
  borderRadius: '8px',
});

const TableRow = styled('tr', {
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
  },
});

const TableCell = styled('td', {
  padding: '1rem',
  background: 'white',
  '&:first-child': { borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' },
  '&:last-child': { borderTopRightRadius: '8px', borderBottomRightRadius: '8px' },
});

const UserAvatar = styled('img', {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  marginRight: '1rem',
  objectFit: 'cover',
});

const UserName = styled('span', {
  fontWeight: 'bold',
});

const NoUsers = styled('p', {
  textAlign: 'center',
  fontSize: '1.2rem',
  color: '#666',
});

const Users = () => {
  const { users } = useAuth();

  console.log('Users:', users); // Debugging log

  return (
    <Container>
      {users && users.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Address</TableHeader>
              <TableHeader>Phone</TableHeader>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>
                  <UserAvatar
                    src={`http://localhost:7000/api/v1/auth/user/photo/${user._id}`}
                    alt="User Avatar"
                    onError={(e) => e.target.src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"}
                  />
                  <UserName>{user.name}</UserName>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.phone}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      ) : (
        <NoUsers>No users found</NoUsers>
      )}
    </Container>
  );
};

export default Users;
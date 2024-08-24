import React from 'react';
import { FaUserCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { IoMdCart } from 'react-icons/io';
import { MdShoppingBag } from 'react-icons/md';
import { GiStarsStack } from 'react-icons/gi';

const CardsDashboard = () => {
  // Static data for the dashboard
  const stats = {
    users: { count: 153, isIncrease: true },
    orders: { count: 3, isIncrease: false },
    products: { count: 35, isIncrease: true },
    reviews: { count: 9, isIncrease: true },
  };

  const DashboardBox = ({ title, count, icon, color, isIncrease }) => (
    <div style={{
      background: `linear-gradient(135deg, ${color.join(', ')})`,
      borderRadius: '15px',
      padding: '25px',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
      height: '200px',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ fontSize: '2.5rem', opacity: 0.8 }}>{icon}</div>
      <div>
        <h3 style={{ margin: '0 0 10px', fontSize: '1.2rem', fontWeight: 'normal' }}>{title}</h3>
        <p style={{ margin: 0, fontSize: '2.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          {count.toLocaleString()}
          <span style={{
            marginLeft: '10px',
            fontSize: '1.5rem',
            color: isIncrease ? '#4caf50' : '#f44336', // Green for increase, red for decrease
          }}>
            {isIncrease ? <FaArrowUp /> : <FaArrowDown />}
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '40px' }}>
      <DashboardBox
        title="Total Users"
        count={stats.users.count}
        icon={<FaUserCircle />}
        color={["#1da256", "#48d483"]} // Green gradient
        isIncrease={stats.users.isIncrease}
      />
      <DashboardBox
        title="Total Orders"
        count={stats.orders.count}
        icon={<IoMdCart />}
        color={["#c012e2", "#eb64fe"]} // Pink gradient
        isIncrease={stats.orders.isIncrease}
      />
      <DashboardBox
        title="Total Products"
        count={stats.products.count}
        icon={<MdShoppingBag />}
        color={["#2c78e5", "#60aff5"]} // Blue gradient
        isIncrease={stats.products.isIncrease}
      />
      <DashboardBox
        title="Total Reviews"
        count={stats.reviews.count}
        icon={<GiStarsStack />}
        color={["#e1950e", "#f3cd29"]} // Yellow gradient
        isIncrease={stats.reviews.isIncrease}
      />
    </div>
  );
};

export default CardsDashboard;

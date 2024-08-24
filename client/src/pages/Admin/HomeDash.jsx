import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { FaUsers, FaShoppingCart, FaBoxes, FaDollarSign } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const HomeDash = () => {
  const Card = ({ title, value, icon, gradient, increase }) => (
    <div style={{
      background: `linear-gradient(135deg, ${gradient})`,
      borderRadius: '15px',
      padding: '25px',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
      height: '200px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div style={{ fontSize: '2.5rem', opacity: 0.8 }}>{icon}</div>
      <div>
        <h3 style={{ margin: '0 0 10px', fontSize: '1.2rem', fontWeight: 'normal' }}>{title}</h3>
        <p style={{ margin: 0, fontSize: '2.2rem', fontWeight: 'bold' }}>{value}</p>
        <p style={{ margin: '5px 0 0', fontSize: '0.9rem', opacity: 0.8 }}>{increase} increase</p>
      </div>
    </div>
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'Sales Overview',
        color: '#333',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
    scales: {
      x: {
        ticks: {
          color: '#333',
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
      },
      y: {
        ticks: {
          color: '#333',
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const lineChartData = {
    labels,
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.3)',
        fill: true,
      },
      {
        label: 'Orders',
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.3)',
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: [12, 19, 3, 5, 2, 3, 9],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        borderRadius: 5,
        barPercentage: 0.7,
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Electronics', 'Clothing', 'Books', 'Home'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f4f6f8' }}>
      <h1 style={{ marginBottom: '30px', color: '#333', fontSize: '2.5rem' }}>Admin Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '40px' }}>
        <Card title="Total Users" value="1,234" icon={<FaUsers />} gradient="#667eea, #764ba2" increase="5%" />
        <Card title="Total Orders" value="5,678" icon={<FaShoppingCart />} gradient="#2193b0, #6dd5ed" increase="12%" />
        <Card title="Total Products" value="9,101" icon={<FaBoxes />} gradient="#ee9ca7, #ffdde1" increase="3%" />
        <Card title="Total Sales" value="$12,345" icon={<FaDollarSign />} gradient="#11998e, #38ef7d" increase="8%" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '30px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '25px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Sales Overview</h2>
          <div style={{ height: '300px' }}>
            <Line options={chartOptions} data={lineChartData} />
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '25px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Revenue by Month</h2>
          <div style={{ height: '300px' }}>
            <Bar options={chartOptions} data={barChartData} />
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '25px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Product Categories</h2>
          <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Doughnut data={doughnutChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDash;

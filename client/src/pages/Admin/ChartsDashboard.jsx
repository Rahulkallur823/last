import React from 'react';
import { Chart } from 'react-google-charts';

const ChartsDashboard = () => {
  const data = [
    ['Month', 'Orders'],
    ['Jan', 65],
    ['Feb', 59],
    ['Mar', 80],
    ['Apr', 81],
    ['May', 56],
    ['Jun', 55],
  ];

  const options = {
    title: 'Monthly Orders',
    chartArea: { width: '70%' },
    hAxis: {
      title: 'Orders',
      minValue: 0,
      textStyle: {
        color: '#333', // Darker text color for hAxis labels
      },
    },
    vAxis: {
      title: 'Month',
      textStyle: {
        color: '#333', // Darker text color for vAxis labels
      },
      gridlines: { color: '#ddd', count: 4 }, // Light grid lines for vAxis
    },
    colors: ['#1b9e77'],
    backgroundColor: '#fff', // Light background color for the chart area
    legend: { position: 'none' },
    animation: {
      startup: true,
      duration: 1500,
      easing: 'inAndOut',
    },
    // Add border styling for the chart container
    containerBackgroundColor: '#f9f9f9',
    containerBorderColor: '#ddd',
    containerBorderWidth: 1,
  };

  const lineData = [
    ['Month', 'Sales'],
    ['Jan', 40],
    ['Feb', 50],
    ['Mar', 60],
    ['Apr', 70],
    ['May', 90],
    ['Jun', 100],
  ];

  const lineOptions = {
    title: 'Sales Trend',
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: {
      textStyle: {
        color: '#333', // Darker text color for hAxis labels
      },
    },
    vAxis: {
      textStyle: {
        color: '#333', // Darker text color for vAxis labels
      },
      gridlines: { color: '#ddd', count: 4 }, // Light grid lines for vAxis
    },
    colors: ['#ff5722'],
    backgroundColor: '#fff', // Light background color for the chart area
    animation: {
      startup: true,
      duration: 1500,
      easing: 'inAndOut',
    },
    // Add border styling for the chart container
    containerBackgroundColor: '#f9f9f9',
    containerBorderColor: '#ddd',
    containerBorderWidth: 1,
  };

  return (
    <div className="row">
      <div className="col-md-6 mb-4">
        <div className="card shadow-lg" style={{ borderRadius: '20px', overflow: 'hidden', background: 'linear-gradient(135deg, #a2c2e7, #c3e1f5)' }}>
          <div className="card-header text-dark" style={{ background: 'transparent', borderBottom: 'none', padding: '15px' }}>
            <h5 className="mb-0">Monthly Orders</h5>
          </div>
          <div className="card-body" style={{ backgroundColor: '#fff', padding: '20px' }}>
            <Chart
              chartType="Bar"
              width="100%"
              height="400px"
              data={data}
              options={options}
            />
          </div>
        </div>
      </div>
      <div className="col-md-6 mb-4">
        <div className="card shadow-lg" style={{ borderRadius: '20px', overflow: 'hidden', background: 'linear-gradient(135deg, #a2c2e7, #c3e1f5)' }}>
          <div className="card-header text-dark" style={{ background: 'transparent', borderBottom: 'none', padding: '15px' }}>
            <h5 className="mb-0">Sales Trend</h5>
          </div>
          <div className="card-body" style={{ backgroundColor: '#fff', padding: '20px' }}>
            <Chart
              chartType="Line"
              width="100%"
              height="400px"
              data={lineData}
              options={lineOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsDashboard;

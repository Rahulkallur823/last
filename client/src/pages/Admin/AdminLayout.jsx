import { FaCartPlus, FaDollarSign, FaMoneyBillWave, FaUsers } from "react-icons/fa";
import MetricCard from "./Card";
import SalesOverview from "./SalesOverview";
import CustomerGrowth from "./CustomerGrowth";
import RecentOrders from "./RecentOrders";
import { Outlet } from "react-router-dom";






const AdminLayout = () => {
    const salesData = [{ date: 'January', sales: 1000 }, { date: 'February', sales: 1500 }];
const orders = [
  { id: '001', customer: 'John Doe', amount: '$50', status: 'Shipped' },
  { id: '002', customer: 'Jane Smith', amount: '$75', status: 'Pending' },
];
const customersData = [{ month: 'January', customers: 50 }, { month: 'February', customers: 75 }];

  return (
    <>
<div className="row mb-4">
  <div className="col-md-3">
    <MetricCard title="New Orders" value="123" icon={<FaCartPlus />} />
  </div>
  <div className="col-md-3">
    <MetricCard title="Sales" value="$4567" icon={<FaDollarSign />} />
  </div>
  <div className="col-md-3">
    <MetricCard title="Profit" value="$890" icon={<FaMoneyBillWave />} />
  </div>
  <div className="col-md-3">
    <MetricCard title="Total Profit" value="$3456" icon={<FaUsers />} />
  </div>
</div>
<div className="row mb-4">
  <div className="col-md-6">
    <SalesOverview data={salesData} />
  </div>
  <div className="col-md-6">
    <CustomerGrowth data={customersData} />
  </div>
</div>
<div className="row">
  <div className="col-md-12">
    <RecentOrders orders={orders} />
  </div>
</div>
<Outlet/>
</>
  )
}

export default AdminLayout;
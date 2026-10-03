import OrdersChart from "../components/OrdersChart";
import orders from "../data/ordersData";
import products from "../data/productsData";
import users from "../data/usersData";
function Dashboard(){
    return(
<div className="container-fluid">
  <h1>Dashboard</h1>
  <div className="row mt-4">
    <div className="col-md-4">
        <div className="card p-3 shadow-sm">
            <h5>Total Users</h5>
            <h2>{users.length}</h2>
        </div>
    </div>
    <div className="col-md-4">
        <div className="card p-3 shadow-sm">
            <h5>Total Products</h5>
            <h2>{products.length}</h2>
        </div>
    </div>
    <div className="col-md-4">
        <div className="card p-3 shadow-sm">
            <h5>Total Orders</h5>
            <h2>{orders.length}</h2>
        </div>
    </div>

  </div>
   <OrdersChart />
</div>
    )
}
export default Dashboard;
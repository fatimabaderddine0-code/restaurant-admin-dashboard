import { Link } from"react-router-dom";
function Sidebar(){
    return(
        <div className="sidebar">
            <h3>Admin Panel</h3>

            <Link to="/dashboard">Dashboard</Link>
            <Link to="/users">Users</Link>
            <Link to="/products">Products</Link>
            <Link to="/orders">Orders</Link>
        </div>
    );
}
export default Sidebar;
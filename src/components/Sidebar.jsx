import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>La Tavola Admin</h2>

      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Products
      </NavLink>

      <NavLink
        to="/categories"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Categories
      </NavLink>
      <NavLink
  to="/site-content"
  className={({ isActive }) => (isActive ? "active-link" : "")}
>
  Site Content
</NavLink>
    </aside>
  );
}

export default Sidebar;
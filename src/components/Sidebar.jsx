import { useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>La Tavola Admin</h2>

        <button
          className="sidebar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      <div className={menuOpen ? "sidebar-links open" : "sidebar-links"}>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/site-content">Site Content</NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
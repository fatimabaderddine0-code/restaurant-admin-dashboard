function TopNavbar() {
  const adminEmail = localStorage.getItem("adminEmail");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminEmail");

    window.location.href = "#/login";
  };

  return (
    <nav className="top-navbar">
      <h4 className="mb-0">La Tavola Dashboard</h4>

      <div className="d-flex align-items-center gap-3">
        <span>{adminEmail || "Admin"}</span>

        <button
          className="btn btn-outline-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default TopNavbar;
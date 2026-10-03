function TopNavbar(){
    return(
        <div className="top-navbar">
            <h4>Restaurant Dashboard</h4>
            <div className="d-flex align-items-center gap-3">
                <span>Admin User</span>
                <button className="btn btn-outline-danger">
                    Logout
                </button>
            </div>

        </div>
    );

}
export default TopNavbar;
import { useState } from "react";
import orders from "../data/ordersData";

function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 2;

  const filteredOrders = orders.filter((order) =>
    order.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const totalPages = Math.ceil(
    filteredOrders.length / ordersPerPage
  );

  return (
    <div className="container-fluid">
      <h2 className="page-title">Orders List</h2>

      <input
        type="text"
        className="form-control my-3"
        placeholder="Search orders..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user}</td>
              <td>${order.total}</td>
              <td>{order.status}</td>

              <td>
                <button className="btn btn-warning btn-sm me-2">
                  Edit
                </button>

                <button className="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="d-flex gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className="btn pagination-btn btn-sm"
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Orders;
import { useState } from "react";
import products from "../data/productsData";
function Products(){
    const[searchTerm,setSearchTerm]=useState("");
    const[currentPage,setCurrentPage]=useState(1);
    const productsPerPage = 2;
    const filteredProducts = products.filter((product)=>
       product.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
);
    const indexOfLastProducts = currentPage *  productsPerPage;
    const indexOfFirstProducts =indexOfLastProducts - productsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProducts,
        indexOfLastProducts
    );
    const totalPages= Math.ceil(
        filteredProducts.length / productsPerPage
    );
return(
    <div className="container-fluid">
        <h2 className="page-title">Products List</h2>

        <input
         type="text"
         className="form-control my-3"
         placeholder="Search products..."
         value={searchTerm}
         onChange={(event) => setSearchTerm(event.target.value)}
/>
 <div className="table-responsive">
 <table className="table table-bordered table-hover">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Category</th>
      <th>Price</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
  {currentProducts.map((product) => (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>${product.price}</td>

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
export default Products;
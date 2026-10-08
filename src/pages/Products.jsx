import { useEffect, useState } from "react";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const productsPerPage = 2;

  const loadProducts = () => {
    fetch("https://digital-menu-backend-731h.onrender.com/api/items")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log("Load products error:", error);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    fetch("https://digital-menu-backend-731h.onrender.com/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log("Load categories error:", error);
      });
  }, []);

  const clearForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategoryId("");
    setImage(null);
    setEditingId(null);
  };

  const handleSubmit = async () => {
    setMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first.");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category_id", categoryId);

    if (image) {
      formData.append("image", image);
    }

    const url = editingId
      ? `https://digital-menu-backend-731h.onrender.com/api/items/${editingId}`
      : "https://digital-menu-backend-731h.onrender.com/api/items";

    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const text = await response.text();

      let data = {};

      try {
        data = JSON.parse(text);
      } catch {
        data = {
          message: text,
        };
      }

      if (!response.ok) {
        setMessage(data.message || "Something went wrong.");
        return;
      }

      setMessage(
        editingId
          ? "Product updated successfully."
          : "Product added successfully."
      );

      loadProducts();
      clearForm();
      setShowForm(false);
    } catch (error) {
      console.log("Submit error:", error);
      setMessage("Could not connect to the server.");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first.");
      return;
    }

    try {
      const response = await fetch(
        `https://digital-menu-backend-731h.onrender.com/api/items/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Delete failed.");
        return;
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );

      setMessage("Product deleted successfully.");
    } catch (error) {
      console.log("Delete error:", error);
      setMessage("Could not connect to the server.");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setDescription(product.description || "");
    setPrice(product.price);
    setCategoryId(product.category_id);
    setImage(null);
    setMessage("");
    setShowForm(true);
  };

  const handleCancel = () => {
    clearForm();
    setShowForm(false);
    setMessage("");
  };

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct =
    currentPage * productsPerPage;

  const indexOfFirstProduct =
    indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  return (
    <div className="container-fluid">

      <h2 className="page-title">
        Products List
      </h2>

      <input
        type="text"
        className="form-control my-3"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
          setCurrentPage(1);
        }}
      />

      <button
        className="btn btn-success mb-3"
        onClick={() => {
          setShowForm(true);
          setEditingId(null);
          setName("");
          setDescription("");
          setPrice("");
          setCategoryId("");
          setImage(null);
          setMessage("");
        }}
      >
        + Add Product
      </button>

      {showForm && (
        <div className="card p-3 mb-4">

          <h4>
            {editingId
              ? "Edit Product"
              : "Add Product"}
          </h4>

          {message && (
            <div className="alert alert-info">
              {message}
            </div>
          )}

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Name"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
          />

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Description"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
          />

          <input
            type="number"
            className="form-control mb-2"
            placeholder="Price"
            value={price}
            onChange={(event) =>
              setPrice(event.target.value)
            }
          />

          <select
            className="form-select mb-2"
            value={categoryId}
            onChange={(event) =>
              setCategoryId(event.target.value)
            }
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            className="form-control mb-3"
            accept="image/*"
            onChange={(event) =>
              setImage(event.target.files[0])
            }
          />

          <div className="d-flex gap-2">

            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              {editingId
                ? "Update Product"
                : "Add Product"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>

          </div>

        </div>
      )}

      {message && !showForm && (
        <div className="alert alert-info">
          {message}
        </div>
      )}

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

                <td>
                  {
                    categories.find(
                      (category) =>
                        category.id ===
                        product.category_id
                    )?.name
                  }
                </td>

                <td>${product.price}</td>

                <td>

                  <button
                    type="button"
                    className="btn btn-warning btn-sm me-2"
                    onClick={() =>
                      handleEdit(product)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleDelete(product.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      <div className="d-flex gap-2">

        {Array.from(
          { length: totalPages },
          (_, index) => (
            <button
              type="button"
              key={index}
              className="btn pagination-btn btn-sm"
              onClick={() =>
                setCurrentPage(index + 1)
              }
            >
              {index + 1}
            </button>
          )
        )}

      </div>

    </div>
  );
}

export default Products;
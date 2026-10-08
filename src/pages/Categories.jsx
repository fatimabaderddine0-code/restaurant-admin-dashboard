import { useEffect, useState } from "react";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const loadCategories = () => {
    fetch("https://digital-menu-backend-731h.onrender.com/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log("Categories error:", error);
      });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async () => {
    setMessage("");

    if (!name.trim()) {
      setMessage("Category name is required.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first.");
      return;
    }

    const url = editingId
      ? `https://digital-menu-backend-731h.onrender.com//api/categories/${editingId}`
      : "https://digital-menu-backend-731h.onrender.com//api/categories";

    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Something went wrong.");
        return;
      }

      setMessage(
        editingId
          ? "Category updated successfully."
          : "Category added successfully."
      );

      setName("");
      setEditingId(null);
      setShowForm(false);

      loadCategories();
    } catch (error) {
      console.log("Category submit error:", error);
      setMessage("Could not connect to the server.");
    }
  };

  const handleEdit = (category) => {
    setName(category.name);
    setEditingId(category.id);
    setShowForm(true);
    setMessage("");
  };

  const handleDelete = async (id) => {
    setMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first.");
      return;
    }

    try {
      const response = await fetch(
        `https://digital-menu-backend-731h.onrender.com/api/categories/${id}`,
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

      setMessage("Category deleted successfully.");

      loadCategories();
    } catch (error) {
      console.log("Delete category error:", error);
      setMessage("Could not connect to the server.");
    }
  };

  const handleCancel = () => {
    setName("");
    setEditingId(null);
    setMessage("");
    setShowForm(false);
  };

  return (
    <div className="container-fluid">
      <h1 className="page-title">Categories</h1>

      <button
        className="btn btn-success mb-3"
        onClick={() => {
          setShowForm(true);
          setEditingId(null);
          setName("");
          setMessage("");
        }}
      >
        + Add Category
      </button>

      {showForm && (
        <div className="card p-4 shadow-sm mb-4">
          <h4>
            {editingId ? "Edit Category" : "Add Category"}
          </h4>

          <input
            className="form-control my-3"
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <div className="d-flex gap-2">
            <button
              className="btn btn-success"
              onClick={handleSubmit}
            >
              {editingId ? "Update Category" : "Add Category"}
            </button>

            <button
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>

          {message && (
            <p className="mt-3 mb-0">
              {message}
            </p>
          )}
        </div>
      )}

      {message && !showForm && (
        <p>{message}</p>
      )}

      <div className="card p-4 shadow-sm">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>

                <td>{category.name}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Categories;
import { useEffect, useState } from "react";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.log("Items error:", error);
      });

    fetch("http://localhost:5000/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log("Categories error:", error);
      });
  }, []);

  const foodItems = items.filter(
    (item) => item.category_id === 1
  );

  const drinkItems = items.filter(
    (item) => item.category_id === 2
  );

  const dessertItems = items.filter(
    (item) => item.category_id === 3
  );

  return (
    <div className="container-fluid">
      <h1 className="page-title">Dashboard</h1>

      <div className="row g-4 mt-2">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5>Total Categories</h5>
            <h2>{categories.length}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5>Total Menu Items</h5>
            <h2>{items.length}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5>Food Items</h5>
            <h2>{foodItems.length}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5>Drinks</h5>
            <h2>{drinkItems.length}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5>Desserts</h5>
            <h2>{dessertItems.length}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
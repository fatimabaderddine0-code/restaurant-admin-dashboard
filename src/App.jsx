import "./App.css";

import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";

import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import { useEffect } from "react";
function App() {
  useEffect(() => {
  document.title = "Restaurant Admin Dashboard";
}, []);
  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <TopNavbar />

        <Routes>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/users"
            element={<Users />}
          />
          <Route
            path="/products"
            element={<Products/>}
          />
          <Route 
            path="/orders"
            element={<Orders/>}
          />
        </Routes>

      </div>

    </div>
  );
}

export default App;
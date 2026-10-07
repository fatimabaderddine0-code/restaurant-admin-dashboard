import "./App.css";

import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";

import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Login from "./pages/Login";

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "La Tavola Admin";
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <TopNavbar />

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
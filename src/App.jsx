import "./App.css";

import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";

import SiteContent from "./pages/SiteContent";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Login from "./pages/Login";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.title = "La Tavola Admin";
  }, []);

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="app-layout">

      {!isLoginPage && <Sidebar />}

      <div className="main-content">

        {!isLoginPage && <TopNavbar />}

        <Routes>

          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />

          <Route
            path="/site-content"
            element={
              <ProtectedRoute>
                <SiteContent />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>
    </div>
  );
}

export default App;
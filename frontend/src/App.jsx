import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Claims from "./pages/Claims";
import ClaimDetails from "./pages/ClaimDetails";
import NewClaim from "./pages/NewClaim";
import Approvals from "./pages/Approvals";
import Finance from "./pages/Finance";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/login" element={<Login />} />
        {/* Register */}
        <Route path="/register" element={<Register />} />

        {/* Protected Application */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="app">
                <Sidebar />

                <div className="main-section">
                  <Navbar />

                  <main className="main-content">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/claims" element={<Claims />} />
                      <Route
                        path="/claims/:id"
                        element={<ClaimDetails />}
                      />
                      <Route
                        path="/new-claim"
                        element={<NewClaim />}
                      />


                      <Route
                        path="/approvals"
                        element={
                        <RoleProtectedRoute allowedRoles={["Manager"]}>
                        <Approvals />
                        </RoleProtectedRoute>
                      }
                      />
                      <Route
                        path="/finance"
                        element={
                          <RoleProtectedRoute allowedRoles={["Finance"]}>
                            <Finance />
                          </RoleProtectedRoute>
                        }
                      />

                    </Routes>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
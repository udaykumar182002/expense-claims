import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ allowedRoles, children }) {
  const role = localStorage.getItem("expense_role");

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RoleProtectedRoute;
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();

  const role = localStorage.getItem("expense_role") || "Staff";

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>EC</h2>
        <span>Expense Claims</span>
      </div>

      <nav className="sidebar-menu">
        {/* Dashboard - Everyone */}
        <Link
          to="/"
          className={`sidebar-link ${
            location.pathname === "/" ? "active" : ""
          }`}
        >
          <span>▣</span>
          Dashboard
        </Link>

        {/* Staff and Manager */}
        {(role === "Staff" || role === "Manager") && (
          <>
            <Link
              to="/claims"
              className={`sidebar-link ${
                location.pathname === "/claims" ? "active" : ""
              }`}
            >
              <span>▤</span>
              My Claims
            </Link>

            <Link
              to="/new-claim"
              className={`sidebar-link ${
                location.pathname === "/new-claim" ? "active" : ""
              }`}
            >
              <span>＋</span>
              New Claim
            </Link>
          </>
        )}

        {/* Manager only */}
        {role === "Manager" && (
          <Link
            to="/approvals"
            className={`sidebar-link ${
              location.pathname === "/approvals" ? "active" : ""
            }`}
          >
            <span>✓</span>
            Approvals
          </Link>
        )}

        {/* Finance only */}
        {role === "Finance" && (
          <Link
            to="/finance"
            className={`sidebar-link ${
              location.pathname === "/finance" ? "active" : ""
            }`}
          >
            <span>₹</span>
            Finance
          </Link>
        )}
      </nav>

      <div className="sidebar-bottom">
        <p>Expense Management</p>
        <small>Version 1.0</small>
      </div>
    </aside>
  );
}

export default Sidebar;
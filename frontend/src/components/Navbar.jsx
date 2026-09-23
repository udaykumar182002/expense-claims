import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
  localStorage.removeItem("expense_user");
  localStorage.removeItem("expense_role");
  navigate("/login");
};

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h2>Expense Claims</h2>
      </div>

      <div className="navbar-right">
        <span className="user-name">
           Uday Kumar ({localStorage.getItem("expense_role")})
        </span>


        <div className="profile-container">
          <button
            className="profile-button"
            onClick={() => setShowMenu(!showMenu)}
          >
            U
          </button>

          {showMenu && (
            <div className="profile-menu">
              <div className="profile-menu-header">
                <strong>Uday Kumar</strong>
                <span>{localStorage.getItem("expense_role")}</span>
              </div>

              <button
                onClick={() => alert("Profile page coming soon.")}
              >
                Profile
              </button>

              <button
                onClick={() => alert("Settings page coming soon.")}
              >
                Settings
              </button>

              <button
                className="menu-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
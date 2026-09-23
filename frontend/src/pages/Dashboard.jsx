import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your expense claims</p>
        </div>

        <button
          className="new-claim-button"
          onClick={() => navigate("/new-claim")}
        >
          + New Claim
        </button>
      </div>

      <div className="stat-card-container">
        <StatCard
          title="Total Claims"
          value="12"
          description="Claims submitted"
        />

        <StatCard
          title="Pending Claims"
          value="4"
          description="Waiting for approval"
        />

        <StatCard
          title="Approved Claims"
          value="8"
          description="Approved by manager"
        />

        <StatCard
          title="Total Paid"
          value="₹18,400"
          description="Paid this month"
        />
      </div>
    </div>
  );
}

export default Dashboard;
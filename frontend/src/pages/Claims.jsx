import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClaimCard from "../components/ClaimCard";

function Claims() {
  const navigate = useNavigate();

  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClaims = async () => {
    try {
      const token = localStorage.getItem("expense_token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/claims/my",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to load claims.");
        return;
      }

      setClaims(data.claims || []);
    } catch (error) {
      console.error("Error fetching claims:", error);
      alert("Cannot connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <h1>My Claims</h1>
        <p>Loading claims...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>My Claims</h1>
          <p>View and track your submitted expense claims.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("/new-claim")}
        >
          + New Claim
        </button>
      </div>

      {claims.length === 0 ? (
        <div className="empty-state">
          <h3>No claims found</h3>
          <p>You haven't submitted any expense claims yet.</p>

          <button
            className="primary-button"
            onClick={() => navigate("/new-claim")}
          >
            Create Your First Claim
          </button>
        </div>
      ) : (
        <div className="claims-list">
          {claims.map((claim) => (
            <ClaimCard
              key={claim._id}
              claim={{
                ...claim,
                id: claim._id,
                date: claim.claimDate,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Claims;
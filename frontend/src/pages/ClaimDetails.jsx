import { useNavigate, useParams } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";

function ClaimDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const claim = {
    id: id,
    title: "Client meeting travel",
    employee: "Rahul Sharma",
    category: "Travel",
    amount: "1,250",
    date: "18 Sep 2026",
    status: "Pending",
    description:
      "Travel expense for client meeting from Hyderabad to Gachibowli.",
    submittedDate: "19 Sep 2026",
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Claim Details</h1>
          <p>View complete information about this expense claim.</p>
        </div>

        <button
          className="back-button"
          onClick={() => navigate("/claims")}
        >
          ← Back to Claims
        </button>
      </div>

      <div className="claim-detail-card">
        <div className="claim-detail-header">
          <div>
            <h2>{claim.title}</h2>
            <p>{claim.id}</p>
          </div>

          <StatusBadge status={claim.status} />
        </div>

        <div className="detail-grid">
          <div>
            <span>Employee</span>
            <strong>{claim.employee}</strong>
          </div>

          <div>
            <span>Category</span>
            <strong>{claim.category}</strong>
          </div>

          <div>
            <span>Amount</span>
            <strong>₹{claim.amount}</strong>
          </div>

          <div>
            <span>Expense Date</span>
            <strong>{claim.date}</strong>
          </div>

          <div>
            <span>Submitted Date</span>
            <strong>{claim.submittedDate}</strong>
          </div>

          <div>
            <span>Claim ID</span>
            <strong>{claim.id}</strong>
          </div>
        </div>

        <div className="claim-description">
          <h3>Description</h3>
          <p>{claim.description}</p>
        </div>

        <div className="claim-timeline">
          <h3>Claim Status</h3>

          <div className="timeline-item">
            <span className="timeline-dot"></span>

            <div>
              <strong>Claim Submitted</strong>
              <p>19 Sep 2026</p>
            </div>
          </div>

          <div className="timeline-item">
            <span className="timeline-dot"></span>

            <div>
              <strong>Waiting for Manager Approval</strong>
              <p>Current status</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClaimDetails;
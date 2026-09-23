import {useNavigate} from "react-router-dom";


function ClaimCard({ claim }) {
  const navigate = useNavigate();



  return (
    <div className="claim-card">
      <div className="claim-card-top">
        <div>
          <h3>{claim.title}</h3>
          <p>{claim.employee}</p>
        </div>

        <span className={`claim-status ${claim.status.toLowerCase()}`}>
          {claim.status}
        </span>
      </div>

      <div className="claim-details">
        <div>
          <span>Category</span>
          <strong>{claim.category}</strong>
        </div>

        <div>
          <span>Date</span>
          <strong>{claim.date}</strong>
        </div>

        <div>
          <span>Amount</span>
          <strong>₹{claim.amount}</strong>
        </div>
      </div>

      <div className="claim-card-bottom">
        <span>Claim ID: {claim.id}</span>

        <button
          className="view-button"
          onClick={() => navigate(`/claims/${claim.id}`)}
        >
         View Details
</button>
      </div>
    </div>
  );
}

export default ClaimCard;
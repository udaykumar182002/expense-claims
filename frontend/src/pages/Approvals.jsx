import { useState } from "react";

function Approvals() {
  const [claims, setClaims] = useState([
    {
      id: "CLM-2001",
      employee: "Rahul Sharma",
      title: "Client meeting travel",
      category: "Travel",
      amount: 1250,
      status: "Pending",
      ownClaim: false,
    },
    {
      id: "CLM-2002",
      employee: "Priya Reddy",
      title: "Team lunch",
      category: "Meals",
      amount: 2480,
      status: "Pending",
      ownClaim: false,
    },
    {
      id: "CLM-2003",
      employee: "Arjun Kumar",
      title: "Office stationery",
      category: "Supplies",
      amount: 860,
      status: "Approved",
      ownClaim: false,
    },
    {
      id: "CLM-2004",
      employee: "You",
      title: "Manager travel expense",
      category: "Travel",
      amount: 1800,
      status: "Pending",
      ownClaim: true,
    },
  ]);

  const handleApprove = (id) => {
    setClaims((previousClaims) =>
      previousClaims.map((claim) =>
        claim.id === id
          ? { ...claim, status: "Approved" }
          : claim
      )
    );
  };

  const handleReject = (id) => {
    setClaims((previousClaims) =>
      previousClaims.map((claim) =>
        claim.id === id
          ? { ...claim, status: "Rejected" }
          : claim
      )
    );
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Approvals</h1>
          <p>Review and approve team expense claims</p>
        </div>
      </div>

      <div className="approval-list">
        {claims.map((claim) => (
          <div className="approval-card" key={claim.id}>
            <div className="approval-header">
              <div>
                <h2>{claim.title}</h2>
                <p>{claim.employee}</p>
              </div>

              <span
                className={`status-badge ${claim.status.toLowerCase()}`}
              >
                {claim.status}
              </span>
            </div>

            <div className="approval-details">
              <div>
                <span>Claim ID</span>
                <strong>{claim.id}</strong>
              </div>

              <div>
                <span>Category</span>
                <strong>{claim.category}</strong>
              </div>

              <div>
                <span>Amount</span>
                <strong>₹{claim.amount.toLocaleString()}</strong>
              </div>
            </div>

            <div className="approval-actions">
              {claim.ownClaim ? (
                <p className="own-claim-message">
                  You cannot approve your own claim.
                </p>
              ) : claim.status === "Pending" ? (
                <>
                  <button
                    className="reject-button"
                    onClick={() => handleReject(claim.id)}
                  >
                    Reject
                  </button>

                  <button
                    className="approve-button"
                    onClick={() => handleApprove(claim.id)}
                  >
                    Approve
                  </button>
                </>
              ) : (
                <p className="approval-completed">
                  This claim has been {claim.status.toLowerCase()}.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Approvals;

import { useState } from "react";

function Finance() {
  const [payments, setPayments] = useState([
    {
      id: "CLM-1003",
      employee: "Arjun Kumar",
      amount: 860,
      status: "Paid",
      date: "20 Sep 2026",
    },
    {
      id: "CLM-1005",
      employee: "Rahul Sharma",
      amount: 2150,
      status: "Paid",
      date: "19 Sep 2026",
    },
    {
      id: "CLM-1007",
      employee: "Priya Reddy",
      amount: 1480,
      status: "Pending",
      date: "18 Sep 2026",
    },
  ]);

  const handleMarkAsPaid = (id) => {
    setPayments((previousPayments) =>
      previousPayments.map((payment) =>
        payment.id === id
          ? {
              ...payment,
              status: "Paid",
              date: "22 Sep 2026",
            }
          : payment
      )
    );
  };

  const totalPaid = payments
    .filter((payment) => payment.status === "Paid")
    .reduce((total, payment) => total + payment.amount, 0);

  const pendingPayment = payments
    .filter((payment) => payment.status === "Pending")
    .reduce((total, payment) => total + payment.amount, 0);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Finance</h1>
          <p>Monitor monthly expenses and process payments</p>
        </div>
      </div>

      <div className="finance-summary">
        <div className="finance-card">
          <span>Total Monthly Spend</span>
          <strong>₹32,790</strong>
        </div>

        <div className="finance-card">
          <span>Paid Amount</span>
          <strong>₹{totalPaid.toLocaleString()}</strong>
        </div>

        <div className="finance-card">
          <span>Pending Payment</span>
          <strong>₹{pendingPayment.toLocaleString()}</strong>
        </div>

        <div className="finance-card">
          <span>Total Claims</span>
          <strong>26</strong>
        </div>
      </div>

      <div className="finance-section">
        <div className="section-header">
          <h2>Recent Payments</h2>
        </div>

        <div className="payment-list">
          {payments.map((payment) => (
            <div className="payment-row" key={payment.id}>
              <div>
                <strong>{payment.id}</strong>
                <span>{payment.employee}</span>
              </div>

              <div>
                <strong>₹{payment.amount.toLocaleString()}</strong>
                <span>{payment.date}</span>
              </div>

              <div>
                <span
                  className={`status-badge ${payment.status.toLowerCase()}`}
                >
                  {payment.status}
                </span>
              </div>

              <div>
                {payment.status === "Pending" && (
                  <button
                    className="pay-button"
                    onClick={() => handleMarkAsPaid(payment.id)}
                  >
                    Mark as Paid
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Finance;
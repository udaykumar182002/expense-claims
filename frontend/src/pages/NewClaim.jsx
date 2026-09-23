import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewClaim() {
  const navigate = useNavigate();

  const [claim, setClaim] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
    description: "",
  });

  const [receiptText, setReceiptText] = useState("");
  const [error, setError] = useState("");

  // Handle normal form fields
  const handleChange = (event) => {
    const { name, value } = event.target;

    setClaim({
      ...claim,
      [name]: value,
    });

    setError("");
  };

  // Process pasted receipt text
  const processReceipt = () => {
    if (!receiptText.trim()) {
      setError("Please paste receipt text first.");
      return;
    }

    const text = receiptText.toLowerCase();

    // Detect category
    let category = "Other";

    if (
      text.includes("uber") ||
      text.includes("ola") ||
      text.includes("taxi") ||
      text.includes("cab")
    ) {
      category = "Taxi";
    } else if (
      text.includes("hotel") ||
      text.includes("flight") ||
      text.includes("train") ||
      text.includes("travel")
    ) {
      category = "Travel";
    } else if (
      text.includes("restaurant") ||
      text.includes("food") ||
      text.includes("lunch") ||
      text.includes("dinner")
    ) {
      category = "Meals";
    } else if (
      text.includes("stationery") ||
      text.includes("office") ||
      text.includes("supplies")
    ) {
      category = "Supplies";
    }

    // Detect amount
    const amountMatch = receiptText.match(
      /(?:amount|total|price|₹|rs\.?)\s*[:\-]?\s*₹?\s*([0-9,]+(?:\.[0-9]+)?)/i
    );

    let amount = "";

    if (amountMatch) {
      amount = amountMatch[1].replace(/,/g, "");
    }

    // Detect date
    const dateMatch = receiptText.match(
      /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/
    );

    let date = "";

    if (dateMatch) {
      const day = dateMatch[1].padStart(2, "0");
      const month = dateMatch[2].padStart(2, "0");
      const year = dateMatch[3];

      // HTML date input requires YYYY-MM-DD
      date = `${year}-${month}-${day}`;
    }

    // Generate title
    let title = "";

    if (category === "Taxi") {
      title = "Taxi expense";
    } else if (category === "Travel") {
      title = "Travel expense";
    } else if (category === "Meals") {
      title = "Meal expense";
    } else if (category === "Supplies") {
      title = "Office supplies";
    } else {
      title = "Expense claim";
    }

    setClaim({
      title,
      category,
      amount,
      date,
      description: receiptText,
    });

    setError("");

    alert(
      "Receipt processed. Please review the claim details before submitting."
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate fields
    if (
      !claim.title ||
      !claim.category ||
      !claim.amount ||
      !claim.date ||
      !claim.description
    ) {
      setError("Please fill in all fields.");
      return;
    }

    // Validate amount
    if (Number(claim.amount) <= 0) {
      setError("Amount must be greater than ₹0.");
      return;
    }

    // Get existing claims
    const existingClaims =
      JSON.parse(localStorage.getItem("expense_claims")) || [];

    // Check possible duplicate
    const possibleDuplicate = existingClaims.find((existingClaim) => {
      const sameAmount =
        Number(existingClaim.amount) === Number(claim.amount);

      const sameCategory =
        existingClaim.category.toLowerCase() ===
        claim.category.toLowerCase();

      const existingDescription =
        existingClaim.description.toLowerCase().trim();

      const newDescription =
        claim.description.toLowerCase().trim();

      const sameDescription =
        existingDescription.includes(newDescription) ||
        newDescription.includes(existingDescription);

      return sameAmount && sameCategory && sameDescription;
    });

    // Duplicate warning
    if (possibleDuplicate) {
      const confirmDuplicate = window.confirm(
        `Possible duplicate claim found!\n\n` +
          `Claim ID: ${possibleDuplicate.id}\n` +
          `Amount: ₹${possibleDuplicate.amount}\n` +
          `Category: ${possibleDuplicate.category}\n\n` +
          `Do you still want to submit this claim?`
      );

      if (!confirmDuplicate) {
        return;
      }
    }

    // Create new claim
    const newClaim = {
      id: `CLM-${Date.now()}`,
      title: claim.title,
      employee: "You",
      category: claim.category,
      amount: Number(claim.amount),
      date: claim.date,
      status: "Pending",
      description: claim.description,
    };

    // Save claim
    localStorage.setItem(
      "expense_claims",
      JSON.stringify([...existingClaims, newClaim])
    );

    alert("Claim submitted successfully!");

    navigate("/claims");
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>New Claim</h1>
          <p>Submit a new expense claim</p>
        </div>
      </div>

      {/* Receipt Parser */}
      <div className="claim-form-card">
        <h2>Paste Receipt Text</h2>

        <p className="form-help">
          Paste the text from a receipt and we'll try to fill the
          claim details automatically.
        </p>

        <div className="form-group">
          <label>Receipt Text</label>

          <textarea
            value={receiptText}
            onChange={(event) => {
              setReceiptText(event.target.value);
              setError("");
            }}
            placeholder={`Example:

Uber
Hyderabad
22/09/2026
Total ₹780`}
            rows="7"
          />
        </div>

        <button
          type="button"
          className="process-receipt-button"
          onClick={processReceipt}
        >
          Process Receipt
        </button>
      </div>

      {/* Claim Form */}
      <div className="claim-form-card">
        <h2>Claim Details</h2>

        <p className="form-help">
          Review the automatically generated details and correct
          anything before submitting.
        </p>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          {/* Claim Title */}
          <div className="form-group">
            <label>Claim Title</label>

            <input
              type="text"
              name="title"
              value={claim.title}
              onChange={handleChange}
              placeholder="Example: Client meeting travel"
            />
          </div>

          {/* Category and Amount */}
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>

              <select
                name="category"
                value={claim.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                <option value="Travel">Travel</option>
                <option value="Meals">Meals</option>
                <option value="Supplies">Supplies</option>
                <option value="Taxi">Taxi</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Amount</label>

              <input
                type="number"
                name="amount"
                value={claim.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                min="1"
              />
            </div>
          </div>

          {/* Date */}
          <div className="form-group">
            <label>Expense Date</label>

            <input
              type="date"
              name="date"
              value={claim.date}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              value={claim.description}
              onChange={handleChange}
              placeholder="Describe the expense..."
              rows="5"
            />
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/claims")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-button"
            >
              Submit Claim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewClaim;
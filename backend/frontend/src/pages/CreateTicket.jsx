import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function CreateTicket() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // handles form submission
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // console.log("creating ticket...", form); // debug
      await api.post("/api/tickets", form);
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000); // redirect after 2 seconds
    } catch (err) {
      // console.error(err); // debug
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ct-root">
      {/* background effects */}
      <div className="ct-orb ct-orb-1" />
      <div className="ct-orb ct-orb-2" />
      <div className="ct-grid" />

      <div className="ct-wrapper">
        {/* back button */}
        <button className="ct-back" onClick={() => navigate("/")}>
          ← Back to Home
        </button>

        <div className="ct-card">
          {/* header */}
          <div className="ct-header">
            <div className="ct-icon-wrap">🎫</div>
            <div className="ct-tag">New Request</div>
            <h1 className="ct-title">
              Create a <span className="ct-accent">Ticket</span>
            </h1>
            <p className="ct-subtitle">
              Fill in the details below and our team will get back to you shortly.
            </p>
          </div>

          {success ? (
            // success message after creating ticket
            <div className="ct-success">
              <div className="ct-success-icon">✅</div>
              <h2>Ticket Created!</h2>
              <p>Redirecting you back to home...</p>
            </div>
          ) : (
            <form onSubmit={submit} className="ct-form">
              <div className="ct-row">
                <div className="ct-field">
                  <label className="ct-label">Customer Name</label>
                  <input
                    className="ct-input"
                    placeholder="John Doe"
                    value={form.customer_name}
                    onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                    required
                  />
                </div>
                <div className="ct-field">
                  <label className="ct-label">Email Address</label>
                  <input
                    className="ct-input"
                    type="email"
                    placeholder="john@example.com"
                    value={form.customer_email}
                    onChange={(e) => setForm({ ...form, customer_email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="ct-field">
                <label className="ct-label">Subject</label>
                <input
                  className="ct-input"
                  placeholder="Brief summary of your issue"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                />
              </div>

              <div className="ct-field">
                <label className="ct-label">Description</label>
                <textarea
                  className="ct-textarea"
                  placeholder="Describe your issue in detail..."
                  rows={5}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                />
              </div>

              <button className="ct-submit" type="submit" disabled={loading}>
                <span className="ct-btn-glow" />
                {loading ? (
                  <><span className="ct-spinner" /> Submitting...</>
                ) : (
                  <><span>✦</span> Submit Ticket <span>→</span></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;

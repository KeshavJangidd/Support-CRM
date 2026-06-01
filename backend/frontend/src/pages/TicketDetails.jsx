import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // fetch ticket details on mount
  useEffect(() => {
    api.get(`/api/tickets/${id}`)
      .then((res) => {
        setTicket(res.data);
        setStatus(res.data.status);
        setNotes(res.data.notes || "");
      })
      .catch(() => alert("Ticket not found"))
      .finally(() => setLoading(false));
  }, [id]);

  // update ticket status and/or notes
  const handleUpdate = async () => {
    setSaving(true);
    try {
      const res = await api.put(`/api/tickets/${id}`, { status, notes });
      // console.log("update response:", res.data); // debug
      setTicket(res.data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      alert("Failed to update ticket");
    } finally {
      setSaving(false);
    }
  };

  // helper to get the right css class for status badge
  const statusColor = (s) => {
    if (s === "open") return "tl-status-open";
    if (s === "in_progress") return "tl-status-progress";
    if (s === "closed") return "tl-status-closed";
    return "";
  };

  if (loading) return (
    <div className="ct-root">
      <div className="tl-empty">
        <div className="ct-spinner" style={{ width: 32, height: 32, borderWidth: 3 }} />
      </div>
    </div>
  );

  if (!ticket) return null;

  return (
    <div className="ct-root">
      <div className="ct-orb ct-orb-1" />
      <div className="ct-orb ct-orb-2" />
      <div className="ct-grid" />

      <div className="ct-wrapper" style={{ maxWidth: 760 }}>
        <button className="ct-back" onClick={() => navigate("/tickets")}>← Back to Tickets</button>

        <div className="ct-card">
          {/* header with ticket id and subject */}
          <div className="td-header">
            <div>
              <div className="ct-tag">Ticket #{ticket.ticket_id}</div>
              <h1 className="ct-title" style={{ fontSize: "1.8rem", textAlign: "left", marginBottom: 8 }}>
                {ticket.subject}
              </h1>
              <span className={`tl-status ${statusColor(ticket.status)}`} style={{ marginTop: 4, display: "inline-block" }}>
                {ticket.status === "in_progress" ? "In Progress" : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="td-divider" />

          {/* customer info section */}
          <div className="td-section">
            <div className="td-section-title">Customer Info</div>
            <div className="td-info-grid">
              <div className="td-info-item">
                <span className="td-info-label">Name</span>
                <span className="td-info-value">{ticket.customer_name}</span>
              </div>
              <div className="td-info-item">
                <span className="td-info-label">Email</span>
                <span className="td-info-value">{ticket.customer_email}</span>
              </div>
              <div className="td-info-item">
                <span className="td-info-label">Created</span>
                <span className="td-info-value">
                  {ticket.created_at ? new Date(ticket.created_at).toLocaleString() : "—"}
                </span>
              </div>
            </div>
          </div>

          <div className="td-divider" />

          {/* description section */}
          <div className="td-section">
            <div className="td-section-title">Description</div>
            <p className="td-desc">{ticket.description}</p>
          </div>

          <div className="td-divider" />

          {/* update section - status and notes */}
          <div className="td-section">
            <div className="td-section-title">Update Ticket</div>

            <div className="ct-field" style={{ marginBottom: 20 }}>
              <label className="ct-label">Status</label>
              <select
                className="ct-input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="ct-field" style={{ marginBottom: 24 }}>
              <label className="ct-label">Notes / Comments</label>
              <textarea
                className="ct-textarea"
                placeholder="Add internal notes or comments..."
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button className="ct-submit" onClick={handleUpdate} disabled={saving}>
              <span className="btn-glow" />
              {saving ? (
                <><span className="ct-spinner" /> Saving...</>
              ) : saved ? (
                <>✅ Saved!</>
              ) : (
                <>✦ Save Changes →</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function TicketList() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/tickets")
      .then((res) => setTickets(res.data))
      .catch(() => alert("Failed to load tickets"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (ticketId) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        await api.delete(`/api/tickets/${ticketId}`);
        setTickets(tickets.filter((t) => t.ticket_id !== ticketId));
      } catch {
        alert("Failed to delete ticket");
      }
    }
  };

  const filtered = tickets.filter((t) => {
    const matchSearch =
      t.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      t.customer_email.toLowerCase().includes(search.toLowerCase()) ||
      t.ticket_id.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      (t.description && t.description.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === "all" || t.status === filter;
    return matchSearch && matchFilter;
  });

  const statusColor = (status) => {
    if (status === "open") return "tl-status-open";
    if (status === "in_progress") return "tl-status-progress";
    if (status === "closed") return "tl-status-closed";
    return "";
  };

  const statusLabel = (status) => {
    if (status === "open") return "Open";
    if (status === "in_progress") return "In Progress";
    if (status === "closed") return "Closed";
    return status;
  };

  return (
    <div className="tl-root">
      <div className="ct-orb ct-orb-1" />
      <div className="ct-orb ct-orb-2" />
      <div className="ct-grid" />

      <div className="tl-wrapper">
        {/* Header */}
        <div className="tl-header">
          <button className="ct-back" onClick={() => navigate("/")}>← Back to Home</button>
          <div className="tl-title-row">
            <div>
              <div className="ct-tag">All Requests</div>
              <h1 className="tl-title">Support <span className="ct-accent">Tickets</span></h1>
            </div>
            <button className="cta-btn tl-new-btn" onClick={() => navigate("/create")}>
              <span className="btn-glow" />
              ✦ New Ticket
            </button>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="tl-controls">
          <div className="tl-search-wrap">
            <span className="tl-search-icon">🔍</span>
            <input
              className="tl-search"
              placeholder="Search by name, email, ID, subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="tl-filters">
            {["all", "open", "in_progress", "closed"].map((f) => (
              <button
                key={f}
                className={`tl-filter-btn ${filter === f ? "tl-filter-active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "All" : f === "in_progress" ? "In Progress" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets Table */}
        {loading ? (
          <div className="tl-empty">
            <div className="ct-spinner" style={{ width: 32, height: 32, borderWidth: 3 }} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="tl-empty">
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🎫</div>
            <p>No tickets found</p>
          </div>
        ) : (
          <div className="tl-table-wrap">
            <table className="tl-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.ticket_id} className="tl-row">
                    <td><span className="tl-id">#{t.ticket_id}</span></td>
                    <td>
                      <div className="tl-customer">{t.customer_name}</div>
                      <div className="tl-email">{t.customer_email}</div>
                    </td>
                    <td className="tl-subject">{t.subject}</td>
                    <td><span className={`tl-status ${statusColor(t.status)}`}>{statusLabel(t.status)}</span></td>
                    <td className="tl-date">
                      {t.created_at ? new Date(t.created_at).toLocaleDateString() : "—"}
                    </td>
                    <td style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <button
                        className="tl-view-btn"
                        onClick={() => navigate(`/ticket/${t.ticket_id}`)}
                      >
                        View →
                      </button>
                      <button
                        className="tl-delete-btn"
                        onClick={() => handleDelete(t.ticket_id)}
                        title="Delete ticket"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="tl-count">{filtered.length} ticket{filtered.length !== 1 ? "s" : ""} found</div>
      </div>
    </div>
  );
}

export default TicketList;

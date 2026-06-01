# 🎫 Support CRM

A full-stack customer support ticket management system built with **FastAPI**, **React**, and **PostgreSQL**.

🌐 **Live Demo:** [support-crm-six.vercel.app](https://support-crm-six.vercel.app)

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Styling | Custom CSS (Syne + Outfit fonts) |
| Backend | Python + FastAPI |
| Database | PostgreSQL (Render) |
| Deployment | Vercel (frontend) + Render (backend) |

---

## ✨ Features

- ✅ **Create Tickets** — Customer name, email, subject, description, auto-generated ID & timestamp
- ✅ **List All Tickets** — Clean table view with ID, Name, Subject, Status, Date
- ✅ **Search** — Real-time search across name, email, ID, subject, description
- ✅ **Filter by Status** — Open, In Progress, Closed
- ✅ **View & Update Tickets** — Detailed view, update status, add notes/comments
- ✅ **Delete Tickets** — Remove tickets from the list

---

## 📁 Project Structure

```
Support-CRM/
├── backend/
│   ├── frontend/          # React frontend (Vite)
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── CreateTicket.jsx
│   │   │   │   ├── TicketList.jsx
│   │   │   │   └── TicketDetails.jsx
│   │   │   ├── App.jsx
│   │   │   ├── App.css
│   │   │   └── api.js
│   │   └── package.json
│   ├── main.py            # FastAPI app + routes
│   ├── models.py          # SQLAlchemy models
│   ├── schemas.py         # Pydantic schemas
│   ├── database.py        # DB connection
│   └── requirements.txt
└── README.md
```

---

## 🛠️ Local Setup

### Backend

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload
```

Backend runs at: `http://127.0.0.1:8000`

### Frontend

```bash
# Navigate to frontend
cd backend/frontend

# Install dependencies
npm install

# Run dev server
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tickets` | Get all tickets |
| POST | `/api/tickets` | Create a new ticket |
| GET | `/api/tickets/{ticket_id}` | Get a single ticket |
| PATCH | `/api/tickets/{ticket_id}` | Update ticket status/notes |
| DELETE | `/api/tickets/{ticket_id}` | Delete a ticket |

---

## 🗄️ Database Schema

### Tickets Table
| Column | Type | Description |
|--------|------|-------------|
| id | Integer | Primary key |
| ticket_id | String | Unique ticket ID (e.g. a1b2c3d4) |
| customer_name | String | Customer's name |
| customer_email | String | Customer's email |
| subject | String | Ticket subject |
| description | String | Issue description |
| status | String | open / in_progress / closed |
| notes | String | Internal notes |
| created_at | DateTime | Auto timestamp |
| updated_at | DateTime | Auto timestamp |

---

## 🌍 Deployment

- **Frontend** deployed on [Vercel](https://vercel.com)
- **Backend** deployed on [Render](https://render.com)
- **Database** PostgreSQL on Render (free tier)

---

## 🧠 Architectural Decisions

- Used **React + Vite** for fast frontend development
- Used **FastAPI** for its speed, automatic docs, and Python type hints
- Switched from **SQLite to PostgreSQL** for production reliability on Render
- Used **Axios** for API calls with a centralized `api.js` config
- Deployed frontend and backend separately for better scalability

---

## 🔧 Environment Variables

For local development, the app uses SQLite automatically.
For production, set:

```
DATABASE_URL=postgresql://user:password@host/dbname
```

---

## 👨‍💻 Author

Built by **Keshav Jangid**

# main.py - all the api routes and stuff

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from database import engine, Base, get_db
import models
import schemas
from uuid import uuid4
from typing import Optional


# create all tables if they dont exist already
Base.metadata.create_all(bind=engine)

app = FastAPI()

# adding cors so frontend can talk to backend
# TODO: restrict this in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# home route - just to check if api is running
@app.get("/")
def root():
    # print("someone hit the root endpoint!") # debug
    return {"message": "Support CRM API Running"}


# create a new ticket
@app.post("/api/tickets")
def create_ticket(ticket: schemas.TicketCreate, db: Session = Depends(get_db)):
    # generate a random short id for the ticket
    new_ticket = models.Ticket(
        ticket_id=str(uuid4())[:8],
        customer_name=ticket.customer_name,
        customer_email=ticket.customer_email,
        subject=ticket.subject,
        description=ticket.description,
        status="open"  # default status when created
    )
    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    return new_ticket


# get all tickets - with optional search and status filter
@app.get("/api/tickets")
def get_tickets(
    status: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(models.Ticket)
    
    # filter by status if provided
    if status:
        query = query.filter(models.Ticket.status == status.lower())
    
    # search across multiple fields
    if search:
        query = query.filter(
            models.Ticket.customer_name.ilike(f"%{search}%") |
            models.Ticket.customer_email.ilike(f"%{search}%") |
            models.Ticket.ticket_id.ilike(f"%{search}%") |
            models.Ticket.subject.ilike(f"%{search}%") |
            models.Ticket.description.ilike(f"%{search}%")
        )
    
    return query.all()


# get a single ticket by its id
@app.get("/api/tickets/{ticket_id}")
def get_ticket(ticket_id: str, db: Session = Depends(get_db)):
    ticket = db.query(models.Ticket).filter(
        models.Ticket.ticket_id == ticket_id
    ).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket


# update a ticket's status or notes
@app.put("/api/tickets/{ticket_id}")
def update_ticket(ticket_id: str, update: schemas.TicketUpdate, db: Session = Depends(get_db)):
    ticket = db.query(models.Ticket).filter(
        models.Ticket.ticket_id == ticket_id
    ).first()
    if not ticket:
        # FIXME: maybe return a better error message later
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    # only update fields that were actually provided
    if update.status is not None:
        ticket.status = update.status
    if update.notes is not None:
        ticket.notes = update.notes
    
    db.commit()
    db.refresh(ticket)
    return {"success": True, "updated_at": ticket.updated_at}


# delete a ticket permanently
@app.delete("/api/tickets/{ticket_id}")
def delete_ticket(ticket_id: str, db: Session = Depends(get_db)):
    ticket = db.query(models.Ticket).filter(
        models.Ticket.ticket_id == ticket_id
    ).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    db.delete(ticket)
    db.commit()
    return {"message": "Ticket deleted"}

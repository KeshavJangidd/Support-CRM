# database models - this defines how our data looks in the db

from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base


class Ticket(Base):
    # this is the tickets table
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    ticket_id = Column(String, unique=True, index=True)  # short unique id like "a1b2c3d4"
    customer_name = Column(String)
    customer_email = Column(String)
    subject = Column(String)
    description = Column(String)  # the actual issue description
    status = Column(String, default="open")  # open, in_progress, or closed
    notes = Column(String, nullable=True)  # internal notes from support team
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)  # TODO: auto update this on changes

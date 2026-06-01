# pydantic schemas - for request/response validation

from pydantic import BaseModel
from typing import Optional


# schema for creating a new ticket
class TicketCreate(BaseModel):
    customer_name: str
    customer_email: str
    subject: str
    description: str


# schema for updating a ticket (everything is optional)
class TicketUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None


# schema for returning ticket data in responses
# NOTE: i removed created_at and updated_at from here, might add later
class TicketResponse(BaseModel):
    ticket_id: str
    customer_name: str
    customer_email: str
    subject: str
    description: str
    status: str
    notes: Optional[str] = None

    class Config:
        from_attributes = True

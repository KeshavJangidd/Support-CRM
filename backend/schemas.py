from pydantic import BaseModel
from typing import Optional

class TicketCreate(BaseModel):
    customer_name: str
    customer_email: str
    subject: str
    description: str

class TicketUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

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

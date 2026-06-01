# database connection stuff

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# get database url from environment, or fall back to sqlite for local dev
DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./support_crm.db")

# render gives us postgres:// but sqlalchemy needs postgresql://
# took me a while to figure this out lol
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# print("connecting to database...") # debug
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()


# dependency that gives us a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

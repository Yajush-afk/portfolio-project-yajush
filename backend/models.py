from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime

class Update(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    content: str
    category: str = Field(default="general") # e.g., "learning", "excuse", "project"
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Project(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str
    link: Optional[str] = None
    tags: str # Comma separated tags

class Quote(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    text: str
    author: str

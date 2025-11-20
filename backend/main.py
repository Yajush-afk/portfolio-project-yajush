from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
from .database import create_db_and_tables, get_session
from .models import Update, Project, Quote
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Portfolio API"}

@app.get("/updates/", response_model=List[Update])
def read_updates(session: Session = Depends(get_session), offset: int = 0, limit: int = 100):
    updates = session.exec(select(Update).offset(offset).limit(limit)).all()
    return updates

@app.post("/updates/", response_model=Update)
def create_update(update: Update, session: Session = Depends(get_session)):
    session.add(update)
    session.commit()
    session.refresh(update)
    return update

@app.get("/projects/", response_model=List[Project])
def read_projects(session: Session = Depends(get_session)):
    projects = session.exec(select(Project)).all()
    return projects

@app.post("/projects/", response_model=Project)
def create_project(project: Project, session: Session = Depends(get_session)):
    session.add(project)
    session.commit()
    session.refresh(project)
    return project

@app.get("/quotes/", response_model=List[Quote])
def read_quotes(session: Session = Depends(get_session)):
    quotes = session.exec(select(Quote)).all()
    return quotes

@app.post("/quotes/", response_model=Quote)
def create_quote(quote: Quote, session: Session = Depends(get_session)):
    session.add(quote)
    session.commit()
    session.refresh(quote)
    return quote

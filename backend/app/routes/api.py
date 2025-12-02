import json
import os
import random
from datetime import date
from typing import List
from fastapi import APIRouter, HTTPException
from app.models import Project, Achievement, SocialPostsResponse

router = APIRouter()

# Helper to load JSON data
def load_data(filename: str):
    filepath = os.path.join("data", filename)
    if not os.path.exists(filepath):
        # Fallback for empty/missing files to avoid crashing
        return {}
    with open(filepath, "r") as f:
        return json.load(f)

@router.get("/about")
async def get_about():
    data = load_data("about.json")
    return data

@router.get("/education")
async def get_education():
    data = load_data("education.json")
    return data

@router.get("/achievements")
async def get_achievements():
    data = load_data("achievements.json")
    return data

@router.get("/projects")
async def get_projects():
    data = load_data("projects.json")
    return data

@router.get("/projects/excuses")
async def get_random_excuse():
    data = load_data("excuses.json")
    excuses = data.get("excuses", [])
    if not excuses:
        return {"excuse": "No excuses found!"}
    return {"excuse": random.choice(excuses)}

@router.get("/quotes/daily")
async def get_daily_quote():
    data = load_data("quotes.json")
    quotes = data.get("quotes", [])
    if not quotes:
        return {"quote": "No quotes found."}
    
    # Deterministic quote based on date
    today = date.today()
    # Use the day of the year to select a quote index
    day_of_year = today.timetuple().tm_yday
    quote_index = day_of_year % len(quotes)
    
    return {"quote": quotes[quote_index]}

@router.get("/social/posts", response_model=SocialPostsResponse)
async def get_social_posts():
    data = load_data("social_posts.json")
    return data

@router.get("/currently-learning")
async def get_currently_learning():
    data = load_data("currently_learning.json")
    return data

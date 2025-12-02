import json
import os
import shutil
import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Header, Request
from fastapi.responses import HTMLResponse
from app.config import Config
from app.models import Project, Achievement, SocialPost

router = APIRouter()

# Dependency to verify secret key
async def verify_admin(x_admin_secret_key: Optional[str] = Header(None), admin_key: Optional[str] = None):
    # Allow passing key via header or query param (for easy browser testing)
    key = x_admin_secret_key or admin_key
    if key != Config.ADMIN_SECRET_KEY:
        raise HTTPException(status_code=403, detail="Invalid Admin Secret Key")
    return key

# Helper to load/save JSON
def load_data(filename: str):
    filepath = os.path.join("data", filename)
    if not os.path.exists(filepath):
        return {}
    with open(filepath, "r") as f:
        return json.load(f)

def save_data(filename: str, data: dict):
    filepath = os.path.join("data", filename)
    with open(filepath, "w") as f:
        json.dump(data, f, indent=2)

# --- HTML Forms ---

@router.get("/projects", response_class=HTMLResponse)
async def get_project_form():
    return """
    <html>
        <body>
            <h1>Add Project</h1>
            <form action="/admin/projects/add" method="post" enctype="multipart/form-data">
                <label>Admin Key: <input type="text" name="admin_key" required></label><br><br>
                <label>Title: <input type="text" name="title" required></label><br><br>
                <label>Description: <textarea name="description" required></textarea></label><br><br>
                <label>Tech Stack (comma separated): <input type="text" name="tech_stack" required></label><br><br>
                <label>GitHub Link: <input type="text" name="github_link"></label><br><br>
                <label>Demo Link: <input type="text" name="demo_link"></label><br><br>
                <label>Image: <input type="file" name="image"></label><br><br>
                <button type="submit">Add Project</button>
            </form>
        </body>
    </html>
    """

@router.get("/achievements", response_class=HTMLResponse)
async def get_achievement_form():
    return """
    <html>
        <body>
            <h1>Add Achievement</h1>
            <form action="/admin/achievements/add" method="post" enctype="multipart/form-data">
                <label>Admin Key: <input type="text" name="admin_key" required></label><br><br>
                <label>Type (certificate/contribution/internship): <input type="text" name="type" required></label><br><br>
                <label>Title: <input type="text" name="title" required></label><br><br>
                <label>Issuer: <input type="text" name="issuer" required></label><br><br>
                <label>Date (YYYY-MM-DD): <input type="text" name="date" required></label><br><br>
                <label>Credential Link: <input type="text" name="credential_link"></label><br><br>
                <label>Image: <input type="file" name="image"></label><br><br>
                <button type="submit">Add Achievement</button>
            </form>
        </body>
    </html>
    """

@router.get("/social", response_class=HTMLResponse)
async def get_social_form():
    return """
    <html>
        <body>
            <h1>Add Social Post</h1>
            <form action="/admin/social/add" method="post">
                <label>Admin Key: <input type="text" name="admin_key" required></label><br><br>
                <label>Platform (x_post/linkedin_post): <input type="text" name="platform" required></label><br><br>
                <label>Content: <textarea name="content" required></textarea></label><br><br>
                <label>Link: <input type="text" name="link" required></label><br><br>
                <label>Date: <input type="text" name="date" required></label><br><br>
                <button type="submit">Update Post</button>
            </form>
        </body>
    </html>
    """

# --- POST Actions ---

@router.post("/projects/add")
async def add_project(
    title: str = Form(...),
    description: str = Form(...),
    tech_stack: str = Form(...),
    github_link: Optional[str] = Form(None),
    demo_link: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    admin_key: str = Form(...), # Validate manually since it's in form data
):
    if admin_key != Config.ADMIN_SECRET_KEY:
        raise HTTPException(status_code=403, detail="Invalid Admin Secret Key")

    projects_data = load_data("projects.json")
    projects_list = projects_data.get("projects", [])

    new_id = f"proj_{uuid.uuid4().hex[:8]}"
    image_url = None

    if image:
        # Save image
        os.makedirs("static/projects", exist_ok=True)
        filename = f"{new_id}_{image.filename}"
        filepath = f"static/projects/{filename}"
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        image_url = f"/static/projects/{filename}"

    new_project = {
        "id": new_id,
        "title": title,
        "description": description,
        "tech_stack": [t.strip() for t in tech_stack.split(",")],
        "github_link": github_link,
        "demo_link": demo_link,
        "image_url": image_url
    }

    projects_list.insert(0, new_project) # Add to top
    projects_data["projects"] = projects_list
    save_data("projects.json", projects_data)

    return {"status": "success", "id": new_id, "project": new_project}

@router.post("/achievements/add")
async def add_achievement(
    type: str = Form(...),
    title: str = Form(...),
    issuer: str = Form(...),
    date: str = Form(...),
    credential_link: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    admin_key: str = Form(...),
):
    if admin_key != Config.ADMIN_SECRET_KEY:
        raise HTTPException(status_code=403, detail="Invalid Admin Secret Key")

    ach_data = load_data("achievements.json")
    ach_list = ach_data.get("achievements", [])

    new_id = f"ach_{uuid.uuid4().hex[:8]}"
    image_url = None

    if image:
        os.makedirs("static/achievements", exist_ok=True)
        filename = f"{new_id}_{image.filename}"
        filepath = f"static/achievements/{filename}"
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        image_url = f"/static/achievements/{filename}"

    new_ach = {
        "id": new_id,
        "type": type,
        "title": title,
        "issuer": issuer,
        "date": date,
        "credential_link": credential_link,
        "image_url": image_url
    }

    ach_list.insert(0, new_ach)
    ach_data["achievements"] = ach_list
    save_data("achievements.json", ach_data)

    return {"status": "success", "id": new_id, "achievement": new_ach}

@router.post("/social/add")
async def add_social_post(
    platform: str = Form(...),
    content: str = Form(...),
    link: str = Form(...),
    date: str = Form(...),
    admin_key: str = Form(...),
):
    if admin_key != Config.ADMIN_SECRET_KEY:
        raise HTTPException(status_code=403, detail="Invalid Admin Secret Key")
    
    if platform not in ["x_post", "linkedin_post"]:
        raise HTTPException(status_code=400, detail="Invalid platform. Use 'x_post' or 'linkedin_post'")

    social_data = load_data("social_posts.json")
    
    social_data[platform] = {
        "content": content,
        "link": link,
        "date": date
    }
    
    save_data("social_posts.json", social_data)

    return {"status": "success", "updated": platform}

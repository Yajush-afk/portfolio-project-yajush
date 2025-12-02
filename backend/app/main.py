from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from app.config import Config

app = FastAPI(title=Config.PROJECT_NAME, version=Config.VERSION)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development, allow all. Restrict in production.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
# Ensure the directory exists to avoid errors if empty
import os
os.makedirs("static", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def root():
    return {"message": "Portfolio API is running"}

# Import and include routes
from app.routes import api, admin

app.include_router(api.router, prefix="/api")
app.include_router(admin.router, prefix="/admin")

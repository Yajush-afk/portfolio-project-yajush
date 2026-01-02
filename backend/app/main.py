from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from app.config import Config

app = FastAPI(title=Config.PROJECT_NAME, version=Config.VERSION)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # For local development
        "https://yajush-web.vercel.app",  # For production (Vercel frontend)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
import os
# Get the absolute path to the backend directory (parent of app)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_DIR = os.path.join(BASE_DIR, "static")

# Ensure the directory exists (it should, but for safety)
os.makedirs(STATIC_DIR, exist_ok=True)

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

@app.get("/")
async def root():
    return {"message": "Portfolio API is running"}

# Import and include routes
from app.routes import api, admin

app.include_router(api.router, prefix="/api")
app.include_router(admin.router, prefix="/admin")

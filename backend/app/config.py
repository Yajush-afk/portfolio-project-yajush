import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    ADMIN_SECRET_KEY = os.getenv("ADMIN_SECRET_KEY")
    PROJECT_NAME = "Portfolio API"
    VERSION = "1.0.0"

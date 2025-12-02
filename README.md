# Portfolio Website

A full-stack portfolio website built with Next.js (Frontend) and FastAPI (Backend).

## Tech Stack
- **Frontend**: Next.js, Tailwind CSS, Framer Motion
- **Backend**: FastAPI, Python 3
- **Database**: JSON files (NoSQL-lite approach)
- **Deployment**: Docker, Railway

## Project Structure
- `frontend/`: Next.js application
- `backend/`: FastAPI application
- `backend/data/`: JSON content files
- `backend/static/`: User uploaded images

## Local Development

### Prerequisites
- Docker and Docker Compose
- Node.js (optional, for local frontend dev without Docker)
- Python 3.9+ (optional, for local backend dev without Docker)

### Running with Docker (Recommended)
1. Build and start the services:
   ```bash
   docker-compose up --build
   ```
2. Open your browser:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000](http://localhost:8000)
   - API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### Manual Setup
**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables
Create a `.env` file in `backend/` with:
```
ADMIN_SECRET_KEY=your_secret_key
```
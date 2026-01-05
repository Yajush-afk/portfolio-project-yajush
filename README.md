# Portfolio Website

A modern, high-performance, single-page portfolio website built to showcase skills, projects, and achievements. Designed with a focus on user experience, responsiveness, and visual appeal.

## Project Overview
This project is a full-stack application featuring a decoupled architecture. The frontend delivers a dynamic, interactive user interface, while the backend serves content and handles logic.

### Key Features
-   **Single-Page Architecture**: Smooth scrolling navigation between Home, About, Achievements, Projects, and Socials sections.
-   **Dynamic Content**: All data (profile info, projects, achievements, quotes) is fetched dynamically from the FastAPI backend.
-   **Interactive UI**:
    -   **Skeleton Loading**: Instant visual feedback during data fetching to mitigate cold starts.
    -   **Animations**: Powered by Framer Motion for entrance effects, scroll-triggered reveals, and active state transitions.
    -   **Terminal Component**: A playful, interactive terminal in the About section that reflects the current theme.
    -   **Dark/Light Mode**: Fully supported with persistent state and system preference detection.
-   **Responsive Design**: Optimized for all device sizes, from mobile phones to large desktop screens.

## Tech Stack

### Frontend
-   **Framework**: [Next.js 16](https://nextjs.org/) (React 19) - Utilizing the App Router for modern routing and layout handling.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS for rapid, responsive design.
-   **Animations**: [Framer Motion](https://www.framer.com/motion/) - For complex, fluid animations and gestures.
-   **Language**: [TypeScript](https://www.typescriptlang.org/) - For type safety and better developer experience.
-   **Icons**: `react-icons` - A comprehensive library for consistent iconography.
-   **Deployment**: [Vercel](https://vercel.com/) - Optimized hosting for Next.js applications.

### Backend
-   **Framework**: [FastAPI](https://fastapi.tiangolo.com/) - A modern, fast (high-performance) web framework for building APIs with Python 3.9+.
-   **Server**: [Uvicorn](https://www.uvicorn.org/) - An ASGI web server implementation.
-   **Data Storage**: JSON-based flat-file storage (NoSQL-lite approach) for easy content management without a heavy database overhead.
-   **CORS**: Configured middleware to securely allow requests from the production frontend.
-   **Deployment**: [Render](https://render.com/) - Cloud application hosting for the Python backend.

## Project Structure
-   `frontend/`: Next.js application source code.
    -   `src/components/`: Reusable UI components (Sections, Navbar, Skeletons).
    -   `src/app/`: App Router pages and layouts.
    -   `src/lib/`: Utility functions and API helpers.
-   `backend/`: FastAPI application source code.
    -   `app/`: Main application logic and endpoints.
    -   `data/`: JSON files storing portfolio content.

## Local Development

### Prerequisites
-   Node.js (v18+)
-   Python (v3.9+)

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
# Server runs at http://localhost:8000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# App runs at http://localhost:3000
```
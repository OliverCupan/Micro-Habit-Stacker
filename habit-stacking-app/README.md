# Habit Stacking App

## Overview
The Habit Stacking App is a web application designed to help users build and maintain habits through a method known as habit stacking. Users can create, track, and manage their habits, making it easier to integrate new habits into their daily routines.

## Tech Stack
- **Frontend**: React with Next.js and Tailwind CSS
- **Backend**: FastAPI (Python)
- **Database**: SQLite3
- **Deployment**: 
  - Frontend on Vercel
  - Backend on Railway or Render

## Features
- **Habit Stacking**: Link habits together using triggers ("After I X, I will Y")
- **Streak Tracking**: Automatic calculation of current and best streaks
- **Completion Tracking**: Mark habits as complete and track history
- **Statistics Dashboard**: View overall stats and individual habit analytics
- **Habit Chains**: Visualize linked habits in a chain
- **Responsive Design**: Works seamlessly on mobile and desktop
- Full CRUD operations for habits
- RESTful API with FastAPI
- Modern UI with Tailwind CSS

## Project Structure
```
habit-stacking-app
├── frontend          # Frontend application
│   ├── src          # Source files for the frontend
│   ├── package.json  # NPM configuration
│   └── README.md     # Frontend documentation
├── backend           # Backend application
│   ├── app          # FastAPI application files
│   ├── requirements.txt # Python dependencies
│   └── README.md     # Backend documentation
├── infra             # Infrastructure configuration
│   └── README.md     # Infrastructure documentation
├── .gitignore        # Git ignore file
├── README.md         # Overall project documentation
└── LICENSE           # Licensing information
```

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the FastAPI application:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

5. Access the API:
   - API: http://localhost:8000
   - Interactive Docs: http://localhost:8000/docs

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file (copy from `.env.local.example`):
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Access the app: http://localhost:3000

### Quick Start
For a complete usage guide, see [USAGE_GUIDE.md](../USAGE_GUIDE.md) in the root directory.

### Deployment
- Follow the respective documentation for deploying the frontend on Vercel and the backend on Railway or Render.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
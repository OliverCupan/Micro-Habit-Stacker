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
- User authentication (to be implemented)
- Create, read, update, and delete habits
- Habit tracking and completion streaks
- Responsive design for mobile and desktop

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

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`.
3. Start the development server: `npm run dev`.

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies: `pip install -r requirements.txt`.
3. Run the FastAPI application: `uvicorn app.main:app --reload`.

### Deployment
- Follow the respective documentation for deploying the frontend on Vercel and the backend on Railway or Render.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
# Micro-Habit Stacker - Usage Guide

## Overview
The Micro-Habit Stacker is a habit tracking application based on James Clear's "Atomic Habits" methodology. It helps you build new habits by linking them to existing triggers using the "habit stacking" technique.

## Core Concept: Habit Stacking
Habit stacking works by anchoring a new habit to an existing action. The formula is:
**"After I [EXISTING HABIT], I will [NEW HABIT]"**

For example:
- After I drink my morning coffee → I will do 10 pushups
- After I do 10 pushups → I will meditate for 2 minutes
- After I meditate → I will write in my journal

## Installation & Setup

### Backend Setup (FastAPI)

1. Navigate to the backend directory:
```bash
cd habit-stacking-app/backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the backend server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`
API documentation at `http://localhost:8000/docs`

### Frontend Setup (Next.js/React)

1. Navigate to the frontend directory:
```bash
cd habit-stacking-app/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

4. Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Using the Application

### 1. Creating Your First Habit

1. Navigate to `http://localhost:3000/habits`
2. Click the **"+ New Habit"** button
3. Fill in the form:
   - **Habit Title**: What you want to do (e.g., "Do 10 pushups")
   - **Trigger (After I...)**: The existing action that triggers this habit (e.g., "drink morning coffee")
   - **Description** (optional): Additional details
   - **Frequency**: Daily, Weekly, or Monthly
   - **Link to Next Habit** (optional): Chain this habit to another

4. Click **"Create Habit"**

### 2. Building Habit Chains

To create a chain of habits:

1. Create your first habit:
   - Title: "Do 10 pushups"
   - Trigger: "drink morning coffee"

2. Create a second habit and link it:
   - Title: "Meditate for 2 minutes"
   - Trigger: "finish my pushups"
   - Linked Habit: Select "Do 10 pushups"

3. The chain will be visualized on the habit detail page!

### 3. Tracking Completion

**On the Habits Page:**
- Click the **"Complete"** button on any habit card
- The card will turn green when completed today
- Your streak counter will update

**On the Habit Detail Page:**
- Click **"Mark as Complete"** to log today's completion
- View your completion history
- See detailed statistics

### 4. Understanding Streaks

- **Current Streak**: Consecutive days you've completed the habit
- **Best Streak**: Your longest streak ever
- Streaks reset if you miss a day
- Complete habits daily to maintain your streak!

### 5. Viewing Statistics

**Overall Statistics** (Habits page):
- Total Habits: Number of habits you're tracking
- Active Streaks: How many habits have ongoing streaks
- Total Completions: All-time completions
- Average Streak: Average streak across all habits

**Individual Habit Statistics** (Detail page):
- Total Completions: How many times you've completed this habit
- 30-Day Rate: Completion percentage over the last month
- Current & Best Streaks
- Full completion history with dates

## Features

### Habit Stacking
- Link habits together to create chains
- Visualize your habit chains
- Build momentum by completing habits in sequence

### Streak Tracking
- Automatic streak calculation
- Visual indicators for active streaks
- Best streak records

### Statistics
- Completion rates
- Historical data
- Overall progress tracking

### User Interface
- Clean, modern design with Tailwind CSS
- Responsive layout (works on desktop and mobile)
- Intuitive habit management
- Visual feedback for completed habits

## API Endpoints

The backend provides these key endpoints:

### Habits
- `GET /api/v1/habits/` - List all habits
- `POST /api/v1/habits/` - Create a new habit
- `GET /api/v1/habits/{id}` - Get habit details
- `PUT /api/v1/habits/{id}` - Update a habit
- `DELETE /api/v1/habits/{id}` - Delete a habit
- `GET /api/v1/habits/{id}/chain` - Get habit chain

### Completions
- `POST /api/v1/habits/{id}/complete` - Mark habit as complete
- `GET /api/v1/habits/{id}/completions` - Get completion history
- `DELETE /api/v1/habits/{id}/completions/{date}` - Remove a completion

### Statistics
- `GET /api/v1/habits/{id}/stats` - Get habit statistics
- `GET /api/v1/stats/overall` - Get overall statistics

## Tips for Success

1. **Start Small**: Begin with one or two habits
2. **Be Specific**: Make triggers and habits concrete and actionable
3. **Stack Wisely**: Link new habits to reliable existing actions
4. **Track Daily**: Check in daily to maintain your streaks
5. **Build Chains**: Once a habit is solid, add the next one in the chain

## Database

The application uses SQLite with two main tables:

- **habits**: Stores habit information, triggers, and streak data
- **completions**: Tracks individual habit completions by date

Database file location: `backend/habits.db`

## Troubleshooting

### Backend won't start
- Check that port 8000 is available
- Verify Python dependencies are installed
- Check for any error messages in the terminal

### Frontend won't start
- Verify Node.js and npm are installed
- Delete `node_modules` and run `npm install` again
- Check that the API URL in `.env.local` is correct

### Can't connect to API
- Ensure the backend server is running
- Check CORS settings in `backend/app/core/config.py`
- Verify the API URL matches in your frontend configuration

### Streaks not updating
- Complete the habit through the UI (not directly in the database)
- Check that the completion was logged (view completion history)
- Streaks update immediately upon completion

## Deployment

### Backend (Railway/Render)
1. Push code to GitHub
2. Connect your Railway/Render account
3. Deploy from the `backend` directory
4. Set environment variables

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set `NEXT_PUBLIC_API_URL` to your backend URL
4. Deploy

## License
See the LICENSE file in the repository.

## Support
For issues or questions, please open an issue on the GitHub repository.

---

**Happy Habit Stacking! 🚀**

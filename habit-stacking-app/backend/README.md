# Habit Stacking Application Backend

This is the backend for the Habit Stacking application, built using FastAPI and SQLite3. The backend provides a RESTful API for managing user habits, allowing users to create, read, update, and delete habits.

## Project Structure

- `app/`: Contains the main application code.
  - `main.py`: Entry point for the FastAPI application.
  - `core/`: Contains configuration settings.
  - `api/`: Contains the API routes, schemas, and CRUD operations.
  - `db/`: Contains database models and session management.
  - `services/`: Contains business logic related to habits.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd habit-stacking-app/backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

## Running the Application

To run the FastAPI application, use the following command:
```
uvicorn app.main:app --reload
```

The application will be available at `http://127.0.0.1:8000`.

## API Documentation

The API documentation can be accessed at `http://127.0.0.1:8000/docs` once the application is running.

## Database

The application uses SQLite3 for the database. Ensure that the database is set up correctly in the configuration file.

## Deployment

The backend can be deployed on platforms like Railway or Render. Refer to the respective configuration files in the `infra` directory for deployment instructions.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
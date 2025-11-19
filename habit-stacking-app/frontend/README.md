# Habit Stacking Application - Frontend

This is the frontend part of the Habit Stacking application, built using React and Next.js with Tailwind CSS for styling. The application allows users to create, manage, and track their habits through a user-friendly interface.

## Project Structure

- **src/**: Contains the main source code for the application.
  - **pages/**: Contains the different pages of the application.
    - **_app.tsx**: Custom App component for global styles and layout.
    - **index.tsx**: Main entry point for the application.
    - **habits/**: Contains pages related to habits.
      - **index.tsx**: Displays a list of habits.
      - **[id].tsx**: Displays details for a specific habit.
  - **components/**: Contains reusable components.
    - **HabitCard.tsx**: Displays individual habit information.
    - **HabitForm.tsx**: For creating or editing habits.
    - **Layout.tsx**: Wraps pages with a consistent structure.
  - **styles/**: Contains global CSS styles.
  - **lib/**: Contains utility functions for API requests.
  - **hooks/**: Contains custom hooks for managing habits.
  - **types/**: Contains TypeScript types and interfaces.

## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd habit-stacking-app/frontend
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the development server**:
   ```
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000` to view the application.

## Deployment

The frontend is configured to be deployed on Vercel. Ensure that you have the necessary environment variables set up in the Vercel dashboard.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
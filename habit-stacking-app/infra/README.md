# Infrastructure Setup for Habit Stacking Application

This directory contains configuration files and documentation for deploying the Habit Stacking application infrastructure.

## Frontend Deployment

- **Vercel**: The frontend of the application is deployed using Vercel. The `vercel.json` file contains the necessary configuration for deployment.

## Backend Deployment

- **Railway**: The backend of the application is configured for deployment on Railway. The `railway/railway.json` file includes the required settings for this deployment.

- **Render**: Additionally, the backend can also be deployed on Render. The `render/render.yaml` file provides the configuration for this deployment option.

## Database

The application uses SQLite3 as the database for storing user habits and related data. Ensure that the database is properly configured in the backend settings.

## Environment Variables

Both the frontend and backend applications require specific environment variables. Refer to the `.env.example` files in both the `frontend` and `backend` directories for the necessary variables and their descriptions.

## Additional Notes

- Make sure to follow the deployment instructions specific to Vercel, Railway, and Render for a successful setup.
- Review the README files in the `frontend` and `backend` directories for more detailed information about their respective setups and functionalities.
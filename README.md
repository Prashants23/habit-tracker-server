


# habit-tracker-server

#Goal Tracking App - Node.js Backend
This repository contains the backend implementation of a goal tracking application built using Node.js and Express.js. The backend provides RESTful API endpoints for managing users, goals, tasks, and logs.

##Prerequisites
Before running the application, ensure you have the following installed on your system:

Node.js and npm (Node Package Manager)
MongoDB (or MongoDB Atlas for cloud-based deployment)

##Getting Started
Follow these steps to set up and run the backend:

Clone the Repository:

git clone <repository-url>

##Install Dependencies:
Navigate to the project directory and install the required dependencies using npm:

cd goal-tracking-app-backend
npm install

##Set Environment Variables:
Create a .env file in the project root and provide the necessary environment variables such as MongoDB connection URI, JWT secret key, etc. Here's an example:

MONGODB_URI=mongodb://localhost:27017/goal-tracking-db
SECRET_KEY=your_secret_key_here


##Start the Server:
Run the following command to start the backend server:

node server.js


##Access API Endpoints:
Once the server is running, you can access the API endpoints using tools like Postman or integrate them with your frontend application.


##Available Endpoints
The backend provides the following API endpoints:

POST /api/auth/register: Register a new user.
POST /api/auth/login: Authenticate and login a user.
GET /api/me: Retrieve user profile information.
POST /api/goals: Create a new goal for the authenticated user.
GET /api/goals: Retrieve all goals for the authenticated user
PUT /api/goals/:goalId: Update a specific goal by its ID.
DELETE /api/goals/:goalId: Delete a specific goal by its ID.
POST /api/tasks: Create a new task for a specific goal.
GET /api/tasks/:goalId: Retrieve all tasks for a specific goal.
GET /api/tasks/:taskId: Retrieve a specific task by its ID.
PUT /api/tasks/:taskId: Update a specific task by its ID.
DELETE /api/tasks/:taskId: Delete a specific task by its ID.
Refer to the API documentation or codebase for additional details on request payloads, response formats, and error handling.


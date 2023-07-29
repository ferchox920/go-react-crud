# go-react-crud


CRUD Application with Golang Backend and Vite + React Frontend

This is a simple CRUD (Create, Read, Update, Delete) application built using Golang for the backend and Vite with React for the frontend. The backend is developed using the Fiber framework, and it interacts with a MongoDB database to store and retrieve data.

Requirements:
1. Golang installed on your machine.
2. Node.js and npm installed for building the frontend.
3. MongoDB installed and running.

Setup:
1. Clone the repository to your local machine:
   git clone https://github.com/ferchox920/go-react-crud.git
   cd go-react-crud

Backend:
- Make sure you have MongoDB running on its default port (27017) or update the MONGODB_URI environment variable in the .env file with your MongoDB connection string.
- Install the required Go dependencies:
  go mod download
- Build and run the backend server:
  go run main.go
  The backend server should be running on http://localhost:3000.

Frontend (Vite + React):
- Navigate to the client directory:
  cd client
- Install the required npm packages:
  npm install
- Start the Vite development server for the frontend:
  npm run dev
  The development server should be running on http://localhost:3001.

Run the Application:
- Both the backend and frontend should be running concurrently in separate terminal windows.
- Open your web browser and navigate to http://localhost:3001 to access the Vite + React frontend.
- The frontend will communicate with the Golang backend running on http://localhost:3000 for API requests.

Alert: Before running the application, make sure to set the following environment variables:
- PORT: The port number on which the Golang backend server will run (e.g., 3000).
- MONGODB_URI: The connection string for MongoDB (e.g., mongodb://localhost:27017/gomongodb).

Note:
This application requires both the Golang backend and Vite + React frontend to be running simultaneously. The backend serves as the API endpoint, and the frontend interacts with it for CRUD operations.

Make sure to follow the setup instructions mentioned above and set the required environment variables to ensure both the backend and frontend are correctly integrated and running as expected.

Feel free to modify and extend the application according to your needs. Happy coding!

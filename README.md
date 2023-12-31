

# go-react-crud

CRUD Application with Golang Backend and Vite + React Frontend

This is a simple CRUD (Create, Read, Update, Delete) application built using Golang for the backend and Vite with React for the frontend. The backend is developed using the Fiber framework, and it interacts with a MongoDB database to store and retrieve data.

Requirements:
1. Golang installed on your machine.
2. Node.js and npm installed for building the frontend.
3. MongoDB installed and running.

Setup:
1. Clone the repository to your local machine:

Setup:
1. Clone the repository to your local machine:
   git clone https://github.com/ferchox920/go-react-crud.git
   cd go-react-crud

Backend:
- Make sure you have MongoDB running on its default or update the MONGODB_URI environment variable in the .env file with your MongoDB connection string.
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
-- Build the Vite + React frontend:
  npm run build
  
  The build process will generate optimized static files in the `dist` directory.

Run the Application:
- Both the backend and frontend should be running concurrently in separate terminal windows.
- Start the backend server:

go run main.go
- The backend server will serve the built frontend from the `dist` directory.
- Open your web browser and navigate to http://localhost:3000 to access the application.
- The frontend will communicate with the Golang backend running on http://localhost:3000 for API requests.

Alert: Before running the application, make sure to set the following environment variables:
- PORT: The port number on which the Golang backend server will run (e.g., 3000).
- MONGODB_URI: The connection string for MongoDB (either for MongoDB Atlas or your local MongoDB).

Note:
This application requires both the Golang backend and Vite + React frontend to be running simultaneously. The backend serves as the API endpoint, and the frontend interacts with it for CRUD operations.

Ensure you follow the setup instructions, set the required environment variables for MongoDB connection, and ensure both the backend and frontend are integrated correctly for the application to work as expected.

Feel free to modify and extend the application according to your needs. Happy coding!


Alert: Before running the application, make sure to set the following environment variables:
- PORT: The port number on which the Golang backend server will run (e.g., 3000).
- MONGODB_URI: The connection string for MongoDB (e.g., mongodb://localhost:27017/gomongodb).

Note:
This application requires both the Golang backend and Vite + React frontend to be running simultaneously. The backend serves as the API endpoint, and the frontend interacts with it for CRUD operations.

Make sure to follow the setup instructions mentioned above and set the required environment variables to ensure both the backend and frontend are correctly integrated and running as expected.

Feel free to modify and extend the application according to your needs. Happy coding!

// Step 1: Import the Express library
// Express is a Node.js framework used to build web servers and APIs
import express from 'express';

// Step 2: Import route handler functions from the userController file
// These functions contain the logic for login, registration, and admin login
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';

// Step 3: Create a new router instance
// This router will group all user-related routes together
const userRouter = express.Router();

// Step 4: Define a POST route for user registration
// When a client sends a POST request to '/register', the registerUser function will handle it
userRouter.post('/register', registerUser);

// Step 5: Define a POST route for user login
// When a client sends a POST request to '/login', the loginUser function will handle it
userRouter.post('/login', loginUser);

// Step 6: Define a POST route for admin login
// When a client sends a POST request to '/admin', the adminLogin function will handle it
userRouter.post('/admin', adminLogin);

// Step 7: Export the router so it can be used in the main server file
// This allows you to mount it in your app like: app.use('/api/users', userRouter)
export default userRouter;
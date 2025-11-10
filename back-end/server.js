// Import the Express framework to build the web server
import express from 'express';

// Import CORS middleware to allow cross-origin requests (e.g., frontend on a different domain)
import cors from 'cors';

// Load environment variables from a .env file into process.env
// This allows you to keep secrets like API keys or port numbers outside your code
import 'dotenv/config';
// connects the database
import connectDB from './configs/mongodb.js';
// connects cloudinary
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoute.js';

// -------------------- App Configuration {PART 1 }--------------------

// Create an instance of an Express application
const app = express();

// Define the port number the server will listen on
// It first checks for a PORT value in environment variables, otherwise defaults to 4000
const port = process.env.PORT || 4000;

//------------------------ConnectDB {PART 2}---------------

connectDB()

//-----------------------Connect Cloudinary------------------
connectCloudinary()


// -------------------- Middleware Setup {PART 3} --------------------

// Enable Express to automatically parse incoming JSON payloads in requests
app.use(express.json());

// Enable CORS so that your API can be accessed from other domains (like your React frontend)
app.use(cors());

// -------------------- API Endpoints {PART 4}--------------------

app.use('/api/user', userRouter)

// Define a GET endpoint at the root URL ('/')
// When someone accesses http://localhost:4000/, this function runs
app.get('/', (req, res) => {
    // Send a simple text response to confirm the API is working
    res.send("API working....");
});

// -------------------- Start the Server --------------------

// Start the server and listen on the defined port
// Once the server is running, log a message to the console
app.listen(port, () => console.log('Server started on PORT: ' + port));






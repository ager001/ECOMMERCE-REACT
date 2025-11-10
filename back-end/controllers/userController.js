// Import the user model from the models folder
// This model defines the schema and structure for user documents in MongoDB
import userModel from "../models/userModel.js";

// Import the validator library
// Used to validate strings like email addresses and sanitize input
import validator from "validator";

// Import bcrypt for password hashing
// Bcrypt securely hashes passwords before saving them to the database
import bcrypt from "bcrypt";

// Import jsonwebtoken (JWT)
// Used to create authentication tokens for users after login or registration
import jwt from 'jsonwebtoken';

// Define a helper function to create a JWT token
// It takes the user's MongoDB _id and signs it with a secret key
const createToken = (id) => {
  // jwt.sign() creates a token with a payload {id} and a secret key from environment variables
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Define an asynchronous function to handle user login
// req = incoming request (contains email and password)
// res = response object (used to send back success or error messages)

{/*LOGIN */}
const loginUser = async (req, res) => {
  // Define an asynchronous function called loginUser
// This function handles user login requests and sends back a token if credentials are valid


// Use a try-catch block to handle errors gracefully
  // If anything goes wrong (e.g., database error), the catch block will respond with an error

        try {
             // Destructure email and password from the request body
    // These are the credentials sent by the client (e.g., from a login form)

            const {email, password} = req.body;
            
            // Search the database for a user with the given email
    // This checks if the user exists in the system
            const user = await userModel.findOne({email});

              
            // If no user is found, return a failure response
    // This prevents login attempts with unregistered emails
            if (!user) {
                return res.json({success:false, message:"User doesn't exists"})
            }

              // Compare the entered password with the hashed password stored in the database
    // bcrypt.compare() returns true if the passwords match
            const isMatch = await bcrypt.compare(password, user.password);

             // If the password matches, generate a JWT token using the user's ID
    // This token will be used for authentication in future requests
            if (isMatch) {
                const token = createToken(user._id)
               // Send a success response with the token
      // The frontend can store this token and use it to access protected routes
                res.json({success:true, token})
            }
            // If the password does not match, return an error message
    // This prevents login with incorrect credentials
            else{
                res.json({success:false, message:'Invalid credentials'})
            }

        // Catch any unexpected errors (e.g., database issues) and log them
  // Send a generic failure response to the client
        } catch (error) {
            console.log(error);
            res.json({success:false, message:error.message})
        }







};

// Define an asynchronous function to handle user registration

{/*REGISTERING NEW USER */}
const registerUser = async (req, res) => {
  // Use try-catch to handle errors gracefully
  try {
    // Extract name, email, and password from the request body
    const { name, email, password } = req.body;

    // Check if a user with the same email already exists in the database
    const exists = await userModel.findOne({ email });

    // If user exists, return a failure response
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate the email format using validator
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Check if the password is strong enough (minimum 8 characters)
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    // Generate a salt for hashing the password
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance with the hashed password
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    });

    // Save the new user to the database
    const user = await newUser.save();

    // Generate a JWT token for the newly registered user
    const token = createToken(user._id);

    // Send a success response with the token
    res.json({ success: true, token });

  } catch (error) {
    // Log the error and send a failure response
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Define an asynchronous function to handle admin login
{/*ADMIN LOGIN */}
const adminLogin = async (req, res) => {
  // Logic for authenticating an admin will go here
  // Example: check admin credentials, return admin token
};

// Export all three route handlers so they can be used in other files
// For example, you might import them in your routes file and attach them to endpoints
export { loginUser, registerUser, adminLogin };
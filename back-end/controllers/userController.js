import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'


const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}


// Route handler for user login
// This function will be triggered when a user tries to log in
// It receives two arguments:
// - req: the request object (contains user input like email and password)
// - res: the response object (used to send data back to the client)
const loginUser = async (req, res) => {
  // Logic for authenticating the user will go here
  // Example: check if email exists, compare password, return token
};

// Route handler for user registration
// This function will be triggered when a new user wants to sign up
// It also receives req and res
const registerUser = async (req, res) => {
    
  // Define an asynchronous function called registerUser
// This function handles the logic for registering a new user
  
        
  
       // Wrap the logic in a try-catch block to handle errors gracefully
  // If anything goes wrong, the catch block will respond with an error message

       try {
        // Destructure name, email, and password from the request body
    // These are the values sent by the client (e.g., from a registration form)

            const {name, email, password} = req.body;

            //checking user already exists or not

            const exists = await userModel.findOne({email});
             if (exists) {
                return res.json ({success: false, message: "User already exists"})
             }

             // Validating email format and strong password

             if (!validator.isEmail(email)) {
                return res.json({success:false, message:"Please enter a valid email"})
             }
                if (password.length < 8) {
                return res.json({success:false, message:"Please enter a strong password"})
             }

             // hashing user password

             const salt = await bcrypt.genSalt(10);
             const hashedPassword = await bcrypt.hash(password, salt);

             const newUser = new userModel ({
                name,
                email,
                password:hashedPassword
             });

             const user = await newUser.save();

            const token = createToken(user._id)

            res.json({success: true, token});



        } catch (error) {
            console.log(error);
            res.json({success: false, message: error.message})
            
        }
       


};

// Route handler for admin login
// This is a separate login flow for admin users
// It may include extra checks like admin role verification
const adminLogin = async (req, res) => {
  // Logic for authenticating an admin will go here
  // Example: check admin credentials, return admin token
};

// Export all three route handlers so they can be used in other files
// For example, you might import them in your routes file and attach them to endpoints
export { loginUser, registerUser, adminLogin };
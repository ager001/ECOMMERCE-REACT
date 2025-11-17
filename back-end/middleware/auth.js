// Import the jsonwebtoken library to handle JWT encoding and decoding
import jwt from 'jsonwebtoken'

// Define an asynchronous middleware function to authenticate users
// This function runs before protected route handlers to verify the user's identity
const authUser = async (req, res, next) => {
    
    // Extract the token from the request headers
    // The frontend should send this token after login, typically in the Authorization header
    const { token } = req.headers;

    // If no token is provided, deny access and send an error response
    if (!token) {
        return res.json({
            success: false,
            message: 'Not authorized, try to login again'
        });
    }

    try {
        // Verify the token using the secret key stored in environment variables
        // If valid, decode the token to extract the payload (e.g., user ID)
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user ID to the request body
        // This makes it accessible to downstream route handlers
        req.body.userId = token_decode.id;

        // Call next() to pass control to the next middleware or route handler
        next();

    } catch (error) {
        // If token verification fails (e.g., expired or tampered), log the error
        console.log(error);

        // Send a failure response with the error message
        res.json({
            success: false,
            message: error.message
        });
    }
}

// Export the middleware so it can be used in route definitions
export default authUser
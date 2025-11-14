import jwt from 'jsonwebtoken';
// Middleware function to authenticate admin access using JWT
const adminAuth = async (req, res, next) => {
  try {
    // Extract the token from the 'authorization' header (standard practice)
    const { token } = req.headers;

    // If no token is provided, return an unauthorized response
    if (!token) {
      return res.json({ success: false, message: "Not Authorized. Please log in again." });
    }

    // Verify the token using the secret key
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded payload matches expected admin credentials
    // This assumes the token payload was { email, password } or similar
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Not Authorized. Please log in again." });
    }

    // If everything is valid, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
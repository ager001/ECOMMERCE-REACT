import jwt from 'jsonwebtoken';
// Middleware function to authenticate admin access using JWT
const adminAuth = async (req, res, next) => {
  try {
    // Extract the token from the 'authorization' header (standard practice)
    const token = req.headers.authorization;

    // If no token is provided, return an unauthorized response
    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded payload matches expected admin credentials
    // This assumes the token payload was { email, password } or similar
    if (
      decoded.email !== process.env.ADMIN_EMAIL ||
      decoded.password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(403).json({ success: false, message: "Access denied. Invalid admin credentials." });
    }

    // If everything is valid, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default adminAuth;
const jwt = require("../utils/jwt");

exports.authenticateToken = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.auth_token;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Verify token
    const decoded = jwt.verifyToken(token);
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
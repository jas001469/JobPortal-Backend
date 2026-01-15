const { registerUser, loginUser } = require("./auth.service.js");

exports.register = async (req, res) => {
  try {
    const data = await registerUser(req.body);
    
    // Set HTTP-only cookie - UPDATED FOR CROSS-DOMAIN
    res.cookie("auth_token", data.token, {
      httpOnly: true,
      secure: true, // MUST be true for production (HTTPS)
      sameSite: "none", // CHANGED from "strict" to "none" for cross-domain
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/", // Explicitly set path
      // domain: "jobportal-backend-3smi.onrender.com" // Optional
    });

    res.status(201).json({ 
      success: true, 
      data: {
        user: {
          id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role
        }
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const data = await loginUser(req.body);
    
    // Set HTTP-only cookie - UPDATED FOR CROSS-DOMAIN
    res.cookie("auth_token", data.token, {
      httpOnly: true,
      secure: true, // MUST be true for production (HTTPS)
      sameSite: "none", // CHANGED from "strict" to "none" for cross-domain
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });

    res.status(200).json({ 
      success: true, 
      data: {
        user: {
          id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role
        }
      }
    });
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
};

// New: Get current user profile
exports.getUserProfile = async (req, res) => {
  try {
    const User = require("../../models/User.model.js");
    const user = await User.findById(req.user.id).select("-password");
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user profile",
      error: error.message,
    });
  }
};

// New: Logout user
exports.logout = async (req, res) => {
  try {
    // Clear the cookie - UPDATED
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};
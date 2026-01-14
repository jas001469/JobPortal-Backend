const User = require("../../models/User.model.js");
const { hashPassword, comparePassword } = require("../../utils/hash.js");
const { generateToken } = require("../../utils/jwt.js");

exports.registerUser = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const token = generateToken(user._id);

  return { user, token };
};

exports.loginUser = async ({ email, password, role }) => {
  const user = await User.findOne({ email });

  // ❌ email not found
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // ❌ role mismatch
  if (user.role !== role) {
    throw new Error("Invalid credentials");
  }

  // ❌ password mismatch
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user._id);

  return { user, token };
};
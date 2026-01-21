import { getConnection } from "../configs/Dbconfig.js"; 
import bcrypt from "bcryptjs";
import { generateToken } from "../middleware/authMiddleware.js";

export async function signupUser(req, res) {
  try {
    const conn = getConnection();
    const { user_name, email, password, role } = req.body;

    if (!user_name || !email || !password) {
      return res.status(400).send("All fields are required!");
    }

    const [existingUser] = await conn.query(
      `SELECT * FROM users WHERE email = '${email}'`
    );

    if (existingUser.length > 0) {
      return res.status(400).send("User already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await conn.query(
      `INSERT INTO users (user_name, email, password, role)
      VALUES ('${user_name}', '${email}', '${hashedPassword}', '${role || "user"}')`
    );


    if (result.affectedRows === 1) {
      return res.status(201).send("Signup successful!");
    } else {
      return res.status(400).send("Signup failed.");
    }
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send("Internal server error during signup.");
  }
}

export async function loginUser(req, res) {
  try {
    const conn = getConnection();
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required!");
    }

    // Find user by email
    const [user] = await conn.query(
     `SELECT * FROM users WHERE email = '${email}'`
    );


    if (user.length === 0) {
      return res.status(404).send("User not found!");
    }

    const foundUser = user[0];

    // Compare hashed passwords
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid password!");
    }

    // Optional: Check role
    if (role && foundUser.role !== role.toLowerCase()) {
      return res.status(403).send(`Not authorized as ${role}`);
    }

    // Generate JWT token
    const token = generateToken(foundUser);

    // Return login success with user info and token
    res.status(200).json({
      message: "Login successful!",
      user: {
        id: foundUser.user_id,
        name: foundUser.user_name,
        email: foundUser.email,
        role: foundUser.role,
      },
      token: token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal server error during login.");
  }
}

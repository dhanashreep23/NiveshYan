import express from "express";
import cors from "cors";

import { DbConnect } from "./configs/Dbconfig.js";

import { addRegistration, getUserRegistrations } from "./controllers/Registration.js";
import { getAllApplications } from "./controllers/AdminView.js";
import { updateStatus } from "./controllers/UpdateStatus.js";
import { loginUser, signupUser } from "./controllers/Login.js";
import { verifyToken, isAdmin, isUser } from "./middleware/authMiddleware.js";
import {
  applyLearningLicense,
  applyDrivingLicense,
  getUserLicenses,
  updateLicenseStatus,
  getAllLicenseApplications
} from "./controllers/LicenseController.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "Welcome to RTO Registration" });
});

// Public routes
app.post("/login", loginUser);
app.post("/signup", signupUser);

// to Get registrations for logged in user
app.get("/my-registrations", verifyToken, isUser, getUserRegistrations);
app.post("/register", verifyToken, isUser, addRegistration);

// Protected routes - admin access
app.get("/admin", verifyToken, isAdmin, getAllApplications);
app.put("/admin-update/:id", verifyToken, isAdmin, updateStatus);

// License routes - user access
app.post("/license/learning", verifyToken, isUser, applyLearningLicense);
app.post("/license/driving", verifyToken, isUser, applyDrivingLicense);
app.get("/license/user-licenses", verifyToken, isUser, getUserLicenses);

// License routes - admin access
app.put("/license/update-status", verifyToken, isAdmin, updateLicenseStatus);
app.get("/license/admin-applications", verifyToken, isAdmin, getAllLicenseApplications);

app.listen(7200, () => {
  console.log("Server running");
  DbConnect();
});
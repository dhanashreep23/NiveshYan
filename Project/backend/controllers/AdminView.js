import { getConnection } from "../configs/Dbconfig.js";

export async function getAllApplications(req, res) {
  try {
    const conn = getConnection();
    if (!conn) {
      console.error("Database connection not established");
      return res.status(500).json({ message: "Database connection error" });
    }

    const [rows] = await conn.query(
      "SELECT registration_id, owner_name, email, registration_no, vehicle_type, model, brand_name, status FROM registrations"
    );

    res.status(200).json(rows || []);
  } 
  catch (error) {
    console.error("Error fetching vehicle registrations:", error);
    res.status(500).json({ 
      message: "An error occurred while fetching vehicle registrations",
      error: error.message 
    });
  }
}
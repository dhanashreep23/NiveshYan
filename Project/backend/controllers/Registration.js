import { getConnection } from "../configs/Dbconfig.js";

// Get all registrations (admin use)
export async function getRegisterVehicles(req, res) {
  try {
    const conn = getConnection();
    const [row] = await conn.query("SELECT * FROM registrations");

    res.status(200).send(row);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

// Get single registration by id
export async function getRegisterVehicle(req, res) {
  try {
    const conn = getConnection();
    const [row] = await conn.query(
      'SELECT * FROM registrations WHERE registration_id = ?',
      [req.params.id]
    );
    res.status(200).send(row[0] || null);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

// Add a registration: the route is protected, so req.user should contain email / userId
export async function addRegistration(req, res) {
  // Validate request body and required fields before entering try so variables are in scope for catch
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }

  const {
    owner_name,
    email,
    address,
    phone_no,
    registration_no,
    vehicle_type,
    model,
    brand_name
  } = req.body;

  // Check if required fields are present
  if (!owner_name || !address || !phone_no || !registration_no || !vehicle_type || !model || !brand_name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const conn = getConnection();

    // Prefer email from token to prevent spoofing
    const userEmail = req.user?.email || email;

    // First check if registration_no already exists (parameterized)
    const [existing] = await conn.query(
      'SELECT registration_id FROM registrations WHERE registration_no = ?',
      [registration_no]
    );

    if (existing.length > 0) {
      return res.status(400).json({ 
        message: `Vehicle with registration number '${registration_no}' is already registered.` 
      });
    }

    const [result] = await conn.query(
      `INSERT INTO registrations(owner_name, email, address, phone_no, registration_no, vehicle_type, model, brand_name, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [owner_name, userEmail, address, phone_no, registration_no, vehicle_type, model, brand_name, 'Pending']
    );

    if (result.affectedRows === 1) {
      res.status(200).json({ 
        message: "Vehicle registration successful",
        registration: {
          registration_no: registration_no,
          status: 'Pending'
        }
      });
    } else {
      res.status(400).json({ message: "Registration failed - no rows affected" });
    }
  } catch (error) {
    console.error(error);
    // Check for MySQL duplicate key error
    if (error && error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ 
        message: `Vehicle with registration number ${registration_no} is already registered.`
      });
    }
    res.status(500).json({ 
      message: "An error occurred while registering the vehicle. Please try again." 
    });
  }
}

// Get registrations for the logged-in user
export async function getUserRegistrations(req, res) {
  try {
    const conn = getConnection();
    const userEmail = req.user?.email;
    if (!userEmail) return res.status(400).json({ message: 'User email not found in token' });

    const [rows] = await conn.query(
      'SELECT * FROM registrations WHERE email = ?',
      [userEmail]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
}
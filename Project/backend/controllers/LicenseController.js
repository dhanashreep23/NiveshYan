import { getConnection } from "../configs/Dbconfig.js";

export async function applyLearningLicense(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const {
      full_name,
      dob,
      phone_no,
      address,
      blood_group,
      identification_mark,
      license_type,
      aadhar_no,
    } = req.body;

    if (!full_name || !dob || !phone_no || !address || !blood_group || !license_type || !aadhar_no) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const conn = getConnection();
    const userEmail = req.user?.email;

    const [existing] = await conn.query(
      'SELECT * FROM learning_licenses WHERE email = ? AND status != "Rejected"',
      [userEmail]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "You already have a learning license application in process"
      });
    }

    const [result] = await conn.query(
      `INSERT INTO learning_licenses (
        full_name, email, dob, phone_no, address, blood_group, 
        identification_mark, license_type, aadhar_no, status, application_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        full_name,
        userEmail,
        dob,
        phone_no,
        address,
        blood_group,
        identification_mark || "",
        license_type,
        aadhar_no,
        "Pending"
      ]
    );

    if (result.affectedRows === 1) {
      res.status(200).json({
        message: "Learning license application submitted successfully",
        application: {
          full_name,
          license_type,
          status: "Pending"
        }
      });
    } else {
      res.status(400).json({ message: "Application submission failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while submitting your application"
    });
  }
}

export async function applyDrivingLicense(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const {
      full_name,
      learning_license_no,
      license_type,
      test_date_preference,
    } = req.body;

    if (!full_name || !learning_license_no || !license_type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const conn = getConnection();
    const userEmail = req.user?.email;

    const [learningLicense] = await conn.query(
      'SELECT * FROM learning_licenses WHERE email = ? AND license_no = ? AND status = "Approved"',
      [userEmail, learning_license_no]
    );

    if (learningLicense.length === 0) {
      return res.status(400).json({
        message: "You must have an approved learning license before applying for a driving license"
      });
    }

    const [existing] = await conn.query(
      'SELECT * FROM driving_licenses WHERE email = ? AND status != "Rejected"',
      [userEmail]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "You already have a driving license application in process"
      });
    }

    const [result] = await conn.query(
      `INSERT INTO driving_licenses (
        full_name, email, learning_license_no, license_type, 
        test_date_preference, status, application_date
      ) VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [
        full_name,
        userEmail,
        learning_license_no,
        license_type,
        test_date_preference || null,
        "Pending"
      ]
    );

    if (result.affectedRows === 1) {
      res.status(200).json({
        message: "Driving license application submitted successfully",
        application: {
          full_name,
          license_type,
          status: "Pending"
        }
      });
    } else {
      res.status(400).json({ message: "Application submission failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while submitting your application"
    });
  }
}

export async function getUserLicenses(req, res) {
  try {
    const conn = getConnection();
    const userEmail = req.user?.email;

    const [learningLicenses] = await conn.query(
      'SELECT * FROM learning_licenses WHERE email = ?',
      [userEmail]
    );

    const [drivingLicenses] = await conn.query(
      'SELECT * FROM driving_licenses WHERE email = ?',
      [userEmail]
    );

    res.status(200).json({
      learning_licenses: learningLicenses,
      driving_licenses: drivingLicenses
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching license applications"
    });
  }
}

export async function getAllLicenseApplications(req, res) {
  try {
    const conn = getConnection();

    const [learningLicenses] = await conn.query(
      'SELECT * FROM learning_licenses ORDER BY application_date DESC'
    );

    const [drivingLicenses] = await conn.query(
      'SELECT * FROM driving_licenses ORDER BY application_date DESC'
    );

    res.status(200).json({
      learning_licenses: learningLicenses,
      driving_licenses: drivingLicenses
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching license applications' });
  }
}

export async function updateLicenseStatus(req, res) {
  try {
    const { license_id, license_type, status } = req.body;

    if (!license_id || !license_type || !status) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const conn = getConnection();
    const table = license_type === 'learning' ? 'learning_licenses' : 'driving_licenses';
    const idField = 'license_id';

    if (status === 'Approved') {
      const prefix = license_type === 'learning' ? 'LL' : 'DL';
      const license_no = `${prefix}${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 900 + 100)}`;

      const [result] = await conn.query(
        `UPDATE ${table} SET status = ?, license_no = ?, updated_at = NOW() WHERE ${idField} = ?`,
        [status, license_no, license_id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'License application not found' });
      }

      return res.status(200).json({
        message: `${license_type} license application approved successfully`,
        license_no
      });
    }

    const [result] = await conn.query(
      `UPDATE ${table} SET status = ?, updated_at = NOW() WHERE ${idField} = ?`,
      [status, license_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'License application not found' });
    }

    res.status(200).json({ message: `${license_type} license application ${status.toLowerCase()} successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error updating license status'
    });
  }
}
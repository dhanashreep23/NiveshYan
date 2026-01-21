import { getConnection } from "../configs/Dbconfig.js";

export async function updateStatus(req, res) {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const conn = await getConnection();

    const [result] = await conn.query(
      `UPDATE registrations SET status = '${status}' WHERE registration_id =${req.params.id}`
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: `Application '${status}' successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
}

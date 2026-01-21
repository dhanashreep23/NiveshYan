import { createConnection } from "mysql2/promise";

let conn = null;
export async function DbConnect() {
  try { 
    conn = await createConnection({
      host: "localhost",
      user: "root",
      password: "cdac",
      port: "3306",
      database: "rto_portal",
    });
    console.log("Database connected");
    
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); 
  }
  return conn;
}

export function getConnection() {
  return conn;
}

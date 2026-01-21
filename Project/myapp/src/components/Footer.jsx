import React from "react";

function Footer() {
  return (
    <footer
      className="text-center py-3 shadow-sm"
      style={{
        fontFamily: "Poppins, sans-serif",
        background: "linear-gradient(135deg, #383838 0%, #525266 100%)",
        color: "#EEF4CE",
        width: "100%",
      }}
    >
      <p
        className="mb-0"
        style={{
          fontSize: "0.95rem",
          letterSpacing: "0.5px",
        }}
      >
        © {new Date().getFullYear()} <strong>NiveshYan</strong> — All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;

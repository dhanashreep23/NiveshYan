import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dhan from "../images/Dhan.png";
import Aka from "../images/aka.png";
import Bhushan from "../images/Bhushan.png";

function About() {
  const teamMembers = [
    {
      name: "Dhanashree Pawar",
      role: "Team Member",
      desc: "Detail-oriented and creative thinker who ensures every part of the system works flawlessly, from logic to design.",
      img: Dhan,
    },
    {
      name: "Bhushan Dhavan",
      role: "Team Member",
      desc: "Driven by curiosity and precision, he brings structure and polish to every project he works on.",
      img: Bhushan,
    },
    {
      name: "Akanksha Puri",
      role: "Team Member",
      desc: "Combines clarity of vision with a passion for building user-friendly and visually engaging experiences.",
      img: Aka,
    },
  ];

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#ffffff",
        color: "#383838",
      }}
    >
      <section
        className="text-center text-white py-5"
        style={{
          background: "linear-gradient(135deg, #383838 0%, #525266 100%)",
        }}
      >
        <div className="container">
          <h1 className="fw-bold display-5 mb-3">About Us</h1>
          <p
            className="lead mx-auto"
            style={{
              maxWidth: "750px",
              color: "#EEF4CE",
              lineHeight: "1.8",
            }}
          >
            We are a passionate team committed to innovation and excellence.
            Our mission is to create meaningful digital experiences through
            smart and sustainable solutions. We believe in technology that
            empowers, connects, and transforms everyday life.
          </p>
        </div>
      </section>

      <section
        className="py-5"
        style={{
          backgroundColor: "#D1E0DE",
        }}
      >
        <div className="container text-center">
          <h2 className="fw-bold mb-5" style={{ color: "#525266" }}>
            Our Team
          </h2>

          <div className="row g-4 justify-content-center">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-md-4">
                <div
                  className="card border-0 shadow text-center h-100"
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "20px",
                  }}
                >
                  <div className="card-body">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="mb-3 mt-2"
                      style={{
                        width: "140px",
                        height: "140px",
                        objectFit: "cover",
                        borderRadius: "20px",
                      }}
                    />
                    <h5 className="fw-semibold" style={{ color: "#383838" }}>
                      {member.name}
                    </h5>
                    <p
                      className="mb-2"
                      style={{ color: "#525266", fontWeight: "500" }}
                    >
                      {member.role}
                    </p>
                    <p style={{ color: "#4D5C60" }}>{member.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-5"
        style={{
          backgroundColor: "#ffffff",
        }}
      >
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Vision */}
            <div className="col-md-6">
              <div
                className="p-4 rounded shadow-sm"
                style={{
                  backgroundColor: "#D1E0DE",
                  borderRadius: "20px",
                }}
              >
                <h2 className="fw-bold mb-3" style={{ color: "#525266" }}>
                  Our Vision
                </h2>
                <p style={{ color: "#4D5C60", lineHeight: "1.7" }}>
                  To empower individuals and organizations through intelligent,
                  accessible, and sustainable technology solutions that inspire
                  growth and creativity.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="col-md-6">
              <div
                className="p-4 rounded shadow-sm"
                style={{
                  backgroundColor: "#D1E0DE",
                  borderRadius: "20px",
                }}
              >
                <h2 className="fw-bold mb-3" style={{ color: "#525266" }}>
                  Our Mission
                </h2>
                <p style={{ color: "#4D5C60", lineHeight: "1.7" }}>
                  To continuously innovate, build reliable digital products, and
                  foster long-term trust through transparent and quality-driven
                  technology solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        style={{
          height: "50px",
          background: "linear-gradient(135deg, #383838 0%, #525266 100%)",
        }}
      ></div>
    </div>
  );
}

export default About;

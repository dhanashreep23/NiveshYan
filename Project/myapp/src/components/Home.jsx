import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import carImage from "../images/home-img.jpg";
import Register from "./Register";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #ffffff, #D1E0DE)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins, sans-serif",
        padding: "60px 0",
      }}
    >
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col
            md={6}
            className="text-center text-md-start mb-5 mb-md-0"
            style={{ paddingRight: "30px" }}
          >
            <h1
              className="fw-bold mb-4"
              style={{ color: "#383838" }} 
            >
              Welcome to{" "}
              <span style={{ color: "#525266" }}>NiveshYan</span>
            </h1>

            <p
              className="lead mb-4"
              style={{
                color: "#4D5C60",
                lineHeight: "1.8",
                fontSize: "1.1rem",
              }}
            >
              NiveshYan is your one-stop platform for vehicle registration and
              management. We make it easy to register, manage, and track your
              vehicles with a secure and user-friendly interface.
              <br />
              <br />
              Experience convenience and efficiency like never before — all in
              one place.
            </p>

            <Button
              size="lg"
              className="fw-semibold px-4 py-2 rounded-pill shadow"
              style={{
                backgroundColor: "#EEF4CE", 
                color: "#383838",
                border: "none",
              }}
              onClick={() => navigate("/signup")}
            >
              Register Now
            </Button>
          </Col>

          <Col md={6} className="text-center">
            <Card
              className="shadow border-0 rounded-4"
              style={{
                overflow: "hidden",
                backgroundColor: "#ffffff",
              }}
            >
              <Card.Img
                variant="top"
                src={carImage}
                alt="Cars Display"
                className="img-fluid"
                style={{
                  objectFit: "cover",
                  height: "380px",
                }}
              />
            </Card>
          </Col>
        </Row>

        <div style={{ marginTop: "60px" }}>
          <Register />
        </div>
      </Container>
    </div>
  );
}

export default Home;

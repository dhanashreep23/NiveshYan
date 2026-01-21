import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.svg"; 

const NavigationBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="shadow-sm"
      style={{
        background: "linear-gradient(135deg, #383838 0%, #525266 100%)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-4 d-flex align-items-center"
          style={{ color: "#EEF4CE", gap: "10px" }}
        >
          <img
            src={logo}
            alt="NiveshYana Logo"
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
            }}
          />
          NiveshYan
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarNav" />

        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link
              as={Link}
              to="/"
              style={{ color: "#ffffff", fontWeight: 500, margin: "0 10px" }}
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/about"
              style={{ color: "#ffffff", fontWeight: 500, margin: "0 10px" }}
            >
              About
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/services"
              style={{ color: "#ffffff", fontWeight: 500, margin: "0 10px" }}
            >
              Services
            </Nav.Link>          

            <Nav.Link
              as={Link}
              to="/help"
              style={{ color: "#ffffff", fontWeight: 500, margin: "0 10px" }}
            >
              Help Center
            </Nav.Link>

            <div
              className="vr mx-3 d-none d-lg-block"
              style={{ backgroundColor: "#D1E0DE", opacity: 0.6 }}
            ></div>

            {!isLoggedIn ? (
              <>
                <Button
                  variant="outline-light"
                  className="mx-2 px-4 fw-semibold rounded-pill"
                  style={{
                    borderColor: "#EEF4CE",
                    color: "#EEF4CE",
                    fontWeight: 500,
                    transition: "0.3s",
                  }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>

                <Button
                  className="mx-2 px-4 fw-semibold rounded-pill"
                  style={{
                    backgroundColor: "#EEF4CE",
                    color: "#383838",
                    border: "none",
                    fontWeight: 500,
                    transition: "0.3s",
                  }}
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <Button
                className="mx-2 px-4 fw-semibold rounded-pill"
                style={{
                  backgroundColor: "#4D5C60",
                  border: "none",
                  color: "#ffffff",
                  fontWeight: 500,
                  transition: "0.3s",
                }}
                onClick={handleLogout}
              >
                Log Out
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

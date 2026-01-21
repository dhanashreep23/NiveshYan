import { useState } from "react";
import { Form, Button, Container, Card, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const [role, setRole] = useState("user"); 
  const [loading, setLoading] = useState(false); 
  const [data, setData] = useState({ email: "", password: "" }); 
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = {};
    const emailRe = /^\S+@\S+\.\S+$/;
    if (!data.email || !emailRe.test(data.email)) newErrors.email = 'Enter a valid email';
    if (!data.password) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post("http://localhost:7200/login", {
        email: data.email,
        password: data.password,
        role,
      });

      if (res.status === 200) {
        toast.success(`Login successfull!`, { transition: Bounce });
        localStorage.setItem("token", res.data.token);
        setData({ email: "", password: "" });
        setTimeout(() => navigate(role === "admin" ? "/admin" : "/"), 1500);
      }
    } catch (error) {
      toast.error(error.response?.data || "Login failed.", { transition: Bounce });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#ffffff" }}
    >
      <ToastContainer position="top-right" autoClose={2000} theme="light" />

      <Card
        className="p-4 shadow-sm w-100"
        style={{
          maxWidth: "440px",
          borderRadius: "16px",
          backgroundColor: "#D1E0DE", 
          border: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)", 
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <h3
          className="text-center mb-4 fw-bold"
          style={{ color: "#383838" }}
        >
          {role === "admin" ? "Admin Login" : "User Login"}
        </h3>

        <div className="d-flex justify-content-center mb-3">
          <ToggleButtonGroup type="radio" name="role" value={role} onChange={setRole}>
            {["user", "admin"].map((r) => (
              <ToggleButton
                key={r}
                id={`tbg-radio-${r}`}
                value={r}
                variant="outline-dark"
                style={{
                  borderRadius: "30px",
                  color: role === r ? "#fff" : "#525266", // Highlight vs secondary
                  backgroundColor: role === r ? "#383838" : "#ffffff",
                  borderColor: "#383838",
                  padding: "6px 18px",
                  fontWeight: "500",
                }}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "#4D5C60", fontWeight: "500", fontSize: "14px" }}>
              Email
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              isInvalid={!!errors.email}
              style={{
                borderRadius: "8px",
                border: "1px solid #ccc",
                boxShadow: "none",
                padding: "10px",
              }}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "#4D5C60", fontWeight: "500", fontSize: "14px" }}>
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
              isInvalid={!!errors.password}
              style={{
                borderRadius: "8px",
                border: "1px solid #ccc",
                boxShadow: "none",
                padding: "10px",
              }}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="dark"
            type="submit"
            className="w-100 fw-semibold rounded-pill"
            disabled={loading}
            style={{
              backgroundColor: "#383838",
              border: "none",
              padding: "10px 0",
            }}
          >
            {loading ? "Logging in..." : `Login as ${role}`}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <span className="text-muted" style={{ fontSize: "14px", color: "#4D5C60" }}>
            Don’t have an account?{" "}
          </span>
          <Button
            variant="link"
            className="p-0 fw-semibold"
            style={{ color: "#525266", textDecoration: "underline" }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default UserLogin;

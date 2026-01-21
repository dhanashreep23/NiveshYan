import { useState } from "react";
import { Form, Button, Container, Card, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserSignup() {
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ user_name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!data.user_name.trim()) newErrors.user_name = 'Full name is required';
    const emailRe = /^\S+@\S+\.\S+$/;
    if (!data.email || !emailRe.test(data.email)) newErrors.email = 'Valid email is required';
    if (!data.password) newErrors.password = 'Password is required';
    else if (data.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (data.password !== data.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:7200/signup", {
        user_name: data.user_name,
        email: data.email,
        password: data.password,
        role,
      });

      if (res.status === 201 || res.status === 200) {
        toast.success("Registration successfull!", { transition: Bounce });
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error) {
      toast.error("Registration failed.", { transition: Bounce });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#ffffff", fontFamily: "Poppins, sans-serif" }}
    >
      <ToastContainer position="top-right" autoClose={2000} theme="light" />

      <Card
        className="p-4 shadow-sm w-100"
        style={{
          maxWidth: "480px",
          borderRadius: "20px",
          backgroundColor: "#D1E0DE", 
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          border: "none", 
        }}
      >
        {/* Header */}
        <h3 className="text-center mb-4 fw-bold" style={{ color: "#383838" }}>
          Sign Up
        </h3>

        {/* Role toggle */}
        <div className="d-flex justify-content-center mb-3">
          <ToggleButtonGroup type="radio" name="role" value={role} onChange={setRole}>
            {["user", "admin"].map((r) => (
              <ToggleButton
                key={r}
                id={`rb-${r}`}
                value={r}
                variant="outline-dark"
                style={{
                  borderRadius: "30px",
                  color: role === r ? "#fff" : "#525266",
                  backgroundColor: role === r ? "#383838" : "#ffffff",
                  border: "none", // removed border
                  padding: "6px 18px",
                  fontWeight: "500",
                }}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>

        {/* Form */}
        <Form onSubmit={handleSubmit} noValidate>
          {["Full Name", "Email", "Password", "Confirm Password"].map((label, idx) => {
            const name = ["user_name", "email", "password", "confirmPassword"][idx];
            const type = label.toLowerCase().includes("password") ? "password" : "text";
            const placeholder = `Enter ${label.toLowerCase()}`;
            return (
              <Form.Group className="mb-3" key={name}>
                <Form.Label style={{ color: "#4D5C60", fontWeight: "500" }}>{label}</Form.Label>
                <Form.Control
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={data[name]}
                  onChange={handleChange}
                    required
                    isInvalid={!!errors[name]}
                  style={{
                    borderRadius: "12px",
                    border: "none", 
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    padding: "12px",
                  }}
                />
                  <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
              </Form.Group>
            );
          })}

          {/* Submit button */}
          <Button
            type="submit"
            className="w-100 fw-semibold rounded-pill"
            disabled={loading}
            style={{
              backgroundColor: "#383838",
              color: "#fff",
              border: "none",
              padding: "10px 0",
            }}
          >
            {loading ? "Registering..." : `Sign Up as ${role}`}
          </Button>
        </Form>

        {/* Login redirect */}
        <div className="text-center mt-3">
          <span style={{ fontSize: "14px", color: "#4D5C60" }}>Already have an account? </span>
          <Button
            variant="link"
            className="p-0 fw-semibold"
            style={{ color: "#525266", textDecoration: "underline" }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default UserSignup;

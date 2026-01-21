import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import { Register, getUserRegistrations } from "../services/Registerform"; 
import { useNavigate } from "react-router-dom";

function VehicleRegister() {
  const [formData, setFormData] = useState({
    owner_name: "",
    email: "",
    address: "",
    phone_no: "",
    registration_no: "",
    vehicle_type: "",
    model: "",
    brand_name: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const newErrors = {};
    if (!formData.owner_name.trim()) newErrors.owner_name = "Owner name is required";
    const emailRe = /^\S+@\S+\.\S+$/;
    if (!formData.email || !emailRe.test(formData.email)) newErrors.email = "Valid email is required";
    const phoneRe = /^\d{10}$/;
    if (!formData.phone_no || !phoneRe.test(formData.phone_no)) newErrors.phone_no = "Enter a 10-digit phone number";
    // Registration number pattern like MH12AB1234 (simplified)
    const regRe = /^[A-Za-z]{2}\d{2}[A-Za-z]{1,2}\d{4}$/;
    if (!formData.registration_no || !regRe.test(formData.registration_no.replace(/\s+/g, ''))) newErrors.registration_no = "Enter registration in format MH12AB1234";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.vehicle_type.trim()) newErrors.vehicle_type = "Vehicle type is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (!formData.brand_name.trim()) newErrors.brand_name = "Brand name is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the highlighted errors.", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
      return;
    }

    try {
      console.log("Submitting data:", formData);

      const res = await Register(formData); // API call
      console.log("API Response:", res);

      toast.success("Vehicle Registered Successfully!", {
        position: "top-right",
        autoClose: 2000,
        transition: Bounce,
      });

      // Clear form after successful submit
      setFormData({
        owner_name: "",
        email: "",
        address: "",
        phone_no: "",
        registration_no: "",
        vehicle_type: "",
        model: "",
        brand_name: "",
      });
      setErrors({});
      // Refresh user's registrations
      fetchUserRegistrations();
    } 
    catch (error) {
      console.error("Registration failed:", error);

      // Show the specific error message from backend if available
      const errorMessage = error.response?.data?.message || error.response?.data || "Registration failed. Please try again.";
      toast.error(errorMessage, {
        position: "top-right", 
        autoClose: 2000,
        transition: Bounce,
      });
    }
  };

  const [userRegs, setUserRegs] = useState([]);
  const [showRegs, setShowRegs] = useState(false); // control visibility across reloads
  const navigate = useNavigate();

  const fetchUserRegistrations = async () => {
    try {
      const res = await getUserRegistrations();
      setUserRegs(res.data || []);
      setShowRegs(true);
    } catch (err) {
      console.error('Failed to fetch user registrations', err);
    }
  };

  return (
    <div className="register-page">
      <Container fluid className="form-container">
        <h2 className="text-center mb-4">Vehicle Registration Form</h2>
        {!localStorage.getItem('token') ? (
          <div className="text-center mb-4">
            <p>Please log in to register a vehicle.</p>
            <Button variant="dark" onClick={() => navigate('/login')}>Go to Login</Button>
          </div>
        ) : null}
        {localStorage.getItem('token') && (
          <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="form-section">
              <Form.Group className="mb-3">
                <Form.Label>Owner Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Owner Name"
                  name="owner_name"
                  value={formData.owner_name}
                  onChange={handleChange}
                    isInvalid={!!errors.owner_name}
                    required
                />
                  <Form.Control.Feedback type="invalid">{errors.owner_name}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                    isInvalid={!!errors.email}
                    required
                />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                    isInvalid={!!errors.address}
                    required
                />
                  <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter 10-digit Phone Number"
                  name="phone_no"
                  value={formData.phone_no}
                  onChange={handleChange}
                    isInvalid={!!errors.phone_no}
                    required
                />
                  <Form.Control.Feedback type="invalid">{errors.phone_no}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Right Section */}
            <Col md={6} className="form-section">
              <Form.Group className="mb-3">
                <Form.Label>Registration Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., MH12AB1234"
                  name="registration_no"
                  value={formData.registration_no}
                  onChange={handleChange}
                    isInvalid={!!errors.registration_no}
                    required
                />
                  <Form.Control.Feedback type="invalid">{errors.registration_no}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Vehicle Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Car, Bike, Truck, etc."
                  name="vehicle_type"
                  value={formData.vehicle_type}
                  onChange={handleChange}
                    isInvalid={!!errors.vehicle_type}
                    required
                />
                  <Form.Control.Feedback type="invalid">{errors.vehicle_type}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                    isInvalid={!!errors.model}
                    required
                />
                  <Form.Control.Feedback type="invalid">{errors.model}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Brand Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Brand Name"
                  name="brand_name"
                  value={formData.brand_name}
                  onChange={handleChange}
                    isInvalid={!!errors.brand_name}
                    required
                />
                  <Form.Control.Feedback type="invalid">{errors.brand_name}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center mt-4">
            <Button type="submit" variant="dark" className="px-5">
              Register Vehicle
            </Button>
          </div>
          </Form>
        )}

        {localStorage.getItem('token') && (
          <div className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Your Registrations</h4>
              <div>
                <Button variant="dark" size="sm" onClick={() => fetchUserRegistrations()}>
                  Show my registrations
                </Button>
              </div>
            </div>

            {showRegs ? (
              userRegs.length === 0 ? (
                <p>No registrations found.</p>
              ) : (
                <div className="registration-list">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Registration No</th>
                        <th>Model</th>
                        <th>Brand</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userRegs.map((r) => (
                        <tr key={r.registration_id}>
                          <td>{r.registration_id}</td>
                          <td>{r.registration_no}</td>
                          <td>{r.model}</td>
                          <td>{r.brand_name}</td>
                          <td>{r.status || 'Pending'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ) : (
              <p className="text-muted">Registrations are hidden. Click "Show my registrations" to view.</p>
            )}
          </div>
        )}
      </Container>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
}

export default VehicleRegister;
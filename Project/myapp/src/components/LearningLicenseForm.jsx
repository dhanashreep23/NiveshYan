import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import axios from "axios";
import "./License.css"; 
import { useNavigate } from 'react-router-dom';

const LearningLicenseForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    dob: "",
    phone_no: "",
    address: "",
    blood_group: "",
    identification_mark: "",
    license_type: "",
    aadhar_no: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // client-side validation
    const newErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = 'Full name is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    else {
      const dobDate = new Date(formData.dob);
      const ageDifMs = Date.now() - dobDate.getTime();
      const ageDate = new Date(ageDifMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      if (age < 16) newErrors.dob = 'You must be at least 16 years old to apply';
    }
    const phoneRe = /^\d{10}$/;
    if (!formData.phone_no || !phoneRe.test(formData.phone_no)) newErrors.phone_no = 'Enter a valid 10-digit phone number';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.blood_group) newErrors.blood_group = 'Select blood group';
    if (!formData.license_type) newErrors.license_type = 'Select license type';
    const aadharRe = /^\d{12}$/;
    if (!formData.aadhar_no || !aadharRe.test(formData.aadhar_no)) newErrors.aadhar_no = 'Enter a 12-digit Aadhar number';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:7200/license/learning",
        formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setMessage({ type: "success", text: response.data.message });
      setFormData({
        full_name: "",
        dob: "",
        phone_no: "",
        address: "",
        blood_group: "",
        identification_mark: "",
        license_type: "",
        aadhar_no: "",
      });
      setErrors({});
    } catch (error) {
      const serverMessage = error.response?.data?.message || "An error occurred";
      setMessage({ type: "danger", text: serverMessage });

      // If token is invalid or expired, clear it and redirect to login
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        setTimeout(() => navigate('/login'), 1500);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <Card
        style={{
          fontFamily: "Poppins, sans-serif",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          backgroundColor: "#ffffff",
        }}
      >
        
        <Card.Header
          as="h4"
          className="text-center"
          style={{ backgroundColor: "#383838", color: "#EEF4CE" }}
        >
          Learning License Application
        </Card.Header>

        <Card.Body style={{ backgroundColor: "#D1E0DE" }}>
          {message.text && (
            <Alert
              variant={message.type}
              onClose={() => setMessage({ type: "", text: "" })}
              dismissible
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {message.text}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#525266" }}>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                isInvalid={!!errors.full_name}
                required
              />
              <Form.Control.Feedback type="invalid">{errors.full_name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#525266" }}>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                isInvalid={!!errors.dob}
                required
              />
              <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#525266" }}>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone_no"
                value={formData.phone_no}
                onChange={handleChange}
                pattern="[0-9]{10}"
                isInvalid={!!errors.phone_no}
                required
              />
              <Form.Control.Feedback type="invalid">{errors.phone_no}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#525266" }}>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                value={formData.address}
                onChange={handleChange}
                isInvalid={!!errors.address}
                required
              />
              <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#525266" }}>Blood Group</Form.Label>
              <Form.Select
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
                isInvalid={!!errors.blood_group}
                required
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#525266" }}>Identification Mark</Form.Label>
              <Form.Control
                type="text"
                name="identification_mark"
                value={formData.identification_mark}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#525266" }}>License Type</Form.Label>
              <Form.Select
                name="license_type"
                value={formData.license_type}
                onChange={handleChange}
                isInvalid={!!errors.license_type}
                required
              >
                <option value="">Select License Type</option>
                <option value="Two-wheeler">Two Wheeler</option>
                <option value="Four-wheeler">Four Wheeler</option>
                <option value="Commercial">Commercial</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#525266" }}>Aadhar Number</Form.Label>
              <Form.Control
                type="text"
                name="aadhar_no"
                value={formData.aadhar_no}
                onChange={handleChange}
                pattern="[0-9]{12}"
                isInvalid={!!errors.aadhar_no}
                required
              />
              <Form.Control.Feedback type="invalid">{errors.aadhar_no}</Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid">
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: "#383838",
                  borderColor: "#383838",
                  fontWeight: "500",
                }}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LearningLicenseForm;

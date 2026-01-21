import { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import './License.css'; 

const DrivingLicenseForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    learning_license_no: '',
    license_type: '',
    test_date_preference: ''
  });

  const [learningLicense, setLearningLicense] = useState(null);

  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchLearningLicense = async () => {
      try {
        const response = await axios.get('http://localhost:7200/license/user-licenses', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        const data = response.data;
        let approvedLicense = null;

        if (Array.isArray(data.learning_licenses)) {
          approvedLicense = data.learning_licenses.find(l => l.status === 'Approved');
        } else if (data.learning_license && data.learning_license.status === 'Approved') {
          approvedLicense = data.learning_license;
        }

        if (approvedLicense) {
          setLearningLicense(approvedLicense);
          setFormData({
            full_name: approvedLicense.full_name || '',
            learning_license_no: approvedLicense.license_no || '',
            license_type: approvedLicense.license_type || '',
            test_date_preference: ''
          });
        }
      } catch (error) {
        console.error('Error fetching learning license:', error);
      }
    };
    fetchLearningLicense();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const newErrors = {};
    if (!formData.license_type) newErrors.license_type = 'Select license type';
    if (!formData.test_date_preference) newErrors.test_date_preference = 'Select preferred test date';
    else {
      const selected = new Date(formData.test_date_preference);
      const minDate = new Date();
      minDate.setDate(minDate.getDate() + 7);
      // compare selected >= minDate (only date parts)
      selected.setHours(0,0,0,0);
      minDate.setHours(0,0,0,0);
      if (selected < minDate) newErrors.test_date_preference = 'Please choose a date at least 7 days from today';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post('http://localhost:7200/license/driving', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessage({ type: 'success', text: response.data.message });
      setFormData(prev => ({ ...prev, test_date_preference: '' }));
  setErrors({});
    } catch (error) {
      setMessage({ type: 'danger', text: error.response?.data?.message || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  if (!learningLicense) {
    return (
      <Container className="my-4">
        <Alert variant="warning" style={{ fontFamily: 'Poppins, sans-serif', color: '#383838' }}>
          You must have an approved learning license before applying for a driving license.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card
        style={{
          fontFamily: 'Poppins, sans-serif',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          backgroundColor: '#ffffff'
        }}
      >
        <Card.Header
          as="h4"
          className="text-center"
          style={{ backgroundColor: '#383838', color: '#EEF4CE' }}
        >
          Driving License Application
        </Card.Header>

        <Card.Body style={{ backgroundColor: '#D1E0DE' }}>
          {message.text && (
            <Alert
              variant={message.type}
              onClose={() => setMessage({ type: '', text: '' })}
              dismissible
              style={{ fontFamily: 'Poppins, sans-serif', color: '#4D5C60' }}
            >
              {message.text}
            </Alert>
          )}

          {/* Form */}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#525266' }}>Full Name</Form.Label>
              <Form.Control type="text" name="full_name" value={formData.full_name} readOnly />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#525266' }}>Learning License Number</Form.Label>
              <Form.Control type="text" name="learning_license_no" value={formData.learning_license_no} readOnly />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#525266' }}>License Type</Form.Label>
              <Form.Select name="license_type" value={formData.license_type} onChange={handleChange} required>
                <option value="">Select License Type</option>
                <option value="Two-wheeler">Two Wheeler</option>
                <option value="Four-wheeler">Four Wheeler</option>
                <option value="Commercial">Commercial</option>
              </Form.Select>
                {errors.license_type && <div className="text-danger small mt-1">{errors.license_type}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#525266' }}>Preferred Test Date</Form.Label>
              <Form.Control
                type="date"
                name="test_date_preference"
                value={formData.test_date_preference}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
              <Form.Text style={{ color: '#4D5C60' }}>Select a date at least 7 days from today</Form.Text>
              {errors.test_date_preference && <div className="text-danger small mt-1">{errors.test_date_preference}</div>}
            </Form.Group>

            <div className="d-grid">
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: '#383838',
                  borderColor: '#383838',
                  fontWeight: '500'
                }}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DrivingLicenseForm;

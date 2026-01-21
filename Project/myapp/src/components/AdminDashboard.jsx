import { useEffect, useState } from "react";
import { Table, Button, Container, Modal } from "react-bootstrap";
import {
  getAllApplications,
  updateStatus,
  getAllLicenseApplications,
  updateLicenseStatusApi,
} from "../services/Registerform";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [licenseApps, setLicenseApps] = useState({ learning_licenses: [], driving_licenses: [] });

  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch vehicle registrations
    getAllApplications()
      .then((res) => {
        console.log("Vehicle registrations received:", res.data);
        setApplications(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching registration data:", err);
        setApplications([]);
      });

    // Fetch license applications
    getAllLicenseApplications()
      .then((res) => {
        console.log("License applications received:", res.data);
        if (res.data && (res.data.learning_licenses || res.data.driving_licenses)) {
          setLicenseApps(res.data);
        } else {
          console.warn("Received empty or invalid license data");
          setLicenseApps({ learning_licenses: [], driving_licenses: [] });
        }
      })
      .catch((err) => {
        console.error("Error fetching license data:", err);
        setLicenseApps({ learning_licenses: [], driving_licenses: [] });
      });
  }, []);

  // Handle registration approve/reject
  const handleAction = (id, status) => {
    updateStatus(id, { status })
      .then(() => {
        alert(`Application ${status}`);
        setApplications((prev) =>
          prev.map((a) => (a.registration_id === id ? { ...a, status } : a))
        );
      })
      .catch((err) => console.error("Error updating registration status:", err));
  };

  // Handle license approve/reject
  const handleLicenseAction = (id, type, status) => {
    updateLicenseStatusApi({ license_id: id, license_type: type, status })
      .then((res) => {
        const license_no = res.data.license_no;
        alert(`License ${status}` + (license_no ? ` (no: ${license_no})` : ''));

        setLicenseApps((prev) => {
          const key = type === "learning" ? "learning_licenses" : "driving_licenses";
          return {
            ...prev,
            [key]: prev[key].map((l) =>
              l.license_id === id
                ? { ...l, status, license_no: license_no || l.license_no }
                : l
            ),
          };
        });
      })
      .catch((err) => console.error("Error updating license status:", err));
  };

  // Open modal to view registration
  const handleView = (app) => {
    setSelectedApp(app);
    setShowModal(true);
  };

  // Modal close
  const handleClose = () => {
    setSelectedApp(null);
    setShowModal(false);
  };

  return (
    <Container className="admin-container">
      <h2 className="admin-header">Admin Dashboard</h2>

      {/* Vehicle Registrations */}
      <h3 className="section-header">Vehicle Registration Applications</h3>
      <Table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Owner Name</th>
            <th>Registration No</th>
            <th>Type</th>
            <th>Model</th>
            <th>Brand</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.registration_id} className="table-row">
              <td>{app.registration_id}</td>
              <td>{app.owner_name}</td>
              <td>{app.registration_no}</td>
              <td>{app.vehicle_type}</td>
              <td>{app.model}</td>
              <td>{app.brand_name}</td>
              <td>{app.status}</td>
              <td>
                {/* View Button */}
                <Button className="action-btn view" onClick={() => handleView(app)}>
                  View
                </Button>
                {/* Approve/Reject Buttons */}
                <Button
                  className="action-btn approve"
                  disabled={app.status === "Approved" || app.status === "Rejected"}
                  onClick={() => handleAction(app.registration_id, "Approved")}
                >
                  Approve
                </Button>
                <Button
                  className="action-btn reject"
                  disabled={app.status === "Approved" || app.status === "Rejected"}
                  onClick={() => handleAction(app.registration_id, "Rejected")}
                >
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Viewing Vehicle Registration */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Vehicle Registration Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApp && (
            <div>
              <p><strong>ID:</strong> {selectedApp.registration_id}</p>
              <p><strong>Owner Name:</strong> {selectedApp.owner_name}</p>
              <p><strong>Registration No:</strong> {selectedApp.registration_no}</p>
              <p><strong>Vehicle Type:</strong> {selectedApp.vehicle_type}</p>
              <p><strong>Model:</strong> {selectedApp.model}</p>
              <p><strong>Brand:</strong> {selectedApp.brand_name}</p>
              <p><strong>Status:</strong> {selectedApp.status}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* You can add Learning and Driving License tables similarly */}
      {/* Learning License Applications */}
      <h3 className="section-header mt-5">Learning License Applications</h3>
      <Table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>License No</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {licenseApps.learning_licenses.map((app) => (
            <tr key={app.license_id} className="table-row">
              <td>{app.license_id}</td>
              <td>{app.name}</td>
              <td>{app.email}</td>
              <td>{app.phone_no}</td>
              <td>{app.license_no || 'Pending'}</td>
              <td>{app.status}</td>
              <td>
                <Button
                  className="action-btn approve"
                  disabled={app.status === "Approved" || app.status === "Rejected"}
                  onClick={() => handleLicenseAction(app.license_id, "learning", "Approved")}
                >
                  Approve
                </Button>
                <Button
                  className="action-btn reject"
                  disabled={app.status === "Approved" || app.status === "Rejected"}
                  onClick={() => handleLicenseAction(app.license_id, "learning", "Rejected")}
                >
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Driving License Applications */}
      <h3 className="section-header mt-5">Driving License Applications</h3>
      <Table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Learning License</th>
            <th>License No</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {licenseApps.driving_licenses.map((app) => (
            <tr key={app.license_id} className="table-row">
              <td>{app.license_id}</td>
              <td>{app.name}</td>
              <td>{app.email}</td>
              <td>{app.phone_no}</td>
              <td>{app.learning_license_no}</td>
              <td>{app.license_no || 'Pending'}</td>
              <td>{app.status}</td>
              <td>
                <Button
                  className="action-btn approve"
                  disabled={app.status === "Approved" || app.status === "Rejected"}
                  onClick={() => handleLicenseAction(app.license_id, "driving", "Approved")}
                >
                  Approve
                </Button>
                <Button
                  className="action-btn reject"
                  disabled={app.status === "Approved" || app.status === "Rejected"}
                  onClick={() => handleLicenseAction(app.license_id, "driving", "Rejected")}
                >
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminDashboard;

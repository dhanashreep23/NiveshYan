import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HelpCenter = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);
    formData.append("access_key", "762ffb25-233b-4292-a974-583198d390f3");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      setResult("Error");
    }
  };

  return (
    <div
      className="py-5"
      style={{
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#D1E0DE",
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-6" style={{ color: "#383838" }}>
            Get In Touch
          </h2>
          <p className="fs-5" style={{ color: "#4D5C60" }}>
            We’d love to hear from you.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div
              className="card border-0 shadow-lg rounded-4 p-4"
              style={{ backgroundColor: "#ffffff" }}
            >
              <h4 className="fw-bold mb-3" style={{ color: "#383838" }}>
                Send Us a Message
              </h4>
              <p style={{ color: "#4D5C60" }}>
                Feel free to reach out through our form or find our contact
                information below. We value your feedback and questions.
              </p>

              {/* Email */}
              <div className="d-flex align-items-start bg-light rounded-3 p-3 mb-3 shadow-sm">
                <div
                  className="p-3 rounded-3 me-3"
                  style={{ backgroundColor: "#EEF4CE" }}
                >
                  <i
                    className="bi bi-envelope-fill"
                    style={{ color: "#383838" }}
                  ></i>
                </div>
                <div>
                  <p className="mb-0 small" style={{ color: "#4D5C60" }}>
                    Email
                  </p>
                  <h6 className="fw-semibold mb-0" style={{ color: "#383838" }}>
                    dhanashreepawar133@gmail.com
                  </h6>
                </div>
              </div>

              {/* Phone */}
              <div className="d-flex align-items-start bg-light rounded-3 p-3 mb-3 shadow-sm">
                <div
                  className="p-3 rounded-3 me-3"
                  style={{ backgroundColor: "#EEF4CE" }}
                >
                  <i
                    className="bi bi-telephone-fill"
                    style={{ color: "#383838" }}
                  ></i>
                </div>
                <div>
                  <p className="mb-0 small" style={{ color: "#4D5C60" }}>
                    Phone
                  </p>
                  <h6 className="fw-semibold mb-0" style={{ color: "#383838" }}>
                    +91 9860373925
                  </h6>
                </div>
              </div>

              {/* Address */}
              <div className="d-flex align-items-start bg-light rounded-3 p-3 shadow-sm">
                <div
                  className="p-3 rounded-3 me-3"
                  style={{ backgroundColor: "#EEF4CE" }}
                >
                  <i
                    className="bi bi-geo-alt-fill"
                    style={{ color: "#383838" }}
                  ></i>
                </div>
                <div>
                  <p className="mb-0 small" style={{ color: "#4D5C60" }}>
                    Address
                  </p>
                  <h6 className="fw-semibold mb-0" style={{ color: "#383838" }}>
                    23 CDB Belapur, Navi Mumbai <br /> Maharashtra, 400614
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div
              className="card border-0 shadow-lg rounded-4 p-4"
              style={{ backgroundColor: "#ffffff" }}
            >
              <form onSubmit={onSubmit}>
                {/* Name */}
                <div className="mb-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#383838" }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control form-control-lg"
                    placeholder="Enter your name"
                    required
                    style={{ backgroundColor: "#D1E0DE", border: "none" }}
                  />
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#383838" }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control form-control-lg"
                    placeholder="Enter your mobile number"
                    required
                    style={{ backgroundColor: "#D1E0DE", border: "none" }}
                  />
                </div>

                {/* Message */}
                <div className="mb-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#383838" }}
                  >
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    className="form-control form-control-lg"
                    placeholder="Write your message here..."
                    required
                    style={{ backgroundColor: "#D1E0DE", border: "none" }}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn w-100 fw-semibold shadow-sm"
                  style={{
                    backgroundColor: "#EEF4CE",
                    color: "#383838",
                    border: "none",
                    transition: "0.3s",
                  }}
                >
                  Send Message
                </button>

                {result && (
                  <div
                    className={`alert mt-4 text-center fw-semibold ${
                      result.includes("Success")
                        ? "alert-success"
                        : result.includes("Error")
                        ? "alert-danger"
                        : "alert-info"
                    }`}
                    style={{
                      backgroundColor: "#D1E0DE",
                      color: "#383838",
                      border: "none",
                    }}
                  >
                    {result}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;

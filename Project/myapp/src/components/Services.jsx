import "bootstrap/dist/css/bootstrap.min.css";
import "./Services.css";
import { Car, ClipboardList, BookOpenCheck, IdCard, Headphones, UserPlus, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BenefitCard({ icon: Icon, title, description, link, buttonText }) {
  const navigate = useNavigate();

  return (
    <div className="benefit-card shadow-lg p-4 text-center d-flex flex-column justify-content-between">
      {/* Icon and content */}
      <div>
        <div className="icon-wrapper mx-auto mb-3">
          <Icon size={36} color="#383838" />
        </div>
        <h4 className="benefit-title">{title}</h4>
        <p className="benefit-desc">{description}</p>
      </div>

      {/* Button */}
      <button className="benefit-btn mt-3 px-4 py-2 fw-semibold" onClick={() => navigate(link)}>
        {buttonText}
      </button>
    </div>
  );
}

function Services() {
  return (
    <section className="services-section py-5">
      <div className="container">
        {/* Section Title */}
        <h2 className="section-title text-center mb-5">What Does NiveshYan Offer?</h2>

        <div className="row g-4 justify-content-center">
          <div className="col-md-4">
            <BenefitCard
              icon={UserPlus}
              title="Enroll Now"
              description="Access your account or create a new one to manage registrations and applications."
              link="/signup"
              buttonText="Get Started"
            />
          </div>
          
          <div className="col-md-4">
            <BenefitCard
              icon={Car}
              title="Vehicle Registration Portal"
              description="Register your vehicle online with a smooth, transparent, and paperless process."
              link="/register"
              buttonText="Register Now"
            />
          </div>

          <div className="col-md-4">
            <BenefitCard
              icon={BookOpenCheck}
              title="Learning License"
              description="Apply for your learner’s license easily with step-by-step guidance."
              link="/learning-license"
              buttonText="Apply Now"
            />
          </div>

          <div className="col-md-4">
            <BenefitCard
              icon={IdCard}
              title="Driving License"
              description="Obtain your permanent driving license quickly and securely through the portal."
              link="/driving-license"
              buttonText="Apply Now"
            />
          </div>          

          <div className="col-md-4">
            <BenefitCard
              icon={Info}
              title="Know More About Us"
              description="Learn about our mission, services, and how we help make vehicle services easier."
              link="/about"
              buttonText="Learn More"
            />
          </div>

          <div className="col-md-4">
            <BenefitCard
              icon={Headphones}
              title="Help Center"
              description="Need help? Our support center provides quick assistance and guidance."
              link="/help"
              buttonText="Contact Us"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;

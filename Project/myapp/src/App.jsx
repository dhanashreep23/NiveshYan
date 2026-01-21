import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar.jsx";
import About from "./components/About";
import Services from "./components/Services";
import Home  from "./components/Home";
import UserLogin from "./components/UserLogin";
import Footer from "./components/Footer";
import HelpCenter from "./components/HelpCenter";
import UserSignup from "./components/UserSignup";
import AdminDashboard from "./components/AdminDashboard";
import LearningLicenseForm from "./components/LearningLicenseForm";
import DrivingLicenseForm from "./components/DrivingLicenseForm";
import VehicleRegister from "./components/Register";
 
function App() { 
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/register" element={<VehicleRegister/>} />
        <Route path="/login" element={<UserLogin/>}/>
        <Route path="/signup" element={<UserSignup/>}/>
        <Route path="/learning-license" element={<LearningLicenseForm />} />
        <Route path="/driving-license" element={<DrivingLicenseForm />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;



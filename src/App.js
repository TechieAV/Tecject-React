import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/navbar';
import Footer from './Components/Footer/footer';
import MainFooter from './Components/MainPage/Footer';
import Login from './Components/Login/login';
import OAuthSuccess from './Components/Login/OAuthSuccess';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import Register from './Components/Register/register';
import Home from './Components/Home/Home';
import MainPage from './Components/MainPage/mainPage';
import ContactForm from './Components/ContactForm/contactForm';
import EnterpriseSection from './Components/Enterprises/Enterprises';
import ProjectDetail from './Components/ProjectDetail/ProjectDetail';
import About from './Components/About/About';
import AdminLayout from './Components/Admin/AdminLayout';
import AddProject from './Components/Admin/AddProjects';
import ProjectDomainList from './Components/Admin/ProjectDomainList';
import EnterprisesForm from './Components/EnterprisesForm/EnterprisesForm';
import MiniProject from './Components/MiniProject/MiniProject';
import ProfessionalsPage from './Components/PortfolioPage/PortfolioPage';
import ScrollToTop from './Components/Navbar/ScrollTop';
import StudentPurchaseForm from './Components/PurchaseProject/PurchaseProject';
import EnterpriseRegisterForm from './Components/EnterpriseRegister/EnterpriseRegister';
import StudentReceipts from './Components/Receipt/ReceiptStudent';
import FloatingChatbot from './Components/Chatbot/FloatingChatbot';
import RazorpayPayment from './Components/RazorPayment/Payment';
import { useLocation } from 'react-router-dom';



function App() {
  const location = useLocation();
  
  const hideFooterRoutes = [
  "/admin",
  "/admin/dashboard",
  "/addproject"
];
const isAdminRoute = hideFooterRoutes.some(route =>
  location.pathname.startsWith(route)
);



  return (
    <>
      <ScrollToTop/>
      <Navbar role="user" />

      <Routes>
        <Route path="/oauth-success" element={<OAuthSuccess />}/>
        <Route path="/forgot-password" element = {<ForgotPassword />} />
        <Route path="/reset-password" element = {<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element = {<MainPage/>}/>
        <Route path="/project/:id" element={<ProjectDetail/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/projects/web" element={<h1>Website Projects</h1>} />
        <Route path="/projects/android" element={<h1>Android Projects</h1>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactForm/>} />
        <Route path="/admin" element={<AdminLayout/>}/>
        <Route path="/addproject" element={<AddProject/>} />
        <Route path="/domains" element={<ProjectDomainList />} />
        <Route path="/admin/dashboard" element={<h1>Admin Dashboard</h1>} />
        <Route path="/enterprises" element = {<EnterpriseSection/>}/>
        <Route path="/enterprisesForm" element = {<EnterprisesForm/>}/>
        <Route path="/miniProject" element={<MiniProject/>}/>
        <Route path="/Professionals" element={<ProfessionalsPage/>}/>
        <Route path="/StudentPurchase" element={<StudentPurchaseForm/>}/>
        <Route path="/EnterpriseRegister" element={<EnterpriseRegisterForm/>}/>
        <Route path="/receipt" element={<StudentReceipts/>}/>
        <Route path="/payment" element={<RazorpayPayment/>}/>
        <Route path="/Footer" element={<Footer/>}/>

        {/* Add other routes similarly */}
      </Routes>
      {!isAdminRoute && <FloatingChatbot/>}
      {!isAdminRoute &&<MainFooter/>}
      {!isAdminRoute &&<Footer/>}
      
    </>
  );
}

export default App;

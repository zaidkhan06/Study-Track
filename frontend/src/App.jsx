import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminPanel from "./components/AdminPanel";
import Aptitude from './components/Aptitude';
import Coding from './components/Coding';
import Companies from './components/Companies';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ForgotPassword from './components/ForgotPassword';
import Header from './components/header';
import InterviewPage from './components/InterviewPage';
import Login from './components/login';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './components/Signup';
import './index.css';

const App = () => {
  const [showButtons, setShowButtons] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <ToastContainer
  position="top-center"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  toastClassName="!bg-black !text-white !rounded-xl !shadow-2xl !p-4"
  bodyClassName="flex items-center"
  progressClassName="!bg-customRed !rounded-full"
/>
      <Router>
        <Header
          showButtons={showButtons}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setShowButtons={setShowButtons}
        />
        <div className="container mx-auto mt-16">
          <Routes>
            <Route
              path="/login"
              element={<Login setShowButtons={setShowButtons} onLogin={handleLogin} />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/aptitude" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Aptitude />
              </ProtectedRoute>
            } />
            <Route path="/coding" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <>
                  <Coding />
                  <Footer />
                </>
              </ProtectedRoute>
            } />
            <Route path="/interview" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <>
                  <InterviewPage />
                  <Footer />
                </>
              </ProtectedRoute>
            } />
            <Route path="/" element={
              <div>
                <Companies />
                <FAQ />
                <Footer />
              </div>
            } />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
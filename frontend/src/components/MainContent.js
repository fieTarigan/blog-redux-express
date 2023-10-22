import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedLayout from './ProtectedLayout';
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PostingPage from "../pages/PostingPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";

const MainContent = () => {
  return (
    <>
      <Routes>
        <Route path='' element={<HomePage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='user' element={<ProtectedLayout />}>
          <Route path='posting' element={<PostingPage />} />
          <Route path='about' element={<AboutPage />} />
        </Route>
        <Route path='contact' element={<ContactPage />} />
      </Routes>
    </>
  )
}

export default MainContent
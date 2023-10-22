import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { mainHome, mainContact, mainPosting, mainAbout, mainLogin, changeStatusLogin } from '../features/newSlice';
import { Link, useNavigate } from 'react-router-dom';

const NavbarMenu = () => {
  const mainNav = useSelector((state) => state.navigation.mainNavBar);
  const isLogin = useSelector((state) => state.navigation.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    window.localStorage.removeItem('token_login');
    dispatch(changeStatusLogin());
    dispatch(mainHome());
    navigate("/");
  }

  return (
    <div className="flex justify-between items-center px-8 border-b-2 border-blue-700">
      <Link onClick={() => dispatch(mainHome())} to="/" className={`border-b-4 border-transparent ${mainNav === "" ? "border-yellow-500" : ""}`} >
        Home
      </Link>
      <div className="flex gap-8 items-center py-4">
        {isLogin ? (
          <>
            <Link onClick={() => dispatch(mainPosting())} to="/user/posting" className={`border-b-4 border-transparent ${mainNav === "posting" ? "border-yellow-500" : ""}`} >
              Posting
            </Link>
            <Link onClick={() => dispatch(mainAbout())} to="/user/about" className={`border-b-4 border-transparent ${mainNav === "about" ? "border-yellow-500" : ""}`} >
              About
            </Link>
            <Link onClick={() => dispatch(mainContact())} to="/contact" className={`border-b-4 border-transparent ${mainNav === "contact" ? "border-yellow-500" : ""}`} >
              Contact Us
            </Link>
            <button type="button" onClick={logoutHandler}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link onClick={() => dispatch(mainLogin())} to="/login" className={`border-b-4 border-transparent ${mainNav === "login" ? "border-yellow-500" : ""}`} >
              Login/Register
            </Link>
            <Link onClick={() => dispatch(mainContact())} to="/contact" className={`border-b-4 border-transparent ${mainNav === "contact" ? "border-yellow-500" : ""}`} >
              Contact Us
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default NavbarMenu